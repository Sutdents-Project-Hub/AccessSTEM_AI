# UI/UX and Accessibility Design

> Status: The local MVP implements semantic controls, English/Traditional Chinese switching, text descriptions, and a high-contrast toggle. VoiceOver and real-user validation remain outstanding.

## Core principle

**Help people understand a chart, not just hear the words on an image.** The core interface is a simple, predictable learning conversation that supports repeated questions. Main tasks must not depend on vision, a mouse, dragging, gestures, or automatic speech. Let users choose their own needs; do not infer a fixed preference from identity.

## Learning flow and reading order

### A. Getting started (single-page entry)

1. “Understand Function Charts” is the page's primary heading. The page header can link to materials or the AI conversation.
2. Use native radio controls to switch between “Built-in chart” and “Paste a problem.” Built-in charts show three self-created examples and their review status.
3. After a problem is pasted, select “Use this problem.” Before confirmation, show the pending-step prompt. After confirmation, enable questions and label the problem as not teacher-reviewed.
4. In the assistant area, use `<fieldset><legend>Learning style</legend>` for the three preferences. Explanation depth, solution approach, and math level can also be adjusted.

### B. Chart walkthrough and chat (main view)

1. Current chart name, review status, source, and unknown items.
2. Optional three-layer sections: “Quick summary,” “Axes and markers,” and “Math concepts and trends.”
3. Conversation history using `<ol>` or clearly labeled message roles such as “You” and “AccessSTEM.”
4. Common actions such as “Make it simpler,” “Start with the axes,” “Give me a hint,” and “Let me try” use real `<button>` elements.
5. Keep the input field and “Send” control easy to find. Make the pending-request state perceivable.
6. When a response arrives, offer “Read latest answer” and let the user choose when to move. Show recognized source references with readable names. If a next question is offered, “Respond to this question” may return focus to the question field; the user adds details and submits manually.
7. The reply heading identifies the learning mode chosen for that turn. Learner replies at step-by-step or in-depth settings open the first explanation section. Brief replies lead with the summary and keep supporting sections collapsed. Section toggles use native `details` controls.

### C. Educator support (same web app; no separate dashboard)

1. Specify grade, unit, learning objective, and reading depth.
2. Generate a walkthrough draft, three guiding questions, common misconceptions, and items to confirm. Clearly mark all output as **not yet teacher-reviewed**.
3. Allow text to be copied for editing; do not label an AI draft as meeting formal teaching standards.

## Screen-reader-first information design

- Give the full description in this order: **chart type → axis labels and units → known points and intervals → trends and relationships → uncertainty**.
- Add coordinates or the relevant `x` interval to “the right half of the curve”; do not say only “look right” or “the purple line.”
- Images need a short `alt` and an accessible **full text description or data table**. Do not hide long descriptions in hover-only tooltips.
- Provide a readable verbal form for equations, for example, “y equals the square of x minus 2, then plus 1.” Test MathML or other equation technologies after adoption.
- Use consistent headings and labels for chart text, user input, AI derivations, and unknown information. Do not distinguish sources by color or icons alone.
- For long responses, start with a one-sentence summary and allow optional expansion by layer, respecting the user's reading pace.

## Required keyboard and dynamic-chat tests

| ID | Test | Expected result |
|---|---|---|
| AX-01 | Use only Tab / Shift+Tab from the home page | Reach modes, examples, input, and send without a keyboard trap |
| AX-02 | Navigate the page with VoiceOver | Headings, control labels, status, and current chart are announced in a sensible order |
| AX-03 | Submit a question and wait | A quiet “responding” state is available; each token is not sent to a live region |
| AX-04 | AI response arrives | Announce one concise status, keep focus in a sensible location, and let the user navigate to the full response |
| AX-05 | Required form data is missing | Announce a specific error and allow return to the invalid control |
| AX-06 | Switch brief/full or hint/full answer | Preference and option labels are understandable; switching does not lose the current chart |
| AX-07 | Zoom to 200% and 400% | Main content remains available, text does not overlap, and narrow windows avoid unnecessary two-way scrolling |
| AX-08 | Test `prefers-reduced-motion`, contrast, and high-contrast mode | Do not force motion; keep focus visible and do not rely on color to communicate a conclusion |
| AX-09 | Disable image loading | Equivalent text and usable questions remain available |
| AX-10 | External API fails | Show a clear readable message, preserve current input, and keep retry available |

