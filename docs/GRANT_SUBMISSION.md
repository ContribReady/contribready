# Drips Wave and GrantFox preparation

**Reviewed:** 2026-10-18. This is a preparation brief, not an application, eligibility decision, or approval claim. See [the implementation/readiness review](READINESS_REVIEW_20261018.md) for current verification and blockers.

## Product statement

ContribReady is a deterministic, local-first contributor-readiness auditor that evaluates whether an outside contributor can understand, install, test, modify, and validate a repository or issue using bounded evidence and explainable findings. It measures documented evidence only. It is not an oracle of contributor success, AI replacement for maintainers, security scanner, software-quality score, GitHub approval engine, or substitute for maintainer judgment.

## Repository presentation

Use [`ContribReady/contribready`](https://github.com/ContribReady/contribready) as the product/source-of-truth entry point. It owns product direction, architecture, requirements, project state, documentation, fixtures, cross-package contracts, roadmap, and release coordination. The supporting repositories are [`contribready-core`](https://github.com/ContribReady/contribready-core) (pure deterministic analysis engine/contracts) and [`contribready-cli`](https://github.com/ContribReady/contribready-cli) (filesystem/GitHub adapters, executable, and output formats). The parent workspace folder is not a fourth repository. The boundaries are justified by independent reuse/runtime responsibility; GitHub integration remains part of CLI.

## Drips Wave — readiness and remaining program work

Drips Wave describes a maintainer workflow in which an organization onboards, public repositories are applied to a relevant Wave Program, organizers approve them, and maintainers add appropriately scoped issues. The official guidance emphasizes selecting a program relevant to the project's ecosystem and responding promptly to contributor applications ([maintainer participation guide](https://docs.drips.network/wave/maintainers/participating-in-a-wave/)).

Current preparation:

- All three product repositories are public under the `ContribReady` GitHub organization, use `main`, have visible cross-links, and show GitHub-detected MIT licenses.
- No contributor issues are currently open or staged as drafts. Seven Core/CLI issue records from the earlier preparation pass were permanently deleted at maintainer direction on 2026-10-19. New tasks will be curated and added only after the relevant repository/program approval.
- Core's Windows-path fix is merged. CLI PR #8 head `cde13b4` passed 9/9 across Node 20/22/24 and Ubuntu/Windows/macOS, including the automated offline Core+CLI tarball install and executable smoke test. Local CLI verification passed 34 tests, 2 symlink-permission skips, and package dry-run. Main PR #4 implementation head `8119979` passed its 9/9 coordinated run against CLI `cde13b4` (run 39237457143); docs-only head `cbaca71` passed 9/9 (run 39239153529). CLI/main PRs remain unmerged.
- No Drips organization onboarding, repository application, Wave Program selection/approval, issue labeling, reward budget/points allocation, wallet setup, or `FUNDING.json` creation was performed.

Before participating: identify an active program that genuinely fits the project, confirm the program's current criteria, onboard the organization and install the app only after maintainer review, apply only the relevant repository, wait for organizer approval, then curate 2–4 bounded issues with realistic complexity and points and establish a response/review schedule. Do not claim Drips eligibility or approval in advance. No task is currently offered to contributors. Review current [points and budget rules](https://docs.drips.network/wave/maintainers/points-budgets/) before committing issue points.

**Drips Wave pre-approval preparation estimate: 59/100 (internal rubric, medium-low confidence; not an official score or approval probability).** Repository clarity/docs 19/20; reproducible development and cross-platform verification 20/20; contributor issue portfolio 0/20 (deliberately deferred until approval); release/governance 13/20; demonstrated program fit and maintainer/contributor experience 7/20. The repo-level 9/9 CI evidence is verified, but CLI/main PRs are unmerged. The walkthrough was maintainer-led, program fit/approval is unknown, and response capacity is unmeasured. This is a stage-specific preparation rubric: do not publish issues early just to increase it, and do not treat it as organizer acceptance odds.

## GrantFox — readiness and remaining program work

The public [GrantFox OSS GitHub App page](https://github.com/apps/grantfox-oss) describes a mission around contributors and open-source collaboration. The [GrantChain organization profile](https://github.com/GrantChain) describes GrantFox in the Stellar ecosystem. During this review, I did not verify a public, formal grant application route, eligibility checklist, or current funding round specifically for ContribReady. ContribReady has no demonstrated Stellar integration, deployment, adoption, or ecosystem impact. Repository polish alone does not establish fit.

Before pursuing a GrantFox opportunity: contact GrantFox through its current official channel and ask for the exact program/application route, eligible deliverables, budget rules, review process, and whether general-purpose contributor tooling is in scope. Present ContribReady's cross-ecosystem use honestly and propose a Stellar-specific deliverable only if a real user need and maintainer commitment are established. Do not claim affiliation, approval, impact, or ecosystem fit without evidence.

**GrantFox readiness estimate: 38/100 (internal judgment, low confidence; not an official score).** Public repositories and concrete contributor backlog help, but the formal submission route and fit are unverified, packages are unpublished, the external contributor test is incomplete, and measurable impact is absent. This is a research/contact stage, not application-ready.

## Shared claims to avoid

Do not claim approval, eligibility, proven contributor conversion, reduced time-to-first-PR, maintainer-channel effectiveness, security compliance, package adoption, or successful external impact. No user study or production usage evidence supports these claims at the date of review. The score is the result produced by the documented ContribReady rules against the available evidence; it does not mean a repository is objectively contributor-friendly.

## Pre-submission checklist

- [x] Three public repositories with clear ownership and links.
- [x] Complete MIT license on main and GitHub license detection reports MIT.
- [ ] After repository/program approval, curate and publish only the issues selected for that Program; no contributor issues are currently open.
- [x] `Protect main` rulesets active on all repositories; no protection setting was changed in this review.
- [x] Core and CLI local verify commands passed on Windows/Node 24; package tarballs installed and ran in an isolated temporary project without npm network access.
- [x] Repository-scoped security settings were verified on 2026-10-19: private vulnerability reporting, Dependabot alerts/security updates, secret scanning, and push protection were enabled; no open Dependabot alerts were returned. See the dated readiness review. GitHub CLI authentication has since expired, so reverify after reauthentication before submission.
- [ ] Complete human review of the 25-case synthetic matrix and pursue independently labeled external cases; fixture consistency alone does not measure false-positive/false-negative rates.
- [x] Merge the narrow runtime-conflict detector plus Windows workflow-path normalization through protected Core PRs; CLI conflict presentation/SARIF regression tests pass on PR #8 with a 9/9 matrix. Main cross-repository contracts also pass in the corrected 9/9 matrix.
- [x] Run the coordinated Core-main/CLI-proposal/main workflow on Node 20/22/24 × Ubuntu/Windows/macOS; all 9 jobs passed on the latest reviewed CLI head, including cross-repository contracts and packed-Core CLI verification. CLI and main PRs remain unmerged.
- [x] Record the maintainer-led clean-checkout walkthrough; it is not an independent blind user study.
- [ ] Run an independent contributor walkthrough and record comprehension and issue-discovery evidence.
- [ ] Publish Core first and CLI second only after explicit authorization and successful release review; then verify public `npm`/`npx` install.
- [ ] Verify a real active Drips Wave Program fit and organizer approval before describing participation.
- [ ] Obtain GrantFox's actual application route and documented eligibility/fit before preparing a funding application.
- [ ] Gather measured user/impact evidence before stating outcomes.

No wallet, funding address, `FUNDING.json`, application, package publication, GitHub release, merge, or repository-setting change was made as part of this readiness review.
