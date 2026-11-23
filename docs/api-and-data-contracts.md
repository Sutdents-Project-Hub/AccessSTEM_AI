# API and Data Contracts | ChartFacts, Profile, and Chat

> This document describes the current MVP contract. The POST route uses TypeScript and Zod validation. Contract changes must also be reflected in `architecture.md`, `agent-design.md`, tests, and `web/README.md`.

## 1. Trusted chart facts (ChartFacts)

Every built-in chart needs a traceable source and human review record. A chart image is supplementary; it must have equivalent text data such as a long description, table, or formula.

```json
{
  "id": "quadratic-vertex-demo-01",
  "version": "1.0",
  "title": "Quadratic Function and Vertex",
  "topic": "quadratic",
  "source": {
    "kind": "unknown",
    "title": "Self-created function chart for teaching (pending human review)",
    "url": null,
    "reviewer": "Pending teacher review",
    "reviewedAt": null
  },
  "facts": {
    "formula": "y = (x - 2)^2 + 1",
    "xAxis": {"label": "x", "unit": null},
    "yAxis": {"label": "y", "unit": null},
    "keyPoints": [{"name": "vertex", "x": 2, "y": 1}],
    "trends": ["The parabola opens upward and reaches its minimum y-value of 1 at x=2"]
  },
  "unknowns": ["Physical units not provided in the problem"],
  "shortDescription": "An upward-opening quadratic function with its vertex at (2,1).",
  "longDescription": "The horizontal axis is x and the vertical axis is y. From left to right, the curve descends to (2,1) and then rises. The vertex is its lowest point."
}
```

**This is a data-format example only; it has not been reviewed by a teacher.** The system may label data `curated_verified` only when `reviewedAt` and `reviewer` have valid evidence. The implementation must not trust client-supplied `source.kind`, `reviewedAt`, or `verified` claims.

## 2. Source trust and authority

| Value | When it may be used | How the AI may describe it |
|---|---|---|
| `curated_verified` | Built into the server and manually reviewed | “Based on the reviewed example” |
| `teacher_reviewed` | Traceable permission and a review workflow exist (not in P0) | “Based on teacher-reviewed data” |
| `user_provided` | Pasted, manually entered, or OCR-draft material | “Based on the material you provided”; ask about unknowns |
| `unknown` | Unreadable, unclear, or contradictory source | “This cannot currently be confirmed”; do not guess |

The client may send only `chartId` or `userDescription`. The server resolves trusted sources; a request field such as `verified: true` cannot establish trust.

## 3. Learning preferences (not medical or disability diagnoses)

```typescript
type LearnerProfile = {
  profile: "learner-full" | "learner-brief" | "educator";
  readingDepth: "brief" | "step-by-step" | "deep";
  pedagogyMode: "hint" | "guided" | "full";
  mathLevel: "beginner" | "familiar";
};
```

The profile represents a user-selected **output style**. The system does not need to store full name, school, diagnosis records, or birth date.

## 4. The only required API: `POST /api/chat`

### Request (example)

```json
{
  "sessionId": "c60db851-7d90-45d1-89e0-57743031dbb5",
  "chartId": "quadratic-vertex-demo-01",
  "userDescription": null,
  "message": "Why is the vertex the lowest point? Give me a hint first.",
  "language": "en",
  "history": [
    {"role": "user", "content": "What is the main idea of this chart?"},
    {"role": "assistant", "content": "Based on the known formula, this is an upward-opening parabola."}
  ],
  "preferences": {
    "profile": "learner-full",
    "readingDepth": "step-by-step",
    "pedagogyMode": "hint",
    "mathLevel": "beginner"
  }
}
```

The server checks that `chartId` is valid; `history` contains only user/assistant roles; each item and the total are within length limits; `message` is non-empty; and `userDescription` is not treated as a trusted resource. `sessionId` must be a UUID and represents only the current conversation. The request body is limited to 96,000 bytes; the question to 2,000 characters; the material description to 6,000 characters; and history to 12 entries of at most 4,000 characters each. The combined question, material description, and history are limited to 20,000 characters. Errors return `requestId`, `status`, `code`, and `message`. Optional `language` is `zh-Hant` or `en`. `nextQuestion` and `sourceRef` in the answer may be null.

### Response (example)

```json
{
  "requestId": "opaque-request-id",
  "status": "ok",
  "answer": {
    "summary": "Try thinking about whether a square can be less than zero.",
    "sections": [{"heading": "Hint", "text": "The minimum value of (x-2)^2 is 0."}],
    "claims": [
      {"kind": "given", "text": "The function is y=(x-2)^2+1.", "sourceRef": "formula"},
      {"kind": "derived", "text": "A square cannot be less than 0.", "sourceRef": "formula"}
    ],
    "nextQuestion": "What is y when x=2?",
    "needsHumanVerification": false
  }
}
```

**This response is a field example, not a real AI test output.** If a claim depends on unreviewed material, `needsHumanVerification` must not be set to false without justification. Validate model output against the schema. Check source IDs against the chart type and return null for unrecognized references. Supported IDs include `formula`, `x-axis`, `y-axis`, `key-points`, `trends`, `missing-data`, `user-description`, and `question`. A source label does not mean the mathematical claim has been verified.

## 5. HTTP errors and UI behavior

| HTTP | Type | User-facing message | Behavior |
|---|---|---|---|
| 400 | Invalid data, oversized message, or missing problem | “This problem is incomplete. Choose an example or add a description.” | Keep input; do not send a meaningless request |
| 413 | Image or text exceeds limit (if image support is added) | “The material is too large. Reduce it and try again.” | Do not save rejected material |
| 403 | Web request origin does not match | “Submit your question from the AccessSTEM AI page.” | Return to the learning room |
| 429 | Rate or quota limit | “There are too many requests right now. Try again later.” | Show the limit; never fake success |
| 502/503 | LLM provider failure | “An AI response is temporarily unavailable. You can still read the known chart data.” | Keep the problem and history; allow retry |
| 504 | Timeout | “This response timed out. No reliable answer was received.” | Allow retry and avoid duplicate billing |
| 500 | Other server error | “The service encountered a problem. Try again later.” | Do not expose keys, stack traces, or personal data |

Do not send provider-internal details from `error.message` to the user. All errors need text that screen readers can understand; color must not be the only signal.

## 6. Evaluation data format (de-identified test evidence only)

```json
{
  "caseId": "AS-001",
  "variant": "V2",
  "model": "to be recorded",
  "promptVersion": "to be recorded",
  "chartId": "quadratic-vertex-demo-01",
  "profile": "learner-full",
  "input": "Describe it starting with the axes.",
  "rawResponse": "Fill in after the real test; do not prewrite an ideal answer.",
  "scores": {"grounding": null, "personalization": null, "pedagogy": null, "uncertainty": null, "accessibility": null},
  "reviewer": "to be recorded",
  "reviewedAt": null,
  "notes": "pending test"
}
```

Do not put real names, conversations without publication consent, or photos in version control. Separately de-identify the final public conversation record and confirm permission before publication.

## 7. Contract change policy

Version data contracts. When changing UI, data models, API, Prompts, or test criteria, check the acceptance cases and keep schemas, docs, and tests in sync. Splitting out a backend or adding a database or image storage requires a new architecture and privacy decision; do not implement it as part of this scaffold.
