# Report Schema

Reports use `schemaVersion: 1` and contain:

```text
{
  schemaVersion: 1,
  subject: "repository" | "issue",
  findings: Finding[],
  score: ScoreSummary,
  recommendations: Recommendation[],
  input: string
}
```

`ScoreSummary` contains `earned`, `possible`, `percentage`, `unknownRules`, `notApplicableRules`, `evaluatedRules`, `scoringVersion`, and `categoryScores`. Category scores include category weight, earned/possible points, percentage, and pass/fail/unknown/not-applicable counts.

`Recommendation` contains `ruleId`, `area`, `outcome`, `priority`, and `text`. Recommendation sorting is deterministic for identical findings.
