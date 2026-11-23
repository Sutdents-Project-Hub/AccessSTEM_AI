# Product Scope and Acceptance Criteria (Product Specification v0.1)

> Status: **The local MVP is connected to OpenAI. Teacher review, real-user evaluation, and public acceptance remain outstanding.** Requirements originated in the student proposal. This document records the full competition target; see the implementation plan for current progress.

## Problem and positioning

High-school linear and quadratic function graphs rely on visual reading of axes, scales, vertices, slopes, and trends. A one-time image description cannot ensure understanding; students need to ask follow-up questions at their own level. AccessSTEM provides **personalized, conversational STEM learning grounded in trustworthy chart data**. It does not claim to replace formally accessible learning materials or teacher judgment.

## Three learning needs (preferences can be changed freely)

| Profile | Default output | Main risk | Representative check |
|---|---|---|---|
| `learner-full` — blind-learning context | Nonvisual explanation from overview to detail; clear axes and units; readable in steps | Vague phrases such as “look here” or missing spatial information | A learner can describe the chart structure without looking at the screen |
| `learner-brief` — low-vision learning context | Key points first, with optional enlargement and details on request | Overly long speech or hard-to-read small labels | The learner can request only a curve's turning point and key values |
| `educator` — teaching context | Editable guide, three comprehension questions, and common misconceptions | AI output being mistaken for reviewed teaching material | A draft identifies the grade level, learning goals, and items to verify |

Users choose **interaction preferences**. They are not asked to disclose a diagnosis, disability documentation, or real name. Profile labels do not determine ability, and all options can be changed.

## P0 | Required before the WAICY deadline

| ID | Feature / scenario | Acceptance criteria (DoD) |
|---|---|---|
| FR-01 | Choose learning needs | Select one of three profiles and set `brief` / `step-by-step` / `teacher` preferences and `hint` / `guided` / `full` teaching pace; changes take effect |
| FR-02 | Sample charts and text descriptions | At least two linear or quadratic function charts whose **mathematical facts have been manually reviewed by a teacher**; users can paste a text problem; source and review status are shown |
| FR-03 | Three-layer description | Explain “30-second overview → axes, units, and key markers → concepts and trends”; allow the learner to revisit a specific layer |
| FR-04 | Multi-turn interaction | Continue asking about the same chart (for example, “What is the vertex?”, “Make it simpler,” or “Start with the axes”); a new chart must not contaminate the old conversation |
| FR-05 | Guided learning | In `hint` mode, do not reveal the final answer unless the user explicitly switches to a mode that provides a full solution |
| FR-06 | Label certainty | Distinguish supplied facts (`given`), conclusions derived from conditions (`derived`), and unconfirmed information (`unknown`); never invent a missing scale |
| FR-07 | Safe failure | When API quota, timeout, or model availability fails, explain that clearly and retain chart text; never show a fabricated successful AI answer |
| FR-08 | Basic accessibility | Without a mouse, users can choose a learning mode, submit a problem, read an answer, and retry; retain a VoiceOver core-task test record |
| FR-09 | Competition evidence | Same-question Baseline and V1–V3 outputs, test table, and error review can be reproduced; do not invent pass rates |
| FR-10 | Usable by external judges | An incognito window can open the real LLM conversation service without a developer account or private local domain |

## Non-functional requirements

- **Languages:** English is the default; users can switch to Traditional Chinese or back on the same material, and responses follow the selected language.
- **Understandability:** Do not use “here,” “as shown,” or “the red line” as the only location reference. Name axes, direction of change, and units.
- **User control:** Do not autoplay speech. Avoid announcing every token in a message region; keep focus order clear.
- **Trust:** Only built-in, reviewed data may be labeled teacher-verified. User-pasted descriptions must be attributed as “based on the description you provided.”
- **Privacy:** No sign-in or collection of school, medical, or real-name data is required. Send only the minimum context needed to the AI provider.
- **Resilience:** If the LLM fails, retain the user input and known static chart description; do not silently switch to an unrelated model.
- **Cost:** The public demo must have basic server-side rate and length limits. Define a budget after selecting a provider.

## P1 / P2 | Only if time allows (not P0 commitments)

- **P1:** Image upload, multimodal extraction into a chart draft, and inclusion in ChartFacts only after user or teacher confirmation; add more complete speed-time chart examples.
- **P1:** Allow export of anonymized real conversations with teacher review notes.
- **P2:** Voice input and read-aloud, specialized math expression reading, more subjects, learning history, and sign-in.

## Typical end-to-end flow

1. Choose “full step-by-step” or another preference, then use the keyboard to reach a chart example.
2. Review the chart data and ask the AI for the main idea; understanding must not depend on the image.
3. The student says, “I don’t understand the vertex.” The AI explains it with an example; the student can choose not to receive the direct answer.
4. The student asks for a shorter explanation. The AI keeps the chart context and follows the selected preference.
5. If data is missing or the chart has no scale, the AI says what is unknown and asks a specific question.
6. Educator mode produces a teaching draft and three guiding questions, clearly marked for human review.

## Evidence required to mark complete

- A P0 feature is complete only when it is **operable, recordable, and repeatable with a test case**.
- Competition scoring emphasizes the service and iteration evidence. Proposal examples, prewritten ideal answers, and static UI do not count as real AI responses.
- If time is short, prioritize making FR-01–07 and FR-09–10 demonstrable, then honestly record FR-08 findings and gaps. Never claim accessibility tests that were not performed.

## Open decisions

Model quota for the API key and public environment, hosting, teacher review of charts, material licensing, student age eligibility, feasibility of real-user research, P1 image upload, and permission to publish conversations must be resolved at the relevant stage. See [Decisions and sources](decisions-and-sources.md).
