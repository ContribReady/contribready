# Project State

**Updated:** 2026-10-19
**Current work:** independent readiness review; local deadline, SARIF-schema, and evaluation-matrix remediation
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
- Core `npm run verify`: passed locally on Windows/Node 24 (typecheck/build, 13 tests, package dry-run).
- CLI `npm run verify`: passed locally on Windows/Node 24 (typecheck/build, 31 passed, 2 symlink tests skipped because link creation was unavailable, package dry-run). SARIF output and SARIF error documents validate against the pinned OASIS 2.1.0 Errata 01 schema. A single ten-second GitHub request deadline now covers headers and body streaming; stalled readers are cancelled with stable redacted errors.
- Main fixture validator/verify and 5 cross-package contract tests passed against isolated Core/CLI builds. The new main-owned matrix covers 23 synthetic repository cases, two issue cases, and seven named security-test groups, pinning findings, score, coverage, unknown/N/A, recommendations, JSON/text/SARIF mappings, and strict exit codes. This is regression coverage, not external calibration.
- Core installed and imported independently from its tarball; Core and CLI tarballs also installed together in a clean temporary offline project with lifecycle scripts disabled. Installed CLI repository JSON, issue audit invocation, SARIF parsing, and strict-mode exit checks passed. All seven prepared issue drafts passed all six current issue rules.
- The above are local audit-branch results only. No audit branch was pushed; no new CI run on Node 20/22 or Ubuntu/macOS exists. Original local repository checkouts were preserved.

## Known blockers and limits

- Most rules are heuristic phrase/structure checks. They cannot establish that docs are true/current, tests or CI pass, URLs work, security channels are monitored, or maintainers respond.
- Contradictory evidence is not reconciled. Current findings set `conflictsAssessed: false`; missing evidence is not yet a complete structured ledger. The contradiction fixture still yields a 100% determinate score at 71% coverage, so percentage and coverage must be shown together.
- The synthetic matrix does not establish real-world rule accuracy or measured false-positive/false-negative rates. Contradictions remain unreconciled and some evidence fields are generic.
- CLI body deadline and SARIF schema gaps are fixed in the local proposal branch but not merged/released. Two symlink tests skipped on this Windows account; replacement races, unusual reparse points, live remote behavior, and cross-platform Unicode/resource cases still need CI verification.
- The package tarball simulation passed locally, but no package is published and public `npx` is not available. No unaided contributor study has been completed.
- GitHub CLI reauthentication succeeded on 2026-10-19. Fresh repository-scoped API reads confirmed private vulnerability reporting, Dependabot alerts, Dependabot security updates, secret scanning, and push protection enabled across all three repositories; no open Dependabot alerts were returned. All three `Protect main` rulesets remain active. No settings were changed. The organization-wide ruleset listing required `admin:org`, but repo-scoped reads succeeded.
- No measured user impact, contributor conversion, time-to-first-PR reduction, adoption, or ecosystem-specific fit is established.

## Current GitHub state

- All three repositories remain public and detect MIT on `main` (GitHub repo metadata verified on 2026-10-18).
- `Protect main` rulesets are active: main `24795267`, Core `24795398`, CLI `24795367`. No protection changes were made.
- License PR #2 merged in each repository; security docs PR #3 merged in Core/CLI and main report docs PR #3 merged in the main repository.
- Seven new scoped issues are open: Core #4–6 and CLI #4–7. See [readiness review](docs/READINESS_REVIEW_20261018.md).
- Current source/code/docs proposals remain uncommitted on isolated local audit branches. No PRs were opened.

## Next three actions

1. Resolve the contradiction/evidence-ledger and score-coverage issue (#4 Core) with regression tests.
2. Run the proposed branches through Node 20/22/24 on Ubuntu/Windows/macOS and perform the unaided contributor walkthrough.
3. Decide whether to open focused PRs or apply after reviewing CI, walkthrough results, and actual Drips Program/GrantFox route fit. Publish packages only after explicit release approval.

## Decision

**Improve before submission** for Drips Wave. **Defer** GrantFox application until a formal route and genuine program fit are confirmed. Internal readiness estimates (not official program scores): Drips Wave 52/100; GrantFox 38/100; both low confidence. Full evidence, caveats, and issue URLs are in [the 2026-10-18 readiness review](docs/READINESS_REVIEW_20261018.md).
