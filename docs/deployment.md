# Public Demo Deployment Plan (Not Deployed)

> Current status: `planned`. **No hosting provider has been selected, no domain acquired, no deployment performed, no public URL verified, and no OpenAI key configured in a deployment environment.** This document does not invent ports, health checks, or commands.

## Demo requirements

1. External judges can open the service from an unfamiliar device and incognito window at `/?lang=en` and use real LLM responses (confirm with the organizer first if access restrictions apply).
2. The AI provider key is stored securely on the server; the frontend exposes neither the key nor a private API.
3. Support at least two reviewed charts, three teaching preferences, follow-up questions, and clear errors.
4. Provide a separate **read-only, anonymized, genuine final-version** conversation record link.
5. Make text usable with a screen reader; a video-only page is not an operable chatbot.
6. Set traffic and API quota limits and give users clear messages when service fails.
7. Keep the deployed Git commit, Prompt version, and model ID traceable. Do not silently use a different Prompt in different environments.

## Platform candidates (**options only; no platform selected**)

- **Next.js-compatible platform:** Choose a service that can run Server Route Handlers and manage secrets, such as Vercel or another compatible Node.js host. Test AI API connectivity, region, cost, and timeout.
- **Coolify (only if explicitly selected later):** The `web/` component is the only one with a deployment lifecycle. Use a standalone Dockerfile Application with base directory `web/`. Verify Node, startup command, port, health check, domain, environment secrets, logs, and rollback in the actual environment; do not reuse another project's Dockerfile.
- No PostgreSQL, S3, or Redis is currently being created, and no persistent data needs a migration.

## Local Compose and production boundary

This project currently has **no Compose file**. If a root `compose.yaml` is later added for local integration, set top-level `name: accessstem_ai`, use service keys such as `web` to identify responsibilities, and avoid unnecessary `container_name`. Root Compose is for **local integration** and must not be used directly as the Coolify production entry point. A production Compose exception requires explicit approval plus a plan for services, secrets, volumes, backups, and rollback.

## Facts to record before launch (fill only after implementation)

```text
Platform:
Owner:
Repository / commit:
Base directory: web/
Build/runtime commands (tested in the real environment):
Node / pnpm / Next versions:
Entry and port / protocol:
Health check (success and failure tested):
Public URL:
Server environment variable names:
Provider / model ID / Prompt version:
API budget / rate-limit / logging policy:
Preview vs live boundary:
Deployment date:
Rollback procedure (mark verified only after testing):
```

## Acceptance and recovery

- Use an incognito window or a non-developer machine to test the chatbot, conversation record, PDF, and Drive links.
- Simulate provider 429, network loss, an overlong question, and exhausted API quota. Confirm that the UI shows a real failure instead of an empty success.
- Check that web logs contain neither keys nor identifiable student conversation data.
- If a deployment fails, restore the previous version **only if it is confirmed to work**. Do not mark a rollback drill as passed if it was not performed.
- Keep the demo available during the judging period. Confirm the retention period, cost owner, and shutdown time with the team.

## Actions not authorized by this initialization

Creating a Vercel/Coolify project, DNS, bucket, database, API key, changing a cloud bill, creating a GitHub repository, pushing Git, releasing, or deploying to production requires a separate explicit user request.
