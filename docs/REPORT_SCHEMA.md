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

Each `Finding` contains stable rule ID and rule version, category, outcome, evidence, evidence known to be missing, conflicting evidence, an explicit conflict-assessment flag, explanation, recommendation, false-positive considerations, and false-negative limitations. `conflictsAssessed: true` means only that this rule's documented conflict check ran; it does not establish that no conflict exists outside that check's evidence model. `CR-SETUP-002` v2 detects incompatible explicit runtime claims across recognized documentation/workflow sources and reports them as unknown. Ambiguous same-source claims are also unknown. The rule does not infer authority or validate compatibility. Other rules currently leave conflict assessment false.

`ScoreSummary` contains `earned`, `possible`, `percentage`, `coveragePercentage`, `unknownRules`, `notApplicableRules`, `evaluatedRules`, `scoringVersion`, and `categoryScores`. Percentage is based on determinate pass/fail outcomes only; coverage communicates what share of applicable rules was determinate. Category scores include category weight, earned/possible points, percentage, coverage percentage, and outcome counts. A `null` percentage means there were no determinate pass/fail outcomes.

`Recommendation` contains `ruleId`, `area`, `outcome`, `priority`, and `text`. Recommendation sorting is deterministic for identical findings. This is a versioned API change from schema/scoring version 1; downstream consumers should branch on both version fields.
