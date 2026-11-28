# AccessSTEM AI Web

The workspace uses Next.js App Router, React, TypeScript, and Zod. Use Node.js 24 LTS and pnpm 10.33.0.

## Local development

From the repository root, run:

```sh
cd web
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000/`. The workspace opens in English. `/?lang=en` explicitly selects English, while `/?lang=zh-Hant` and the header switch select Traditional Chinese. The three sample function graphs are marked for teacher review. Learners can also paste a text problem and change teaching mode, depth, solution style, or math level during the lesson.

## OpenAI API

Copy `.env.example` to `.env.local`, set `OPENAI_API_KEY`, and restart the app. The key belongs on the server. `OPENAI_MODEL` defaults to `gpt-6.1-terra` with low reasoning effort. `gpt-6-luna` also uses low effort in the app. Other overrides must support Responses API Structured Outputs and use their model-specific default effort.

`POST /api/chat` validates the lesson, question, and recent conversation before calling OpenAI. If the key is missing, the route returns 503. The lesson remains available, and the composer preserves the question for retry. Reloading or changing the lesson starts a new conversation.

Prompt V5 differentiates the default learner overviews. Full guide gives ordered explanations of axes, points and trends, with the first layer expanded. Quick summary gives the takeaway and one short supporting section. Each reply records the learning mode used for that turn. The question can override explanation depth. **Hints only** and **Full solution** still control whether the tutor reveals a result, and Teacher guide puts a single requested classroom question directly in the summary.

## Vercel

Import this component with Root Directory `web` and the Next.js preset. The [deployment guide](../docs/deployment.md) lists production variables and the judge-link check.

`/waicy/chat-history` and `/waicy/chat-history.txt` serve the same fixed, reviewed test transcript. They use the captured V5 replies in `src/app/waicy/chat-history/transcript.json`. Regular tutor conversations do not populate these routes.

## Verify

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

Use `pnpm eval:waicy --help` for pilot options. Running the pilot invokes the live API and uses its allowance. See the [evaluation protocol](../docs/evaluation-plan.md) for case coverage and results, and the [deployment plan](../docs/deployment.md) for public acceptance.
