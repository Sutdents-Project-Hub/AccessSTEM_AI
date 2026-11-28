# AccessSTEM AI · WAICY slide-maker handoff

**28 November 2026 · Applied to the 52-slide V5 deck.** The page numbers below refer to the earlier 48-slide V4 draft; current numbers are in the [coverage map](scoring-map.md). The competition submission is one English PDF. [Official requirements and references](official-and-research-brief.md)

## Links to put in the PDF

| Purpose | Link |
|---|---|
| Live prototype | [AccessSTEM AI in English](https://accessstem-ai.vercel.app/?lang=en) |
| Final-version example conversation | [WAICY chat history on Vercel](https://accessstem-ai.vercel.app/waicy/chat-history) |
| Plain-text backup | [Same conversation as text](https://accessstem-ai.vercel.app/waicy/chat-history.txt) |

**Suggested caption:** “18 exchanged messages in one scripted test of the deployed V5 tutor, 28 Nov 2026. An AI agent entered nine questions through the public browser interface. The other nine messages are actual tutor replies.”

Use turns 1–2 for depth, 3–6 for the hint and solution controls, 7 for the unknown unit, and 8–9 for the teacher draft and question. Earlier overview replies and the graph itself show the vertex. Describe turns 3–5 as a check of the tutor’s **hint reply**, since a previous turn already displayed the result. Item 4 of the guidebook describes a conversation between the entrant and the final assistant. If a team member records that conversation, use it as the primary link and keep this V5 record as engineering evidence. [Guidebook, PDF p. 21](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf#page=21)

The pasted-problem example is a separate 12-message session with live V5 replies to questions submitted by an AI agent. Use the [plain-text question and reply material](v5-question-and-reply-material.txt), [full record](v5-guided-graph-conversation.md), or [selected excerpts](v5-conversation-slide-copy.md). The [team recording worksheet](team-chat-recording.md) provides the setup and prompts for a fresh session.

## Source materials for each slide

| Existing draft pages | What to use |
|---|---|
| 5–8 · Problem and motivation | [Literature-backed writing](official-and-research-brief.md#4-literature-backed-rationale-and-what-each-study-does-not-prove). Lead with a concrete graph-reading task and attribute the research. Add a personal inspiration only after a team member supplies it. |
| 13–15 · Three profiles | Keep the profiles selectable. On page 14 put the exact matched question over both V5 learner captures. State “same chart and question, fresh sessions, default mode settings.” On page 15 use the teacher-facing example from turns 8–9. |
| 19–20 · Interface and access | Replace the tiny examples with the captures below. Give keyboard focus and the title enough room. Describe the 320 CSS px result as Chrome viewport reflow. |
| 21–32, 47–48 · Iteration | [Three English prompt slides](prompt-iteration-slide-material.md). Use the V1–V4 source excerpts, then [V5 failure, rule change and retest](evaluation/v5-test-report.md#one-new-failure--change--retest). Keep the old and new runs labelled with their dates and methods. |
| 33–36 · Chat and live demo | Use the two Vercel links above and the new V5 excerpts. Rename the 27 Nov V4 record as historical if it appears elsewhere. |
| 37–39 · Risks and limits | Attribute the literature analysis to the materials and cite the sources. Report scripted testing, the missing-unit defect, unreviewed samples, and the limits of the keyboard and viewport checks. |
| 40–42 · Future, originality, conclusion | [Tool comparison and English conclusion](official-and-research-brief.md#5-comparison-with-existing-tools-scope-not-a-winner-claim). Compare scope with Desmos, Mathpix, Seeing AI and VizAbility. State intended benefit and the next validation step. |
| 43–46 · References | [New research and product sources](official-and-research-brief.md#9-references-apa-style-starting-list) plus retained citations from the deck. Put source numbers beside the new claims. |

## Screenshots for slides 14, 19 and 20

All files are Chrome captures of the public V5 site from 28 November. Use the image at its native aspect ratio. Prefer one large example per page when the surrounding text competes for space.

| Slide | Asset | Caption |
|---|---|---|
| 14 | [Full guide](assets/v5/mode-full.jpg) and [Quick summary](assets/v5/mode-brief.jpg) | “Same prompt, different depth. Full guide opens the axes layer. Quick summary gives the key point and one optional section.” Pair the apps' actual reply excerpts in editable text if the lower composer has to be cropped. |
| 15 | [Single classroom question](assets/v5/teacher-one-question.jpg) | “Teacher guide gives one question a teacher can read aloud.” |
| 19 | [High-contrast graph and coordinate table](assets/v5/high-contrast-graph.jpg) and [320 CSS px view](assets/v5/high-contrast-mobile.jpg) | “The coordinate table remained visible at a 320 CSS px Chrome viewport, with no horizontal document overflow.” |
| 20 | [Skip link with full title](assets/v5/keyboard-skip.jpg) and [Keyboard-selected mode with full title](assets/v5/keyboard-mode-wide.jpg) | “Tab reached the skip link; Enter moved to main; Right Arrow selected Quick summary with a visible focus ring.” |
| 20 detail | [Mode focus and panel heading](assets/v5/keyboard-mode-detail.jpg) | Use as an inset if the 1440×1000 wide shot is too small to see the focus outline. |

## Concise English slide text

**Same task, two reading depths.** “Give me an overview of the graph.” Both replies identified the vertex at (2, 1). Full guide used three layers and 81 words in the summary and section text. Quick summary used one optional layer and 24 words. Each was a first reply in a fresh browser session. [Exact replies and counting method](evaluation/v5-test-report.md#slide-ready-result)

**Research-based motivation.** Function-graph questions require a learner to connect axes, units, key points and changing relationships. Research on access to STEM diagrams and conversational chart navigation informed the decision to pair a textual overview with optional layers and follow-up questions. [Study findings and boundaries](official-and-research-brief.md#4-literature-backed-rationale-and-what-each-study-does-not-prove)

**Contribution and conclusion.** AccessSTEM combines chart facts, selectable teaching depth and a controlled hint-to-solution flow in one high-school tutoring interaction. The latest scripted tests show these choices at work. Teacher review, screen-reader checks and learner studies are the next steps toward evaluating its educational value. [Related work and limits](official-and-research-brief.md#5-comparison-with-existing-tools-scope-not-a-winner-claim)

## Rehearsal and filing

- **Three-minute explanation.** Spend 35 seconds on the graph-learning task, 55 on the three profiles and reply contrast, 65 on one failure → prompt change → retest, and 25 on limitations and next steps. Rehearse against the assigned slot. [Demo and likely questions](../demo-and-submission.md)
- **Three-minute demo.** Use the same overview question in both learner modes, then paste a fresh function for an initial hint and switch to Full solution. Show the teacher example from the published transcript if the live run is short on time.
- **Four-minute Q&A.** For “Who tested this?”, say “Codex operated the browser, and the tutor returned live replies. The test questions were scripted. Historical scores were AI-assisted.” For “What is different?”, explain the tutoring task, the mode changes and the missing-evidence follow-up, using a specific replayable example.
- **Form.** [163-word English description](project-description.txt) and [AI-use statement draft](ai-use-disclosure.txt). The LLM track checklist does not list a separate AI-use file. The global form includes an optional Additional Questions field. Fill the confirmed team details and review the disclosure before filing. [Official form](https://www.waicy.org/2026-submission/)
- **PDF.** Update the deck source and export `LLM_High_AccessSTEMAI.pdf` to the shared `LLM_High_AccessSTEMAI` folder, using the team’s confirmed category. Open the exported PDF’s links and the folder from a signed-out browser. The global deadline is **30 November 2026 at 06:00 Taipei time**. [Submission checklist](submission-todo.md)
