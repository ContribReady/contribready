# ContribReady source, security, release, and submission review

**Review date:** 2026-10-18–19 (Africa/Lagos)  
**Recommendation:** improve before submission  
**Confidence:** low-to-medium; local evidence is useful, but the fixture set is small, cross-platform status was not rerun, and no unaided external-contributor study exists.

## Executive summary

ContribReady is a real three-repository TypeScript product, not a documentation-only project. Its boundaries remain reasonable: the main `contribready` repository is the product/source-of-truth and coordination hub; `contribready-core` is the pure reusable rule/scoring engine; `contribready-cli` is the executable, local filesystem boundary, GitHub adapter, and output layer. No fourth repository is justified.

The product is not yet ready for an unqualified Drips Wave or GrantFox submission. The most important weakness is evidence quality and calibration: the analyzer is primarily deterministic phrase/structure matching, does not reconcile contradictory claims, and the current contradictory fixture still produces a 100% score over determinate findings with only 71% rule coverage. That score is not predictive and can be misleading if coverage is ignored. The source/schema and documentation need to make this limitation prominent.

Local engineering improved during this review: scoring/report schema v2 distinguishes unknown results from determinate outcomes and adds coverage; CLI text now displays score and coverage together; local file byte accounting uses UTF-8 bytes with bounded enumeration and no-follow behavior where supported; GitHub responses are streamed and bounded before JSON parsing; one ten-second deadline now spans response headers and body consumption; canonical GitHub URLs are stricter; output carries limitations and explicit “conflicts not assessed”; SARIF output and SARIF errors validate offline against the pinned OASIS 2.1.0 Errata 01 schema; the main repo now owns a 25-case synthetic evaluation matrix; the CLI consumes a registry-shaped Core package dependency rather than a sibling-source lock entry; and CI uses a local Core tarball. The updated Core, CLI, main fixture validator, and cross-package matrix passed locally on Windows/Node 24. Cross-platform CI remains pending.

These are **local, uncommitted proposals on isolated audit branches**, not changes merged to `main`. No package was published, no release or merge was created, and no branch-protection setting was changed. The original local checkouts were not edited.

## Repository and branch state

