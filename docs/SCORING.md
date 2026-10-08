# Scoring

ContribReady scores evidence according to scoring version `1`. The score is a documented measurement of the evaluated rules, never an objective claim about repository quality.

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
- `unknown`: earns zero points, remains in the category denominator, and produces a medium-priority recommendation. Unknown never silently becomes pass.
- `not-applicable`: is excluded from the category denominator and does not lower the score.

Within each category, the category weight is divided equally among its applicable findings. Category and overall values are deterministic and rounded for presentation. Reports include category breakdowns, evaluated/unknown/not-applicable counts, and `scoringVersion`.

## Recommendations

Recommendations are generated from failed and unknown findings. They are sorted deterministically: failed rules first, then unknown rules; setup, testing, contribution, security, then issue category; and rule ID as a stable tie-breaker.

The score means “according to ContribReady’s documented rules,” never “this repository is objectively X% good.”
