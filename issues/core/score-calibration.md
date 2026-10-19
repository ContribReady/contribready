# Make score and evidence coverage difficult to misread

**Repository:** `ContribReady/contribready-core`

## Problem and user impact

Scoring v2 excludes unknown findings from earned/possible points and publishes a coverage percentage. A contradictory fixture can still show 100% on a partially determinate set. Consumers may treat that as a complete pass unless score meaning, coverage, and unknown counts are surfaced together and tested across output formats.

## Steps to reproduce

1. Run the main contract suite against the current Core and CLI builds.
2. Audit `fixtures/contradictory-repository` as JSON and text.
3. Compare its score percentage, coverage percentage, and unknown count.

## Expected behavior: every output makes score meaning and evidence coverage visible together and reports null when there are no determinate outcomes.

## Actual behavior: machine output has coverage but there is no calibration evidence, and the score remains a rule-derived percentage that may be overread.

## Scope

Likely files: Core `src/index.ts`, `test/core.test.mjs`, CLI `src/output.ts`, output tests, and main `docs/SCORING.md` / `docs/REPORT_SCHEMA.md`.

## Acceptance criteria:

- Golden cases cover all-pass, all-fail, all-unknown, mixed pass/fail/unknown, and not-applicable-only inputs.
- Percent/coverage/category arithmetic is documented and independently asserted.
- Text output includes percentage, determinate coverage, unknown count, and N/A count; JSON and SARIF preserve the same score semantics.
- Every display states that the score is the result of documented rules against available evidence, not an objective repository quality measure.
- No arbitrary threshold is called validated without an external labeled evaluation.

## Required tests

Core deterministic scoring unit tests, CLI text/JSON/SARIF assertions, and main cross-contract tests.

## Expected output

Stable, explainable score fields with an explicit `null` for no determinate evidence and visible low coverage where unknowns are common.

## Security considerations

Do not infer sensitive or private evidence from missing data; unknown remains distinct from fail.

## Difficulty / dependencies

Difficulty: medium. Depends on schema-v2 compatibility and consumer-facing version notes.

## Out of scope

Changing scores to target a desired percentage, ranking software quality, or claiming predictive validity.

## Definition of done:

Scoring/schema docs, changelogs, golden tests, and consumer notes are updated and all Core/CLI/main contract checks pass.
