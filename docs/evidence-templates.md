# Evidence recording templates

Use these blank templates to record observed evidence and who contributed. Quote actual model output in the competition report.

## A. One record per model call

```text
Run ID
Date and timezone
Case ID and ChartFacts version
Variant (Baseline, V1, V2, or V3)
Prompt source and SHA-256
Provider, exact model ID, and settings
Learning profile and preferences
Exact question and de-identified input
Private raw response path
Elapsed time, tokens, and cost if available
Reviewer and G/P/T/U/A scores (0–2 each)
Internal threshold outcome
Observed failure and evidence
Retest Run ID and result
Remaining questions
```

## B. Prompt version sheet

| Variant | Date | Prompt identifier and hash | Change | Reason | Matched retest |
|---|---|---|---|---|---|
| Baseline | | | Specialized teaching guidance omitted | Establish a control | |
| V1 | | | Graph description order | | |
| V2 | | | Teaching profile and preferences | | |
| V3 | | | Evidence, uncertainty, and pacing | | |

## C. Issue and retest sheet

| Issue | First run | Expected | Actual output | Suspected cause | Change | Retest | Outcome |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

Record unsuccessful tests and residual impact alongside successful retests. Preserve the exact output privately when using an excerpt in the report.

## D. Accessibility test record

```text
Tester code (optional, non-identifying)
OS, browser, and versions
Assistive technology and version
Participant and publication consent scope if relevant
Test case (AX-01 through AX-10)
Steps and expected result
Observed result and optional cleared evidence
Blocking severity
Fix and retest result
Specific WCAG criteria actually checked
Limits of the test
```

## E. Final conversation review

- [ ] Confirm the conversation comes from a real interaction with the final model and prompt.
- [ ] Count at least ten exchanged messages. Include follow-up, at least two learning needs, and a case with missing information.
- [ ] Record date, model, prompt version, scope, and permission to share.
- [ ] Remove identifying information, credentials, and private source material. Preserve enough context for each result.
- [ ] Check the share link as an unauthenticated visitor.

## F. Contribution record

| Work | Student | Advisor | AI tools | Evidence |
|---|---|---|---|---|
| Define the problem and design | | | | |
| Review graph facts | | | | |
| Develop prompts | | | | |
| Implement the workspace | | | | |
| Test and revise | | | | |
| Build the report and demo | | | | |

Published evidence needs the appropriate permission and a privacy review. Keep the full raw record privately for audit.
