# Chart Data, Conversation Ephemera, and Competition Evidence

> Status: Local MVP. Materials ship with the application; chat and learning preferences remain in the browser's current page session.

## Data categories and default storage

| Data | P0 location | Public? | Retention / deletion principle |
|---|---|---|---|
| Self-created ChartFacts candidate materials | `web/src/lib/charts.ts`, pending teacher review | Yes, after confirming copyright and source | Version-controlled; changes require a new version and review |
| User-entered problem / description | Current browser session; only the portion needed for the current turn is sent to AI | No by default | Refreshing, leaving the page, or switching charts clears the conversation. OpenAI requests use `store: false`; confirm applicable provider policy before going public |
| Profile / learning preferences | Current UI state | Non-identifying settings may be retained | Do not store diagnosis, school, or account data |
| Raw LLM evaluation inputs and outputs | Team-controlled **private** evidence space (not yet selected) | No by default | Publish only after de-identification, permission, and review |
| Final 10-turn real conversation (public version) | Read-only public page/document after review (not yet created) | Only with appropriate consent and de-identification | Confirm link validity for submission and conditions for removal and retention |
| Images / scans (P1) | If added in the future, process temporarily and then remove | No by default | Do not retain original images; recheck third-party processing terms |
| Keys, personal data, real student data | **Never in the repository or public materials** | No | Process only as legally necessary; do not log sensitive data |

`docs/` contains **specifications and safe public examples** only, not private raw test logs. Review future evaluation files for sensitive information first; a hidden directory is not adequate Git protection.

## Minimum data model

1. `ChartFacts`: `id/version/topic/axes/keyPoints/trends/unknowns/shortDescription/longDescription/source`.
2. `LearnerProfile`: reading depth, teaching mode, math level, and interaction preferences; no medical identity fields.
3. `ChatTurn`: anonymized session, `chartId`, role, message, and time (only when needed).
4. `EvaluationRun`: case, Prompt/model details, raw response, human scores, and error reason.

See the [API contract](api-and-data-contracts.md) for exact fields; do not define an incompatible version elsewhere.

## Chart authority

- Each built-in example needs a formula or checkable mathematical facts, short and full descriptions, source and license, and a human review date.
- Start with self-created linear and quadratic functions. Label user-pasted chart text `user_provided`; the system does not automatically certify it.
- If the description and formula conflict (for example, the description says the vertex is `(2,1)` but the formula implies something else), do not answer definitively. Show the conflict and ask for review.
- If image support is added, all model-extracted values remain **provisional drafts** until confirmed by the user or reviewed by a teacher.
- Confirm rights, appropriate citation, source, and permission to publish on GitHub for images and PDFs from formal learning materials.

## Submission without a database (not yet implemented)

- The demo may support anonymous short-lived conversations with real multi-turn LLM responses; sign-in is not required.
- For the final real interaction, manually preserve the raw conversation, review and de-identify it, then create a **read-only conversation link**, potentially as a static evidence page or public document.
- The read-only page must not be a fake chat. It must state the original run date, model, and version, and preserve the original message order. Do not write a conversation in advance and pass it off as an LLM run.
- Cross-device permanent chat storage or public share links for every user would be a **new requirement** that needs decisions about database, identity, consent, deletion, and backups.

## Sources, copyright, and reuse

Record the source and reuse terms for all images, learning materials, text, AI-generated content, user interviews, and open-source dependencies, except official rules and self-created formulas. Do not choose a GitHub LICENSE automatically. Include materials and test results in a formal report only when publication rights are clear.

## Risk threshold for adding storage later

Adding PostgreSQL, Supabase, object storage, cloud replay, or video/photo retention requires updates to security responsibilities, deployment, data retention/deletion, permissions, backup/recovery, cost, and risk. These resources are not created as part of this initialization.
