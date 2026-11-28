# Editable deck source backup

Source of the 48-slide report: `project/deck.json`, `project/deck.css` and `project/slides/*.html`.

This snapshot reflects V4. Use the [V5 slide-maker handoff](../slide-maker-handoff.md) for the replacement links, reply excerpts, figures and verified claims before exporting the new PDF.

- **Team details are removed.** Member names, grades and portraits are replaced by `Student A–D` and generic tokens. The submitted PDF is kept outside this public repository.
- Images appear as `{{img:name}}` tokens. The renderer replaces each token with an uploaded asset or a local file before building.
- Fonts: Bricolage Grotesque and Work Sans from Google Fonts.
- Research notes: [research-notes.md](../research-notes.md). Submission checks: [submission-todo.md](../submission-todo.md).

## Image tokens

| Token | Content |
|---|---|
| `home`, `hint`, `lesson`, `prefs`, `sources`, `teacher`, `paste`, `pastereply`, `contrast`, `mobile`, `skiplink`, `focus` | Screenshots of the live site, 27 November 2026; copies are in [../assets/](../assets/) |
| `qr` | QR code for https://accessstem-ai.vercel.app |
| `student-a` … `student-d` | Member portraits, not stored here |

## Evidence

The 40-response pilot is historical: nine scenarios in Traditional Chinese and one in English across four prompt versions. Later runs (English replication, V4 regression and two live-site rounds) are indexed in the [iteration log](../../waicy-iteration-log.md).