## Interaction details

- Prefer HTML `button`, `input`, `label`, and `fieldset` over simulated `div` controls.
- Where needed, associate error text with `aria-describedby`; keep a visible focus outline and do not use placeholder text as the only label.
- Use `aria-live="polite"` for **concise** status. Evaluate long streamed answers for screen-reader disruption; consider announcing “Answer complete” instead of each token.
- Avoid autoplay, forced scrolling to the bottom, sudden focus jumps to AI messages, and uninterruptible loading.
- Large text, line spacing, contrast, and sections should remain usable with browser zoom. Dark/light mode is not a P0 requirement.
- Low-vision mode must still offer the full version; blind mode must still offer brief key points.
- Mark educator-generated material “AI draft; review before use.”

## Design system

The site uses a paper-cut style aligned with the [WAICY presentation style](demo-and-submission.md#original-collage-style-brief). Paper background: `#EFEBE3`; body text: `#2B2722`. Mustard `#E9C46A` marks title paper and selected materials; ink blue `#264653` is used for curves, primary buttons, and keyboard focus; teal `#2A9D8F` is title backing; coral `#E2574C` outlines key chart points. Paper edges, tape, and halftone dots stay around the text and illustrations. High-contrast mode uses a white background, dark text, and clearer control boundaries.

On desktop, materials and the assistant appear side by side; narrow windows use one column. Equation readings, short descriptions, trends, and coordinate tables can be read independently. Material selection has native state and text labels; interaction controls and focus follow a consistent shape. The design draws on keyboard, form-label, focus, and touch guidance from [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) and Damir Sokolovsky's visual review approach, [unslop](https://github.com/heydamir/unslop).

Latin text uses [Bricolage Grotesque](https://github.com/ateliertriay/bricolage) and [Work Sans](https://github.com/weiweihuanghuang/Work-Sans), supplied by Fontsource and licensed under SIL Open Font License 1.1. Traditional Chinese falls back to system CJK fonts.

## Local verification

Playwright with Chrome verified keyboard chart switching, preference selection, coordinate table expansion, submission, and retry. A test substitute checked two-turn conversation and focus movement for “Read latest answer.” At 320 CSS pixels there was no horizontal overflow. The built-in chart view passed axe automated WCAG 2.0/2.1 A and AA checks.

Text-to-paper contrast is 12.47:1, ink on mustard is 8.88:1, white text on the primary ink-blue button is 10.08:1, and the ink-blue focus outline against paper is 8.48:1. Final Chrome checks also passed direct English entry, subtree language tagging, keyboard switching, a real custom-problem prompt, and response source/focus navigation. See the [evaluation plan](evaluation-plan.md). VoiceOver and real-user acceptance remain outstanding.

The English-first production build was checked again in Chrome. The first response to `/` had English document language and content with JavaScript disabled. The Traditional Chinese URL marked its workspace subtree correctly. The language for the document switches after hydration, and the preference survives a reload of its URL. At 320 CSS px the high-contrast screen did not overflow after expanding the graph notes. Selected automated axe rules reported zero violations on that screen. The [mobile capture](assets/waicy-screenshots/08-mobile-high-contrast.png) uses a 390 CSS px Chrome viewport.

On the public V5 site on 28 November, Chrome keyboard checks reached the skip link, moved focus to main, selected a mode with arrow keys and moved to the latest AI reply. High contrast with the graph coordinate table expanded fit a 320 CSS px viewport. The [V5 captures and method](waicy-submission/slide-maker-handoff.md#screenshots-for-slides-14-19-and-20) cover those checks.

## Accessibility target and limitations

WCAG 2.2 AA is the **design and testing target**. The design references W3C WAI [Complex Images](https://www.w3.org/WAI/tutorials/images/complex/) guidance on paired short and long descriptions. Implementation must retain at least a VoiceOver operation recording or reproducible test steps, an issue list, and a fix record. Without feedback from real users with visual impairments, **state clearly that only assistive-technology testing was done; do not claim real-user validation**.
