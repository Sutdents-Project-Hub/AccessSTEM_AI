# Decisions and sources

The initial design was recorded in Taiwan on November 20, 2026. The current implementation and its verification are described in the linked documents. Hosting and official submission still require team decisions.

## Architecture and product decisions

| ID | Decision | Reason and revisit condition |
|---|---|---|
| ADR-001 | Keep repository `AccessSTEM_AI` and slug `accessstem-ai` | Stable project and resource names |
| ADR-002 | Build a competition-stage web prototype | A small, testable service fits the delivery window |
| ADR-003 | One Next.js component under `web/` | Use server routes for external AI calls. Revisit if a separate service has distinct data or deployment responsibilities. |
| ADR-004 | Start with structured samples and text descriptions | Make graph facts traceable. Image interpretation needs a separate accuracy and privacy plan. |
| ADR-005 | Make the three profiles adjustable preferences | Learners choose the support they need. Classroom research can inform future defaults. |
| ADR-006 | Keep conversation state in the current page | Avoid student accounts and persistent conversation storage in the prototype |
| ADR-007 | Share a read-only reviewed transcript separately | Give judges evidence under the team's approved disclosure scope |
| ADR-008 | Use OpenAI Responses API with Terra low by default | The provider was selected by the project owner. Targeted runs informed the model and effort. See the [evaluation protocol](evaluation-plan.md). |
| ADR-009 | Design for WCAG 2.2 AA | Verify individual criteria, keyboard, VoiceOver, and learner tasks before making broader claims |
| ADR-010 | Preserve Baseline and three iterative prompt variants | Compare on matched settings and preserve failures, fixes, and actual results |

## Design inputs

- The original AccessSTEM AI student brief set the audience, high-school graph scope, layered descriptions, hint-first teaching, evidence handling, and future speech ideas.
- The user-provided WAICY track research guide informed early planning. Official organizer material is the source of competition requirements.
- Students Project Init informed the initial scaffold. The executable app, ChartFacts schema, and 36-case evaluation plan were subsequent engineering decisions.

## Primary sources

| Source | Use |
|---|---|
| [WAICY 2026 global event](https://www.waicy.org/waicy-2026/) and [project submission](https://www.waicy.org/2026-submission/) | Official schedule, entry and submission instructions |
| [WAICY rubric](https://www.waicy.org/rubrics/) and [LLM guidebook](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf) | Evidence requirements and scoring |
| [W3C WAI Complex Images](https://www.w3.org/WAI/tutorials/images/complex/) | Short and detailed text alternatives for charts |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Accessibility design and verification criteria |
| [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers) | Server-side API implementation |

The [research notes](waicy-submission/research-notes.md) connect the additional studies in the English deck to the actual claim and source. Check timing, naming, and sharing through the organizer's latest material before submitting.

## Open decisions

Confirm eligibility and permission for any student research or publication, hosting and API budget, teacher review and source attribution, a reviewed final transcript, and the team's contribution description. Validate the live demo and links outside the development environment before declaring submission readiness.
