# Detect contradictory contributor instructions across evidence sources

**Repository:** `ContribReady/contribready-core`

## Problem and user impact

Core recognizes individual runtime/setup phrases but does not compare claims from different documents. The labeled contradictory fixture names Node 18 and Node 20 in README, CONTRIBUTING, and workflow evidence; the current report has no contradiction-specific finding and can produce 100% on only the determinate findings. Contributors cannot tell which documented requirement is current.

## Steps to reproduce

1. Build Core and CLI from the public repositories.
2. Run `node ../contribready-cli/dist/index.js audit fixtures/contradictory-repository --format json` from the main repository.
3. Inspect setup findings and their evidence sources.

## Expected behavior: report a bounded conflict finding with both source paths and mark unresolved claims as unknown rather than selecting a “correct” version.

## Actual behavior: no rule compares version claims across evidence sources, and `conflictsAssessed` is false for every current finding.

## Scope

Likely files: `src/rules.ts`, `src/index.ts`, `test/core.test.mjs`, and the main `fixtures/contradictory-repository` contract. Keep the detector pure over normalized evidence.

## Acceptance criteria:

- Detect conflicting runtime/toolchain version claims in contributor-relevant text and include each source path and a short, safe evidence excerpt.
- Consistent claims do not produce a conflict finding; incomplete or ambiguous claims remain unknown.
- The Core report distinguishes “no conflict detected” from “conflicts not assessed”; the CLI preserves the distinction in text, JSON, and SARIF.
- Repeated normalized input produces byte-stable finding order and score.
- Tests include agreement, disagreement, ambiguous version notation, irrelevant mentions, and missing evidence.

## Required tests

Core unit tests plus CLI serialization and main cross-repository fixture contracts.

## Expected output

The contradictory fixture has an explicit conflict finding with paths; the coherent fixture has no conflict finding. No prose is declared objectively correct by the analyzer.

## Security considerations

Treat all text as inert evidence. Bound excerpts and input sizes; never execute commands, fetch URLs, infer secrets, or copy arbitrary document content into reports.

## Difficulty / dependencies

Difficulty: medium. Depends on a documented conflict-evidence contract and stable rule/version policy.

## Out of scope

Choosing the authoritative version, verifying runtime downloads, executing workflows, or claiming actual setup succeeds.

## Definition of done:

Rule documentation, changelog, fixtures, and contract tests are updated; `npm run verify` passes in Core and CLI and the main contract suite passes against those built artifacts.
