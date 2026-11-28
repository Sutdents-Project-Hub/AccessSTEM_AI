# Editable deck source backup

Source of the 53-slide V5 report dated 28 November 2026: `project/deck.json`, `project/deck.css` and `project/slides/*.html`.

- The [53-page PDF archive](../../LLM_High_AccessSTEMAI.anonymized.pdf) uses `Student A–D` labels and omits individual grades and portraits. This source uses generic placeholders for grades and portraits. The team copy is kept privately.
- Images appear as `{{img:name}}` tokens. The renderer replaces each token with an uploaded asset or a local file before building.
- Fonts: Bricolage Grotesque and Work Sans from Google Fonts.
- Research notes: [research-notes.md](../research-notes.md). Coverage: [scoring-map.md](../scoring-map.md). Submission checks: [submission-todo.md](../submission-todo.md).

## Image tokens

| Token | Content |
|---|---|
| `home`, `hint`, `lesson`, `prefs`, `sources`, `paste`, `pastereply` | Live-site screenshots, 27 November 2026, in [../assets/](../assets/) |
| `v5contrast`, `v5reflow`, `v5skip`, `v5focus` | Crops of the 28 November V5 captures, in [../assets/](../assets/) |
| `qr` | QR code for https://accessstem-ai.vercel.app |
| `student-a` … `student-d` | Member portraits, not stored here |
