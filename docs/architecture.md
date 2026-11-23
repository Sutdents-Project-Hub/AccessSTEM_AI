# AccessSTEM AI Architecture

The application uses one `web/` Next.js App Router component. The browser handles learning materials and the learning flow; Route Handlers validate requests, resolve trusted chart data, and call OpenAI. A database, sign-in, image upload, and voice features are deferred.

## Main files

| Path | Responsibility |
|---|---|
| `web/src/app/page.tsx` | Learning room entry point |
| `web/src/components/` | Materials, Canvas charts and equivalent text, learning preferences, and chat |
| `web/src/lib/charts.ts` | Built-in candidate materials and lookup |
| `web/src/lib/chat-contract.ts` | Zod request and response contracts and length limits |
| `web/src/app/api/chat/route.ts` | Source and content validation, request limits, and safe errors |
| `web/src/server/agent/` | OpenAI SDK, teaching instructions, and structured responses |

## Data flow

1. The user selects a chart or confirms custom text. Preferences remain on the current page.
2. The browser sends a material ID or custom description, preferences, recent turns, and the current question. Changing the chart starts a new conversation.
3. The server validates the data, looks up charts in its own catalog, and marks sources that still need review.
4. The OpenAI Responses API uses fixed teaching instructions, treats materials and conversation content as user data, and returns Structured Outputs.
5. The server validates the response shape and preserves the pending-review status. The browser presents the summary, details, evidence, and comprehension question. If the call fails, the user can retry and still read the material.

## Runtime responsibilities

The initial page language is English. `/?lang=en` selects English; `/?lang=zh-Hant` selects Traditional Chinese, and an in-page language toggle is available. `/api/chat` requires Node.js and a valid server-side OpenAI credential. In-process request limits apply per instance; before public deployment, Hosting must provide appropriate cross-instance cost controls. See [Data contracts](api-and-data-contracts.md), [External integrations](integrations.md), and [Security and privacy](security-and-privacy.md).
