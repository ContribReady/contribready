# Project State

Updated: 2026-10-09

- Current phase: Phase 16+ — Long-term Development
- Phase status: queued
- Last completed: Phase 15 — v1 Expansion
- Current objective: close the independently audited external-readiness blockers before presenting ContribReady as security-reportable or ready for external funding review.
- Completed work: main source-of-truth repository, two justified supporting repositories, project documentation, architecture, requirements, scoring model, rule catalog, security model, executable roadmap, repository foundations, typed core contracts, seed rules, CLI command parsing, local audit/issue commands, bounded input loading, recursive contributor-evidence discovery, pure path classification, evidence inventories, setup rules, testing/reproduction rules, contribution workflow/review/support rules, local Markdown issue normalization, six issue-readiness rules, weighted scoring, category breakdowns, deterministic recommendations, human/JSON output, structured errors, canonical GitHub URL parsing, bounded GitHub issue/repository retrieval, optional token authentication, stable remote errors, terminal-output sanitization, credential/response/resource limits, redirect refusal, threat-model documentation, excellent/poor/missing/contradictory repository fixtures, complete/vague issue fixtures, mocked GitHub API fixtures, cross-package contract tests, and deterministic core/CLI/main-repository test harnesses.
- Remaining work: verified private vulnerability reporting/contact route; owner-approved complete license text; protected main branches; dependency/secret security controls; npm publication and clean-install test; unaided contributor test; funding-specific eligibility and impact evidence; future scope selection.
- Known blockers: safe vulnerability reporting is not configured; package names are not published; GitHub main branches are unprotected; license files are abbreviated despite MIT metadata; funding eligibility/impact has not been established.
- Known risks: readiness rules are keyword/file-presence heuristics and do not prove guidance/channel effectiveness; Unicode byte accounting and post-parse GitHub JSON sizing need follow-up; the product has no demonstrated Stellar integration/impact.
- Next phase: Phase 16+ — Long-term Development.
- Next action: derive and document the next phase from backlog, contributor feedback, ecosystem evidence, and security review before implementation.
- Release target: v0.1.0, 2026-10-09 12:00 WAT.

## Submission readiness

- Local audit preparation: complete.
- Primary submission repository: `contribready`.
- Supporting repositories: `contribready-core` and `contribready-cli`.
- GitHub publication: complete; all three public repositories are under the `ContribReady` organization with `main` as the default branch.
- CI after publication: passing for all three repositories across Ubuntu, Windows, and macOS with Node.js 20, 22, and 24.
- npm package publication, Drips repository claim/FUNDING.json setup, and grant applications: not completed.
- Submission guide: [docs/GRANT_SUBMISSION.md](docs/GRANT_SUBMISSION.md).
- Independent audit: [AUDIT_REPORT.md](AUDIT_REPORT.md); remediations are on dedicated audit branches and are not merged to `main`.

## Repository state

- Main repository: [public GitHub repository](https://github.com/ContribReady/contribready); standalone Git repository; owns project-level source of truth and release coordination.
- Core repository: [public GitHub repository](https://github.com/ContribReady/contribready-core); standalone Git repository; Phase 8 scoring/recommendation contract complete.
- CLI repository: [public GitHub repository](https://github.com/ContribReady/contribready-cli); standalone Git repository; Phase 10 security hardening complete; Phase 11 contract-tested with main fixtures; Phase 12 independently package/CI verified; Phase 13 release-audited; Phase 14 externally audited; Phase 15 SARIF/GitHub metadata complete; owns CLI and optional GitHub adapter.
