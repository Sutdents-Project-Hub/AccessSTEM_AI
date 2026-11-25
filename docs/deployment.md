# AccessSTEM AI on Vercel Hobby

The competition site targets Vercel Hobby. Its public deployment and final URL are pending.

## Import from GitHub

1. Choose **Add New → Project** in the intended Hobby account and import **Sutdents-Project-Hub/AccessSTEM_AI**. Use a project name based on `accessstem-ai`, subject to availability.
2. Select **Next.js**, set **Root Directory** to `web`, and use **Node.js 24.x**. Keep the install, build, and output settings on their framework defaults. The Production Branch is `main`.
3. Before the first deployment, enter the following in the project's **Production** environment.

| Name | Value or source |
| --- | --- |
| `OPENAI_API_KEY` | Required for live chat. Enter the authorized key as a sensitive server-side variable. |
| `OPENAI_MODEL` | Optional. The code defaults to the tested `gpt-6.1-terra` model and selects low reasoning effort for it. |
| `ENABLE_EXPERIMENTAL_COREPACK` | Set to `1` so Vercel uses pnpm 10.33.0 from `web/package.json`. |

4. Deploy, then open the project's production domain in **Settings → Domains**. Use that stable HTTPS address in the submission. After changing production variables, redeploy for them to take effect.
5. In a signed-out browser, open `/?lang=en`, choose a graph, send a question, and follow up on the same graph. A successful homepage alone does not exercise the model. Record the tested URL and commit.

The chat function has a 40-second execution limit and a 25-second upstream timeout. Request limits in the application apply per running instance. Provider usage controls apply across instances.

## Demo requirements

1. External judges can open the service from an unfamiliar device and incognito window at `/?lang=en` and use real LLM responses (confirm with the organizer first if access restrictions apply).
2. The AI provider key is stored securely on the server; the frontend exposes neither the key nor a private API.
3. Support at least two reviewed charts, three teaching preferences, follow-up questions, and clear errors.
4. Provide a separate **read-only, anonymized, genuine final-version** conversation record link.
5. Make text usable with a screen reader; a video-only page is not an operable chatbot.
6. Set traffic and API quota limits and give users clear messages when service fails.
7. Keep the deployed Git commit, Prompt version, and model ID traceable. Do not silently use a different Prompt in different environments.

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
