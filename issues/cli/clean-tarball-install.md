# Verify CLI and Core from clean package tarballs without sibling checkouts

**Repository:** `ContribReady/contribready-cli`

## Problem and user impact

CLI declares `@contribready/core` as a registry dependency, but the package is not published. The current CI strategy builds a sibling checkout and installs a locally packed Core tarball; it does not yet prove the two release tarballs work when installed independently into a clean directory.

## Steps to reproduce

1. Run `npm pack` in Core and CLI.
2. Install the Core tarball in a clean temporary project.
3. Install the CLI tarball without a sibling source tree and run its binary on a fixture.

## Expected behavior: Core installs and imports independently; CLI installs from its own tarball plus the Core tarball, resolves the declared dependency, and its binary audits repository and issue fixtures.

## Actual behavior: CI's sibling workspace proves build and CLI tests but not an isolated two-tarball installation and execution rehearsal.

## Scope

Affected module: CLI package/release verification in `.github/workflows/ci.yml`, `package-lock.json`, package scripts/tests, and main `docs/RELEASE_PROCESS.md`. Use temporary directories and tarballs only.

## Acceptance criteria:

- Core and CLI tarballs are packed in dependency order and their contents/metadata are asserted.
- Clean temporary installs succeed without source checkout paths or registry publication.
- The CLI binary runs repository audit, local issue audit, JSON, SARIF, and strict exit checks from the installed artifacts.
- Package-lock resolution and tarball integrity match the Core artifact used for the CLI install.
- No install lifecycle hook or target repository code runs during fixture audits.

## Required tests

An automated pack/install/run integration test and an independent manual release rehearsal record.

## Expected output

Both packages load from the install directory; CLI outputs deterministic schema-v2 findings and expected exit codes.

## Security considerations

Do not publish to npm. Use only generated project tarballs in a disposable test directory; keep fixture content inert.

## Difficulty / dependencies

Difficulty: medium. Depends on Core-first artifact creation and Node/npm toolchain support.

## Out of scope

Actual npm publication, release tags, package provenance setup, or auto-merge configuration.

## Definition of done:

CI and release docs include the clean tarball rehearsal, lockfile/artifact checks pass, and no sibling checkout is needed at runtime.
