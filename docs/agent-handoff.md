# Engineering handoff

The single-component web prototype connects to OpenAI locally. Classroom-source review, independent response scoring, VoiceOver, and public acceptance remain open.

1. Follow the [Web setup](../web/README.md), then run lint, type checking, and the production build.
2. Ask a math teacher to review the formulas, coordinates, diagrams, and equivalent descriptions in `web/src/lib/charts.ts`. Record the review date and approved attribution before updating lesson status.
3. With an authorized server key, verify real multi-turn chat. Check the [tutor contract](agent-design.md) for hints, layered descriptions, teacher drafts, and missing facts.
4. Follow the [evaluation protocol](evaluation-plan.md) to compare Baseline through V3 on matched cases. Preserve raw responses, failures, and retests. Run the core workflow with VoiceOver before making screen-reader claims.
5. Use the [deployment plan](deployment.md) and [demo guide](demo-and-submission.md) for the public chatbot, reviewed transcript, and English PDF.

Follow [AGENTS.md](../AGENTS.md) for repository and external operations. Update the relevant docs and actual test status when completing a work package.
