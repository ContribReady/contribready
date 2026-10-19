# Compatibility Matrix

The configured v0.1 support target is Node.js 20, 22, and 24 on Ubuntu, Windows, and macOS. This is a target/configured CI matrix, **not evidence that all cells were run for the 2026-10-18 proposed audit branches**. This review locally verified Windows/Node 24 only.

| Component | Node.js | Operating systems | Verification |
|---|---|---|---|
| `@contribready/core` | 20, 22, 24 | Ubuntu, Windows, macOS | Configured workflow: `npm run verify`, package dry-run; local review run: Windows/24 |
| `@contribready/cli` | 20, 22, 24 | Ubuntu, Windows, macOS | Configured workflow: local Core tarball + `npm run verify`; local review run: Windows/24 |
| `contribready` main harness | 20, 22, 24 | Ubuntu, Windows, macOS | Configured workflow: `npm run verify` fixture gate; cross-package contract run is local-only |

Node 20 is the minimum v0.1 runtime because the CLI uses built-in Fetch, `AbortController`, `TextDecoder`, and modern ESM behavior. Node 22 and 24 are compatibility lanes. TypeScript is a development dependency; published Core and CLI artifacts contain compiled JavaScript and declarations.

Each repository has its own lockfile, CI workflow, build/typecheck/test/packaging commands, and release ownership. Core is released before CLI when its API changes. Before publication, CLI CI checks out Core, verifies it, packs it, and installs the local tarball for CLI verification; this tests the package boundary without relying on a registry release. After publication, consumers use the declared Core version from the package registry. The main repository's cross-package contract suite is a local workspace integration gate and does not create a parent repository or merge release ownership.

For all three repositories, the platform smoke check is:

```text
npm ci
npm run verify
```
