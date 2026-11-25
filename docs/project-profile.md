# Student Project Profile

## Basic information

- Project name: AccessSTEM AI | Personalized STEM Chart Learning Assistant for Students with Visual Impairments
- Repository name: `AccessSTEM_AI`
- Project slug: `accessstem-ai`
- Local Docker Compose project: `accessstem_ai`
- Stage: `competition`
- Product type: `web`
- Bootstrap mode: `scaffold`
- Deployment: `planned`
- Team collaboration: `true`
- Technology policy: use the company technology baseline when no technology is specified
- Structure exception: none; use the fixed component roots

## Summary

An AI learning service for high-school math charts that helps blind students, students with low vision, and teachers explore evidence-based explanations, ask follow-up questions, and adjust explanation depth. The project targets WAICY 2026 Track 4, LLM & AI Agent.

## Components

- `web`: path=`web`, kind=`web`, framework=`Next.js`, package_manager=`pnpm`, quality=`lint, typecheck, build`, technology_source=`specified`

## Feature areas

- Three learning needs and adjustable preferences: full walkthrough, brief key points, and educator guidance
- Fact data for high-school linear and quadratic function charts reviewed by a human, plus text problem input
- Layered explanations of the chart overview, axes and units, trends, and key mathematical relationships
- Follow-up questions, examples, comprehension checks, and hint-based problem solving without forcing a direct answer
- Clear separation of known facts, derived conclusions, and uncertain information; ask when data is missing
- Accessible interface centered on semantic web elements, keyboard operation, and screen readers
- Real AI response comparisons across Baseline, V1, V2, and V3; error analysis and anonymized competition evidence
- A public demo for judges, an accessible link to the final real AI conversation record, and a single English PDF submission

## Project constraints

- The local Next.js MVP has been verified with real conversations. Teacher review of charts and the public demo remain outstanding.
- WAICY's scheduled deadline is November 29, 2026 at 17:00 Eastern Time. The team target is to finish pre-submission checks by the evening of November 29 in Taiwan.
- Prefer one Next.js App Router web component, with server-side Route Handlers for AI requests. Do not split out NestJS or a database at this stage.
- MVP input consists of manually reviewed structured chart data or text descriptions. Image recognition and voice features are extensions and must not be claimed as complete.
- Do not require students to enter identifying personal information, health diagnoses, or real school accounts. Chat content should normally remain only for the current session.
- Keep all LLM API keys in the server environment. Never expose credentials in the frontend or Git.
- Do not present guessed chart scales, numbers, or mathematical conclusions as known facts. A teacher must review learning materials.
- WCAG 2.2 AA is the accessibility design and testing target; do not claim conformance without testing.
- Final submission requires a usable AI link, a link to the final real conversation record, traceable iteration evidence, and one English PDF.
- GitHub remote: `Sutdents-Project-Hub/AccessSTEM_AI`. LLM provider: OpenAI. Domain and deployment environment are undecided.

## Areas of concern

- ai
- external-api
- personal-data
- uploads

## Assumptions

- Prefer Node.js 24 LTS, TypeScript, pnpm, Next.js App Router, and semantic HTML; verify compatible versions during implementation.
- The MVP has no database, sign-in, teacher dashboard, or storage for original uploaded chart files. De-identified competition evidence may be published separately after review.
- If image upload is added, use a two-stage process: extract a draft, then require human confirmation. Do not generate definitive numeric claims without confirmation.
- OpenAI Responses API defaults to `gpt-6.1-terra` with `low` reasoning effort. The model can be overridden server-side. Public traffic quotas and terms of use need confirmation.
- The student competitor is responsible for understanding the problem, user research, Prompt iteration, and interpreting results. Contributions by advisors and tools must be disclosed accurately.
- Deployment is needed only for the competition demo. Use a dedicated Vercel Hobby project with its assigned production domain.

## Open decisions

- Confirm the competitor's age eligibility and consent requirements, including whether the organizer must be consulted.
- Confirm ownership of the OpenAI key, model access, API quota, payment responsibility, and public demo traffic budget.
- Verify the assigned production URL and anonymous access. Do not fill in a URL that does not exist.
- Confirm whether blind or low-vision participants can be recruited. If not, clearly state that only VoiceOver and keyboard simulation tests were completed.
- Decide whether image upload is in scope before the deadline; by default, it is not P0.
- Confirm rights to publicly cite, display, and reproduce chart materials.
- Confirm anonymization, review, and consent before publishing the final conversation record.
