import transcript from "../chat-history/transcript.json";

export const dynamic = "force-static";

export function GET() {
  const turns = transcript.turns.map(({ question, preferences, answer }, index) => [
    `Turn ${index + 1} · ${preferences.profile} · ${preferences.pedagogyMode}`,
    `Test question\n${question}`,
    `Tutor reply\n${answer.summary}`,
    ...answer.sections.map(({ heading, text }) => `${heading}\n${text}`),
    ...answer.claims.map(({ kind, text, sourceRef }) => `${kind}: ${text}${sourceRef ? ` (${sourceRef})` : ""}`),
    ...(answer.nextQuestion ? [`Follow-up question\n${answer.nextQuestion}`] : []),
  ].join("\n\n"));

  return new Response([
    "AccessSTEM AI — WAICY chat history",
    "Live tutor: https://accessstem-ai.vercel.app/?lang=en",
    "An AI agent operated the public browser interface using scripted questions. The replies are the service’s actual responses.",
    `${transcript.turns.length * 2} messages · ${transcript.recordedAt} · Prompt ${transcript.promptVersion} · commit ${transcript.commit}`,
    `${transcript.lesson} · Teacher review pending`,
    "Default model: gpt-6.1-terra, low reasoning effort. Individual replies omit the provider model ID.",
    ...turns,
  ].join("\n\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
