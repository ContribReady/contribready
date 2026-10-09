# Issue Readiness

Local issue Markdown is normalized into title and body. The Phase 7 rules are:

| Rule | Checks |
| --- | --- |
| `CR-ISSUE-001` | A concrete problem, goal, impact, or failure is stated |
| `CR-ISSUE-002` | Reproduction steps, commands, logs, examples, or fixtures are present |
| `CR-ISSUE-003` | Expected/desired and observed behavior can be distinguished |
| `CR-ISSUE-004` | Affected component, module, file, API, or scope is identified |
| `CR-ISSUE-005` | Acceptance criteria or equivalent conditions are defined |
| `CR-ISSUE-006` | Definition of done, tests, verification, or documentation completion is stated |

Missing or empty template sections produce actionable findings; section labels alone are not evidence. Reproduction, behavior, scope, acceptance, and completion indicators are evaluated from the issue body, while the problem/goal rule may also use the title. These are transparent keyword heuristics, not semantic validation: a passing result means an indicator was found, not that the issue is technically correct or that implementation will be easy. Markdown prose is never executed and AI is not authoritative.
