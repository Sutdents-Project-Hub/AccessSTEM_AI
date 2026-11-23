# Editable deck source backup

Local backup of the Claude Slides Artifact: `deck.json`, `deck.css`, and 36 `slides/*.html` files. The English text, existing slide order, Collage theme and team-input placeholders are preserved. No new PDF was rendered or published in this update.

- Editable online source: Claude Artifact “AccessSTEM AI – WAICY 2026 LLM Track”. It is private until explicitly shared; this backup is not a public judge link.
- Fonts: Bricolage Grotesque and Work Sans via Google Fonts. Local or offline rendering requires font access or installed copies; font availability was not changed here.
- Research and source corrections: [research-notes.md](../research-notes.md).
- Remaining submission work: [submission-todo.md](../submission-todo.md).

## Screenshot asset mapping

The original Artifact `src` values are preserved for compatibility. They are private Artifact asset routes, not repository-relative files and not public URLs.

| Slides | Original Artifact route | Repository asset | Relative path from `project/slides/` |
|---|---|---|---|
| 1 (`cover`), 11 (`tour`) | `/_blob/5e47f5a4fd9ad52049437ad5bab16acb` | `docs/assets/waicy-screenshots/01-english-workspace.png` | `../../../../assets/waicy-screenshots/01-english-workspace.png` |
| 12 (`hints`) | `/_blob/ba3ed19da408caffc4087e3239a36cea` | `docs/assets/waicy-screenshots/05-hints-only.png` | `../../../../assets/waicy-screenshots/05-hints-only.png` |

The mapped local PNG files exist. No automatic fallback handler has been inserted: a plain browser and the Artifact renderer can use different document base URLs, so an untested relative fallback could break the editable source. To rebuild elsewhere, upload the mapped PNGs into that renderer and replace the asset routes in a copy, then inspect the result. A local source backup alone does not guarantee portable screenshot rendering.

If the repository screenshots are recaptured under the same filenames, the private Artifact blobs do **not** update automatically. Re-upload the new images and recheck the captions, quotes and evidence provenance before exporting. The file mapping identifies subject matter, not a claim that every future image has the same capture.

## Evidence preservation

The 40-response pilot is historical: nine scenarios in Traditional Chinese and one in English, run across four prompt versions. Its scores, UTC folder timestamps, Taipei conversions and synthetic-learner labels remain intact. Appendix C reports the separate English replication and two narrow retests. The raw runs and prompt fingerprints are indexed in the [iteration log](../../waicy-iteration-log.md).

Team names, personal inspiration, contributions, public chatbot URL, transcript URL and QR code remain explicit placeholders. Do not describe this source as a completed public submission.
