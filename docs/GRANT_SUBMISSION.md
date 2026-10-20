# Drips Wave and GrantFox preparation

**Reviewed:** 2026-10-20. This is a preparation brief, not an application, eligibility decision, or approval claim. See [current project state](../PROJECT_STATE.md) and the [external evidence and release review](EXTERNAL_EVIDENCE_AND_RELEASE_REVIEW_20261020.md) for current verification and blockers.

## Product statement

ContribReady is a deterministic, local-first contributor-readiness auditor that evaluates whether an outside contributor can understand, install, test, modify, and validate a repository or issue using bounded evidence and explainable findings. It measures documented evidence only. It is not an oracle of contributor success, AI replacement for maintainers, security scanner, software-quality score, GitHub approval engine, or substitute for maintainer judgment.

## Repository presentation

Use [`ContribReady/contribready`](https://github.com/ContribReady/contribready) as the product/source-of-truth entry point. It owns product direction, architecture, requirements, project state, documentation, fixtures, cross-package contracts, roadmap, and release coordination. The supporting repositories are [`contribready-core`](https://github.com/ContribReady/contribready-core) (pure deterministic analysis engine/contracts) and [`contribready-cli`](https://github.com/ContribReady/contribready-cli) (filesystem/GitHub adapters, executable, and output formats). The parent workspace folder is not a fourth repository. The boundaries are justified by independent reuse/runtime responsibility; GitHub integration remains part of CLI.

## Drips Wave — readiness and remaining program work

Drips Wave describes a maintainer workflow in which an organization onboards, public repositories are applied to a relevant Wave Program, organizers approve them, and maintainers add appropriately scoped issues. The official guidance emphasizes selecting a program relevant to the project's ecosystem and responding promptly to contributor applications ([maintainer participation guide](https://docs.drips.network/wave/maintainers/participating-in-a-wave/)).

Current preparation:

- All three product repositories are public under the `ContribReady` GitHub organization, use `main`, have visible cross-links, and show GitHub-detected MIT licenses.
- No contributor issues are currently open or staged as drafts. Seven Core/CLI issue records from the earlier preparation pass were permanently deleted at maintainer direction on 2026-10-19. New tasks will be curated and added only after the relevant repository/program approval.
- Core, CLI, and main evidence/release changes are merged through protected pull requests. Their Node 20/22/24 × Ubuntu/Windows/macOS matrices passed, and both npm packages are public. A clean-cache public `npx` audit completed successfully. This proves the release path, not contributor adoption or program impact.
- No Drips organization onboarding, repository application, Wave Program selection/approval, issue labeling, reward budget/points allocation, wallet setup, or `FUNDING.json` creation was performed.

Before participating: identify an active program that genuinely fits the project, confirm the program's current criteria, onboard the organization and install the app only after maintainer review, apply only the relevant repository, wait for organizer approval, then curate 2–4 bounded issues with realistic complexity and points and establish a response/review schedule. Do not claim Drips eligibility or approval in advance. No task is currently offered to contributors. Review current [points and budget rules](https://docs.drips.network/wave/maintainers/points-budgets/) before committing issue points.

The earlier 59/100 preparation estimate is retired because its release and merge assumptions changed. Do not assign a replacement score until the independent contributor walkthrough, program fit, issue portfolio, and maintainer response capacity are reviewed. Package publication improves reproducibility but does not establish organizer acceptance or contributor impact.

## GrantFox — readiness and remaining program work

The public [GrantFox OSS GitHub App page](https://github.com/apps/grantfox-oss) describes a mission around contributors and open-source collaboration. The [GrantChain organization profile](https://github.com/GrantChain) describes GrantFox in the Stellar ecosystem. During this review, I did not verify a public, formal grant application route, eligibility checklist, or current funding round specifically for ContribReady. ContribReady has no demonstrated Stellar integration, deployment, adoption, or ecosystem impact. Repository polish alone does not establish fit.

Before pursuing a GrantFox opportunity: contact GrantFox through its current official channel and ask for the exact program/application route, eligible deliverables, budget rules, review process, and whether general-purpose contributor tooling is in scope. Present ContribReady's cross-ecosystem use honestly and propose a Stellar-specific deliverable only if a real user need and maintainer commitment are established. Do not claim affiliation, approval, impact, or ecosystem fit without evidence.

The earlier 38/100 GrantFox estimate is retired. Package publication removes one delivery blocker, but the formal submission route, ecosystem fit, independent contributor evidence, and measurable impact remain unverified. This is still a research/contact stage, not application-ready.

## Shared claims to avoid

Do not claim approval, eligibility, proven contributor conversion, reduced time-to-first-PR, maintainer-channel effectiveness, security compliance, package adoption, or successful external impact. No user study or production usage evidence supports these claims at the date of review. The score is the result produced by the documented ContribReady rules against the available evidence; it does not mean a repository is objectively contributor-friendly.

## Pre-submission checklist

- [x] Three public repositories with clear ownership and links.
- [x] Complete MIT license on main and GitHub license detection reports MIT.
- [ ] After repository/program approval, curate and publish only the issues selected for that Program; no contributor issues are currently open.
- [x] `Protect main` rulesets active on all repositories; no protection setting was changed in this review.
- [x] Core and CLI are public on npm; local tarballs and a fresh-cache public `npx` installation both ran successfully.
- [x] Repository-scoped security settings were verified on 2026-10-19: private vulnerability reporting, Dependabot alerts/security updates, secret scanning, and push protection were enabled; no open Dependabot alerts were returned. Re-read these mutable settings immediately before submission rather than treating the dated result as permanent.
- [ ] Complete human review of the 25-case synthetic matrix and pursue independently labeled external cases; fixture consistency alone does not measure false-positive/false-negative rates.
- [x] Merge the runtime-conflict, instruction-status, bounded-response, SARIF, and release-readiness changes through protected Core, CLI, and main pull requests.
- [x] Run the coordinated Core/CLI/main workflow on Node 20/22/24 × Ubuntu/Windows/macOS; all 9 cells passed, including cross-repository contracts and packed-Core CLI verification.
- [x] Record the maintainer-led clean-checkout walkthrough; it is not an independent blind user study.
- [ ] Run an independent contributor walkthrough and record comprehension and issue-discovery evidence.
- [x] Publish Core first and CLI second after explicit authorization and successful release review; verify public `npm` metadata and a fresh-cache `npx` audit.
- [ ] Verify a real active Drips Wave Program fit and organizer approval before describing participation.
- [ ] Obtain GrantFox's actual application route and documented eligibility/fit before preparing a funding application.
- [ ] Gather measured user/impact evidence before stating outcomes.

No wallet, funding address, `FUNDING.json`, application, package publication, GitHub release, merge, or repository-setting change was made as part of this readiness review.
