# WAICY iterative development log

AccessSTEM AI addresses an interaction gap in high-school mathematics: a learner can read what a function graph contains and continue asking about what its relationships mean. This log connects the learner need to an actual prompt change, a test, and the observed result. Dates below are local to Taiwan. See the [WAICY guidebook](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf#page=21) and [rubric](https://www.waicy.org/rubrics/).

## 1. Idea to working tutor

| Date | Decision | Evidence |
|---|---|---|
| Nov 20–21 | Narrow the brief to linear and quadratic function graphs. Provide a formula reading, axis labels, key points, and trends. Let learners choose Full guide, Quick summary, or Teacher guide. | [Requirements](project-overview.md) and prewritten [evaluation criteria](evaluation-plan.md) |
| Nov 22 | Build a single Next.js workspace and server-side OpenAI route. Keep conversations in the current page and mark the three original lessons for teacher review. | `63b3d5d` had a local build and simulated-provider tests, including missing-key recovery. |
| Nov 22 | Apply the Collage design, place sample and custom lessons together, remove the empty conversation area, and add starters and a link to the latest answer. | Chrome keyboard and 320 CSS px reflow checks. The original style brief is in the [demo guide](demo-and-submission.md). |
| Nov 23 | Connect to OpenAI with Luna low. Exercise learner and teacher tasks with synthetic scenarios and keep the answers from every field. | Initial missing-unit call returned HTTP 200 in 5.293 s. Two agent roles provided scenario testing and review. |
| Nov 23 | Refine hint pacing, rate explanations, language consistency, and source labels. Compare three model and effort settings. | Final Terra low batch, targeted retests, and a real English browser chat. |

## 2. Prompt versions

| Version | Change | English reading guide |
|---|---|---|
| Baseline | Remove the specialized developer tutoring instructions. Keep the lesson, preferences, question, history, and output schema. | The matched version without the graph teaching rules still has the task inputs and output structure. |
| V1 | Give the model a graph tutor role and a description order. | “Describe the overview, axes, key points, and trends in sequence.” |
| V2 | Add adjustable depth, the three teaching modes, and a teacher draft with misconceptions and guiding questions. | Lead with the takeaway in Quick summary. Draft three guiding questions for a teacher. |
| V3 | Add known, derived, and unknown claims, source identifiers, one-step hints, and missing-evidence questions. | In Hints only, keep the target result out of every answer field. For a possible constant rate, distinguish the average over an interval from a claim about the whole graph. |
| V4 | Align English hint guidance with the interface and distinguish student questions from tutor follow-ups. | A teacher asking for one classroom question receives it in the summary. With unreadable scales, the question asks students what evidence they would need. |

The reading guide paraphrases the tested instructions in English. [Prompt source](../web/src/server/agent/prompts.ts) and [request assembly](../web/src/server/agent/openai.ts) preserve the actual implementation. Individual run files retain the complete sent developer text and raw provider output. The historical matched comparison fixed `gpt-6.1-terra`, low reasoning effort, and a maximum of 2,200 output tokens. See the [evaluation protocol](evaluation-plan.md) for scoring and version controls.

## 3. Failures, fixes, and matched retests

| Case or issue | Observed failure and change | Retest |
|---|---|---|
| Missing unit · `missing-unit` | The initial model declined to assume meters but gave no follow-up. The revised prompt required a question when the unit or quantity was missing. The browser added a direct reply action. | Terra V3 asked what the vertical axis represented or for a unit. The English page exposed the supporting claims and reply action. |
| Hint leakage · `mode-override` | Old V3 revealed the minimum of 1 at x = 2 after being asked for the answer. The first rewrite protected the summary but still leaked through a detail and a claim. The final rule covered every response field and allowed one useful step. | In the matched comparison, Baseline gave the minimum. V3 prompted the learner to consider the square and explained the Full solution switch. Six focused Terra retests, including direct requests for the answer, preserved the target. |
| Rate evidence · `rate-evidence` | A teacher-oriented reply suggested taking two points from a water-volume graph with unreadable markings and did not distinguish interval average from constant rate. The revised instruction requires usable evidence and the calculation of change in volume over change in time. | Three targeted Terra retests and a separate Traditional Chinese browser reply described the limits, stated the average-rate calculation, and requested the scale, units, or formula. |
| English consistency | The summary could appear in English while headings or details remained in Chinese. Removed the fixed Traditional Chinese requirement, passed the selected locale, and applied it to all response fields. | Six English exchanges in Chrome included three hint turns, a full solution, evidence labels, and a follow-up. |
| Unrecognized sources and formatting | Some model output contained unmatched source identifiers, wrapper markup, or control characters. Added source validation by lesson type, cleanup for rendered replies, and a review reminder. | Controlled adapter tests exercised invalid sources, text cleanup, 429, invalid output, and request validation. The original provider text remains in the local logs. |
| Run-directory collision | Concurrent model comparisons initially used the same timestamp-based directory. Changed evaluation to create a unique directory atomically. | Affected comparison batches were rerun separately with model and effort verified. |

### Nov 27 · V4 targeted regression

An agent reported that language in the live hint replies sometimes used “Full answer” for the **Full solution** control and that a request for one classroom question could produce a clarification addressed to the teacher. V4 shares the label with the interface and gives the requested classroom question priority over a tutor follow-up.

The local English retest sent six synthetic requests to `gpt-6.1-terra`. All six returned structured replies. The direct answer request received one hint without the minimum or vertex and used **Full solution**. Both new classroom-question cases and the rate-evidence case returned one student question in the summary and no tutor follow-up. The full teacher draft kept three questions, and the numeric question with insufficient data still asked for axis labels, units, scales, or an equation. Raw results are in the local ignored directory `evidence/raw/waicy-en-2026-11-27T06-17-29.490Z-Kze9sd/`.

### Nov 27 · Live-site checks before and after V4

Both rounds used scripted requests through https://accessstem-ai.vercel.app with browser automation: 23 replies on V3 (14:08 Taipei) and 23 on V4 (14:20). All replies were schema-valid. Review was AI-assisted.

| Check | Replies per round | V3 | V4 |
|---|---:|---|---|
| Same question in three modes | 3 | Pass | Pass |
| Hint mode holds the answer when asked directly | 6 | 6/6 | 6/6 |
| Declines an unverifiable fixed rate | 4 | 4/4 | 4/4 |
| Full solution correct; missing unit not guessed | 2 | Pass | Pass |
| Replies naming a wrong setting (Failure 7) | 6 | 5 | 0 |
| Teacher receives one student question (Failure 8) | 4 | 0/4 | 4/4 |

The label correction has both a prompt rule and a display safeguard, so the live result cannot separate them. A further keyboard-only automated run changed the mode and received a reply without pointer input, and a 390 px viewport had no horizontal overflow. VoiceOver was not tested. One observed interface quirk remains: **Respond to this question** wraps the quoted question in `「」` brackets in the English interface.

The [final conversation](waicy-submission/final-chat-transcript.md) is published in full. Raw files are in `evidence/raw/waicy-prod-2026-11-27/`, `waicy-prod-v4-2026-11-27/` and `waicy-journey-2026-11-27/` (git-ignored).

## 4. Historical results and analyst limitations

- Luna low produced 36 parseable replies for 9 scenarios × 4 variants. The matched Terra low pilot produced 40 for 10 × 4. Both pilots used synthetic inputs.
- The 40 outputs were reviewed using five 0–2 criteria. Baseline met the internal threshold on 7 of 10 cases, V1 on 6, V2 on 7, and V3 on 10. The pilot used AI-assisted scoring and development scenarios. Independent human grading and the larger 36-scenario plan remain open.
- Earlier English browser verification covered six turns (12 exchanged messages), keyboard operation, reply focus, and narrow reflow. The example lessons still require teacher verification. VoiceOver and real participant use are pending.
- Same-question mode demos produced a structured walkthrough, a shorter overview, and a teacher draft with three guiding questions. The [screenshot index](assets/waicy-screenshots/WAICY-screenshot-index.md) gives visual examples.

## 5. English replication and two revisions

The English-first pass used ten translated scenarios across Baseline, V1, V2, and V3 with Terra low. Each case matched the inputs, locale, schema, and settings across variants. Forty calls returned valid structured replies, with English in every visible answer field. The measured criteria below came from actual model replies. The English replication reuses development scenarios, so its outputs should be read alongside the historical mixed-language pilot.

| Case | Observation, change, and retest |
|---|---|
| Direct request in Hints only | In `mode-override`, the English Baseline returned “The minimum value is 1, reached when x = 2.” V3 explained the preference switch and asked about the squared term. Both final retests preserved the target. |
| Full teacher guide | English V3 returned the overview “This graph represents a quadratic function that opens upward,” followed by a single section titled “Hint.” It omitted both the misconception and the three questions. The learner-only stopping rule conflicted with the educator's default Hints only preference. The first revision made the full draft requirement explicit. Both final retests included a misconception and three questions, each on its own line. |
| Teacher asks one question about rate evidence | The first revision restored a full draft even in this focused task, adding three guiding questions before an additional evidence question. The second revision restored the teacher's requested scope. Both final retests retained the average-rate calculation and the distinction from a constant rate, with exactly one follow-up. One actual follow-up was “Can you provide clear axis scales and units, a formula, or a stated condition about the rate?” |
| Learner asks for one hint | Both final `hint-mode` retests gave a single actionable step without revealing the minimum or vertex. |

Each revision was checked against the same four English cases twice. Both retest batches yielded eight schema-valid replies. The final targeted outcomes support the role and question-count changes on these cases. They leave independent scoring and the larger test plan open. See the [evaluation protocol](evaluation-plan.md#english-replication-and-targeted-retests--november-23-2026).

## 6. Audit trail

The paths below are relative to the private `evidence/raw/` folder. Experiment files retain requests, parsed and raw responses, time, available token counts, and parse status. Keep exact historical evidence available for authorized review. The public repository includes the method and checked excerpts.

| Archive | Contents |
|---|---|
| `live-smoke-missing-unit.json`, `waicy-user-baseline.json` | Initial connection and synthetic learner/teacher interaction |
| `waicy-2026-11-23T05-37-25.469Z/` | Initial Luna 9 × 4 run |
| `waicy-2026-11-23T05-42-05.662Z/`, `waicy-2026-11-23T05-44-18.251Z/` | V3 rewrites and intermediate leakage |
| `waicy-2026-11-23T05-46-09.868Z/`, `waicy-2026-11-23T05-47-33.488Z-a90hjp/`, `waicy-2026-11-23T05-47-33.489Z-xUHT4O/` | Model and reasoning comparisons |
| `waicy-2026-11-23T05-50-31.270Z-Vr6gYk/`, `waicy-2026-11-23T05-52-16.170Z-oeOMsP/` | Targeted Luna and Terra repetitions |
| `waicy-2026-11-23T05-56-58.032Z-MpBQBk/`, `waicy-closeout-pilot-grades.json` | Historical matched 10 × 4 run and per-answer pilot scoring |
| `waicy-final-english-browser.md`, `waicy-final-terra-rate.json` | Six-turn English browser chat and Traditional Chinese rate retest |
| `waicy-en-2026-11-23T08-36-09.622Z-GCQCeg/` | English 10 × 4 run, request validation, and source snapshot |
| `waicy-en-2026-11-23T15-40-59.296Z-7W7kst/` | First English V3 revision, including the rate follow-up regression |
| `waicy-en-2026-11-23T15-42-08.812Z-8uUU85/` | Second English V3 revision, final four-case retest and source snapshot |

Historical UTF-8 SHA-256 values of the exact matched developer instructions:

| Variant | SHA-256 |
|---|---|
| V1 | `4f07ac0f1a9c6fc854ddc3a50e4417c19ba2a6dfe3aa8a5eeda48dc7cfce65f5` |
| V2 | `a6b641461c11bfde02cc382851b1099652c97d8d0f7633a006c7f16c2d1cd3d0` |
| V3 | `94cdaa832035eaa103b0a1a84367e2af8528659fd8a5202eb7f43a6972233c95` |

The English runs include the common English output instruction in the hashed developer text:

| English V3 run | Instructions SHA-256 |
|---|---|
| Original matched batch | `b5ea587d744da757f96e5046ec5ced40a40e22fcdac4d62cce3568aea94d3270` |
| First targeted revision | `0c22e2adeff250f430a70a17413d3a4a36767a2a4f5da8a8e97b0c54b7be3bfc` |
| Final targeted revision | `72a46537e0965ca8df88009c594e7c2364c74759e4f80e6017867a475d177241` |

Use the [evaluation commands](evaluation-plan.md#run-tests-and-keep-evidence) for a fresh run. For public excerpts and student or advisor attribution, apply the [privacy review](security-and-privacy.md) and [evidence templates](evidence-templates.md).
