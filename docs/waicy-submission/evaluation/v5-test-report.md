# V4 and V5 real-model retest

**28 November 2026 · Synthetic development scenarios · Codex review.** The aim was to make the two learner modes visibly different while preserving the hint, teacher, and uncertainty behavior. All scenarios were written for testing. The browser was operated by an agent. These results measure individual replies and interactions.

## Runs and reproducibility

| Run | Cases | Schema-valid | Purpose |
|---|---:|---:|---|
| V4, English | 12 | 12/12 | Rerun the ten original English scenarios and two focused classroom-question scenarios |
| V5 draft, English | 15 | 15/15 | Check mode differentiation and identify regressions, including a missed follow-up about an unknown unit |
| V5 draft, Traditional Chinese | 5 | 5/5 | Check the first localized overview, depth override, hint and classroom responses |
| V5 final, English | 15 | 15/15 | Repeat the above cases after the clarification rule changed |
| V5 final, Traditional Chinese | 6 | 6/6 | Check both learner depths, hint control, missing scale, missing unit, and an explicit depth request |
| V5 public site | 10 | 10/10 successful browser replies | Nine successive turns in one conversation plus a matched Quick summary in a fresh session |

The direct provider runs used `gpt-6.1-terra`, low reasoning effort, a 2,200-token cap, Structured Outputs, no fixed seed and no SDK retries. The exact developer instructions, case inputs, observed model ID, result fields and timing are in the [model-reply export](2026-11-28-model-replies.json). The twelve overlapping V4 and final V5 requests match in language, material, settings, history and question. Each variant has one sample per case. [Evaluator and protocol](../../evaluation-plan.md)

## Slide-ready result

> **The same question produced two different reading experiences.** On the public site, Full guide opened with the axes and units, then provided separate layers for key points and trend. Quick summary led with the same vertex and offered one collapsed trend section. A learner can ask for more detail without changing their mode.

Ask **“Give me an overview of the graph”** on the built-in quadratic. Use both exact public replies from [browser evidence](2026-11-28-browser-evidence.json) and the [paired screenshots](../slide-maker-handoff.md#screenshots-for-slides-14-19-and-20). For this pair both sessions started with empty histories and the same chart, question, Guided setting and math level. Each used its mode's default depth.

| Check | V4 provider | V5 provider | V5 public browser |
|---|---|---|---|
| Full guide | 4 sections, 118 words | 3 sections, 90 words | 3 sections, 81 words |
| Quick summary | 2 sections, 65 words | 1 section, 34 words | 1 section, 24 words |
| Extra question in Quick summary | Present | Absent | Absent |
| First support section shown by default | Historical capture | — | Open in Full guide, collapsed in Quick summary |

Word count uses whitespace-separated tokens in the summary and section bodies, excluding titles, evidence claims and follow-up questions. Counts describe the recorded pair. The claim is a product demonstration from a single graph, not a population statistic or result of a learning study. The final V5 provider brief still included a secondary symmetry fact, and the new reading-time brief included more coordinate detail than intended.

## What happened in the original ten English scenarios

| Scenario | V5 final observation |
|---|---|
| Full guide | Ordered axes and units, key points and trend, with correct minimum at (2, 1). |
| Quick summary | One conclusion and one supporting section. No practice question. The supporting text still mentions symmetry. |
| Teacher guide | Introduction, common misunderstandings and three questions students can attempt. |
| Missing unit | Reported that meters cannot be inferred and asked for an axis label or problem statement with the unit. |
| Hints only | Omitted the requested minimum and vertex. It moved on to asking which x makes the square zero; a more gradual first hint could start with the range of a square. |
| Direct-answer request in Hints only | Kept the result out and named **Full solution**. The fresh V4 sample also kept the result out but omitted the switch instruction. |
| Rephrase | Substituted nearby x values to explain why y increases away from the vertex. |
| Incomplete custom graph | Distinguished a positive constant slope from an unverified value in meters per second and asked for the missing evidence. |
| English hint | Gave an English starting question about the squared term and omitted the target result. |
| Rate evidence | Provided one student-facing question, described the two-point interval average, and stated what could establish a constant rate. |

Both additional classroom cases put one question in the summary, with no tutor follow-up. The novel reading-time fixture produced a three-layer full guide and a one-section brief grounded in 1.5 minutes per page. A detailed walkthrough explicitly requested from Quick summary returned all three requested sections in both languages. These targeted checks are separate from historical pilot scores. [Evaluation protocol](../../evaluation-plan.md)

## One new failure → change → retest

| Stage | Observed evidence |
|---|---|
| V5 draft | The response to “Is the vertical axis measured in meters? Explain what evidence supports your judgment.” said “There is no evidence that the vertical axis is measured in meters.” and left `nextQuestion` empty. |
| Prompt revision | Added “If the user asks to confirm a particular axis unit or other detail that is missing, state that it is unknown and put one concrete request for the needed evidence in nextQuestion.” |
| V5 retest | “Can you provide the problem statement or a clearer axis label that specifies the unit of y?” The focused Chinese case and public browser missing-unit turn also returned a request for evidence. |

The overview and clarification results strengthen the evidence for the service and iteration criteria. The historical multilingual rubric table stays with its original run and AI-assisted grading method. No new judging score, independent rater result, or learning outcome is inferred from these checks.
