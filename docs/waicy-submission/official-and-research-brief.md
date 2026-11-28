# WAICY 2026 LLM track — evidence and slide-writing brief

**Prepared 28 November 2026 (Taipei).** This is a slide-maker source brief, not a record of a human-subject study. Product, prompt, test, and accessibility statements below are limited to evidence currently documented in this repository. The final PDF and formal registration remain team-owned.

## 1. Official requirements to cover

The October 2026 guidebook's LLM Prompt Engineering Track calls for **one PDF** covering these ten sections (guidebook pp. 20–22; page numbers below are the PDF viewer's page numbers):

| # | Required section | What the slide/report should establish | Guidebook |
|---:|---|---|---|
| 1 | **What Specific Service Your AI Provides** | Define the focused service, core functionality, problem, and value. | p. 20 |
| 2 | **Who Are Your Users?** | At least three meaningfully different user profiles and their distinct needs; show the service responds differently. These are design profiles, not proof of actual users. | p. 21 |
| 3 | **Motivation** | Why the team developed it and what inspired the work. Attribute this motivation to the student team after confirmation. | p. 21 |
| 4 | **Link to the Chat History** | Share at least 10 exchanged messages with the final assistant version. | p. 21 |
| 5 | **Link to the Chatbot** | Give judges a live prototype they can use. | p. 21 |
| 6 | **Iterative AI Design Process** | Document Idea → Advisor Design → Testing → Error Analysis → Improvement. | p. 21 |
| 7 | **Limitation** | Discuss service limitations, ethics, and practical issues. | p. 22 |
| 8 | **Future Development** | Planned improvements addressing those limitations. | p. 22 |
| 9 | **Conclusion** | Summarize the work and its significance and potential impact. | p. 22 |
| 10 | **Reference** | List all sources used in developing the service and preparing the entry in a recognized citation style. | p. 22 |

The same guidebook specifies the shared Drive folder pattern `LLM_Category_ProjectName` and PDF pattern `LLM_Category_ProjectName.pdf`, plus reviewer access to the folder (p. 23). The LLM track says there are no age categories within this track (p. 20), while the cover/general eligibility language says participants are under 18 (p. 2). Confirm the entrant's category and route with the organizer rather than inferring it from the local project folder.

### Rubric weights

