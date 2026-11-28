# AccessSTEM AI V5 — Guided graph conversation

**Recorded:** 28 November 2026, 10:50:20–10:50:37 (Taipei)

**Session:** 6 questions and 6 live replies, in one continuous English conversation.

**Operator:** Codex, an AI agent, sent the questions through the public browser interface while following a learner scenario. The replies below are the text returned by the deployed tutor.

[Open the live AccessSTEM AI tutor](https://accessstem-ai.vercel.app/?lang=en)

## Problem entered

> A quadratic graph represents y = (x - 3)^2 + 2. The horizontal axis is x and the vertical axis is y. The problem does not specify physical units.

## Turn 1 · Full guide · Hints only

**Question**

> I get lost when I have to read a parabola. Can you give me one starting hint for finding the minimum without telling me the value or where it occurs?

**Tutor reply**

Start with the squared part of the formula.

### Hint

Think about the smallest value a square can have.

*Some lesson or answer details still need review.*

## Turn 2 · Full guide · Hints only

**Question**

> I think a square cannot be negative, but I do not see how x - 3 connects to the lowest point. Can you give me one more hint without solving it?

**Tutor reply**

Focus on what is inside the square.

### Hint

What value could x − 3 have to make (x − 3)² as small as possible?

*Some lesson or answer details still need review.*

## Turn 3 · Full guide · Full solution

**Question**

> Okay, I am ready for the full solution. What is the minimum, where does it happen, and why?

**Tutor reply**

The minimum is y = 2, and it occurs at x = 3, at the point (3, 2).

### Why

A square cannot be negative, so (x − 3)² is smallest when x − 3 = 0. This happens at x = 3. Substituting gives y = 0² + 2 = 2.

### Graph

The parabola opens upward, so its lowest point is (3, 2). The horizontal axis is x and the vertical axis is y; no physical units are specified.

**Answer sources**

- **Given** · The graph represents y = (x − 3)² + 2.
- **Derived** · The minimum is 2 at x = 3.
- **Given** · No physical units are specified. (source: `user-description`)

*Some lesson or answer details still need review.*

## Turn 4 · Quick summary · Guided

**Question**

> Can you sum up how the graph changes before and after the lowest point? Keep it short.

**Tutor reply**

The graph falls to its lowest point at (3, 2), then rises.

### As x increases

Before x = 3, y decreases. After x = 3, y increases.

**Answer sources**

- **Given** · The graph represents y = (x − 3)² + 2.
- **Derived** · The graph decreases for x < 3 and increases for x > 3.

*Some lesson or answer details still need review.*

## Turn 5 · Quick summary · Guided

**Question**

> Could I say that the vertical axis is measured in meters? What would I need to check?

**Tutor reply**

You cannot conclude that the vertical axis is measured in meters from the information provided.

### What to check

Check the vertical-axis label or the problem statement for a specified unit.

**Answer sources**

- **Given** · The vertical axis is y, and no physical units are specified. (source: `user-description`)
- **Unknown** · Whether y is measured in meters is not specified. (source: `missing-data`)

**Tutor follow-up**

Can you provide the vertical-axis label or any problem statement that specifies its units?

*Some lesson or answer details still need review.*

## Turn 6 · Teacher guide · Hints only

**Question**

> Give me one question a teacher can read aloud to check if students understand why this graph has a minimum. Leave out the answer.

**Tutor reply**

*AI lesson draft. Review before use.*

Why must the graph of y = (x − 3)² + 2 have a lowest point?

### Teaching purpose

Checks whether students can connect the squared expression to the existence of a minimum.
