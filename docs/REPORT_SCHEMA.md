# Report Schema

Reports use `schemaVersion: 2` and contain:

```text
{
  schemaVersion: 2,
  subject: "repository" | "issue",
  findings: Finding[],
  score: ScoreSummary,
  recommendations: Recommendation[],
  input: string
}
```

Each `Finding` contains stable rule ID and rule version, category, outcome, evidence, evidence known to be missing, conflicting evidence (currently empty when `conflictsAssessed` is false), an explicit conflict-assessment flag, explanation, recommendation, false-positive considerations, and false-negative limitations. Current heuristics do not reconcile contradictory sources; `conflictsAssessed: false` must not be interpreted as “no contradiction exists.”

`ScoreSummary` contains `earned`, `possible`, `percentage`, `coveragePercentage`, `unknownRules`, `notApplicableRules`, `evaluatedRules`, `scoringVersion`, and `categoryScores`. Percentage is based on determinate pass/fail outcomes only; coverage communicates what share of applicable rules was determinate. Category scores include category weight, earned/possible points, percentage, coverage percentage, and outcome counts. A `null` percentage means there were no determinate pass/fail outcomes.

`Recommendation` contains `ruleId`, `area`, `outcome`, `priority`, and `text`. Recommendation sorting is deterministic for identical findings. This is a versioned API change from schema/scoring version 1; downstream consumers should branch on both version fields.
