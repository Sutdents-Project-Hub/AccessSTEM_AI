# Implementation plan and closeout

The project has a locally working prototype. The work packages preserve the acceptance criteria for the competition entry. WAICY assigns 25 points each to the specific AI service and iterative development, so the priority is a working tutor and a traceable trial-and-retest record.

Read [repository instructions](../AGENTS.md), [requirements](project-overview.md), [architecture](architecture.md), [tutor design](agent-design.md), [API contract](api-and-data-contracts.md), and [evaluation protocol](evaluation-plan.md) before changing those areas.

## Work packages

| ID | Deliverable | Dependency | Acceptance | Status |
|---|---|---|---|---|
| W01 | Single Next.js component in `web/` | Existing structure | Direct manifest and lockfile, no nested Git, verified build | Implemented and verified locally |
| W02 | Candidate graph facts and text alternatives | Teacher and publication review | Formulas, coordinates, trends, and source status traceable | Three examples implemented, teacher review pending |
| W03 | Preferences and request/reply schemas | W01 | Validated input and output, no user-controlled verified status | Implemented |
| W04 | Server-side Responses API and chat route | W01/W03 | Live reply, bounded requests, and meaningful errors | Live provider verified locally. Missing key, 429, and invalid replies covered by controlled checks. |
| W05 | Layered tutoring, evidence, and hints | W02/W04 | Follow-ups, alternative explanations, useful hints, and questions when facts are missing | Implemented with true browser dialogues and matched retests |
| W06 | Accessible bilingual workspace | W03/W05 | Keyboard, labels, feedback, and English-first entry | Implemented. VoiceOver and participant testing pending. |
| W07 | Baseline through V3 prompt comparison | W05/W06 | Save real requests, outputs, failures, and fixes | Historical and English pilot evidence recorded. Larger 36-scenario plan and independent grading remain open. |
| W08 | Accessibility and error verification | W06/W07 | Record real assistive-technology checks, fixes, and retests | Keyboard, reflow, and selected automated checks recorded. VoiceOver remains open. |
| W09 | Deployed demo and reviewed conversation | W07/W08 and hosting decision | External judges can open both links and use AI | Public deployment and link acceptance pending |
| W10 | English PDF and submission | W07–W09 and team review | One English PDF, form description within 200 words, and confirmation | English source package prepared. Final links, export, and submission pending. |

## Original rehearsal schedule

| Target in Taiwan | Focus |
|---|---|
| Nov 20–22 | Scope, scaffold, lessons, and working local chat |
| Nov 23–26 | Prompt comparison, revisions, and accessibility acceptance |
| Nov 27 | Public demo and reviewed conversation |
| Nov 28 | English report and rehearsal |
| Evening of Nov 29 | Final checks and the team's internal submission target |

See [competition status](competition.md) for the official deadline.

## Ownership and risks

- Team members explain the problem, design decisions, tests, and implementation they performed. Advisors and AI tool work are attributed separately in the [contribution record](evidence-templates.md#f-contribution-record).
- Provider failures should leave the lesson and a retry option available. A past real capture is suitable as labeled fallback evidence during a rehearsal.
- Use structured or text graph inputs. Image recognition needs a separate privacy and accuracy plan.
- Give published links, true model interaction, evidence, and the three profiles priority over future features. Keep API usage limits and external acceptance visible.
- Complete a work package only with evidence, updated authoritative docs, and clear unresolved limits. Keep private data and credentials out of the repository. Follow the repository's Git and external-action instructions.
