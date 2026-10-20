# Project State

**Updated:** 2026-10-20
**Current work:** independent calibration, contributor-issue selection, and Drips Wave program-fit verification
**Submission status:** improve then submit to Drips Wave; defer GrantFox until a real application route and ecosystem fit are verified

## Product

ContribReady is a deterministic, local-first contributor-readiness auditor. It evaluates bounded documented evidence and produces explainable findings. It does not execute target-repository commands, certify that instructions work, predict contributor success, score software quality, scan for vulnerabilities, or replace maintainer judgment.

## Repository family

- [`contribready`](https://github.com/ContribReady/contribready) is the product source of truth for documentation, fixtures, contract tests, release coordination, and submission materials.
- [`contribready-core`](https://github.com/ContribReady/contribready-core) is the pure reusable rules, contracts, scoring, and reporting engine.
- [`contribready-cli`](https://github.com/ContribReady/contribready-cli) is the executable, bounded filesystem adapter, optional GitHub adapter, and text/JSON/SARIF output layer.
- The local parent directory is navigation only and is not a fourth repository.

## Current release state

- [`@contribready/core@0.1.0`](https://www.npmjs.com/package/@contribready/core) is public on npm.
- [`@contribready/cli@0.1.0`](https://www.npmjs.com/package/@contribready/cli) is public on npm and declares Core `0.1.0` as a registry dependency.
- Core was published before CLI. CLI's lockfile records the final published Core tarball integrity.
- The public command `npx --yes @contribready/cli audit .` was verified from a fresh directory and isolated npm cache without either implementation checkout on the runtime path.
- No GitHub release, adoption, usage, or impact claim is implied by npm availability.

## Verified implementation and validation

- Setup/test findings separate documented evidence, bounded static metadata consistency, and `execution: not-run`.
- Core verification passes with 19 tests and package dry-run.
- CLI verification passes with 37 tests; one file-symlink test skips on the current Windows account because link creation is unavailable. Package dry-run, isolated tarball installation, public-registry installation, JSON output, SARIF schema validation, and zero-vulnerability npm audits pass.
- Core, CLI, and main integration matrices passed on Node.js 20, 22, and 24 across Ubuntu, Windows, and macOS before merge.
- Main fixture validation passes 1/1 and cross-repository contracts pass 5/5.
- Five pinned public-repository evidence snapshots informed rule calibration. This is bounded calibration evidence, not statistical validation or a user-impact study.

## GitHub and security state

- All three repositories are public, use `main`, and report MIT license metadata.
- Active `Protect main` rulesets remain in place: main `24795267`, Core `24795398`, CLI `24795367`.
- The coordinated evidence/release pull requests are merged and there are no open pull requests in the three repositories as of this update.
- Repository-scoped reads on 2026-10-19 verified private vulnerability reporting, Dependabot alerts and security updates, secret scanning, and push protection enabled in all three repositories, with no open Dependabot alerts returned at that time.
- Security-setting evidence is dated and must be freshly re-read immediately before a submission that relies on it.

## Known limits

- Most rules are deterministic heuristics over bounded text and metadata. They cannot establish that documentation is true, commands execute successfully, CI is healthy now, URLs work, security channels are monitored, or maintainers respond.
- `CR-SETUP-002` detects a narrow class of explicit runtime-version disagreements. It does not resolve authority, interpret compatibility ranges or migration intent, or provide general semantic contradiction analysis.
- The authored fixture corpus and five external snapshots do not establish measured false-positive or false-negative rates.
- The clean-checkout walkthrough was maintainer-led, not an independent blind contributor study.
- No measured adoption, contributor conversion, time-to-first-PR improvement, maintainer response capacity, Drips approval, GrantFox fit, or funding outcome has been established.

## Next three actions

1. Run an independent contributor walkthrough using only public documentation and record blockers, comprehension time, and issue-discovery evidence.
2. Verify a currently active Drips Wave Program fit and maintainer response capacity, then select a small set of bounded contributor issues only when the program workflow permits it.
3. Contact GrantFox through a verified official route and confirm eligibility before preparing any ecosystem-specific proposal.

## Historical records

The dated [2026-10-18 readiness review](docs/READINESS_REVIEW_20261018.md), [2026-10-19 walkthrough](docs/CONTRIBUTOR_WALKTHROUGH_20261019.md), and [2026-10-09 audit](AUDIT_REPORT.md) preserve what was true at those review times. Their package and pull-request statuses are historical and are superseded by this document. The [2026-10-20 external evidence and release review](docs/EXTERNAL_EVIDENCE_AND_RELEASE_REVIEW_20261020.md) records the completed calibration and package-release work.
