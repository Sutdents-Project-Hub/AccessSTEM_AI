# Submission checklist

> Deadline: 29 November 2026, 17:00 Eastern (the form says EST), equivalent to **30 November 2026, 06:00 in Taiwan**. Internal target: finish checks by the evening of 29 November in Taiwan.
> Red `[ … ]` placeholders in the deck still require the team. This is a preparation checklist; no upload, submission or publication is recorded here.

## A. Submission blockers

| # | Missing item | Location | Action needed |
|---|---|---|---|
| 1 | Public chatbot URL | Slides 1, 25 | Decide the platform, deploy `web/`, configure server-side `OPENAI_API_KEY`, and verify from a private window without a developer account. Confirm API budget and rate limits. |
| 2 | QR code | Slide 25 | Generate after the public URL is final. |
| 3 | Accessible final transcript link, at least ten messages | Slide 25 | Record a genuine final-version conversation, anonymize it, confirm sharing rights, and test the link signed out. See below. |
| 4 | Team, student names/grades, instructor | Slides 1, 30 | Use actual registration details; do not put private contact details in the public deck. |
| 5 | Registration category | Slide 1 and file/folder names | The form asks Elementary / Middle / High, while the LLM chapter says no separate age categories. Use confirmed registration details; ask the organizer if unclear. |
| 6 | Contribution table | Slide 30 | The team records actual student, instructor and tool contributions. |
| 7 | Students' inspiration story | Slide 5 | Add 2–3 sentences in the students' own words. |
| 8 | Single English PDF | Export | Inspect before submission. Guidebook format: `LLM_<Category>_AccessSTEMAI.pdf` inside `LLM_<Category>_AccessSTEMAI`. No new PDF was exported in this content update. |
| 9 | Shared submission folder and correct submission route | Google Drive / form | Ensure judges can view the folder. Confirm whether a country organizer already handles registration before submitting globally. Draft description: [project-description.txt](project-description.txt), below 200 words. |

### Final conversation link

The app does not store or share conversations; that is the current privacy design. Slides 22–24 use real replies from a **local synthetic-learner script**, not a real student, and a public transcript link is still missing.

1. After deployment, a team member should use the final build for at least ten exchanged messages (six or more turns is a useful margin). Include a hint, a simpler re-explanation, an explicit switch to a full solution and a missing-data question. Test the three modes in additional sessions if needed.
2. Preserve the actual prompts and replies in a document or PDF, remove identifying information, confirm public-sharing rights, and test the shared document without an account.
3. If the new session replaces the displayed conversation, update slides 22–24 and their provenance. Keep the original local evidence. Do not relabel simulated learners as real participants.

## B. Strongly recommended validation

- Ask a teacher to review the three built-in lessons. Only after documented review should slides 6, 26 and 28 change their pending status.
- Perform and record an actual VoiceOver flow. Keep untested accessibility claims pending; an automated check is insufficient for WCAG conformance.
- Add English cases held out from prompt tuning. The separately recorded English replication reused the existing scenario designs and kept the historical mixed-language pilot and scores intact.
- Obtain independent human ratings or a second rater, and repeat cells to measure variability.
- Include consented, anonymized learner or teacher feedback only if it actually occurs and sharing rights are clear.

## C. Final checks

- [ ] Public chatbot, transcript and Drive folder open in a private window.
- [ ] All red placeholders replaced with team-confirmed information.
- [ ] References on slides 32–33 still resolve; inspect source scope in [research-notes.md](research-notes.md).
- [ ] Run existing checks from `web/`: `pnpm lint`, `pnpm typecheck`, `pnpm build`; keep actual results. Slide 28 refers to historical passing records.
- [ ] Inspect the exported PDF page by page: fonts, screenshots, links, clipping and readability.
- [ ] Ensure `/_blob/` images survive export; source mapping is in [deck-source/README.md](deck-source/README.md).
- [ ] Recheck deadline, form fields and the latest linked Guidebook.
- [ ] Confirm LLM final-round timing with the organizer; do not apply AI Showcase timing by assumption.
- [ ] Save the submission confirmation after an authorized submission.

## D. Official source differences and open questions

Checked on 23 November 2026: [event page](https://www.waicy.org/waicy-2026/), [submission form](https://www.waicy.org/2026-submission/), [rubric](https://www.waicy.org/rubrics/), [currently linked October Guidebook](https://waicy-cdn.wholeren.cn/wp-content/uploads/2026/10/WAICY-2026-Guidebook-2.pdf).

| Topic | Observed difference | Handling |
|---|---|---|
| Time zone | Form: EST; event page and Guidebook: ET | At this November date, 17:00 Eastern is 06:00 the next day in Taiwan. |
| Naming | The form does not specify names; Guidebook PDF page 23 gives `Track_Category_ProjectName` and `LLM_Category_ProjectName.pdf` | Follow the LLM naming instructions with a confirmed category. |
| Track title | Rubric: Large Language Models; page/form: AI Large Language Model Track; Guidebook also uses LLM & AI Agent and LLM Prompt Engineering | Deck cover follows the event-page title. |
| Guidebook links | Event page links both September and October upload URLs | Use the October link currently presented as the main Guidebook. Upload paths alone do not prove revision dates or content differences. |
| Age/category | Event page: ages 6–18; LLM chapter: all levels welcome and no separate age categories; form still asks a group | Confirm eligibility and registration group with the organizer if needed. |
| Final-round timing | The overview and AI Showcase section describe a three-minute presentation, three-minute demo, and four-minute Q&A | Verify the LLM slot and timing with the organizer or invitation. |
| Registration route | Form says teams registered through official country/regional organizers need not complete it | Confirm the team's route before any submission. |
