# Editable deck source backup

Local backup of the Claude Slides Artifact: `deck.json`, `deck.css`, and 39 `slides/*.html` files. The English text, existing slide order, Collage theme and team-input placeholders are preserved. No PDF was exported from this source.

- Editable online source: Claude Artifact “AccessSTEM AI – WAICY 2026 LLM Track”. It is private until explicitly shared; this backup is not a public judge link.
- Fonts: Bricolage Grotesque and Work Sans via Google Fonts. Local or offline rendering requires font access or installed copies; font availability was not changed here.
- Research and source corrections: [research-notes.md](../research-notes.md).
- Remaining submission work: [submission-todo.md](../submission-todo.md).

## Screenshot asset mapping

The Artifact `src` values below are the current uploads (24 Nov 2026) of the recaptured English screenshots. They are private Artifact asset routes, not repository-relative files and not public URLs.

| Slides | Original Artifact route | Repository asset | Relative path from `project/slides/` |
|---|---|---|---|
| 1 (`cover`), 12 (`tour`) | `/_blob/f48294ae25cc900f20e3230cd0266f5e` | `docs/assets/waicy-screenshots/01-english-workspace.png` | `../../../../assets/waicy-screenshots/01-english-workspace.png` |
| 13 (`hints`) | `/_blob/73e228958d82e9d0b23b85d343db646d` | `docs/assets/waicy-screenshots/05-hints-only.png` | `../../../../assets/waicy-screenshots/05-hints-only.png` |

The mapped local PNG files exist. No automatic fallback handler has been inserted: a plain browser and the Artifact renderer can use different document base URLs, so an untested relative fallback could break the editable source. To rebuild elsewhere, upload the mapped PNGs into that renderer and replace the asset routes in a copy, then inspect the result. A local source backup alone does not guarantee portable screenshot rendering.

If the repository screenshots are recaptured under the same filenames, the private Artifact blobs do **not** update automatically. Re-upload the new images and recheck the captions, quotes and evidence provenance before exporting. The file mapping identifies subject matter, not a claim that every future image has the same capture.

## Evidence preservation

The 40-response pilot is historical: nine scenarios in Traditional Chinese and one in English, run across four prompt versions. Its scores, UTC folder timestamps, Taipei conversions and synthetic-learner labels remain intact. Slide 22 (Failure 6) reports the separate English replication and two narrow retests. The raw runs and prompt fingerprints are indexed in the [iteration log](../../waicy-iteration-log.md).

Team names, personal inspiration, contributions, public chatbot URL, transcript URL and QR code remain explicit placeholders. Do not describe this source as a completed public submission.

## Source structure

Context statistics lead with international organisations and multi-country or national surveys (slides 3–4, 34). The evidence table is slide 34; references are slides 35–37 and are grouped by type. See [research-notes.md](../research-notes.md) for what was read on each primary page and what could not be retrieved.
