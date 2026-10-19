# v0.1 Release and submission gate

**Updated:** 2026-10-18
**Decision:** NOT READY TO RELEASE OR SUBMIT
**Evidence:** [current readiness review](docs/READINESS_REVIEW_20261018.md)

This checklist supersedes the earlier all-checked list. “Local pass” means verified only in the stated environment; a dry-run pack is not a publication or clean-install claim.

## Verified

- [x] Three justified repositories; main owns product source of truth; Core owns pure engine/contracts; CLI owns adapters/executable/output.
- [x] Public repositories use `main`; complete MIT files are merged and GitHub detects MIT.
- [x] `Protect main` rulesets are active on all three repositories; no protection settings were changed.
- [x] Core `npm run verify` passed locally on Windows/Node 24 (12 tests; package dry-run).
- [x] CLI `npm run verify` passed locally on Windows/Node 24 (22 pass, 1 directory-link test skipped; package dry-run).
- [x] Main verify and 4 cross-package contract tests passed against built audit worktrees.
- [x] Core/CLI tarballs installed together offline in a clean temporary project; Core imported by itself from an isolated Core-only install; installed CLI repository/issue JSON, SARIF parsing, and strict exit checks passed.
- [x] Seven scoped contributor issues exist in Core/CLI (see readiness review).
- [x] No target repository scripts/tests/workflows were executed by ContribReady during audit checks.

## Required before release/submission

- [ ] Resolve contradiction evidence and the 100%-with-71%-coverage interpretation issue; make missing/conflicting evidence semantics meaningful and versioned.
- [ ] Build the labeled multi-ecosystem, repository-shape, issue, and hostile-input corpus; record actual false-positive/false-negative examples without claiming statistical calibration.
- [ ] Keep GitHub timeout active through streamed body reading; validate SARIF against the 2.1.0 schema; finish path/resource/Unicode/junction regression coverage.
- [ ] Reauthenticate GitHub admin access and freshly read back private vulnerability reporting, Dependabot alerts/security updates, secret scanning, and push protection; do not rely solely on the 2026-10-09 snapshot.
- [ ] Run all three verification suites across Node 20/22/24 and Ubuntu/Windows/macOS on proposed PR branches.
- [ ] Complete a recorded unaided contributor walkthrough from clean public docs and fix blockers.
- [ ] Review the open issue scope and maintainer review/response capacity.
- [ ] Confirm a relevant current Drips Wave Program and organizer approval before participating; no application has been made.
- [ ] Confirm GrantFox's actual application route and eligibility/fit; do not imply Stellar alignment without evidence.
- [ ] Obtain explicit release authorization, then publish Core before CLI and verify public installs; no package/release has been published.

## Owner-authorized actions not performed

No merges, source pushes, releases, npm publication, GitHub security-setting changes, wallet configuration, `FUNDING.json`, or funding applications were made. Audit changes remain on isolated local branches; the original checkouts are untouched. Pull requests require maintainer review and explicit direction.
