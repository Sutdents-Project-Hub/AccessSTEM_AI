# WAICY 2026 rubric map — 48-slide deck

> Slide numbers follow [deck.json](deck-source/project/deck.json). Based on the [official rubric](https://www.waicy.org/rubrics/) checked on 23 November 2026 and the LLM pages of the October Guidebook rechecked on 27 November. This is a coverage review, not a predicted score.

This map describes the 48-slide V4 snapshot. The [V5 handoff](slide-maker-handoff.md) contains the replacement material, and the [V5 test report](evaluation/v5-test-report.md) records the new runs.

## Ten required content areas

| # | Requirement | Slides | Status |
|---|---|---|---|
| 1 | Specific AI service | 9–12, 16–20 | Present, with live-site operation screenshots |
| 2 | At least three user profiles | 13–15 | Present; design personas with real replies for each |
| 3 | Motivation | 5–8 | Present |
| 4 | Chat-history link, at least ten messages | 33–35, 36 | [14-message transcript](final-chat-transcript.md) from a scripted test session |
| 5 | Live chatbot link | 1, 36 | https://accessstem-ai.vercel.app with QR code |
| 6 | Iterative design | 21–32, 47–48 | Eight failures, fixes and retests, ending with V4 on the live site |
| 7 | Limitations | 37–39 | Present |
| 8 | Future development | 40 | Present, labelled planned |
| 9 | Conclusion | 42 | Present |
| 10 | References | 43–46 | Present; recheck recorded in [research notes](research-notes.md) |

## Seven scoring criteria

| Criterion | Points | Slides | Evidence | Open risk |
|---|---:|---|---|---|
| Specific AI Service | 25 | 9–20 | One narrow domain, advisor qualities, architecture, three modes, operation walkthrough | Full guide and Quick summary differ modestly on a simple graph |
| Iterative Development | 25 | 21–32 | Baseline–V4, scored pilot, English replication, live before/after table | No held-out cases or independent scoring |
| Motivation & Problem Statement | 10 | 5–8 | International surveys and studies, three design rules | No interviews with users |
| Limitations & Considerations | 10 | 37–39 | Accuracy, review status, ethics, verified/not verified ledger | Teacher review and screen-reader tests not performed |
| Future Development & Clear Reference | 10 | 40, 43–46 | Steps mapped to limitations; 20 references | Recheck links on submission day |
| Presentation & Communication | 10 | All, map on 4 | Requirement map, screenshots, charts, consistent theme | 48 pages is long; rehearse a short path |
| Originality & Creativity | 10 | 10, 41 | Evidence labels, hint policy, rate rule, preferences without identity | — |

## Evidence boundaries disclosed in the deck

- Scenarios are scripted; no learner, teacher or blind or low-vision participant study.
- Scores come from a single AI-assisted review pass with partial blinding, with no independent human rating; V3 was tuned on the scored scenarios.
- The final conversation was run through the public site with browser automation (recorded in the transcript).
- V4 was checked on targeted cases; the ten-scenario suite was not rerun on it.
- No VoiceOver test and no WCAG 2.2 AA conformance claim.
- The PDF carries no statement of AI assistance or of who operated the tests; the team provides that in a separate document.
