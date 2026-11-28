# Prompt iteration evidence for slides (V1–V4)

Slide-ready English copy, based on the tested prompt source and archived provider outputs. Prompt excerpts below are faithful English translations of the historical Traditional Chinese developer instructions; they are not English prompts sent to the model. Quoted answer lines are verbatim English provider output unless marked as a translation. The run archives are local and git-ignored; the public audit trail is in `docs/waicy-iteration-log.md` and `docs/evaluation-plan.md`.

## Slide 1 — From graph description to adaptive teaching

**V1 · Teach a reliable reading order**

Prompt excerpt *(translated)*: “Describe the overall graph first, then explain its axes, key coordinates, and trends.”

**V2 · Adapt the explanation to the stated role**

Prompt excerpt *(translated)*: “Adjust teaching to the selected preference: guide a learner step by step, give a brief summary, or draft a teacher guide with common misconceptions and three guiding questions.”

**Observed in the same English educator-guide case**

- V1 returned a graph explanation organized into “Axes,” “Find the vertex,” “Use symmetry,” and “Follow the trend.”
- V2 added the teacher-specific sections “Common misunderstandings” and “Three guiding questions.”

The V1 opening directed the reader to the result: “Its lowest point is the vertex (2, 1).” The V2 teaching section added a way to introduce the shape: “Start with the whole shape: the curve falls toward its lowest point, then rises.”

**Historical source:** `web/src/server/agent/prompts.ts` at `0382e7e`; English matched-run outputs `educator-guide-v1.json` and `educator-guide-v2.json` in local `evidence/raw/waicy-en-2026-11-23T08-36-09.622Z-GCQCeg/` (same synthetic case and run settings).

## Slide 2 — V3 adds evidence checks and protects hint mode

**Prompt excerpts** *(translated)*

- “Classify claims as given, derived, or unknown; when information is missing, state the gap and ask one specific question.”
- “In Hints mode, do not reveal the requested result in any answer field. Give one actionable step and stop.”

**Actual matched English output · `mode-override`**

The synthetic learner asked for the minimum directly while the selected mode was Hints.

| Baseline | V3 |
|---|---|
| The minimum value is 1, reached when x = 2. | To receive the direct answer, select “full answer” in your learning preferences. <br> *Hint:* First, ask yourself: what is the smallest possible value of the squared term (x − 2)²? |

The Baseline disclosed the target. V3 withheld it and gave a single next step. This early V3 run used the wording “full answer”; V4 later aligned that label with the interface.

**Historical pilot results — retain the labels and caveat**

| Variant | Mean score / 10 | Met internal threshold / 10 |
|---|---:|---:|
| Baseline | 8.3 | 7 |
| V1 | 8.7 | 6 |
| V2 | 8.3 | 7 |
| V3 | 10.0 | 10 |

These are from a 10-scenario synthetic development pilot, with AI-assisted rubric scoring (variant labels hidden during most of the review and selected cases checked by a second agent). They are not independent human grades, a held-out validation set, a general accuracy estimate, or a WAICY judging score. The planned 36-scenario evaluation and independent human grading remain open.

**Historical source:** matched English run `mode-override-baseline.json` and `mode-override-v3.json` in local `evidence/raw/waicy-en-2026-11-23T08-36-09.622Z-GCQCeg/`; historical score table in `docs/evaluation-plan.md`. Prompt source and initial V1–V3 iteration record: `web/src/server/agent/prompts.ts`, `docs/waicy-iteration-log.md` at `0382e7e` / `08b7bd5`.

## Slide 3 — V4 aligns the interface label and teacher question

**Prompt excerpts** *(translated)*

- “Use the exact interface option name: ‘Full solution.’”
- “When a teacher requests one student-facing question, put exactly one question in the summary. Do not add another question; set the follow-up field to null.”
- “If graph evidence is missing, ask students what evidence they would need; do not ask them to read an unreadable value or invent a result.”

**Actual output · matched English `mode-override` request**

Both versions used the same synthetic input, `gpt-6.1-terra`, low reasoning effort, and 2,200-token output cap.

- V3 summary: To receive the direct answer, select “full answer” in your learning preferences.
- V4 summary: To receive a direct answer, select “Full solution” in your learning preferences.

The V4 regression run also returned this student-facing classroom question for the missing-scale case: “If the scale and units are unclear, what information would you need to check whether the water volume increases at a constant rate?” The run log reports six synthetic V4 requests, all schema-valid; the label fix has both a prompt rule and a display safeguard, so the live-site result cannot isolate the prompt's effect.

**Source:** V4 prompt excerpt in `web/src/server/agent/prompts.ts` at `f2aafc4`; raw outputs `mode-override-v4.json` and `classroom-question-missing-scale-v4.json` in local `evidence/raw/waicy-en-2026-11-27T06-17-29.490Z-Kze9sd/`; V4 results and attribution limit in `docs/waicy-iteration-log.md` at `90412e4`.

## Producer notes

- Keep each version label beside its excerpt. V1–V4 excerpts are translations of the actual developer instructions; answer quotations are actual raw provider text.
- Use the score table only with the pilot caveat shown above. Do not call the scores human-reviewed or independent.
- The V3 teacher-guide failure in the English replication was real: it returned a short “Hint” and omitted the requested misconception and three questions. Later targeted V3 revisions fixed that four-case regression, but did not rerun the full ten-case suite. See `docs/waicy-iteration-log.md` and `docs/evaluation-plan.md` for the retest limits.
- Exact raw requests and responses are in ignored local evidence archives, not committed public files. Do not imply the archive paths are publicly accessible.
