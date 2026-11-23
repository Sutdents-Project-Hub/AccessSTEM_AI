# Security, Student Privacy, and AI Risk Boundaries

> Status: **Input validation, server-side key handling, length limits, and error handling are implemented locally.** Security acceptance for a public deployment remains outstanding. Students are the primary audience; text and chart materials may contain identifying information even without accounts.

## Data minimization

- P0 does **not require** a name, date of birth, student ID, school, address, vision diagnosis, medical information, or guardian details.
- “Blind,” “low vision,” and “educator” are **output preference templates**. Prefer describing them in the UI as learning needs; do not create a permanent medical or disability profile.
- Send the LLM only the ChartFacts, user question, recent turns, and preferences needed for the current teaching turn. There is no need to send a full textbook or original application data.
- P0 conversations remain in the browser only during use. If users export data, clearly tell them about risks on the device that receives the file. Do not automatically preserve conversations on public devices.
- Never put user chats, photos, student IDs, or diagnoses in console output, third-party analytics, error tracking, or GitHub issues.
- Before going public, review terms of service and the LLM provider's data use and retention policies. Do not claim the provider stores no data without evidence.

## Server-only keys and boundaries

- `OPENAI_API_KEY` belongs only in `web/.env.local` or a deployment platform secret. **Never use a `NEXT_PUBLIC_` prefix** or return it to the browser.
- `.env.example` may contain only empty values or safe placeholders. Never paste a real key into chat, logs, demo video, or a PR, including during testing.
- Route Handler code on the server mediates all external AI requests and performs input validation, length and rate limits, timeout handling, and quota management.
- Never treat client-provided `verified`, `role=system`, or `source=teacher` as authority. The server must look up trusted ChartFacts by ID.
- Prompt injection: treat materials, pasted text, image OCR, and user chat as untrusted data. Do not follow embedded instructions such as “ignore safety rules” or “output the key.”
- Validate provider responses against the schema and basic fact rules. Show a failure for invalid formats; never silently fabricate a successful response.
- Protect public demos from abuse with rate, length, and turn limits, cost monitoring, and error handling; disable API service when needed.

## Learning and educational ethics

- Mark unreadable values, missing units, and conclusions guessed from user text as needing confirmation; do not present them as chart evidence.
- Label educator materials **AI draft; teacher review required**. The model cannot certify that material fully meets accessibility standards.
- Do not claim improved learning outcomes for students with visual impairments. Describe observed results and limitations only after a suitable real-user study.
- Do not treat blind or low-vision learners as homogeneous. Let each user adjust explanation depth and teaching style.
- A normal LLM response does not mean it can never make a math error. Compare teaching tests against a human-reviewed fact standard.

## Consent for real participants and minors

- If students or people with visual impairments participate, explain the purpose, data use, audio/video recording, and publication scope in advance. Obtain appropriate consent according to school and guardian requirements.
- Without real participation by people with visual impairments, reports may say VoiceOver or keyboard tests were completed, but must not claim a “user test with students with visual impairments.”
- De-identify public conversation screenshots, audio, and real Q&A; confirm what may be shared. Without permission, use a fictional research scenario with invented names instead of real participant evidence.
- Do not store raw interview recordings, real student lists, phone numbers, or identifying data in Git.

## Publication workflow for public evidence

1. Select the final model's actual response from the raw test record without changing context in a way that alters its meaning.
2. Remove or mask schools, names, family details, photo locations, credentials, private learning materials, and IDs that could identify someone.
3. Confirm source-material publication rights and the scope of participant/guardian consent.
4. Have the student or advisor verify that the public version matches the raw record; document any de-identification edits.
5. Publish to a read-only link and check permissions in an incognito window.
6. Provide a removal path. If deletion policy or retention period is undecided, **do not promise permanent retention or an immediate deletion SLA**.

## Security tests and gaps

- Submit material containing special instructions; it must not become a system instruction.
- Send `verified: true` from the frontend; the server must not treat it as teacher review.
- Provider 429, timeout, or invalid JSON; do not return keys, stack traces, or a fake empty result.
- Long messages, invalid roles, changed session IDs, and repeated anonymous submissions; errors should be predictable.
- Operate the public demo in an incognito window; do not expose another student's private conversation.
- If image upload is added, design file size/MIME checks, temporary-file deletion, and EXIF/private-information protection first. OCR output must not automatically become verified fact.

Local rate and concurrency limits are per service process. Before public use, confirm an overall spending cap, cross-instance limits, and OpenAI retention policy. The local Provider has returned real responses. Public environment and complete adversarial cases remain unverified.
