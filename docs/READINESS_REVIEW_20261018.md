# ContribReady source, security, release, and submission review

**Review date:** 2026-10-18–19; integration follow-up 2026-10-19 (Africa/Lagos)
**Recommendation:** improve before submission  
**Confidence:** medium for the stated implementation and CI results; low for real-world rule accuracy, external contributor experience, and program fit.

## Executive summary

ContribReady is a real three-repository TypeScript product, not a documentation-only project. Its boundaries remain reasonable: the main `contribready` repository is the product/source-of-truth and coordination hub; `contribready-core` is the pure reusable rule/scoring engine; `contribready-cli` is the executable, local filesystem boundary, GitHub adapter, and output layer. No fourth repository is justified.

The product is not yet ready for an unqualified Drips Wave or GrantFox submission. The most important weakness is evidence quality and calibration: the analyzer is primarily deterministic phrase/structure matching. `CR-SETUP-002` now flags a narrow class of conflicting runtime claims as unknown, but other contradictions and compatibility-matrix intent remain outside the detector. The updated contradictory fixture produces 100% on determinate findings with 64% coverage and five unknown rules. That score is not predictive and can be misleading if coverage is ignored; the interface and docs must keep both values visible.

Local engineering improved during this review: scoring/report schema v2 distinguishes unknown results from determinate outcomes and adds coverage; CLI text displays score and coverage together; local file byte accounting uses UTF-8 bytes with bounded enumeration; GitHub responses are streamed and bounded before JSON parsing under one ten-second header/body deadline; canonical GitHub URLs are stricter; output states limitations and “conflicts not assessed”; SARIF output and error output validate offline against the pinned OASIS 2.1.0 Errata 01 schema; the main repo owns a 25-case synthetic evaluation matrix; and CLI CI installs a locally packed Core artifact and now tests the generated CLI/Core tarballs from a clean offline consumer. CLI and main coordinated proposal heads each passed their complete Node 20/22/24 × Ubuntu/Windows/macOS matrices (9/9). A clean-checkout walkthrough passed Core, CLI, main fixtures, five local cross-repository contracts, JSON/SARIF output, and strict-mode exit behavior after documentation corrections. See [the walkthrough record](CONTRIBUTOR_WALKTHROUGH_20261019.md).

The proposals are maintained on isolated audit branches. Core scoring PR #7 and runtime-conflict PR #8 were merged, followed by Windows-path regression PR #9 (all three through protected review; PR #9 matrix 9/9). CLI PR #8 and main PR #4 remain open and unmerged. CLI head `cde13b4`, which includes an automated offline clean-tarball install test, passed 9/9 on [run 39236884638](https://github.com/ContribReady/contribready-cli/actions/runs/39236884638). Main PR #4 head `8119979` passed 9/9 on [run 39237457143](https://github.com/ContribReady/contribready/actions/runs/39237457143) against that CLI branch and Core `main`. No package was published, and no release or branch-protection setting was changed. The original local checkouts were not edited.

### Integration follow-up (2026-10-19)

Core runtime-conflict PR #8 was subsequently merged (merge commit `8be9ede0825283f2ecc5efb69489f5e030466e52`, 2026-10-19 08:47 UTC), with its 9/9 protected-branch CI checks green; `Protect main` remained active. During local integration against Windows-loaded repository evidence, a path-separator defect was found: workflow paths arrived with backslashes while the Core matcher recognized only `/`. A follow-up Core regression and fix normalize recognized paths before matching. The same integration updated the CLI text explanation, main contradictory fixtures, contract expectations, and docs. Local checks: Core typecheck/build, 16 tests, and pack dry-run passed; CLI conflict-output and SARIF tests passed (20 pass, 2 symlink-creation skips); main contracts passed 5/5 including all 25 pinned matrix cases. The fixture scores changed transparently: `mature-fragmented` 65→61 with coverage 50→43; `contradictory-docs` 55→48 with coverage 36→29. These decreases reflect additional evidence correctly becoming unknown, not scoring regressions hidden by the tests.

