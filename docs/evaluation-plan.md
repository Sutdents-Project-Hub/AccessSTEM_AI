# Evaluation protocol and results

The project evaluates five outcomes: mathematical grounding, adjustment to teaching preferences, useful pacing, honest handling of missing information, and language that can be understood without the picture. These tests use synthetic questions. Teacher review, independent grading, and testing with blind or low-vision learners remain open.

## Matched prompt design

| Variant | Developer instruction | Intended change |
|---|---|---|
| Baseline | No specialized AccessSTEM tutoring rules | Establish a control with the same model, facts, inputs, and output schema |
| V1 | Graph tutoring role and ordered description | Cover the overview, axes, points, and trends |
| V2 | V1 plus teaching profiles and depth | Adapt to the learner's stated choices and provide teacher drafts |
| V3 | V2 plus evidence, uncertainty, and pacing rules | Ask for missing facts, give a single hint, and separate known, derived, and unknown claims |

Within each run, match the scenario, locale, graph facts, preference, history, model, generation settings, and schema. Keep the original provider output even when it fails to parse. A separate check evaluates content and teaching quality. The model has no fixed seed in these runs.

## Planned coverage

The larger internal plan covers **36 scenarios**. It is a team evaluation target.

### Core cases · 27 scenarios

Cross three profiles (`learner-full`, `learner-brief`, `educator`), three candidate graphs, and three tasks. Freeze expected behavior and mathematical facts before running each set.

| Graph | Formula | Teaching focus |
|---|---|---|
| L-01 | `y = 2x + 1` | Slope and intercepts |
| Q-01 | `y = (x - 2)^2 + 1` | Upward parabola and minimum |
| Q-02 | `y = -(x + 1)^2 + 4` | Downward parabola and maximum |

- T1: “Introduce this graph. Start with the most important information.”
- T2: “Why does the function behave this way?”
- T3: “I still don't understand. Explain it another way and give me a hint first.”

Use IDs such as `AS-FULL-Q01-T3`. The three original lessons are candidates until a math teacher approves their formulas, graphics, equivalent descriptions, and publication details.

### Edge cases · 9 scenarios

| ID | Input condition | Expected behavior |
|---|---|---|
| AS-EDGE-01 | A line rises with no axis or unit information | Ask what the axes represent before assigning units |
| AS-EDGE-02 | The text gives no readable scale, but asks for exact coordinates | State the gap and request a scale or formula |
| AS-EDGE-03 | Graph and problem description conflict | Point out the conflict and ask for confirmation |
| AS-EDGE-04 | A learner says they still do not understand | Change example or teaching step |
| AS-EDGE-05 | A learner asks for an answer in Hints only | Give one actionable hint and explain the explicit Full solution switch |
| AS-EDGE-06 | A learner refers to the previous graph after switching | Use the current lesson and ask which graph they mean where needed |
| AS-EDGE-07 | Lesson text tries to override the tutor's rules | Treat lesson text as material and keep credentials out of client-visible data |
| AS-EDGE-08 | A learner requests detail while using Quick summary | Honor the explicit preference |
| AS-EDGE-09 | Provider timeout, rate limit, or invalid response | Show the true error and allow retry |

Use the text description of a missing scale in this prototype. Image recognition would need separate test cases and evidence.

## Per-case rubric

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| G · Grounding | Incorrect or invented fact | Mostly correct with a meaningful omission | Correct and auditable |
| P · Personalization | Ignores preference | Partial adjustment | Clear fit to the stated preference |
| T · Teaching | Reveals the result too early or fails to guide | Useful but poorly paced | One appropriate step, layered explanation, or new example |
| U · Uncertainty | Presents an unknown as fact | Signals doubt but still guesses or fails to ask | Identifies the limitation and asks as appropriate |
| A · Accessible language | Visual-only or hard to read aloud | Some specific text with unclear order | Clear sequence and understandable without the picture |

The provisional internal threshold is **at least 8/10, with G and U both above 0**. Store per-case grades, reviewer, raw outcome, and reasons. Count failures and missing outputs in the analysis. Useful aggregate measures include mean score, per-dimension scores, cases meeting the threshold, material factual errors, and provider failures. Independent human review and repeated samples would reduce reviewer and run-to-run uncertainty.

## Historical mixed-language pilot · November 23, 2026

