import "server-only";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { ChatAnswerSchema, type ChatRequest } from "@/lib/chat-contract";
import type { ChartFacts } from "@/lib/charts";
import { promptVersions } from "./prompts";

const responseFormat = zodTextFormat(ChatAnswerSchema, "accessstem_tutor_answer");

export function getOpenAIConfiguration() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  return apiKey ? { apiKey, model: process.env.OPENAI_MODEL?.trim() || "gpt-4.1-mini" } : null;
}

export async function askTutor(
  configuration: NonNullable<ReturnType<typeof getOpenAIConfiguration>>,
  request: ChatRequest,
  chart: ChartFacts | undefined,
  signal: AbortSignal,
) {
  const client = new OpenAI({
    apiKey: configuration.apiKey,
    baseURL: "https://api.openai.com/v1",
    maxRetries: 0,
    timeout: 25_000,
  });

  const material = chart
    ? {
        chartId: chart.id,
        title: chart.title,
        source: chart.source,
        facts: chart.facts,
        unknowns: chart.unknowns,
      }
    : { source: { kind: "user_provided" }, description: request.userDescription };

  const response = await client.responses.parse({
    model: configuration.model,
    instructions: [promptVersions.v1, promptVersions.v2, promptVersions.v3].join("\n\n"),
    input: [{
      role: "user",
      content: JSON.stringify({
        material,
        preferences: request.preferences,
        conversation: request.history,
        question: request.message,
      }),
    }],
    max_output_tokens: 2_200,
    store: false,
    text: { format: responseFormat },
  }, { signal });

  const answer = ChatAnswerSchema.safeParse(response.output_parsed);
  if (response.status !== "completed" || !answer.success) return null;

  return {
    ...answer.data,
    needsHumanVerification: answer.data.needsHumanVerification
      || chart?.source.kind !== "curated_verified"
      || answer.data.claims.some((claim) => claim.kind === "unknown"),
  };
}