Core's Windows workflow-path correction was reviewed and merged through PR #9 (merge commit `e8f5c8fba51f79c9032cd1d391bb56c315413142`) after all 9 protected-branch matrix jobs passed. A deeper review found the CLI's text fallback could buffer an entire response before enforcing its byte bound. CLI PR #8 rejects responses without a readable stream, tests that `.text()` is not called, and removes that obsolete method from its transport interface. It also now automates the previously manual Core+CLI tarball rehearsal: offline installs of both packages into a temporary consumer with lifecycle scripts disabled, then installed CLI text, JSON, SARIF, issue, and strict-exit checks. New CLI head `cde13b4` passed 9/9 on [run 39236884638](https://github.com/ContribReady/contribready-cli/actions/runs/39236884638); local `npm run verify` passed with 34 tests and 2 link-creation skips. Main PR #4 implementation head `8119979` passed its coordinated 9/9 matrix against CLI `cde13b4` and Core `main` on [run 39237457143](https://github.com/ContribReady/contribready/actions/runs/39237457143); its documentation-only follow-up `cbaca71` also passed 9/9 on [run 39239153529](https://github.com/ContribReady/contribready/actions/runs/39239153529). CLI PR #8 and main PR #4 remain open and unmerged, pending maintainer review/authorization.

Following maintainer direction, all seven pre-approval Core/CLI contributor issues created during this preparation pass were permanently deleted on 2026-10-19 after explicit confirmation. Each issue URL now displays GitHub's “This issue has been deleted” state. All ten local issue-draft files were removed. New contributor tasks will be created only after relevant repository/program approval.

## Repository and branch state

