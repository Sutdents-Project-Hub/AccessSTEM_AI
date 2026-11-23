# English demo and submission guide

The local prototype has completed real OpenAI calls. The final public demo, reviewed conversation link, and official submission are pending. Use the [submission checklist](waicy-submission/submission-todo.md) for team details, file names, and permissions.

## Three-minute live demo

Start at the English home page. This is a rehearsal outline. Confirm the timing with the presenter and allow for variable model latency.

| Time | On screen | Suggested narration |
|---|---|---|
| 00:00–00:25 | Open the graph lesson and expand **Axes, units, and key points**. | “Reading a graph normally starts with the axes and the curve. Here I can read the key points and ask what they mean.” |
| 00:25–01:15 | On the same quadratic graph, ask “Give me an overview of the graph” in Full guide, Quick summary, and Teacher guide. | “Full guide explains the graph in order. Quick summary starts with the takeaway. Teacher guide drafts a lesson and three questions for review.” |
| 01:15–02:05 | Select **Paste a problem**. Enter `For the function y = (x - 3)^2 + 2, find its minimum value.` Select **Use this problem**, then **Hints only**. Ask “Give me one first hint without telling me the minimum value or its location.” | “The learner can decide when to see the solution. This first reply asks what the squared term can do.” |
| 02:05–02:40 | Show the saved Baseline and V3 outcomes for `mode-override`. | “The baseline revealed the minimum. Our first revision still exposed it in a detail and a claim. We changed the rule to cover every response field and made the switch to Full solution visible.” |
| 02:40–03:00 | Show the candidate lesson's review status and open the missing-unit evidence if time permits. | “The initial tests use controlled scenarios. A teacher still needs to review these lessons, and VoiceOver and learner testing are still open.” |

Use the [English captures and captions](assets/waicy-screenshots/WAICY-screenshot-index.md) or [download the screenshot set](assets/waicy-screenshots/AccessSTEM_AI-WAICY-screenshots-2026-11-23.zip) if an API failure interrupts the live rehearsal. Label them as previous browser captures. An evaluator still needs an accessible live chatbot URL.

## Final submission package

- One English PDF with the specific service, at least three different user needs, motivation, final conversation link, live chatbot link, design iterations, limitations, future work, conclusion, and references.
- A reviewed final conversation with at least ten real exchanged messages. The team's working target is up to ten full turns to give the interaction room to develop.
- The official description field accepts up to 200 words. Use the [English description draft](waicy-submission/project-description.txt).
- The [submission deck source](waicy-submission/deck-source/) and [scoring map](waicy-submission/scoring-map.md) contain the prepared English presentation. A shorter local PDF draft is available in the ignored evidence folder. The formal PDF needs the approved links and confirmed contributions.

Requirements and timing come from the [LLM track guidebook](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf#page=20) and [submission form](https://www.waicy.org/2026-submission/).

## Access checks

| Item | Status and acceptance |
|---|---|
| Live chatbot | Pending. Verify from a signed-out browser, on mobile and desktop, and with keyboard entry and actual AI replies. |
| Final conversation | Local six-turn synthetic evidence is archived in `evidence/raw/waicy-final-english-browser.md`. Review the final-version chat for privacy and verify that an unauthenticated reviewer can open it. |
| Anonymized iteration evidence | The repository contains the [method and excerpts](waicy-iteration-log.md). Full raw records remain local. |
| English PDF and Drive | Confirm team identifiers and contribution claims, enter the two verified links, export one PDF, and check that the shared folder and its contents open. |
| Submission | Retain the real confirmation once the team submits through its applicable channel. |

The official global deadline is **November 29, 2026 at 5:00 p.m. EST**, or **November 30 at 06:00 in Taiwan**. The team's internal target is the evening of November 29 in Taiwan. Teams already registered through a local organizer follow that organizer's process. [Official submission form](https://www.waicy.org/2026-submission/)

## Questions to rehearse

- **Where does the AI add value?** Explain the grounding, three teaching profiles, follow-ups, and controlled hint handoff.
- **What changed?** Show one actual failure, the specific prompt revision, and the retest.
- **Can the AI read uncertain units or coordinates?** Use the missing-evidence case to show how it asks for usable information.
- **Who tested it?** State the actual keyboard, automated, teacher, and participant coverage separately.
- **What did the student contribute?** Use the team's confirmed contributions and describe assistance accurately.

## Original Collage style brief

```text
Create a presentation in the 'Collage' theme, a cut-paper collage. Background: warm paper (#EFEBE3); ink text #2B2722. Typography: headlines in bold 'Bricolage Grotesque' with body copy in 'Work Sans' (both Google Fonts); each headline word sits on its own paper strip, rotated between -3 and 3 degrees, stacked with slight overlaps and staggered indents. Paper shapes: blocks in muted brights (red #E2574C, teal #2A9D8F, mustard #E9C46A, ink blue #264653) with torn edges drawn as jagged CSS clip-path polygons, never clean rectangles. Signature motifs: translucent white tape strips (about 84x22px, rotated near 40 degrees, 50% opacity) pinning pieces at corners; one halftone patch per slide made of small ink dots (radial-gradient, 11px grid, 22% opacity). Text on mustard is ink #2B2722, on every other color it is white. Body copy sits in ink on the paper background or on white torn sheets. Strictly avoid: gradients, drop shadows, clean rectangles for colored shapes, photographs, a fifth accent color, perfectly straight alignment.

Use this theme for my slides. Ask me what the presentation is about first, then apply the theme to every slide.
```
