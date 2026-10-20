# External Evidence and Package Release Review — 2026-10-20

## Status

This review completed the first three external-readiness actions: bounded evaluation against real public repositories, separating documented instructions from static consistency and execution status, and proving the public package release path. The Core and CLI changes were merged through protected pull requests. `@contribready/core@0.1.0` and `@contribready/cli@0.1.0` are public on npm, and the one-command CLI route was verified from a fresh directory and isolated npm cache.

## External-repository evaluation

The analyzer was run against bounded, read-only evidence snapshots from five public repositories. Each snapshot was pinned to the `main` commit listed below. Selection was restricted to contributor-facing documentation, root manifests/lockfiles, relevant CI configuration, and related policy evidence. This was not a complete local-tree audit: files were filtered and capped before evaluation. No repository code, package scripts, tests, workflows, install commands, or Markdown instructions were executed; no linked page was fetched. Results are rule-level calibration evidence, not scores or a statistically representative sample.

| Repository snapshot | Commit | Files considered | Calibration observation |
| --- | --- | ---: | --- |
| [fastify/fastify](https://github.com/fastify/fastify/commit/e61a91e73bed771396d8ae7365b5d3ca2501e624) | `e61a91e73bed771396d8ae7365b5d3ca2501e624` | 77 | Setup, test commands, and relevant workflow evidence were found; npm guidance matched the root package metadata. |
| [pallets/flask](https://github.com/pallets/flask/commit/d086db856be187255b8ec61ef409357393020f32) | `d086db856be187255b8ec61ef409357393020f32` | 110 | Testing/setup evidence appeared in focused testing documentation; contribution workflow stayed `unknown` and needs human review rather than being inferred from an unrelated document. |
| [rust-lang/rustlings](https://github.com/rust-lang/rustlings/commit/bc8e51115c9304fbd036f5d6fca683e71363468) | `bc8e51115c9304fbd036f5d6fca683e71363468` | 48 | Contributor guidance points to an external website; affected local rules remain `unknown` instead of treating the link as validated instructions. |
| [spf13/cobra](https://github.com/spf13/cobra/commit/adbc8813901bba65827259daa8e22ff94ec1f30e) | `adbc8813901bba65827259daa8e22ff94ec1f30e` | 22 | Contributor test and PR guidance were found, while a contributor install/build command was not corroborated against the root Go module. |
| [docker/compose](https://github.com/docker/compose/commit/19fea168b3993aecb6727818f8592a6bbe4e66fd) | `19fea168b3993aecb6727818f8592a6bbe4e66fd` | 136 | Build/test docs and CI were found; a source/build command did not establish a package-install instruction. Agent-specific docs are not treated as proof of maintainer or contributor behavior. |

A separate focused, partial Vite snapshot showed `pnpm i`, root `packageManager: pnpm@12.14.0`, and `pnpm-lock.yaml` in agreement. That supports a static consistency check only; the command was not run. These samples exposed false-positive risk when any workflow was treated as CI, when tests were treated as install instructions, and when testing/reference/history/examples documentation was counted as general contributor guidance. The Core changes narrow those sources, keep external-only documentation as `unknown`, and avoid relying on archive/example docs. The corpus still requires additional independent review, especially for monorepos, alternative package managers, and unusual documentation layouts.

## Instruction-status contract

Core findings now add `instructionVerification` where setup/test evidence is evaluated:

- `documentation`: `documented`, `not-found`, `external-link-only`, or `unclear`.
- `metadataConsistency`: `consistent`, `conflicting`, or `not-assessed` based on a limited static comparison with root project metadata.
- `execution`: always `not-run` by design.

Consequently, a `pass` for a setup/test rule means only that the documented evidence met that rule's static criteria. It does **not** mean the command was executed, succeeds on a clean machine, or produces its claimed result. Text output and SARIF carry this status; JSON contains it as part of each finding. The Core tests now cover stale/example evidence, unrelated workflows, README fallback, npm/pnpm metadata agreement/conflict, and explicit non-execution. The cross-repository contract suite pins changed outcomes for corrected fixtures (including lockfiles for `npm ci` and a real test step in the representative CI example).

## Package and one-command release path

The verified public command is:

```sh
npx --yes @contribready/cli audit .
```

The CLI package declares `@contribready/core` as a normal versioned dependency, so the registry install retrieves Core automatically. Both a local tarball consumer test and a public-registry `npx` test verified execution without a sibling source checkout.

Release checks completed in the isolated checkouts:

- Core `npm run verify`: passed, 19 tests; `npm pack --dry-run` passed.
- CLI `npm run verify`: passed, 37 tests, 1 file-symlink test skipped because link creation is unavailable on this account; SARIF schema tests passed.
- CLI `npm run test:package`: passed, 1 isolated install/run test using the packed CLI and packed Core tarballs.
- Main fixture verification and cross-repository contract suite: passed, 1 fixture-catalog test and 5 contract tests.
- Published Core integrity: `sha512-Ntj1jn/+045GguJSjC4y/XHrEGJBH55E4alDhwXwm9P+WMTZ6O6F1ScdQuCXqECIsruto/TimZluuMNnWd5ImA==`.
- Published CLI integrity: `sha512-+jzwOasdSPsRGjErDaRDGvbxbmlJ7e2lQk1cRqCBQw7faOGWjx2FYJ1OpBWPyw4mMBfekFo985Lqezu7+Xtn5A==`.
- CLI PR #11 refreshed its lockfile to the published Core integrity; the full nine-job matrix passed before merge.
- A fresh-directory, isolated-cache `npx --yes @contribready/cli@0.1.0 audit <repository> --format json` run returned CLI `0.1.0`, schema version 2 output, 14 findings, and `instructionVerification.execution: not-run` without using a local Core or CLI checkout.

## Remaining gates

1. Merge this main-repository report/fixture PR only after its matrix passes against the merged Core and CLI default branches.
2. Continue independent calibration beyond the five bounded public snapshots; this review is not a statistical validation or impact study.
3. Maintain Core-before-CLI release order for future versions and refresh CLI's lockfile after each final Core tarball is published.
4. Keep instruction claims bounded: the public CLI installation was executed, but commands found inside audited target repositories remain intentionally unexecuted.

## Changes prepared in this review

- Core branch: `fix/external-evidence-quality` — additive instruction-status contract and narrower evidence rules, with regression tests.
- CLI branch: `feat/instruction-verification-output` — text/SARIF status exposure and output regression test; lockfile integrity aligned to the tested Core tarball.
- Main branch: `docs/external-validation-release-readiness-20261020` — this report and fixture/expected-result corrections.

Core PR [#10](https://github.com/ContribReady/contribready-core/pull/10) and CLI PR [#9](https://github.com/ContribReady/contribready-cli/pull/9) merged the evidence-quality contract after protected cross-platform matrices passed. Core PR [#11](https://github.com/ContribReady/contribready-core/pull/11) and CLI PR [#10](https://github.com/ContribReady/contribready-cli/pull/10) merged explicit npm release metadata and public installation documentation. CLI PR [#11](https://github.com/ContribReady/contribready-cli/pull/11) merged the final published-Core lockfile integrity after another full matrix passed. Main PR [#5](https://github.com/ContribReady/contribready/pull/5) contains this review and the calibrated fixture updates; it must pass against the merged default branches before merge. No GitHub release or adoption claim is made.
