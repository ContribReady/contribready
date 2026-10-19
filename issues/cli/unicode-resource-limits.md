# Expand Unicode-aware and traversal-limit regression coverage

**Repository:** `ContribReady/contribready-cli`

## Problem and user impact

CLI now counts local UTF-8 bytes and bounds directory entries, but the current coverage does not fully exercise hostile filenames, excessive depth/count, file replacement races, or malformed Unicode. Windows directory-link creation was skipped in the current local environment, so that behavior remains unverified here.

## Steps to reproduce

1. Run the CLI security tests on Windows, Ubuntu, and macOS.
2. Exercise multibyte files near per-file and aggregate byte boundaries, deep trees, many entries, and files changed during audit.
3. Compare reported byte counts, skipped/truncated metadata, and collected evidence.

## Expected behavior: resource accounting uses encoded UTF-8 bytes, traversal stops at documented depth/count bounds, symlinks/junctions are never followed, and malformed text produces stable inert output.

## Actual behavior: UTF-8 aggregate accounting has a regression test, but the full boundary and cross-platform link matrix is incomplete.

## Scope

Likely files: `src/input.ts`, `src/output.ts`, `test/cli.test.mjs`, and `docs/SECURITY_THREAT_MODEL.md`.

## Acceptance criteria:

- Tests cover below/at/above per-file and aggregate UTF-8 byte limits with multibyte and supplementary-plane characters.
- Tests cover maximum directory entries, file count, nesting depth, hostile filenames, invalid UTF-8 replacement behavior, and stable truncation metadata.
- Symlink and Windows junction traversal tests run where privileges/platform permit; unavailable cases are explicitly reported rather than silently skipped.
- Audit does not execute target code, follow links outside root, or emit terminal control sequences.
- File metadata/read races fail safely without exposing raw exceptions.

## Required tests

CLI tests on Node 20/22/24 and Ubuntu/Windows/macOS CI; Core rules should remain unaffected.

## Expected output

Bounded evidence inventory, byte counts matching encoded bytes, stable skip/truncation behavior, and no external-link contents.

## Security considerations

Keep limits conservative and static; do not follow symlinks or create fake secret values. Test fixtures must contain no real credentials.

## Difficulty / dependencies

Difficulty: medium. Symlink/junction coverage depends on operating-system support and runner privileges.

## Out of scope

Auditing arbitrary binary files, increasing resource ceilings, or validating target package scripts.

## Definition of done:

Threat model and tests record each boundary, all available platform jobs pass, and any unavailable platform test is called out in the result.
