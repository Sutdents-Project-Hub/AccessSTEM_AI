import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import OpenAI from "openai";
import { ChatRequestSchema } from "@/lib/chat-contract";
import { getChart } from "@/lib/charts";
import { createOpenAIClient, createTutorRequest, getOpenAIConfiguration, readTutorAnswer } from "@/server/agent/openai";
import { variants, type PromptVariant } from "@/server/agent/prompts";
import { evaluationCases } from "./evaluation-cases";

const { values } = parseArgs({
  options: {
    case: { type: "string", multiple: true },
    variant: { type: "string", multiple: true },
    effort: { type: "string" },
    repeat: { type: "string", default: "1" },
  },
});
const requestedVariants = values.variant ?? [...variants];
const requestedCases = values.case ?? evaluationCases.map((entry) => entry.id);
const selectedVariants = variants.filter((variant) => requestedVariants.includes(variant));
const selectedCases = evaluationCases.filter((entry) => requestedCases.includes(entry.id));
if (new Set(requestedVariants).size !== selectedVariants.length || new Set(requestedCases).size !== selectedCases.length) {
  throw new Error("指定的案例或 Prompt 版本不存在。");
}
const effort = values.effort === "low" || values.effort === "medium" ? values.effort : undefined;
if (values.effort && !effort) throw new Error("評測推理深度可選 low 或 medium。");
const repeats = Number(values.repeat);
if (!Number.isInteger(repeats) || repeats < 1 || repeats > 3) throw new Error("重測次數可選 1 到 3。");
if (existsSync(".env.local")) process.loadEnvFile(".env.local");
const configuration = getOpenAIConfiguration();
if (!configuration) throw new Error("設定 OPENAI_API_KEY 後才可執行合成案例的模型評測。");

const { apiKey, model } = configuration;
const openai = createOpenAIClient(apiKey);
const evidenceDirectory = resolve("..", "evidence", "raw");
await mkdir(evidenceDirectory, { recursive: true, mode: 0o700 });
const runDirectory = await mkdtemp(resolve(evidenceDirectory, `waicy-${new Date().toISOString().replaceAll(":", "-")}-`));

async function run(item: (typeof evaluationCases)[number], variant: PromptVariant, trial: number) {
  const request = ChatRequestSchema.parse({ ...item.request, sessionId: crypto.randomUUID() });
  const chart = request.chartId ? getChart(request.chartId) : undefined;
  if (request.chartId && !chart) throw new Error(`找不到案例教材 ${item.id}`);
  const payload = createTutorRequest(model, request, chart, variant);
  if (effort) payload.reasoning = { effort };
  const start = performance.now();
  const evidence = {
    caseId: item.id, variant, trial, expected: item.expected, testedAt: new Date().toISOString(), request: payload,
  };
  const result = await openai.responses.create(payload).then((response) => ({
    validSchema: Boolean(readTutorAnswer(response)),
    response,
    rawText: response.output_text,
  })).catch((error: unknown) => ({
    validSchema: false,
    failure: error instanceof OpenAI.APIError
      ? { type: error.name, status: error.status, code: error.code }
      : { type: error instanceof Error ? error.name : "UnknownError" },
  }));
  const suffix = repeats === 1 ? "" : `-${trial}`;
  await writeFile(resolve(runDirectory, `${item.id}-${variant}${suffix}.json`), JSON.stringify({
    ...evidence, elapsedMs: Math.round(performance.now() - start), ...result,
  }, null, 2) + "\n", { mode: 0o600 });
  console.log(`${item.id} ${variant} ${trial}/${repeats} ${result.validSchema ? "可解析" : "失敗"}`);
  return result.validSchema;
}

const jobs = selectedCases.flatMap((item) => selectedVariants.flatMap((variant) =>
  Array.from({ length: repeats }, (_, index) => ({ item, variant, trial: index + 1 }))));
let valid = 0;
for (let start = 0; start < jobs.length; start += 3) {
  const results = await Promise.all(jobs.slice(start, start + 3).map(({ item, variant, trial }) => run(item, variant, trial)));
  valid += results.filter(Boolean).length;
}
console.log(`儲存 ${jobs.length} 筆，其中 ${valid} 筆通過格式檢查：${runDirectory}`);
if (valid < jobs.length) process.exitCode = 1;
