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
- Seven bounded Core/CLI issues are now open with problem/impact, reproduction steps, scope, acceptance criteria, tests, expected output, security notes, difficulty, dependencies, and out-of-scope sections. They are not yet Wave-approved or assigned complexity in a Program.
- Core/CLI verification and local package-artifact installation passed on this Windows/Node 24 workstation. Full cross-platform matrix results for this audit branch are not available.
- No Drips organization onboarding, repository application, Wave Program selection/approval, issue labeling, reward budget/points allocation, wallet setup, or `FUNDING.json` creation was performed.

Before participating: identify an active program that genuinely fits the project, confirm the program's current criteria, onboard the organization and install the app only after maintainer review, apply only the relevant repository, wait for organizer approval, select 2–4 issues with realistic complexity and points, and establish a response/review schedule. Do not claim Drips eligibility or approval in advance. The seven open issues are not proof that applications will arrive or be reviewed promptly. Review current [points and budget rules](https://docs.drips.network/wave/maintainers/points-budgets/) before committing issue points.

**Drips Wave readiness estimate: 52/100 (internal judgment, low confidence; not an official score).** Public repository structure and scoped issues are strengths. Missing program fit/approval, no completed independent contributor walkthrough, incomplete ecosystem corpus, no published packages, and no evidence of maintainer response capacity keep this below submission-ready. The score says nothing about organizer acceptance.

## GrantFox — readiness and remaining program work

The public [GrantFox OSS GitHub App page](https://github.com/apps/grantfox-oss) describes a mission around contributors and open-source collaboration. The [GrantChain organization profile](https://github.com/GrantChain) describes GrantFox in the Stellar ecosystem. During this review, I did not verify a public, formal grant application route, eligibility checklist, or current funding round specifically for ContribReady. ContribReady has no demonstrated Stellar integration, deployment, adoption, or ecosystem impact. Repository polish alone does not establish fit.

Before pursuing a GrantFox opportunity: contact GrantFox through its current official channel and ask for the exact program/application route, eligible deliverables, budget rules, review process, and whether general-purpose contributor tooling is in scope. Present ContribReady's cross-ecosystem use honestly and propose a Stellar-specific deliverable only if a real user need and maintainer commitment are established. Do not claim affiliation, approval, impact, or ecosystem fit without evidence.

**GrantFox readiness estimate: 38/100 (internal judgment, low confidence; not an official score).** Public repositories and concrete contributor backlog help, but the formal submission route and fit are unverified, packages are unpublished, the external contributor test is incomplete, and measurable impact is absent. This is a research/contact stage, not application-ready.

## Shared claims to avoid

Do not claim approval, eligibility, proven contributor conversion, reduced time-to-first-PR, maintainer-channel effectiveness, security compliance, package adoption, or successful external impact. No user study or production usage evidence supports these claims at the date of review. The score is the result produced by the documented ContribReady rules against the available evidence; it does not mean a repository is objectively contributor-friendly.

## Pre-submission checklist

- [x] Three public repositories with clear ownership and links.
- [x] Complete MIT license on main and GitHub license detection reports MIT.
- [x] Seven scoped Core/CLI contributor issues created; links are in the readiness review.
- [x] `Protect main` rulesets active on all repositories; no protection setting was changed in this review.
- [x] Core and CLI local verify commands passed on Windows/Node 24; package tarballs installed and ran in an isolated temporary project without npm network access.
- [ ] Reverify private vulnerability reporting, Dependabot, secret scanning, and push protection using an authenticated administrative interface; the GitHub CLI token currently reports invalid, and connector access did not expose the security-setting endpoints in this turn.
- [ ] Complete, human-reviewed multi-ecosystem and ambiguity fixture corpus; measure false positives/negatives without claiming calibration prematurely.
- [ ] Resolve contradictions, complete GitHub body-stream timeout controls, schema-validate SARIF, and complete remaining security regressions.
- [ ] Run Node 20/22/24 on Ubuntu/Windows/macOS for the proposed branches; current local validation is Windows/Node 24 only.
- [ ] Conduct and record an unaided contributor walkthrough from a clean checkout.
- [ ] Publish Core first and CLI second only after explicit authorization and successful release review; then verify public `npm`/`npx` install.
- [ ] Verify a real active Drips Wave Program fit and organizer approval before describing participation.
- [ ] Obtain GrantFox's actual application route and documented eligibility/fit before preparing a funding application.
- [ ] Gather measured user/impact evidence before stating outcomes.

No wallet, funding address, `FUNDING.json`, application, package publication, GitHub release, merge, or repository-setting change was made as part of this readiness review.
