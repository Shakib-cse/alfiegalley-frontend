---
description: "Review code and return prioritized findings with actionable fixes"
name: "Code Review Findings"
argument-hint: "Optional: target file/scope, focus area (security/perf), strictness"
agent: "agent"
---

Perform a code review with a findings-first format.

Use any arguments provided by the user after prompt invocation as constraints (for example scope, focus areas, or strictness). If no arguments are provided, review the active file or current selection and include closely related files needed to validate behavior.

Requirements:

- Prioritize bugs, behavioral regressions, security risks, and missing tests.
- Include style and maintainability issues as lower-priority findings unless they create reliability risks.
- List findings first, ordered by severity.
- For each finding, include:
  - Severity: Critical, High, Medium, or Low
  - Location: file path and line number(s)
  - Why it matters
  - Suggested fix
- Keep overviews brief and place them after findings.
- If no findings are discovered, explicitly say so and note residual risks or testing gaps.

Output format:

1. Findings
2. Open Questions or Assumptions
3. Brief Change Summary
4. Test Gaps / Residual Risks
