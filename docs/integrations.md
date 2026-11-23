# OpenAI Integration

AccessSTEM AI uses the OpenAI JavaScript SDK and Responses API. The default model is `gpt-6.1-terra`, with `reasoning.effort: low` fixed. `OPENAI_MODEL=gpt-6-luna` also uses fixed `low` effort. Other model overrides use their respective default reasoning settings. The model must support Structured Outputs. A local key has been used for real conversation tests; public deployment quota and cost remain unverified.

## Request flow

- `web/src/server/agent/openai.ts` separates teaching instructions from chart, preference, and recent conversation data, then calls the Responses API.
- Requests set `store: false`, a 25-second timeout, a 2,200-token output limit, and zero automatic retries. Browser cancellation attempts to stop the upstream operation through the request signal.
- Structured Outputs and Zod validate the response. The server checks that source reference IDs belong to the current material. Candidate or user-provided material remains pending review.
- `/api/chat` allows at most 24 requests per process per minute and at most 4 concurrent upstream calls. Missing keys, rate limits, timeouts, and invalid formats produce readable states.

## Environment variables

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | Server-side credential; use `web/.env.local` locally and the hosting platform's secret store after deployment |
| `OPENAI_MODEL` | Responses API model ID; defaults to `gpt-6.1-terra` |

See the [evaluation plan](evaluation-plan.md) for real responses and model comparisons. Before public use, verify deployment instance count, OpenAI data policy, and budget. References: [OpenAI Responses](https://developers.openai.com/api/reference/resources/responses/methods/create), [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs), and [Security and privacy](security-and-privacy.md).
