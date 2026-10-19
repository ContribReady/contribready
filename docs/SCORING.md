# Scoring

ContribReady reports scoring version `2`. The percentage means “the result produced by the documented ContribReady rules against the available evidence.” It is not an objective measure of contributor-friendliness, repository quality, contributor success, or maintainer behavior.

## Category weights

For repository audits, applicable categories have these maximum weights:

| Category | Weight |
| --- | ---: |
| Setup | 30 |
| Testing | 25 |
| Contribution | 25 |
| Security | 20 |
| **Total** | **100** |

Issue audits use the issue category with weight `100`.

## Outcome handling

- `pass`: earns its proportional category points.
- `fail`: earns zero points and produces a high-priority recommendation.
- `unknown`: is excluded from earned and possible points, remains visible in the unknown count, and produces a medium-priority recommendation. Unknown never silently becomes pass or failure.
- `not-applicable`: is excluded from the category denominator and does not lower the score.

Within each category, the category weight is divided equally among applicable findings before unknown outcomes are excluded from the percentage denominator. Therefore `percentage` is the share of points earned among determinate pass/fail outcomes only; it must always be read together with `coveragePercentage`, `unknownRules`, and `notApplicableRules`. `coveragePercentage` is the percentage of applicable rules with a determinate pass/fail result. A high percentage with low coverage is incomplete evidence, not a strong audit result. If there are no determinate outcomes, the score percentage is `null` rather than 0 or 100. Not-applicable rules are excluded from both the score and coverage denominator.

Issue audits use the issue-specific category at weight 100 and do not mix with repository categories. Output is deterministic for identical normalized evidence, rules, and scoring version.

## Recommendations

Recommendations are generated from failed and unknown findings. They are sorted deterministically: failed rules first, then unknown rules; setup, testing, contribution, security, then issue category; and rule ID as a stable tie-breaker.

The score is only a rule result. It does not establish that instructions work, tests pass, CI is healthy, a reporting channel exists or responds, or a contributor will succeed.