The official [WAICY 2026 Large Language Models rubric](https://www.waicy.org/rubrics/) allocates all **100 points** as follows:

| Criterion | Weight | Slide evidence to foreground |
|---|---:|---|
| Specific AI Service | 25 | A narrow graph-tutoring job, what the model does, and a real interaction. |
| Iterative Development | 25 | Prompt versions, matched tests, concrete failures, exact revisions, and results. |
| Motivation & Problem Statement | 10 | The graph-learning access need and why the team chose this scope. |
| Limitations & Considerations | 10 | Model mistakes, missing evidence, teacher review, privacy, and accessibility-test limits. |
| Future Development & Clear Reference | 10 | Feasible next steps plus complete, readable references. This rubric row also includes conclusion clarity. |
| Presentation and Communication | 10 | Clear, concise story, understandable demo, and evidence-based Q&A. |
| Originality & Creativity | 10 | Clearly identify the team's distinct implementation and product choices. |

The two AI criteria together are half the score. Spend real presentation time on what the tutor does and how iteration changed behavior; do not use research statistics as a substitute for test evidence. Rubric levels distinguish a basic description from a detailed service definition and distinguish a bare claim of iteration from prompt changes plus experimental results.

## 2. Submission form, timing, and source caveats

As checked on **28 November 2026**, the live [submission form](https://www.waicy.org/2026-submission/) says the deadline is **29 November 2026 at 5:00 PM EST**, one submission per team, and a brief description of **200 words or fewer**. It asks for country, track, project name, attendance mode, contact and team details, school grade, and a public Google Drive folder link. It states that teams already registered through an official country or regional organizer do not need to complete the global form and should contact that organizer. Check the registration route before submitting. The deadline converts to **30 November 2026 at 06:00 Taiwan time**; WAICY's page uses the label “EST,” so use the form's own stated deadline in any submission plan.

The guidebook also states the same deadline and says the competition language is English (pp. 2–3, 22). Its main overview describes a three-minute presentation, three-minute demo, and four-minute Q&A (p. 3), but the LLM track text itself does not state a slot duration. Follow the team's actual organizer invitation/time slot if it differs. The [linked example PDF could not be opened in the research browser](https://drive.google.com/file/d/1Mqp7Xv5sUcJkEXBOxp55G0eUumaSTMvc/view); no claims about that example's contents are made here.

The form displays **≤200 words**, while the October guidebook's general AI Showcase track page specifies a different limit for that separate track. For the LLM entry, follow the current LLM form's 200-word limit for its description field; do not copy another track's word limit. Recheck the form and organizer instructions at submission time.

## 3. Evidence boundaries and current project facts

### What is supported by project records

- The prototype is a web-based tutor for supplied high-school linear and quadratic function-graph facts. Its three selectable formats are **Full guide**, **Quick summary**, and **Teacher guide**; the hints-only preference changes how direct-answer requests are handled. It reports claims as given, derived, or unknown and can ask for missing evidence. Sample lesson facts are still labelled as awaiting teacher review.
- The documented prompt sequence is Baseline → V1 → V2 → V3 → V4 → V5. V1 added graph-tutor role/order; V2 added adjustable depth, three modes, and teacher guidance; V3 added evidence labels, one-step hints, and missing-data handling; V4 corrected UI terminology and prioritized a teacher's request for one classroom question. V5 separates the full and brief learner overviews and asks for evidence when the question needs a missing unit.
- The historical matched pilot used synthetic scenarios. A 10-scenario × 4-variant batch returned 40 model replies. AI-assisted pilot scoring found that V3 met the team's internal threshold on 10/10 cases versus 7/10 Baseline, 6/10 V1, and 7/10 V2. This is **not** an independently rated benchmark, a user outcome, or a statistical claim; scenarios were development cases, scoring used AI assistance, and the larger planned test is incomplete.
- A separate English replication also used ten translated development scenarios × four variants (40 schema-valid replies). Do not merge those scores with the earlier multilingual batch or call them independent/held-out validation. English targeted retests fixed observed hint leakage and teacher-guide regressions on selected cases.
- The 27 November live-site regression record reports 23 scripted replies on V3 and 23 on V4, all schema-valid. On its listed checks, direct-answer hint retention passed 6/6 on both; unverifiable fixed-rate handling passed 4/4 on both; a label issue fell from 5/6 replies to 0/6; and one-question classroom prompting improved from 0/4 to 4/4. Review was AI-assisted. The label fix combined prompt and display safeguards, so the test does not isolate the prompt's causal effect.
- The [V5 public chat record](https://accessstem-ai.vercel.app/waicy/chat-history) contains **18 messages: nine scripted questions entered by an AI agent and nine real replies from V5**. The sample is marked “Teacher review pending.” The 14-message V4 recording is retained as historical evidence.
- V5 live browser checks recorded visible keyboard focus and 320 px high-contrast reflow. Earlier project records also cover a 390 px viewport. They explicitly say VoiceOver was not tested. Do not claim WCAG 2.2 AA conformance or completed blind/low-vision user testing.

Primary internal evidence: [`docs/waicy-iteration-log.md`](../waicy-iteration-log.md), [`docs/waicy-submission/final-chat-transcript.md`](final-chat-transcript.md), [`docs/waicy-submission/submission-todo.md`](submission-todo.md), the [V5 retest](evaluation/v5-test-report.md), the test protocol in [`docs/evaluation-plan.md`](../evaluation-plan.md), and raw request/response logs under ignored `evidence/raw/` (not included in the public repository). Use the full run records for any claim requiring exact prompt, model, parameters, timestamp, or output. Public slides should show the run date, model/configuration where appropriate, and whether an interaction is scripted.

### Claims not supported

No project record establishes real student use, a blind/low-vision participant study, teacher approval of the sample graphs, student/advisor ratings, improved learning outcomes, or WAICY acceptance. Do not imply any of these. Public accessibility statistics and published research describe broader context; they do not establish this project's users, addressable market, or impact.

## 4. Literature-backed rationale (and what each study does not prove)

1. **Graph access involves spatial relationships, not only a list of labels.** Doore, Dimmel, Kaplan, Guenther, and Giudice (2023) explain that verbal descriptions may require more words yet can still fail to convey spatial content; their article reports an experimental multisensory STEM-diagram system with 20 sighted and 9 visually impaired participants. Both groups learned in the experimental and comparison conditions, without significant between-condition differences. This supports carefully describing axes, key points, direction, and relationships as a design rationale; it does **not** evaluate AccessSTEM AI, an LLM tutor, or high-school function graphs. [Original article](https://doi.org/10.3389/feduc.2023.1071759).

2. **Conversation around chart data is an active research direction.** Gorniak, Kim, Wei, and Kim's UIST 2024 VizAbility combines keyboard navigation and LLM-based conversational queries over chart data/encoding, navigation context, and external knowledge. This is a close research precedent and should be cited transparently when discussing related work; AccessSTEM AI is a narrower educational prototype focused on high-school function graphs, learner-selected teaching depth, staged hints, and source-labelled claims. The paper's existence does not establish the novelty or effectiveness of this prototype. [MIT record and abstract](https://dspace.mit.edu/entities/publication/1ff5f785-6fed-4606-914f-27cc6cc59505); [DOI](https://doi.org/10.1145/3654777.3676414).

3. **AI descriptions can be imperfect and users may need ways to assess them.** In a two-week diary study, Gonzalez et al. (2024) involved 16 blind and low-vision participants using a research-built AI scene-description application. Mean satisfaction was 2.76/5 and mean trust 2.43/4. These results motivate cautious, evidence-visible design and honest limits, not claims about all products or about AccessSTEM users. [Original paper record and abstract](https://arxiv.org/abs/2403.15604).

4. **Blind people actively verify and contest AI visual-assistance errors.** Alharbi et al. (2024) conducted a qualitative study with 26 blind people and reported errors involving complex document layouts, diverse languages, and cultural artifacts, alongside participant strategies for verification and suggestions for contestable AI. This supports preserving an inspectable evidence trail and a human-review path; it does not test graph tutoring. [Original paper record and abstract](https://arxiv.org/abs/2408.06546); [ACM DOI](https://doi.org/10.1145/3663548.3675659).

5. **AI tutoring evidence is mixed and context-specific.** Bastani et al. (2025) experimentally studied roughly 1,000 high-school students using GPT-based math support. Their study reports improved practice-task performance with GPT access but worse later unaided exam performance for a basic GPT condition relative to no access; a tutor-oriented version mitigated that pattern. Use the paper only to motivate the distinction between answer delivery and learning support, and cite the study design/population. It is not evidence that AccessSTEM improves learning. [PNAS article](https://doi.org/10.1073/pnas.2422633122).

### Suggested compact source set

Use the first four references above in a short slide bibliography; add Bastani if the deck discusses learning support versus answer substitution. Desmos, Mathpix, and Seeing AI are product documentation, not peer-reviewed effectiveness studies. Cite them as product sources, not research evidence.

### How the literature can inform scripted scenarios

| Published observation | Scenario to show | What the prototype check measures |
|---|---|---|
| Spatial relationships matter when describing diagrams (Doore et al.). | Ask for a full walkthrough of axes, points and trend, then ask the same question at a brief depth. | Whether the tutor explains relationships in an explicit order and gives the reader control over detail. |
| Chart navigation and follow-up questions can work together (Gorniak et al.). | Ask for a detailed walkthrough while Quick summary remains selected. | Whether the immediate question can override the default format. |
| Users of AI visual assistance actively seek ways to verify errors (Alharbi et al.). | Ask whether a missing vertical-axis unit is meters. | Whether the tutor identifies the gap and names what would resolve it. |
| Answer access and later independent performance are different outcomes (Bastani et al.). | Request a direct answer with Hints only selected. | Whether the response preserves the result until the user changes the solution setting. |

These connections explain why the scripted interactions are informative. The project has measured reply behavior for the examples above. The cited participants and outcomes belong to the original studies. [V5 evaluation and reply evidence](evaluation/v5-test-report.md)

## 5. Comparison with existing tools (scope, not a winner claim)

| Tool / source | What its official documentation says it does | Relationship to this prototype | Safe comparison wording |
|---|---|---|---|
| **Desmos Graphing Calculator** ([accessibility page](https://www.desmos.com/accessibility?lang=en), [graph settings](https://help.desmos.com/hc/en-us/articles/4405296853517-Graph-Settings)) | Offers graph exploration with Audio Trace, keyboard access, screen-reader and Braille support, tactile-graphic export, large print, reverse contrast, and author-written dynamic alt text. | A mature graphing/calculation and graph-access tool; it lets learners construct and explore mathematical expressions. AccessSTEM focuses on explaining supplied high-school function facts through a conversation with selectable teaching modes and hints. | “Desmos provides powerful accessible graph exploration. Our prototype explores a complementary tutoring interaction around supplied function-graph facts.” Do not imply Desmos lacks chat or is inaccessible. Desmos publishes its own conformance report; this prototype has not established WCAG conformance. |
| **Mathpix OCR** ([official docs](https://docs.mathpix.com/guides/image-ocr)) | Extracts math, text, tables, chemistry diagrams, and document layout from images into structured formats such as Mathpix Markdown or LaTeX. | An image/document recognition pipeline; AccessSTEM's MVP accepts structured graph facts or text. The MVP does not perform image recognition. | “Mathpix can digitize STEM content from images. AccessSTEM currently starts after graph facts have been supplied; image recognition is future work.” Do not imply Mathpix interprets or tutors on every chart. |
| **Seeing AI** ([official app listing](https://www.seeingai.com/ios)) | Describes images and videos; its listing describes asking questions about an image after requesting a rich description. | A general visual-assistance app; AccessSTEM is an educationally scoped graph tutor with mode and hint behavior. | “Seeing AI provides general image-description assistance; our scope is guided learning about supplied function graphs.” Do not claim comparative accuracy or that Seeing AI cannot teach graphs. |
| **VizAbility (research prototype)** ([UIST 2024 paper](https://doi.org/10.1145/3654777.3676414)) | A research system combining keyboard chart navigation with LLM conversational chart queries using chart structure/data and user context. | Closest related research system; it addresses accessible data visualization broadly, whereas AccessSTEM targets high-school linear/quadratic function learning, adjustable instructional modes, hint pacing, and known/derived/unknown labels. | “We build on the research direction of conversational chart access and narrow the task to graph-based math instruction.” Do not claim first, unique, or more accurate without a systematic literature/product comparison. |

## 6. Slide-ready English copy with attribution cues

The wording below is intentionally conservative. Pair each slide with a visible source line or a numbered reference marker that resolves to the bibliography. Bracketed notes are production instructions, not spoken copy.

### Slide: The learning gap

> **A graph is more than a picture.** Students need to connect its axes, units, key points, and changing relationships. Prior STEM-accessibility research found that verbal descriptions can omit spatial relationships, while multisensory approaches can communicate diagram information through other channels.

**Source cue:** Doore et al. (2023), *Frontiers in Education*, DOI above. Keep the citation beside the statement. Avoid “blind students cannot access graphs” or claims about our own learners.

### Slide: One focused service

> **AccessSTEM AI is a conversational tutor for high-school linear and quadratic function graphs.** It explains supplied graph facts from overview to detail, adapts the response format to a learner's selected preference, and can guide with a hint instead of immediately giving a requested answer.

**Source cue:** This is a project-scope statement, supported by the app and prompt files—not an external literature claim. Show the real UI and identify the chart facts as teacher-review pending where applicable.

### Slide: Three design profiles

> **Three needs, one learner-controlled tutor:**
> - A learner who wants a step-by-step overview of axes, key points, and trends.
> - A learner who prefers a short summary and can ask a follow-up.
> - A teacher preparing a guided question or misconception check.
>
> These are design profiles used to test different response needs—not interviews, enrolled users, or evidence that a particular learner has a disability.

**Source cue:** The three-mode product design and WAICY's requirement for at least three meaningfully distinct profiles (guidebook p. 21). Let people choose a mode; do not infer learning needs from a disability label.

### Slide: What happens in one lesson

> - **Given:** the supplied equation and graph facts.
> - **Derived:** a conclusion that follows from those facts.
> - **Unknown:** a missing scale or unit the tutor cannot verify.
>
> The tutor can ask for the missing information instead of inventing it.

**Source cue:** Show the actual deployed response with the source labels visible. Use an example whose values have been checked by the team; disclose when a lesson is still pending teacher review.

### Slide: Iteration changed observable behavior

> **We tested prompts, found failures, and revised them.** In a matched synthetic pilot, V3 met our internal checklist threshold on 10 of 10 development cases, compared with 7 of 10 for Baseline. In a later live-site regression, the V4 checks passed on one-question teacher prompts (4/4) and the observed setting-label issue was absent in 6/6 checked replies.

**Small-print qualification (keep on the slide):** “Development scenarios; AI-assisted review; selected tests, not independent evaluation or user outcomes. V4 label correction combined prompt and display changes.”

**Source cue:** Project iteration log, sections 3–5. Do not headline this as a model accuracy percentage, statistically significant result, or learning gain. Prefer a before/after example paired with the counts.

### Slide: Related tools and our scope

> **Accessible graph exploration already exists.** Desmos offers keyboard, audio, screen-reader, Braille, and tactile-graphic features. Mathpix focuses on extracting STEM content from images. Seeing AI offers general image descriptions and follow-up questions. Research prototypes such as VizAbility explore conversational chart access. AccessSTEM focuses on a narrower step: guided teaching about supplied high-school function-graph facts.

**Source cue:** Link each product name to its official docs and cite Gorniak et al. for VizAbility. These tools have different purposes; this is a scope comparison, not a ranking or a claim that other tools lack capabilities.

### Slide: Limits and safeguards

> **A fluent answer can still be wrong.** The tutor depends on supplied graph facts, can misunderstand a request, and has not been validated with students or teachers. Our current work tests prompts and interface behavior with scripted scenarios; VoiceOver and real participant evaluation remain future work. We keep missing information visible and plan to add teacher review and independent testing.

**Source cue:** Alharbi et al. (2024) supports the general need to make AI errors verifiable; the project's own log establishes the specific project limits. Do not present the paper as validation of the product.

### Slide: Potential impact and next steps

> **Potential:** make it easier to ask follow-up questions about graph meaning and receive an explanation at a chosen level of detail.
>
> **Next:** have teachers review example graph facts; recruit blind and low-vision students and teachers for appropriately approved usability and learning studies; test screen-reader flows; then investigate image-to-graph extraction with explicit uncertainty checks.

**Source cue:** Mark all future work as planned. Do not say access, independence, achievement, or confidence has already improved. Separate intended benefit from measured results.

### Slide: Takeaway

> **We built and tested a focused graph-tutoring prototype—not a proven learning intervention.** Early synthetic tests helped us find and repair specific prompt and interface failures. The next important test is whether students and teachers find the tutor understandable, accessible, and useful in real learning situations.

**Source cue:** This conclusion matches the available evidence. Do not change “potential” into “impact achieved.”

## 7. AI use disclosure starter — verify with the team

The submission checklist says the current PDF draft does not include an AI-use statement and asks the team to prepare a separate disclosure and confirm the rules. The paragraph below is a **factual starter based on repository and prompt-test records**, not a completed student attestation. Before use, each student must review it, correct tools/roles/dates, confirm what work they personally performed, and confirm the organizer's disclosure requirements. Do not imply that AI did the students' learning or final acceptance decisions.

> **AI-use disclosure draft (team review required):** AI tools were used as development aids for programming assistance, prompt and test-case iteration, analysis of model replies, and drafting or editing parts of the written and presentation materials. The project uses the OpenAI API in its tutoring prototype. The recorded evaluation scenarios and final sample conversation were scripted tests, not sessions with actual student participants. The team is responsible for reviewing the content it submits. [List the specific tools and each team member's verified role here.]

**Do not submit this unchanged unless accurate.** Add named tools only after the team verifies them. Distinguish the AI service being evaluated (OpenAI model called by the app) from AI tools used during coding, testing, research, and writing. Follow any organizer-specific disclosure field or file format.

## 8. Preparation checklist for the slide maker and team

- Keep the deck in English and map slides to all ten guidebook sections; ensure the final one-PDF submission includes every required item, even if the oral presentation is shorter.
- Show three different **needs** and actual different responses, with profiles labelled as design/test personas rather than users.
- Use one compact matched Baseline/V3 comparison and one V3→V4 failure/retest. State scenario counts, model/settings if available, review method, and limitations on the same slide.
- Keep the live demo on the supplied, pending-review quadratic chart unless the graph facts receive teacher verification. Demonstrate one Full guide, a brief summary, and one hint-only request; show how missing units are handled.
- Show the [V5 chat history](https://accessstem-ai.vercel.app/waicy/chat-history) and the live prototype link. Attribute the nine scripted questions to browser automation and the replies to the deployed tutor. The guidebook says the conversation is between the entrant and the final assistant. A team-operated session is the most direct evidence for that wording.
- Include sources on the slide where claims appear and a complete recognized-style bibliography. The research and product sources above are direct links.
- Show risks, limits, and future research plainly. Say keyboard checks were recorded; say VoiceOver and user testing were not completed.
- Confirm each team member's name, grade, speaking role, picture consent, and contribution; the form says names may appear on certificates. Confirm the country/organizer registration route and category with the team.
- Verify the Drive folder naming and public reviewer access, open the chatbot and history link in a private browser, check the form's current ≤200-word description limit, submit before its stated deadline, and preserve the submission receipt. No submission is evidenced in this brief.

## 9. References (APA-style starting list)

### Competition sources

- World Artificial Intelligence Competition for Youth. (2026). *WAICY 2026 Guidebook* (October file, LLM Prompt Engineering Track, pp. 20–24). https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf
- World Artificial Intelligence Competition for Youth. (2026). *WAICY 2026 Rubrics: Large Language Models*. https://www.waicy.org/rubrics/
- World Artificial Intelligence Competition for Youth. (2026). *WAICY 2026 Project Submission*. https://www.waicy.org/2026-submission/

### Accessibility and AI research

- Alharbi, R., Lor, P., Herskovitz, J., Schoenebeck, S., & Brewer, R. (2024). Misfitting with AI: How blind people verify and contest AI errors. *Proceedings of the 26th International ACM SIGACCESS Conference on Computers and Accessibility*. https://doi.org/10.1145/3663548.3675659
- Doore, S. A., Dimmel, J., Kaplan, T. M., Guenther, B. A., & Giudice, N. A. (2023). Multimodality as universality: Designing inclusive accessibility to graphical information. *Frontiers in Education, 8*, 1071759. https://doi.org/10.3389/feduc.2023.1071759
- Gonzalez, R., Collins, J., Azenkot, S., & Bennett, C. (2024). Investigating use cases of AI-powered scene description applications for blind and low vision people. *Proceedings of the CHI Conference on Human Factors in Computing Systems*. https://doi.org/10.1145/3613904.3642211
- Gorniak, J., Kim, Y., Wei, D., & Kim, N. W. (2024). VizAbility: Enhancing chart accessibility with LLM-based conversational interaction. *Proceedings of the 37th Annual ACM Symposium on User Interface Software and Technology*. https://doi.org/10.1145/3654777.3676414
- Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, O., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. *Proceedings of the National Academy of Sciences, 122*(26), e2422633122. https://doi.org/10.1073/pnas.2422633122

### Official tool documentation

- Desmos Studio. (2026). *Accessibility at Desmos*. https://www.desmos.com/accessibility?lang=en
- Mathpix. (n.d.). *Process an image*. https://docs.mathpix.com/guides/image-ocr
- Microsoft. (n.d.). *Seeing AI* [App description]. https://www.seeingai.com/ios