| Repository | GitHub identity/default | Current remote `main` snapshot | Audit worktree | Current local result |
|---|---|---|---|---|
| [`contribready`](https://github.com/ContribReady/contribready) | Public, `main`; product source of truth | fetched `main` snapshot | `audit/readiness-review-20261018-main` | Fixture/contract proposals and updated project docs; PR [#4](https://github.com/ContribReady/contribready/pull/4) open; coordinated latest matrix passed 9/9 |
| [`contribready-core`](https://github.com/ContribReady/contribready-core) | Public, `main`; reusable engine | merged fix `e8f5c8f` | `fix/runtime-conflict-windows-path` | PR [#9](https://github.com/ContribReady/contribready-core/pull/9) merged after CI 9/9 |
| [`contribready-cli`](https://github.com/ContribReady/contribready-cli) | Public, `main`; executable/adapters | fetched `main` snapshot | `audit/readiness-review-20261018-cli` | Input/GitHub/output/SARIF and automated package-install proposals; PR [#8](https://github.com/ContribReady/contribready-cli/pull/8) open; head `cde13b4` passed 9/9 |

The workspace parent is not a Git repository. The three original local checkouts were clean and preserved on pre-existing audit branches whose remote tracking branches are deleted: main `audit/license-security-remediation-20261009` (`5c1ed6d`), Core `audit/issue-readiness-false-positive-20261009` (`da99c43`), and CLI `audit/install-and-reporting-docs-20261009` (`5789cab`). Fresh isolated worktrees are based on fetched remote `main` snapshots and contain the pushed proposals named above. GitHub CLI reauthentication succeeded on 2026-10-19; repo-scoped admin/security reads are recorded below. No credential was printed.

GitHub `main` metadata currently detects `MIT` for all three. Active `Protect main` rulesets were read on 2026-10-18: main repo ID `24795267`, Core `24795398`, CLI `24795367`. No settings were changed. Earlier license PR #2 merged in each repo; Core/CLI security-policy PR #3 and main audit-doc PR #3 also merged. Current coordinated proposals are Core PRs #7–9 merged, CLI PR #8 open, and main PR #4 open. The seven pre-approval records have been permanently deleted and their direct URLs display GitHub's deleted-issue state; no public contributor task is active before approval.

## Implementation review and findings

### Verified implementation

- Core consumes normalized evidence and owns rules, stable rule IDs/versions, outcomes, scoring, recommendations, and report construction. It imports no filesystem, GitHub, HTTP, or target project execution adapter.
- CLI owns argument parsing, bounded local evidence loading, output/exit codes, and optional fixed-host GitHub transport. It imports Core rather than duplicating scoring.
- Default local audit is static: it does not run repository scripts, tests, workflows, package install hooks, or arbitrary Markdown commands; it does not fetch URLs. Network retrieval is opt-in via canonical HTTPS GitHub URLs.
- GitHub issue parsing rejects pull requests. Remote requests use a fixed API origin, header-only optional token, redirect refusal, bounded response bytes, bounded selected tree/blob evidence, stable auth/not-found/rate-limit/network errors, and token-redaction tests.
- Reports are deterministic for covered fixtures and offer text, JSON schema v2, and SARIF 2.1.0 output validated against the vendored OASIS Errata 01 schema in tests. Core scoring v2 excludes unknowns from earned/possible points and reports `coveragePercentage`; N/A is excluded. CLI text presents coverage beside percentage.
- Core/CLI manifest versions agree at `0.1.0`; package names, MIT SPDX metadata, Core exports/types, and CLI `bin` metadata are present. CLI lockfile no longer contains a local sibling Core dependency and pins the registry-shaped Core tarball integrity.
- Core `npm run verify` passed: lint/typecheck, build, 13 tests, and package dry-run. The seven preparation-pass issue texts were previously evaluated against the six current issue rules; their GitHub records have since been permanently deleted and local drafts removed. This remains historical heuristic evidence only—not an active contributor backlog or proof of issue quality.
- CLI `npm run verify` passed locally at the latest proposal head: 34 passed and 2 link tests skipped because this Windows account cannot create them; package dry-run passed. The clean walkthrough also tested installed Core/CLI tarballs; that path is now an automated offline integration test. CI exercises the supported symlink/junction cases where runners permit. Regression coverage includes per-file/aggregate UTF-8 limits, depth/file/entry caps, invalid UTF-8, hostile filenames, remote traversal-shaped paths, redirects, timeouts across headers/body, body cancellation, token redaction, and schema-valid SARIF success/error outputs.
- Main `npm run verify` and `npm run test:contracts` passed locally (fixture integrity plus 5 cross-package tests). The contract suite exercises 23 repository cases and 2 issue cases against pinned outcomes, score/coverage, unknown/N/A, recommendations, deterministic JSON/text/SARIF, and strict exits. The synthetic authored corpus is not externally labeled or statistically calibrated.
- Proposed GitHub Actions results: main run [`39217203320`](https://github.com/ContribReady/contribready/actions/runs/39217203320), Core run [`39216575294`](https://github.com/ContribReady/contribready-core/actions/runs/39216575294), CLI run [`39217202072`](https://github.com/ContribReady/contribready-cli/actions/runs/39217202072); each has all 9 OS/Node jobs successful. Main Actions currently runs fixture verification only; its cross-repository contract suite passed locally on Windows/Node 24 but is not part of that matrix.
- Final clean artifact simulations succeeded in `C:\Users\user\AppData\Local\Temp\contribready-core-only-20261018` and `C:\Users\user\AppData\Local\Temp\contribready-clean-install-final-20261018`: Core installed independently from its final tarball; both generated tarballs installed together offline with lifecycle scripts disabled; Core imported directly; installed CLI ran repository and issue audit commands, emitted parseable JSON and SARIF-tagged JSON, and returned strict-mode exit code 1 for a failing repository. The simulations used Node 24 on Windows. No sibling source checkout was needed at runtime.

### Confirmed limitations/defects

1. **Evidence heuristics are not semantic validation.** Most checks recognize conventional phrases, paths, labels, and formatting. They cannot prove commands are accurate, tests/CI pass, URLs work, security routes are monitored, or maintainers respond. No externally labeled corpus or measured false-positive/false-negative rates exist.
2. **Contradiction analysis is narrow and heuristic.** `CR-SETUP-002` v2 compares explicit runtime/toolchain versions across recognized documentation and workflow files, returns unknown for incompatible cross-source claims, and emits attributed evidence. Incompatible claims within one source are ambiguous and remain unknown. It cannot infer authority, interpret compatibility matrices, validate versions, or reconcile arbitrary contradictory guidance; other rules do not generally assess conflicts. Score and coverage must be displayed together. The score means only “the result produced by the documented ContribReady rules against the available evidence.”
3. **The evaluation corpus is synthetic, not externally calibrated.** In addition to four directory fixtures and two issue files, the main repo now pins 23 repository and 2 issue matrix cases across the requested ecosystem/repository shapes. These improve regression coverage but are authored examples, not a representative sample or independently labeled corpus. Passing them establishes implementation consistency only; false-positive/false-negative rates remain unknown.
4. **Security coverage improved, but is not complete.** Added local byte, depth, file-count, directory-entry, malformed UTF-8, hostile filename, link, remote path, redirect, header/body timeout and cancellation tests, plus schema validation. The first Windows matrix run exposed a junction-following bug; the CLI also now compares an opened file descriptor's device/inode with its pre-open `lstat` snapshot and rejects mismatches before reading. A deterministic replacement regression renames a replacement file between these operations and verifies no bytes are read after the identity mismatch. This fix is on CLI PR #8 head `838c95b`, pending its updated cross-platform matrix. One file-symlink test skipped where creation was unavailable. Directory replacement races, in-place file mutation, some unusual filesystem reparse-point behavior, live network failure semantics, and private-repository behavior remain unverified. SARIF success and error documents pass the official vendored schema in tests. CLI and main proposals remain unmerged/unreleased.
5. **Package checks are not publication.** Core was separately installed and imported from its generated tarball, and Core + CLI tarballs were tested together in a clean offline directory. Neither package is published; `npx @contribready/cli` and public registry installs remain unavailable. The generated artifacts are unreleased `0.1.0` tarballs, not signed/attested releases.
6. **Cross-platform CI now passes on the proposals.** All 27 OS/Node jobs passed across the three repositories. The main workflow does not run its cross-repository contract suite, which was verified locally on Windows/Node 24 only.
7. **A clean-checkout contributor walkthrough passed, with limits.** Public setup directions were followed in a temporary clone. Two blockers in npm tarball instructions were fixed. Verification and CLI output/strict commands passed. This was a maintainer-led simulation, not an independent blind contributor study; comprehension and issue-selection times were not measured. At walkthrough time seven issues were open without labels; all seven have since been permanently deleted at maintainer direction.
8. **Some live/exhaustive hostile cases remain unverified.** No private-repository request was made with real credentials; redirect refusal uses a mocked fetch configuration rather than a live redirect server; directory replacement races, in-place file mutation, unusual reparse-point cases, and additional live failure semantics remain incomplete.

### False-positive/false-negative review

- **Observed correct detections in current fixtures:** very vague issue reports fail all six issue rules; empty/missing repository evidence produces failures or unknowns; a structured complete issue passes once expected and actual behavior are expressed in supported forms; vague conventional policy filenames do not automatically pass in Core tests.
- **Known false-negative/ambiguity:** the runtime rule handles only recognized explicit versions and can miss equivalent valid documentation, ranges, matrix intent, or arbitrary non-runtime contradictions. The updated contradictory fixture reports a 100% determinate score at 64% coverage with five unknowns; the percentage can still be overread. Passing a rule does not verify that its instructions or channel work.
- **Known false-positive risk:** text mentioning recognizable commands/versions can pass a heuristic despite being stale, irrelevant, or wrong. No statistical rate can be stated.
- **Human review required:** determine whether documentation is current/actionable, whether evidence applies to the relevant package/workspace, whether an issue is appropriately scoped, whether a reporting route is monitored, and whether a repository is a good contribution opportunity.

## Security, license, and governance

- License: MIT file complete and GitHub-detected MIT on all default branches; Core/CLI SPDX metadata agrees. The project-level main repository has no npm package declaration.
- `Protect main`: three active rulesets verified by ID on 2026-10-18 and freshly re-read on 2026-10-19. All remain `active`; no rule settings were changed.
- Security settings were freshly verified on 2026-10-19 through the authenticated GitHub CLI for all three repositories: private vulnerability reporting enabled; Dependabot alerts enabled (HTTP 204); Dependabot security updates enabled and not paused; secret scanning enabled; secret-scanning push protection enabled. Open Dependabot alert counts returned zero for all three repositories. No alert details were retrieved. The organization-wide ruleset listing required `admin:org`, but each repository-scoped ruleset endpoint succeeded; this did not block verification.
- `gh auth status` succeeded on 2026-10-19 for `Marvelg256` with `gist`, `read:org`, `repo`, and `workflow` scopes. The previous invalid-token state was resolved by reauthentication. No credential value is recorded here.
- GitHub private-reporting docs merged, but docs/settings cannot prove that maintainers monitor or respond to reports.
- No security setting, branch protection, billing, visibility, package registry, wallet, funding address, `FUNDING.json`, release, or application setting was changed during this verification.

## Package and release status

| Item | Status |
|---|---|
| `@contribready/core` package name/version/license/exports/types | Metadata present; version `0.1.0`; unpublished |
| `@contribready/cli` name/version/license/bin | Metadata present; version `0.1.0`; unpublished |
| CLI dependency on Core | Exact `0.1.0`; CLI lock points to public registry URL with integrity matching locally generated Core tarball |
| Core package dry-run | Passed; includes built JS/types, README, changelog, license; excludes source/tests |
| CLI package dry-run | Passed; includes built CLI, README, changelog, license; excludes source/tests |
| Local clean tarball install | Automated offline CI test installs both tarballs in a clean consumer with lifecycle scripts disabled and exercises the installed CLI on all 9 supported Node/OS combinations; not a public npm installation |
| Release order | Documented Core first, then CLI |
| Public npm/npx availability | Not available; no publication occurred; CLI registry install cannot resolve the unpublished Core package |
| Node 20/22 and Ubuntu/macOS | Not locally verified for these proposed changes |

No package was published. User authorization is still required for publication, releases, merges, and any settings change.

## Contributor issue status — deferred until approval

Seven pre-approval GitHub issue records were permanently deleted at the maintainer's explicit direction on 2026-10-19. Each direct issue page was reopened after deletion and displayed GitHub's “This issue has been deleted” state. Therefore this review intentionally retains no links to the removed records. All ten local issue-draft files (seven recent and three older Phase 15 notes) were removed from the main PR. No contributor issues should be created or selected until the relevant repository/program approval is obtained.

## Submission position

### Drips Wave: improve, then apply only to a relevant Program

The repositories are public, but no active contributor issues, organization onboarding, repository application, Program approval, issue assignment/complexity selection, or maintainer response plan is currently in place. Drips Wave instructs maintainers to apply repositories to a Program relevant to their ecosystem and says organizer approval is required ([official maintainer workflow](https://docs.drips.network/wave/maintainers/participating-in-a-wave/)). ContribReady currently demonstrates no specific Stellar integration or impact; do not assume the Stellar Wave is an appropriate fit.

**Updated pre-approval preparation estimate: 59/100 (not an official Drips score or approval probability).** Transparent stage-specific rubric: repository clarity/docs 19/20; reproducible development and cross-platform package verification 20/20; active contributor issue portfolio 0/20 (intentionally deferred until approval); release/governance readiness 13/20; demonstrated program fit and maintainer/contributor experience 7/20. The repo-level package matrix is green, but CLI and main PRs remain unmerged. The walkthrough was maintainer-led, no actual Wave Program fit/approval is established, and maintainer response capacity is unmeasured. The zero issue score records the explicit pre-approval deferral; do not publish issues early to raise the number. Reassess after approval and issue curation. This is a preparation rubric, not a claim about organizer acceptance.

### GrantFox: defer application pending verified route and fit

GrantFox OSS publicly describes an open-source contributor/collaboration mission ([GitHub App](https://github.com/apps/grantfox-oss)); its parent organization describes an open-source collaboration hub in the Stellar ecosystem ([GrantChain](https://github.com/GrantChain)). This review did not establish a formal public grant-application route or current eligibility requirements. ContribReady has no demonstrated Stellar integration, users, or impact evidence.

**Internal readiness estimate: 38/100, low confidence, not an official GrantFox score.** Contact GrantFox through its current official channel to establish the application path and fit before preparing a proposal. Do not claim affiliation, eligibility, approval, or impact.

## Exact next three actions

1. Review CLI PR #8 and main PR #4 against the latest green coordinated heads; merge only through the existing protected workflow and with maintainer authorization.
2. After CLI merges, change main CI's CLI checkout from the proposal branch to `main` and rerun the default-branch matrix.
3. Confirm relevant Drips Program fit and maintainer review capacity; only after repository approval, curate and publish contributor issues. Do not publish packages or submit applications without explicit approval.

## Files changed in the isolated audit worktrees

**Main:** `README.md`, `ROADMAP.md`, `PROJECT_STATE.md`, `AUDIT_REPORT.md`, `docs/SCORING.md`, `docs/REPORT_SCHEMA.md`, `docs/FIXTURE_CATALOG.md`, `docs/RELEASE_PROCESS.md`, `docs/SECURITY_THREAT_MODEL.md`, `docs/GRANT_SUBMISSION.md`, `docs/LICENSE_AND_SECURITY_REMEDIATION.md`, `tests/contract.test.mjs`, `fixtures/excellent-repository/CONTRIBUTING.md`, and `issues/README.md` (updated for the post-approval issue policy; ten local issue drafts removed).

**Core:** `src/index.ts`, `src/rules.ts`, `test/core.test.mjs`.

**CLI:** `.github/workflows/ci.yml`, `package-lock.json`, `package.json`, `README.md`, `CHANGELOG.md`, `src/input.ts`, `src/node-shims.d.ts`, `src/github/index.ts`, `src/output.ts`, `test/cli.test.mjs`, `test/github-url.test.mjs`, `test/package-install.test.mjs`.

Final `git diff --check` passed for all three isolated worktrees. The original checkouts remained clean. Proposal branches are pushed; no source changes are on `main`, all three PRs remain open, and no package was published.
