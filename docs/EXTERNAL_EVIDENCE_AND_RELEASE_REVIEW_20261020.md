# External Evidence and Package Release Review — 2026-10-20

## Status

This review executes the first three external-readiness actions: bounded evaluation against real public repositories, separating documented instructions from static consistency and execution status, and preparing the package release path. The product changes are on isolated audit branches and are not merged. The npm packages were **not published**: npm returned `E401 Unauthorized` for `npm whoami`. Publication is not reported as complete.

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

The intended post-publication command is:

```sh
npx --yes @contribready/cli audit .
```

The CLI package declares `@contribready/core` as a normal versioned dependency, so the registry install should retrieve Core automatically. A local tarball-based consumer test verifies both packed packages can be installed without sibling checkouts and that the installed executable runs. This is a package simulation only; it does not prove public registry availability.

Release checks completed in the isolated checkouts:

- Core `npm run verify`: passed, 19 tests; `npm pack --dry-run` passed.
- CLI `npm run verify`: passed, 36 tests, 2 symlink tests skipped because symlink creation is unavailable on this account; SARIF schema tests passed.
- CLI `npm run test:package`: passed, 1 isolated install/run test using the packed CLI and packed Core tarballs.
- Main fixture verification and cross-repository contract suite: passed, 1 fixture-catalog test and 5 contract tests.
- Current Core tarball integrity: `sha512-QlAHNSGXDd2fHMtXM8VE45I0cKqxTSrvKxg8AQiZUs3JfoJFq5wepRuMjErKqikDaLw2VXlOt3xCNZpXpCwqkQ==`. The CLI lockfile pin was updated to this exact artifact integrity while retaining the canonical npm registry URL.
- No public npm tarball or registry installation was verified.

## Remaining gates

1. Reauthenticate npm with an account authorized to publish the `@contribready` scope. The account check returned `E401`; no credential was read or displayed.
2. Review and merge the Core change first, then the CLI change, then this main-repository documentation/fixture change through the protected-branch PR process. No direct main push or merge was performed.
3. Rebuild and pack the merged Core, publish it first, verify the public registry tarball and a clean consumer install, then build/pack/publish CLI and verify `npx --yes @contribready/cli audit .` from a clean directory.
4. Keep the one-command route described as planned until those public-registry checks pass. Do not claim command correctness; ContribReady intentionally does not execute commands found in target repositories.

## Changes prepared in this review

- Core branch: `fix/external-evidence-quality` — additive instruction-status contract and narrower evidence rules, with regression tests.
- CLI branch: `feat/instruction-verification-output` — text/SARIF status exposure and output regression test; lockfile integrity aligned to the tested Core tarball.
- Main branch: `docs/external-validation-release-readiness-20261020` — this report and fixture/expected-result corrections.

All three branches have been pushed. Core PR [#10](https://github.com/ContribReady/contribready-core/pull/10) was reviewed and merged after all nine Node 20/22/24 × Ubuntu/Windows/macOS jobs passed. CLI PR [#9](https://github.com/ContribReady/contribready-cli/pull/9) is open; all nine jobs in its fresh matrix passed against the merged Core `main`, and it remains pending review. Main PR [#5](https://github.com/ContribReady/contribready/pull/5) is open with the fixture and documentation updates; its CI/review is pending. No npm publication, release, or tag is claimed by this report.
