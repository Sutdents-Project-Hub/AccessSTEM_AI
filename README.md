# AccessSTEM AI

An AI tutor for high-school function graphs, designed for blind and low-vision learners and the teachers who support them. A learner can read a graph in words, ask follow-up questions, and choose when to see a solution. The tutor separates given facts, mathematical deductions, and missing information.

**WAICY 2026 · AI Large Language Model Track.** Try the [public chatbot](https://accessstem-ai.vercel.app/). The three sample lessons are awaiting teacher review. See the [Vercel deployment guide](docs/deployment.md) for build and acceptance details.

## Explore the project

- **Full guide** walks through axes and units, key points, and trends in order. The first explanation layer opens automatically at the default depth. The lesson also includes a formula reading and a coordinate table.
- **Quick summary** leads with the central takeaway and keeps short supporting detail available on demand. Learners can request more detail in the same conversation.
- **Teacher guide** drafts a classroom explanation, a common misconception, and three guiding questions. Ask for one classroom question to get a prompt you can read to students. The draft is marked for review.
- Use a sample linear or quadratic function, or paste a text problem. Hints only gives a first step. Full solution shows the result and its reasoning.

The workspace, tutoring, and error messages open in English by default. Select **繁體中文** or open `/?lang=zh-Hant` for Traditional Chinese. `/?lang=en` is the explicit English entry.

## Run locally

Use Node.js 24 LTS and pnpm 10.33.0. For AI chat, copy `web/.env.example` to `web/.env.local` and set the server-side `OPENAI_API_KEY`. The default model is `gpt-6.1-terra` at low reasoning effort.

```sh
cd web
pnpm install --frozen-lockfile
pnpm dev
```

Open [the local workspace](http://localhost:3000/). The graph lessons are also available without a provider key. See the [Web setup](web/README.md) for error behavior and verification commands.

## Competition evidence

| Material | Contents |
|---|---|
| [WAICY entry and rubric](docs/competition.md) | Deliverables, official sources, and status |
| [Iteration log](docs/waicy-iteration-log.md) | Prompt changes, real model tests, failures, and retests |
| [Evaluation protocol and results](docs/evaluation-plan.md) | Matched test design, case IDs, scores, and limitations |
| [Screenshots and English captions](docs/assets/waicy-screenshots/WAICY-screenshot-index.md) | Browser captures of the workspace and actual model replies |
| [Demo and submission](docs/demo-and-submission.md) | Three-minute English demo and final acceptance checks |
| [Deck and submission package](docs/waicy-submission/) | English Collage deck source, score map, research, and form description |
| [Research and source notes](docs/waicy-submission/research-notes.md) | Which sources support which claims |

## Engineering reference

- [Requirements and acceptance](docs/project-overview.md), [project profile](docs/project-profile.md), and [implementation plan](docs/implementation-plan.md).
- [Architecture](docs/architecture.md), [agent instructions](docs/agent-design.md), and [API contract](docs/api-and-data-contracts.md).
- [Accessibility](docs/ux-accessibility.md), [data handling](docs/data-and-storage.md), and [security and privacy](docs/security-and-privacy.md).
- [Provider integration](docs/integrations.md), [deployment plan](docs/deployment.md), and [decisions and sources](docs/decisions-and-sources.md).
- [Evidence templates](docs/evidence-templates.md) and [engineering handoff](docs/agent-handoff.md).

The single Next.js component lives under `web/`. The server validates inputs and calls OpenAI through `POST /api/chat`. Conversation state lives in the current browser page. The prototype accepts structured sample facts and text. Image upload, speech features, learner accounts, and saved history remain future work.