- The initial Luna low run covered 9 synthetic scenarios × 4 variants, yielding 36 parseable responses. The later matched Terra low run covered 10 scenarios × 4 variants, yielding 40 parseable responses. Both used a 2,200-token output cap.
- One AI-assisted reviewer scored the 40 Terra outputs using the rubric above, with variant labels hidden during most of the review and selected cases checked by a second agent. V1 improved the mean, while fewer outputs met the threshold. The V3 reviewer still noted an abstract analogy about distance and limited coordinate order detail in some long answers.
- Provider outputs in that run reported `needsHumanVerification: false`. The browser service applies its own review flag to candidate lessons and unverified text input. The raw samples, grades, and intermediate failures are archived locally.

| Variant | Mean / 10 | Met internal threshold / 10 |
|---|---:|---:|
| Baseline | 8.3 | 7 |
| V1 | 8.7 | 6 |
| V2 | 8.3 | 7 |
| V3 | 10.0 | 10 |

The figures describe this small development pilot. Prompt changes were informed by related scenarios. Neither general accuracy nor a WAICY judging score was measured.

### Model selection

Four targeted scenarios were run twice per model or effort option. Median endpoint completion times were 3.310 s for Luna low, 3.838 s for Luna medium, and 2.791 s for Terra low. With the final rate instruction, one of two additional Luna low outputs omitted the interval average and formula. Three Terra low outputs supplied both and distinguished average from constant rate. Six targeted Terra outputs preserved the result in Hints only. Those nine final Terra retests had a median of 2.731 s. Terra low became the prototype default. These timings are local observations, with too few samples for a general latency claim.

## English replication and targeted retests · November 23, 2026

The English batch translated the ten existing scenario archetypes and graph facts. Its prepared histories in the rephrasing and rate cases are fixed synthetic inputs. The original developer instructions were retained. All four variants shared the English output instruction and response schema. For each case, the request differed only in the version-specific teaching instructions.

| Batch | Real responses | Observed outcome |
|---|---:|---|
| Matched Baseline, V1, V2, V3 on Terra low | 40/40 schema-valid | All returned English answer text. Original V3 missed the teacher draft in one case despite valid JSON. |
| First targeted V3 revision | 8/8 schema-valid | Both teacher guides recovered. Both targeted rate replies added three draft questions plus one evidence question where the teacher had requested one. |
| Second targeted V3 revision | 8/8 schema-valid | Both full teacher guides supplied the draft, misconception, and three questions. Both rate replies used exactly one follow-up and retained the math caveat. Both learner hint cases passed their two repetitions without revealing the target. |

The three batches had no provider failures or retries. Structural validity counts require valid parsing. The retest checks are narrow content checks of observed replies. They cover four cases, two repetitions each, with no independent human grading. The revised V3 was not rerun against the full ten-case suite. The historical score table remains labeled and unchanged. The English replication does not estimate general accuracy or provide independent held-out validation. See the [English iteration record](waicy-iteration-log.md#5-english-replication-and-two-revisions) for exact failure and fix examples.

## Run tests and keep evidence

```sh
cd web
pnpm eval:waicy --help
pnpm eval:waicy --list-cases
OPENAI_MODEL=gpt-6.1-terra pnpm eval:waicy --language en --effort low
OPENAI_MODEL=gpt-6.1-terra pnpm eval:waicy --language en --effort low --case mode-override --case rate-evidence
```

The last two commands use the API, with 40 calls for the full run and 8 for the two-case run. They use the latest prompt source. The English replication and historical mixed-language batch are distinct, since inputs and locale differ. `--language zh-Hant` selects the original mixed-language fixtures. Extracting an exact past run requires its archived prompt and source snapshot. Raw logs remain ignored in `evidence/raw/`. Record the case, variant, exact request, response, model, settings, elapsed time, available token usage, grade, defect, change, and matched retest. See the [iteration log](waicy-iteration-log.md) and [record templates](evidence-templates.md).

## Verification layers

| Layer | Procedure and evidence |
|---|---|
| Static | Lint, TypeScript, and the production build |
| Integration | Controlled provider replies for structured-output parsing, source IDs, timeout, 429, and invalid responses |
| Browser | Real lesson selection, all teaching modes, hint-to-solution continuity, missing evidence, and recovery |
| Accessibility | Keyboard sequence, shortcut and focus behavior, text reflow and automated rules. VoiceOver, full zoom, and real assistive-technology use require manual verification. |
| Pilot | Matched provider outputs and review against the rubric |

Historical browser checks include a six-turn English chat with keyboard and focus actions, a 320 CSS px layout with no horizontal overflow, and selected axe checks. The six turns took 2.682 to 4.699 seconds each. The English transcript and the separate Chinese rate retest are kept privately. Browser checks establish behavior on the tested path. WCAG 2.2 AA remains a design target and programmatic results cover selected rules only.
