import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import OpenAI from "openai";
import { ChatRequestSchema } from "@/lib/chat-contract";
import { getChart } from "@/lib/charts";
import { createOpenAIClient, createTutorRequest, getOpenAIConfiguration, readTutorAnswer } from "@/server/agent/openai";
import { variants, type PromptVariant } from "@/server/agent/prompts";
import { evaluationChart, getEvaluationCases, type EvaluationLanguage } from "./evaluation-cases";

const { values } = parseArgs({
  options: {
    case: { type: "string", multiple: true },
    variant: { type: "string", multiple: true },
    effort: { type: "string" },
    repeat: { type: "string", default: "1" },
    language: { type: "string", default: "en" },
    help: { type: "boolean" },
    "list-cases": { type: "boolean" },
  },
});
if (values.help) {
  console.log(`Run a matched synthetic WAICY pilot (uses the configured OpenAI API quota).
Usage: pnpm eval:waicy [--language en|zh-Hant] [--case ID ...] [--variant ${variants.join("|")} ...] [--effort low|medium] [--repeat 1|2|3]
  --language    Scenario/material language; defaults to en. zh-Hant preserves historical mixed-language inputs.
  --list-cases  Print scenarios and expectations without loading credentials or calling the API.
  --help        Show this help without calling the API.
English scenarios replicate existing archetypes; they are not independent held-out validation.
Compare variants within the same language/model/schema/context run, not directly with historical mixed-language scores.
Provider instructions retain their original language. Baseline still uses the common response schema and English locale instruction.
Schema validity is a structural check, not a quality score, mathematical check, or human assessment.`);
  process.exit(0);
}
if (values.language !== "en" && values.language !== "zh-Hant") throw new Error("Language must be en or zh-Hant.");
const language: EvaluationLanguage = values.language;
const evaluationCases = getEvaluationCases(language);
const requestedVariants = values.variant ?? [...variants];
const requestedCases = values.case ?? evaluationCases.map((entry) => entry.id);
const selectedVariants = variants.filter((variant) => requestedVariants.includes(variant));
const selectedCases = evaluationCases.filter((entry) => requestedCases.includes(entry.id));
if (new Set(requestedVariants).size !== selectedVariants.length || new Set(requestedCases).size !== selectedCases.length) {
  throw new Error("Unknown case ID or prompt variant.");
}
const effort = values.effort === "low" || values.effort === "medium" ? values.effort : undefined;
if (values.effort && !effort) throw new Error("Reasoning effort must be low or medium.");
const repeats = Number(values.repeat);
if (!Number.isInteger(repeats) || repeats < 1 || repeats > 3) throw new Error("Repeat count must be an integer from 1 to 3.");
if (values["list-cases"]) {
  console.log(JSON.stringify({ language, cases: selectedCases }, null, 2));
  process.exit(0);
}
if (existsSync(".env.local")) process.loadEnvFile(".env.local");
const configuration = getOpenAIConfiguration();
if (!configuration) throw new Error("Set OPENAI_API_KEY before running the synthetic model pilot.");

const { apiKey, model } = configuration;
const openai = createOpenAIClient(apiKey);
const evidenceDirectory = resolve("..", "evidence", "raw");
await mkdir(evidenceDirectory, { recursive: true, mode: 0o700 });
const startedAt = new Date().toISOString();
const runStart = performance.now();
const runDirectory = await mkdtemp(resolve(evidenceDirectory, `waicy-${language}-${startedAt.replaceAll(":", "-")}-`));
const manifest = {
  evidenceVersion: "waicy-pilot-2",
  scenarioVersion: language === "en" ? "english-replication-2" : "historical-mixed-2",
  language, startedAt, model, requestedEffort: effort ?? null, repeats,
  cases: selectedCases.map(({ id, expected }) => ({ id, expected })), variants: selectedVariants,
  limitations: [
    "Synthetic pilot using existing scenario archetypes, not independent held-out validation or human learner research.",
    "English translations change inputs: do not compare aggregate scores directly with historical mixed-language runs.",
    "Model, response schema, material, preferences and history are matched across variants within this run; developer instructions vary.",
    "Original developer instructions are retained; English runs add the same English response instruction to every variant, including baseline.",
    "The common schema and material/preferences context also apply to baseline; this is not an unconstrained chat baseline.",
    "Schema validity only checks structure; answer quality, mathematics and accessibility require separate review.",
  ],
};
await writeFile(resolve(runDirectory, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", { mode: 0o600 });
console.log(`Starting ${language} pilot: model=${model}, ${selectedCases.length} cases, ${selectedVariants.length} variants, repeats=${repeats}.`);
console.log(`Private evidence: ${runDirectory}`);

async function run(item: (typeof evaluationCases)[number], variant: PromptVariant, trial: number) {
  const request = ChatRequestSchema.parse({ ...item.request, sessionId: crypto.randomUUID() });
  const chart = request.chartId ? getChart(request.chartId) : undefined;
  if (request.chartId && !chart) throw new Error(`Missing chart material for ${item.id}`);
  const payload = createTutorRequest(model, request, chart ? evaluationChart(chart, language) : undefined, variant);
  if (effort) payload.reasoning = { effort };
  const start = performance.now();
  const evidence = {
    caseId: item.id, variant, trial, language, scenarioVersion: manifest.scenarioVersion,
    expected: item.expected, testedAt: new Date().toISOString(), request: payload,
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
  console.log(`${item.id} ${variant} ${trial}/${repeats} ${result.validSchema ? "schema valid" : "failed"}`);
  return result.validSchema;
}

const jobs = selectedCases.flatMap((item) => selectedVariants.flatMap((variant) =>
  Array.from({ length: repeats }, (_, index) => ({ item, variant, trial: index + 1 }))));
let valid = 0;
for (let start = 0; start < jobs.length; start += 3) {
  const results = await Promise.all(jobs.slice(start, start + 3).map(({ item, variant, trial }) => run(item, variant, trial)));
  valid += results.filter(Boolean).length;
}
await writeFile(resolve(runDirectory, "manifest.json"), JSON.stringify({
  ...manifest, completedAt: new Date().toISOString(), elapsedMs: Math.round(performance.now() - runStart),
  attempts: jobs.length, validSchema: valid, failed: jobs.length - valid,
}, null, 2) + "\n", { mode: 0o600 });
console.log(`Saved ${jobs.length} attempts; ${valid} passed schema validation: ${runDirectory}`);
if (valid < jobs.length) process.exitCode = 1;
