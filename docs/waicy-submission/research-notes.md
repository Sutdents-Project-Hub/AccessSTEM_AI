# Research notes and source verification

> Checked on 23 November 2026. English is the submission language. Historical mixed-language tests remain labelled with their actual language and date; translating an excerpt does not create an English test.

## External claims used in the deck

| Slides | Claim and scope | Primary source checked | Verification and limits |
|---|---|---|---|
| 3 | At least 2.2 billion people have near or distance vision impairment worldwide | [WHO fact sheet, 10 February 2026](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment) | The current fact sheet supports this wording. This is not a count of blind students or the service's potential users. |
| 3 | Estimated 43.3 million blind people in 2020; projected 61.0 million in 2050 | [GBD 2019 collaborators, published paper held by the University of Melbourne](https://minerva-access.unimelb.edu.au/server/api/core/bitstreams/c82dc65f-6177-438b-a6ee-76013a92f4c3/content), [DOI](https://doi.org/10.1016/S2214-109X(20)30425-3) | Read the paper's summary. The 95% uncertainty intervals are 37.6–48.4 million and 52.9–69.3 million respectively. These are modelled estimates and a forecast, not a 2026 census. The paper uses a group author. |
| 3 | Spatial relationships need more than a serial description | [Doore et al. (2023)](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2023.1071759/full) | The article discusses the limits of literal descriptions for spatial information. This motivates an interface question; it does not establish AccessSTEM's effectiveness. |
| 3 | 95.9% of sampled home pages had automatically detected WCAG failures in February 2026 | [WebAIM Million 2026](https://webaim.org/projects/million/) | Read the methodology and conformance section. Sample: one million home pages, not complete websites. Replaces the deck's older 94.8% figure for 2025. Automated checks do not establish full conformance. |
| 4 | In a 20-participant study, multimodal touchscreen graphics improved information orientation over print | [Tennison et al., publisher page](https://journals.sagepub.com/doi/10.1177/0145482X231217496), [author-hosted published PDF](https://umaine.edu/vemi/wp-content/uploads/sites/220/2024/11/tennison-etal-2023-JVIB-Bridging-the-gap-of-graphical-information-accessibility.pdf) | Read the abstract and participant section: ages 13–21, high-school enrolment. No statistically significant difference in information extraction. Issue: 117(6), 453–466 (2023); publisher first-online date: 8 January 2024. Corrected author: Drews, P. M. |
| 4, 12, 27 | GPT Base practice grades +48%; GPT Tutor +127%; later unaided grades −17% for GPT Base relative to students without access | [Bastani et al. (2025), PNAS](https://www.pnas.org/doi/10.1073/pnas.2422633122) | Read the publisher abstract and significance statement. Nearly 1,000 high-school math students; GPT-4. These are relative grade changes in that experiment, not percentage points, AccessSTEM results or proof that our hints improve learning. The correction concerns an author affiliation. |
| 4, 27 | Verification barriers and compelled reliance are risks in model-generated chart descriptions | [Elavsky & Xiong Bearfield (2025)](https://arxiv.org/abs/2508.12192) | Author-submitted position paper; conceptual risk framing, not a prevalence or effectiveness estimate. Avoid implying that blind users can never verify a claim. |
| 29 | VizAbility combines chart navigation with LLM conversation | [Gorniak et al., author preprint](https://arxiv.org/html/2310.09611v3), [author's Boston College publication list](https://www.bc.edu/bc-web/schools/morrissey/departments/computer-science/people/faculty-directory/kim-nam-wook.html) | Read the abstract and checked title/authors. The author lists the paper at UIST 2024. ACM's DOI page returned 403 in this check; no participant count or performance percentage is used. |
| 4 | Complex images can have a short alternative and a long description | [W3C WAI Complex Images tutorial](https://www.w3.org/WAI/tutorials/images/complex/) | Official guidance reopened. The deck's static-description limitation is our design analysis, not a claim that W3C forbids adaptation. |
| 26, 28 | WCAG 2.2 AA is a target, not an achieved certification | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Current Recommendation reopened (12 December 2024). One automated scan and keyboard checks cannot establish WCAG conformance. |

## Claims removed or narrowed

- Removed the 547,000 US children statistic. Doore et al. cite it from Census material, but the underlying Census table was not independently retrieved in this check. It is replaced by a qualitative spatial-access point, not a new population estimate.
- Narrowed the touchscreen result to orientation and explicitly retained its null extraction result.
- Corrected the group author for the GBD paper and the name of P. Merlin Drews. The Tennison reference keeps its 2023 issue year and notes its 2024 online date.
- Replaced unsupported claims that only an LLM can answer unplanned questions and that every general chatbot behaves alike with statements about this prototype and its simple baseline.
- Changed “reviewed graph facts” to “supplied graph facts” where the prototype's pending teacher review made the former wording misleading. Source labels help trace a statement; they do not verify mathematical correctness by themselves.
- No Be My AI hallucination statistic or unverified participant feedback is used.

## Official competition sources

Checked the [WAICY 2026 page](https://www.waicy.org/waicy-2026/), [submission form](https://www.waicy.org/2026-submission/), [rubric](https://www.waicy.org/rubrics/) and the currently linked [October Guidebook](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf). The page also links a [September URL](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/09/WAICY-2026-Guidebook.pdf); do not infer an official revision date from the upload path alone.

The LLM requirements are on PDF pages 20–23. The seven rubric weights remain 25, 25, 10, 10, 10, 10 and 10. The deadline is 29 November 2026 at 17:00 Eastern; the form says EST. This is 30 November at 06:00 in Taiwan. Check registration through a country organizer before using the global form.

The general overview and AI Showcase instructions describe a three-minute presentation, three-minute demo, and four-minute Q&A. Confirm the actual LLM slot and timing with the organizer or invitation. Age-category and naming differences are recorded in [the submission checklist](submission-todo.md#d-official-source-differences-and-open-questions).

## Internal evidence index

| Deck content | Repository or local evidence |
|---|---|
| Historical final pilot: 40 real replies, prompts, parameters and timestamps; 9 Chinese scenarios + 1 English scenario across four versions | `evidence/raw/waicy-2026-11-23T05-56-58.032Z-MpBQBk/` (git-ignored) |
| First pilot: 36 replies; two V3 rewrites; model comparison | `evidence/raw/waicy-2026-11-23T05-37-25…` through `05-52-16…` |
| Per-cell scores, rationale and limitations for the historical 40 | `evidence/raw/waicy-closeout-pilot-grades.json` |
| English replication and two targeted revisions | [Iteration log and raw run index](../waicy-iteration-log.md#5-english-replication-and-two-revisions) |
| Historical six-turn English conversation with a synthetic learner | `evidence/raw/waicy-final-english-browser.md` |
| Prompt text | `web/src/server/agent/prompts.ts` |
| Evaluation runner and cases | `web/scripts/evaluate-waicy.mts`, `web/scripts/evaluation-cases.ts` |
| Screenshots and capture descriptions | `docs/assets/waicy-screenshots/` |

Run-folder timestamps are UTC. The deck converts them to Taipei time (UTC+8); neither the timeline nor the historical scores were recomputed here. Raw evidence remains private and git-ignored. The separately recorded English pilot and its two targeted revisions use their own raw outputs. The historical table remains the only batch with the full per-response pilot scores.
