import "server-only";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import type { Response as OpenAIResponse, ResponseCreateParamsNonStreaming } from "openai/resources/responses/responses";
import { ChatAnswerSchema, type ChatRequest } from "@/lib/chat-contract";
import { materialSources } from "@/lib/material-sources";
import type { ChartFacts } from "@/lib/charts";
import { instructionsFor, type PromptVariant } from "./prompts";

const responseFormat = zodTextFormat(ChatAnswerSchema, "accessstem_tutor_answer");
const defaultModel = "gpt-6.1-terra";

export function getOpenAIConfiguration() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  return apiKey ? { apiKey, model: process.env.OPENAI_MODEL?.trim() || defaultModel } : null;
}

export function createTutorRequest(
  model: string,
  request: ChatRequest,
  chart: ChartFacts | undefined,
  variant: PromptVariant = "v3",
): ResponseCreateParamsNonStreaming {
  const material = chart
    ? {
        chartId: chart.id,
        title: chart.title,
        source: chart.source,
        facts: chart.facts,
        unknowns: chart.unknowns,
      }
    : { source: { kind: "user_provided" }, description: request.userDescription };
  const variantInstructions = instructionsFor(variant);
  const languageInstruction = request.language === "en"
    ? "Write every natural-language field of the answer in English, including section headings and follow-up questions."
    : "";

  return {
    model,
    reasoning: model === defaultModel || model === "gpt-6-luna" ? { effort: "low" } : undefined,
    instructions: [variantInstructions, languageInstruction].filter(Boolean).join("\n\n") || undefined,
    input: [{
      role: "user",
      content: JSON.stringify({
        material,
        preferences: request.preferences,
        conversation: request.history,
        question: request.message,
        language: request.language,
      }),
    }],
    max_output_tokens: 2_200,
    store: false,
    text: { format: responseFormat },
  };
}

export function createOpenAIClient(apiKey: string) {
  return new OpenAI({
    apiKey,
    baseURL: "https://api.openai.com/v1",
    maxRetries: 0,
    timeout: 25_000,
  });
}

export function readTutorAnswer(response: OpenAIResponse) {
  if (response.status !== "completed" || !response.output_text) return null;
  try {
    const answer = ChatAnswerSchema.safeParse(JSON.parse(response.output_text));
    return answer.success ? answer.data : null;
  } catch {
    return null;
  }
}

const escapePrefix = String.raw`(?:${String.fromCharCode(27)}|\\x1b|\\u001b)\[`;
const terminalControl = new RegExp(escapePrefix + String.raw`(?:[0-?]*[ -/]*[@-~])?`, "gi");

function plainText(value: string) {
  return value
    .replace(terminalControl, "")
    .replace(/\\\(([^\n]*?)\\\)/g, "$1")
    .replace(/\$([^$\n]+)\$/g, (match, content: string) => /[=^²()]/.test(content) ? content : match)
    .replace(/\*\*([^*\n]+)\*\*/g, "$1");
}

export async function askTutor(
  configuration: NonNullable<ReturnType<typeof getOpenAIConfiguration>>,
  request: ChatRequest,
  chart: ChartFacts | undefined,
  signal: AbortSignal,
) {
  const client = createOpenAIClient(configuration.apiKey);
  const response = await client.responses.create(createTutorRequest(configuration.model, request, chart), { signal });
  const answer = readTutorAnswer(response);
  if (!answer) return null;

  const allowedSources = chart ? materialSources.chart : materialSources.custom;
  return {
    ...answer,
    summary: plainText(answer.summary),
    sections: answer.sections.map(({ heading, text }) => ({
      heading: plainText(heading),
      text: plainText(text),
    })),
    claims: answer.claims.map((claim) => ({
      ...claim,
      text: plainText(claim.text),
      sourceRef: claim.sourceRef && allowedSources.has(claim.sourceRef) ? claim.sourceRef : null,
    })),
    nextQuestion: answer.nextQuestion ? plainText(answer.nextQuestion) : null,
    needsHumanVerification: answer.needsHumanVerification
      || chart?.source.kind !== "curated_verified"
      || answer.claims.some((claim) => claim.kind === "unknown"),
  };
}
