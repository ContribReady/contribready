# Project State

**Updated:** 2026-10-19
**Current work:** release-candidate package test and cross-repository evidence integration; Core fix merged, CLI and main proposal matrices green (latest main docs follow-up run 39239153529), contributor-issue publication deferred until approval
**Submission status:** improve before Drips Wave; defer GrantFox application pending verified route/fit

## Product

ContribReady is a deterministic, local-first contributor-readiness auditor that evaluates whether an outside contributor can understand, install, test, modify, and validate a repository or issue using bounded evidence and explainable findings. It assesses documented evidence only. It is not a contributor-success oracle, software-quality score, security scanner, AI maintainer replacement, GitHub approval engine, or substitute for human judgment.

## Verified repository family

- [`contribready`](https://github.com/ContribReady/contribready): public main/source-of-truth repository, default branch `main`; owns product docs, requirements, fixtures, contract tests, release coordination, and submission material.
- [`contribready-core`](https://github.com/ContribReady/contribready-core): public pure analysis library; owns typed contracts, rules, scoring, recommendations, and reports.
- [`contribready-cli`](https://github.com/ContribReady/contribready-cli): public executable; owns filesystem evidence adapter, GitHub transport adapter, text/JSON/SARIF output, and exit codes.
- The workspace parent is navigation only, not a fourth Git repository. No separate GitHub integration or docs repository is justified.

## Current implementation and validation

- Core and CLI remain version `0.1.0`; neither is published to npm. Release order is Core first, CLI second.
- Report/scoring schema version 2 distinguishes unknown from fail and reports determinate coverage. Percentage means the result of the documented rules against available evidence, not objective repository quality.
- Core `npm run verify` was rerun against the runtime-conflict follow-up: typecheck/build, 16 tests, and package dry-run passed locally on Windows/Node 24.
- CLI `npm run verify` passed locally against the updated Core build (34 passed, 2 symlink-creation tests skipped because this account cannot create those links; package dry-run passed). SARIF success/error outputs pass the vendored OASIS Errata 01 schema tests. A new offline clean-consumer test installs the generated CLI and Core tarballs with lifecycle scripts disabled and exercises the installed CLI; it passes locally and on all 9 CI matrix jobs.
- Main `npm run verify` and `npm run test:contracts` passed; all 5 cross-package tests passed against updated Core/CLI builds. The 25-case matrix now expects cross-source runtime contradictions to be unknown, with decreased determinate coverage; it remains authored regression evidence, not external calibration.
- Core and CLI tarballs were packed from the follow-up builds and installed together in a fresh offline directory with lifecycle scripts disabled. The installed CLI ran against the contradictory fixture and returned `unknown`, `conflictsAssessed: true`, with README, CONTRIBUTING, and GitHub workflow sources. No sibling source checkout was used at runtime. The CLI PR now automates this tarball-install smoke test.
- Core Windows workflow-path normalization is merged in Core PR #9 after 9/9 matrix checks. CLI PR #8 head `cde13b4` adds the offline package-install regression and passed 9/9 (run `39236884638`). Main PR #4 head `8119979` passed 9/9 against Core `main` and CLI proposal `cde13b4` (run `39237457143`), including all five cross-repository contracts.

## Known blockers and limits

- Most rules are heuristic phrase/structure checks. They cannot establish that docs are true/current, tests or CI pass, URLs work, security channels are monitored, or maintainers respond.
- `CR-SETUP-002` v2 detects incompatible explicit runtime claims across recognized documentation/workflow sources and reports unknown with source-attributed evidence. Same-source ambiguity remains unknown. It does not select the authoritative version, interpret compatibility matrices, or validate installations; other rules do not generally reconcile contradictions.
- The synthetic matrix does not establish real-world rule accuracy or measured false-positive/false-negative rates. Some evidence fields remain generic, and the narrow version detector is not general semantic contradiction analysis.
- CLI body deadline and SARIF schema gaps are fixed on the proposal branch, and the Windows junction traversal regression was fixed after CI caught it. The CLI matrix passed on Ubuntu/Windows/macOS and Node 20/22/24; one file-symlink test skipped where link creation was unavailable. Replacement races, unusual reparse points, and live remote behavior remain unverified.
- A clean temporary checkout followed the corrected public setup, verified Core/CLI/main, exercised JSON/SARIF and strict exits, and passed five cross-repository contracts. This was a maintainer-led simulation, not a blind external participant study. No package is published and public `npx` is unavailable.
- GitHub CLI reauthentication succeeded on 2026-10-19. Fresh repository-scoped API reads confirmed private vulnerability reporting, Dependabot alerts, Dependabot security updates, secret scanning, and push protection enabled across all three repositories; no open Dependabot alerts were returned. All three `Protect main` rulesets remain active. No settings were changed. The organization-wide ruleset listing required `admin:org`, but repo-scoped reads succeeded.
- No measured user impact, contributor conversion, time-to-first-PR reduction, adoption, or ecosystem-specific fit is established.

## Current GitHub state

- All three repositories remain public and detect MIT on `main` (GitHub repo metadata verified on 2026-10-18).
- `Protect main` rulesets are active: main `24795267`, Core `24795398`, CLI `24795367`. No protection changes were made.
- License PR #2 merged in each repository; security docs PR #3 merged in Core/CLI and main report docs PR #3 merged in the main repository.
- Seven pre-approval Core/CLI issue records were permanently deleted at the maintainer's explicit direction on 2026-10-19. GitHub's deleted-issue pages confirm removal. No contributor issues are open or staged as drafts; create/select them only after relevant program approval.
- GitHub verification on 2026-10-19 confirms Core PR #9 merged with 9/9 checks; CLI PR #8 remains open at `cde13b4` with 9/9 checks green; main PR #4 remains open and its latest documentation follow-up passed 9/9 (run `39239153529`), after the coordinated implementation run against CLI head `cde13b4` passed 9/9 (run `39237457143`). No package was published.

## Next three actions

1. Complete maintainer review of CLI PR #8 and main PR #4 against their green coordinated heads; merge only with authorization through protected PRs.
2. After CLI merges, switch main CI back to CLI `main` and rerun the default-branch matrix.
3. Confirm relevant Drips Program fit and maintainer review capacity; only after repository approval, curate and publish contributor issues. Obtain an independent contributor walkthrough before the first tasks are offered.

## Decision

**Improve before submission** for Drips Wave (internal pre-approval preparation rubric: 59/100; not an official score or approval probability). The issue-portfolio category is currently 0/20 because the maintainer-directed policy defers public contributor tasks until repository approval; this is a stage-specific readiness gap, not an invitation to publish issues early. **Defer** GrantFox application until a formal route and genuine program fit are confirmed; its 38/100 estimate remains unrefreshed. See [the readiness review](docs/READINESS_REVIEW_20261018.md).
