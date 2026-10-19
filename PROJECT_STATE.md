# Project State

**Updated:** 2026-10-19
**Current work:** runtime-conflict evidence integration; Core fix merged, CLI proposal matrix green, main coordinated cross-repository matrix green
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
- CLI `npm run verify` passed locally against the updated Core build (32 passed, 2 symlink tests skipped because link creation was unavailable; package dry-run passed). SARIF success/error outputs pass the vendored OASIS Errata 01 schema tests.
- Main `npm run verify` and `npm run test:contracts` passed; all 5 cross-package tests passed against updated Core/CLI builds. The 25-case matrix now expects cross-source runtime contradictions to be unknown, with decreased determinate coverage; it remains authored regression evidence, not external calibration.
- Core and CLI tarballs were packed from the follow-up builds and installed together in a fresh offline directory with lifecycle scripts disabled. The installed CLI ran against the contradictory fixture and returned `unknown`, `conflictsAssessed: true`, with README, CONTRIBUTING, and GitHub workflow sources. No sibling source checkout was used at runtime.
- Core Windows workflow-path normalization is merged in Core PR #9 after 9/9 matrix checks. CLI conflict text/SARIF changes are pushed to PR #8 at `966a7c0`; fresh coordinated CI run `39230275133` passed 9/9. Main PR #4's corrected workflow run `39231291888` passed 9/9 against Core main and the coordinated CLI proposal branch; the earlier run against stale CLI main failed. Original local repository checkouts remain preserved.

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
- Seven new scoped issues are open: Core #4–6 and CLI #4–7. See [readiness review](docs/READINESS_REVIEW_20261018.md).
- GitHub verification on 2026-10-19 confirms Core PR #9 merged with 9/9 checks; CLI PR #8 remains open with current head `966a7c0` and 9/9 checks green (run `39230275133`); main PR #4 remains open with 9/9 checks green on coordinated run `39231291888`. Nothing was published.

## Next three actions

1. Complete maintainer review of CLI PR #8 and main PR #4; retain both open until merge is explicitly authorized.
2. After CLI is merged through protected review, change main CI's CLI ref from its proposal branch back to `main` and rerun the matrix.
3. Obtain an independent contributor walkthrough and confirm a relevant Drips Program and maintainer response capacity before applying; verify GrantFox's route before any application.

## Decision

**Improve before submission** for Drips Wave (internal preparation rubric: 74/100; not an official score or approval probability). **Defer** GrantFox application until a formal route and genuine program fit are confirmed; its 38/100 estimate remains unrefreshed. See [the readiness review](docs/READINESS_REVIEW_20261018.md).
