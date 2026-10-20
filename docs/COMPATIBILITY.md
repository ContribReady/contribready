# Compatibility Matrix

The v0.1 support target is Node.js 20, 22, and 24 on Ubuntu, Windows, and macOS. The release and integration pull requests completed all nine operating-system/runtime cells before merge on 2026-10-20.

| Component | Node.js | Operating systems | Verification |
|---|---|---|---|
| `@contribready/core` | 20, 22, 24 | Ubuntu, Windows, macOS | All 9 cells: `npm run verify` and package dry-run passed |
| `@contribready/cli` | 20, 22, 24 | Ubuntu, Windows, macOS | All 9 cells: packed Core install, `npm run verify`, package smoke, and SARIF validation passed |
| `contribready` main harness | 20, 22, 24 | Ubuntu, Windows, macOS | All 9 cells: fixtures plus five cross-repository contracts passed |

Node 20 is the minimum v0.1 runtime because the CLI uses built-in Fetch, `AbortController`, `TextDecoder`, and modern ESM behavior. Node 22 and 24 are compatibility lanes. TypeScript is a development dependency; published Core and CLI artifacts contain compiled JavaScript and declarations.

Each repository has its own lockfile, CI workflow, build/typecheck/test/packaging commands, and release ownership. Core is released before CLI when its API changes. CLI CI checks out Core, verifies it, packs it, and installs the local tarball to test unreleased package-boundary changes; released consumers use the declared Core version from npm. The main repository's cross-package contract suite is a workspace integration gate and does not create a parent repository or merge release ownership.

For all three repositories, the platform smoke check is:

```text
npm ci
npm run verify
```
