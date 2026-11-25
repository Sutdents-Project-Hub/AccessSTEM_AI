import OpenAI from "openai";
import { CHAT_LIMITS, ChatRequestSchema, type ChatErrorCode, type ChatResponse } from "@/lib/chat-contract";
import { getChart } from "@/lib/charts";
import { askTutor, getOpenAIConfiguration } from "@/server/agent/openai";

export const runtime = "nodejs";
// Allow the 25-second provider timeout to return a structured error to the UI.
export const maxDuration = 40;

const minute = 60_000;
let windowOpenedAt = 0;
let callsInWindow = 0;
let activeCalls = 0;

const failure: Record<ChatErrorCode, { status: number; message: string }> = {
  INVALID_REQUEST: { status: 400, message: "請選一份教材或貼上題目，再輸入要問的問題。" },
  PAYLOAD_TOO_LARGE: { status: 413, message: "問題或對話太長，請縮短後再試。" },
  ORIGIN_REJECTED: { status: 403, message: "請在 AccessSTEM AI 頁面送出問題。" },
  RATE_LIMITED: { status: 429, message: "AI 暫時達到請求或額度限制，請稍後重試。" },
  AI_UNAVAILABLE: { status: 503, message: "目前無法取得 AI 回答。你可先閱讀教材，稍後再試。" },
  AI_TIMEOUT: { status: 504, message: "這次回答逾時，請重試。" },
  AI_INVALID_RESPONSE: { status: 502, message: "這次沒有取得完整的 AI 回答，請重試。" },
  INTERNAL_ERROR: { status: 500, message: "服務發生問題，請稍後重試。" },
};

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const headers = { "Cache-Control": "no-store" };
  function reject(code: ChatErrorCode) {
    const { status, message } = failure[code];
    return Response.json({ requestId, status: "error", code, message } satisfies ChatResponse, { status, headers });
  }

  const origin = request.headers.get("origin");
  const expectedHost = request.headers.get("host") || new URL(request.url).host;
  if (request.headers.get("sec-fetch-site") === "cross-site"
    || (origin && URL.parse(origin)?.host !== expectedHost)) {
    return reject("ORIGIN_REJECTED");
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json") || !request.body) {
    return reject("INVALID_REQUEST");
  }
  if (Number(request.headers.get("content-length")) > CHAT_LIMITS.bodyBytes) {
    return reject("PAYLOAD_TOO_LARGE");
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let body = "";
  let bytes = 0;
  let input: unknown;
  try {
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > CHAT_LIMITS.bodyBytes) {
        await reader.cancel();
        return reject("PAYLOAD_TOO_LARGE");
      }
      body += decoder.decode(chunk.value, { stream: true });
    }
    input = JSON.parse(body + decoder.decode());
  } catch {
    return reject("INVALID_REQUEST");
  } finally {
    reader.releaseLock();
  }

  const parsed = ChatRequestSchema.safeParse(input);
  if (!parsed.success) return reject("INVALID_REQUEST");
  const chart = parsed.data.chartId ? getChart(parsed.data.chartId) : undefined;
  if (parsed.data.chartId && !chart) return reject("INVALID_REQUEST");

  const configuration = getOpenAIConfiguration();
  if (!configuration) return reject("AI_UNAVAILABLE");
  if (Date.now() - windowOpenedAt >= minute) {
    windowOpenedAt = Date.now();
    callsInWindow = 0;
  }
  if (callsInWindow >= 24 || activeCalls >= 4) return reject("RATE_LIMITED");
  callsInWindow++;
  activeCalls++;
  try {
    const answer = await askTutor(configuration, parsed.data, chart, request.signal);
    if (!answer) return reject("AI_INVALID_RESPONSE");
    return Response.json({ requestId, status: "ok", answer } satisfies ChatResponse, { headers });
  } catch (error) {
    if (error instanceof OpenAI.APIConnectionTimeoutError) return reject("AI_TIMEOUT");
    if (error instanceof OpenAI.RateLimitError) return reject("RATE_LIMITED");
    if (error instanceof OpenAI.APIError) return reject("AI_UNAVAILABLE");
    if (error instanceof Error && [
      "SyntaxError", "ZodError", "LengthFinishReasonError", "ContentFilterFinishReasonError",
    ].includes(error.name)) return reject("AI_INVALID_RESPONSE");
    return reject("INTERNAL_ERROR");
  } finally {
    activeCalls--;
  }
}