| Repository | GitHub identity/default | Current remote `main` snapshot | Audit worktree | Current local result |
|---|---|---|---|---|
| [`contribready`](https://github.com/ContribReady/contribready) | Public, `main`; product source of truth | `185a420e7e98df6ed1e8fdca2f860328499e19ad` | `audit/readiness-review-20261018-main` | Documentation, fixture, contract-test, and issue-draft proposals; not pushed |
| [`contribready-core`](https://github.com/ContribReady/contribready-core) | Public, `main`; reusable engine | `eaf024a00570b63baba6cdbfaac1061e4a2f3ae9` | `audit/readiness-review-20261018-core` | Rule/report/scoring proposals; verification passed; not pushed |
| [`contribready-cli`](https://github.com/ContribReady/contribready-cli) | Public, `main`; executable/adapters | `c37801e96c207eeb1d99b675bd1a7c3937f79b77` | `audit/readiness-review-20261018-cli` | Input/GitHub/output/CI proposals; verification passed; not pushed |

The workspace parent is not a Git repository. The three original local checkouts were clean and preserved on pre-existing audit branches whose remote tracking branches are deleted: main `audit/license-security-remediation-20261009` (`5c1ed6d`), Core `audit/issue-readiness-false-positive-20261009` (`da99c43`), and CLI `audit/install-and-reporting-docs-20261009` (`5789cab`). Fresh isolated worktrees are based exactly on the fetched remote `main` snapshots and carry the current uncommitted proposals on branches `audit/readiness-review-20261018-main`, `audit/readiness-review-20261018-core`, and `audit/readiness-review-20261018-cli`. GitHub metadata confirmed all three public repositories, organization ownership, `main` default branch, and admin access through the connected GitHub app. The standalone `gh` CLI reported its saved token invalid; no credential was printed.

GitHub `main` metadata currently detects `MIT` for all three. Active `Protect main` rulesets were read on 2026-10-18: main repo ID `24795267`, Core `24795398`, CLI `24795367`. No settings were changed. Earlier license PR #2 merged in each repo; Core/CLI security-policy PR #3 and main audit-doc PR #3 also merged. There are no open PRs. Seven scoped contributor issues were created (links below).

## Implementation review and findings

### Verified implementation

- Core consumes normalized evidence and owns rules, stable rule IDs/versions, outcomes, scoring, recommendations, and report construction. It imports no filesystem, GitHub, HTTP, or target project execution adapter.
- CLI owns argument parsing, bounded local evidence loading, output/exit codes, and optional fixed-host GitHub transport. It imports Core rather than duplicating scoring.
- Default local audit is static: it does not run repository scripts, tests, workflows, package install hooks, or arbitrary Markdown commands; it does not fetch URLs. Network retrieval is opt-in via canonical HTTPS GitHub URLs.
- GitHub issue parsing rejects pull requests. Remote requests use a fixed API origin, header-only optional token, redirect refusal, bounded response bytes, bounded selected tree/blob evidence, stable auth/not-found/rate-limit/network errors, and token-redaction tests.
- Reports are deterministic for covered fixtures and offer text, JSON schema v2, and SARIF 2.1.0 output validated against the vendored OASIS Errata 01 schema in tests. Core scoring v2 excludes unknowns from earned/possible points and reports `coveragePercentage`; N/A is excluded. CLI text presents coverage beside percentage.
- Core/CLI manifest versions agree at `0.1.0`; package names, MIT SPDX metadata, Core exports/types, and CLI `bin` metadata are present. CLI lockfile no longer contains a local sibling Core dependency and pins the registry-shaped Core tarball integrity.
- Core `npm run verify` passed: lint/typecheck, build, 13 tests, and package dry-run. Seven drafted contributor issues also passed all six current issue rules after the final Core build; this only checks consistency with the present heuristics, not issue quality or analyzer accuracy.
- CLI `npm run verify` passed: lint/typecheck, build, 31 tests passed, 2 local symlink tests skipped because links were unavailable, and package dry-run. New regressions include per-file/aggregate UTF-8 limits, depth/file/entry caps, invalid UTF-8, hostile filenames, remote traversal-shaped paths, redirects, timeouts across headers/body, body cancellation, token redaction, and schema-valid SARIF success/error outputs.
- Main `npm run lint`, `npm run verify`, and `npm run test:contracts` passed (fixture integrity plus 5 cross-package tests). The contract suite exercises 23 repository cases and 2 issue cases against pinned per-rule outcomes, score/coverage, unknown/N/A counts, recommendation counts, deterministic JSON/text/SARIF mappings, and strict exit status. Seven named security-test groups are linked to CLI regressions. The corpus is synthetic and authored, not externally labeled or statistically calibrated.
- Final clean artifact simulations succeeded in `C:\Users\user\AppData\Local\Temp\contribready-core-only-20261018` and `C:\Users\user\AppData\Local\Temp\contribready-clean-install-final-20261018`: Core installed independently from its final tarball; both generated tarballs installed together offline with lifecycle scripts disabled; Core imported directly; installed CLI ran repository and issue audit commands, emitted parseable JSON and SARIF-tagged JSON, and returned strict-mode exit code 1 for a failing repository. The simulations used Node 24 on Windows. No sibling source checkout was needed at runtime.

### Confirmed limitations/defects

1. **Evidence heuristics are not semantic validation.** Most checks recognize conventional phrases, paths, labels, and formatting. They cannot prove commands are accurate, tests/CI pass, URLs work, security routes are monitored, or maintainers respond. No externally labeled corpus or measured false-positive/false-negative rates exist.
2. **Contradictions are not reconciled.** `conflictsAssessed` is false for every current finding; `conflictingEvidence` is empty and `evidenceMissing` is currently a generic rule-purpose description, not a complete evidence ledger. On the contradiction fixture, the current rule-derived percentage is 100% with only 71% determinate coverage. Score and coverage must be displayed together and interpreted cautiously. The score is only “the result produced by the documented ContribReady rules against the available evidence.”
3. **The evaluation corpus is synthetic, not externally calibrated.** In addition to four directory fixtures and two issue files, the main repo now pins 23 repository and 2 issue matrix cases across the requested ecosystem/repository shapes. These improve regression coverage but are authored examples, not a representative sample or independently labeled corpus. Passing them establishes implementation consistency only; false-positive/false-negative rates remain unknown.
4. **Security coverage improved, but is not complete.** Added local byte, depth, file-count, directory-entry, malformed UTF-8, hostile filename, symlink, remote path, redirect, header/body timeout and cancellation tests, plus schema validation. Two symlink tests skipped in this Windows environment because link creation was unavailable. File replacement races, some unusual filesystem reparse-point behavior, live network failure semantics, and cross-platform execution remain unverified. The locally proposed CLI change fixes the known body deadline defect; this is not yet merged or released. SARIF success and error documents pass the official vendored schema in tests.
5. **Package checks are not publication.** Core was separately installed and imported from its generated tarball, and Core + CLI tarballs were tested together in a clean offline directory. Neither package is published; `npx @contribready/cli` and public registry installs remain unavailable. The generated artifacts are unreleased `0.1.0` tarballs, not signed/attested releases.
6. **Cross-platform evidence is missing for these changes.** Local tests ran on Windows/Node 24 only. The CI matrix defines Ubuntu, Windows, macOS and Node 20/22/24, but these proposed branches were not pushed and their CI jobs were not run. Historical green main-branch CI does not verify the current proposals.
7. **No unaided contributor trial was completed.** A clean package artifact rehearsal is not a new contributor following public setup docs. Time-to-understand, time-to-install, platform failures, and maintainer-only assumptions are unmeasured.
8. **Some live/exhaustive hostile cases remain unverified.** No private-repository request was made with real credentials, redirect refusal is verified with a mocked fetch configuration rather than a live redirect server, unusual filesystem race/reparse-point cases remain incomplete, and the new branches have not yet run the cross-platform matrix.

### False-positive/false-negative review

- **Observed correct detections in current fixtures:** very vague issue reports fail all six issue rules; empty/missing repository evidence produces failures or unknowns; a structured complete issue passes once expected and actual behavior are expressed in supported forms; vague conventional policy filenames do not automatically pass in Core tests.
- **Known false-negative/ambiguity:** contradictory runtime claims can remain unflagged; phrase matching can miss equivalent valid documentation; a `100%` determinate score with 71% coverage can be overread; passing a rule does not verify that its instructions or channel work.
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
| Local clean tarball install | Core installed independently and both tarballs installed offline together; commands/imports passed; not a public npm installation |
| Release order | Documented Core first, then CLI |
| Public npm/npx availability | Not available; no publication occurred; CLI registry install cannot resolve the unpublished Core package |
| Node 20/22 and Ubuntu/macOS | Not locally verified for these proposed changes |

No package was published. User authorization is still required for publication, releases, merges, and any settings change.

## Contributor issues created

These seven open GitHub issues were created after checking there were no existing open issues. They are specific work requests, not proof of Wave eligibility or maintainer review capacity.

**Core**

- [#4 Detect contradictory contributor instructions across evidence sources](https://github.com/ContribReady/contribready-core/issues/4)
- [#5 Add labeled ecosystem and repository-shape fixtures for rule evaluation](https://github.com/ContribReady/contribready-core/issues/5)
- [#6 Make score and evidence coverage difficult to misread](https://github.com/ContribReady/contribready-core/issues/6)

**CLI**

- [#4 Verify CLI and Core from clean package tarballs without sibling checkouts](https://github.com/ContribReady/contribready-cli/issues/4)
- [#5 Keep GitHub request deadlines active through bounded response parsing](https://github.com/ContribReady/contribready-cli/issues/5)
- [#6 Validate generated SARIF against the 2.1.0 schema](https://github.com/ContribReady/contribready-cli/issues/6)
- [#7 Expand Unicode-aware and traversal-limit regression coverage](https://github.com/ContribReady/contribready-cli/issues/7)

## Submission position

### Drips Wave: improve, then apply only to a relevant Program

The repositories are public and the issues are scoped, but no organization onboarding, repository application, Program approval, issue assignment/complexity selection, or maintainer response plan has been completed. Drips Wave instructs maintainers to apply repositories to a Program relevant to their ecosystem and says organizer approval is required ([official maintainer workflow](https://docs.drips.network/wave/maintainers/participating-in-a-wave/)). ContribReady currently demonstrates no specific Stellar integration or impact; do not assume the Stellar Wave is an appropriate fit.

**Internal readiness estimate: 52/100, low confidence, not an official Drips score.** It weighs public project organization and issue quality positively; release readiness, full verification, impact, and program fit negatively. Recommendation: improve first, verify actual program fit, then apply if appropriate.

### GrantFox: defer application pending verified route and fit

GrantFox OSS publicly describes an open-source contributor/collaboration mission ([GitHub App](https://github.com/apps/grantfox-oss)); its parent organization describes an open-source collaboration hub in the Stellar ecosystem ([GrantChain](https://github.com/GrantChain)). This review did not establish a formal public grant-application route or current eligibility requirements. ContribReady has no demonstrated Stellar integration, users, or impact evidence.

**Internal readiness estimate: 38/100, low confidence, not an official GrantFox score.** Contact GrantFox through its current official channel to establish the application path and fit before preparing a proposal. Do not claim affiliation, eligibility, approval, or impact.

## Exact next three actions

1. Run the proposed branches through CI on Node 20/22/24 across Ubuntu, Windows, and macOS; resolve any failures and record the exact run results.
2. Perform an unaided contributor walkthrough in a clean temporary checkout, following only public documentation; fix blockers and record timings, ambiguities, and platform-specific issues.
3. Review the verified CI and walkthrough evidence, then decide whether to open focused pull requests. Separately confirm current Drips Program fit and the GrantFox application route before any submission; do not publish packages without explicit release authorization.

## Files changed in the isolated audit worktrees

**Main:** `README.md`, `ROADMAP.md`, `PROJECT_STATE.md`, `AUDIT_REPORT.md`, `docs/SCORING.md`, `docs/REPORT_SCHEMA.md`, `docs/FIXTURE_CATALOG.md`, `docs/RELEASE_PROCESS.md`, `docs/SECURITY_THREAT_MODEL.md`, `docs/GRANT_SUBMISSION.md`, `docs/LICENSE_AND_SECURITY_REMEDIATION.md`, `tests/contract.test.mjs`, `fixtures/excellent-repository/CONTRIBUTING.md`, and seven issue drafts under `issues/core/` and `issues/cli/`.

**Core:** `src/index.ts`, `src/rules.ts`, `test/core.test.mjs`.

**CLI:** `.github/workflows/ci.yml`, `package-lock.json`, `src/input.ts`, `src/node-shims.d.ts`, `src/github/index.ts`, `src/output.ts`, `test/cli.test.mjs`, `test/github-url.test.mjs`.

Final `git diff --check` passed for all three isolated worktrees. The original checkouts remained clean. No source changes are on `main` and no code pull request was opened by this review.
