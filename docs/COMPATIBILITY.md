# Compatibility Matrix

Phase 12 establishes the v0.1 support target and independent verification policy.

| Component | Node.js | Operating systems | Verification |
|---|---|---|---|
| `@contribready/core` | 20, 22, 24 | Ubuntu, Windows, macOS | `npm run verify`, package dry-run |
| `@contribready/cli` | 20, 22, 24 | Ubuntu, Windows, macOS | `npm run verify`, package dry-run |
| `contribready` main harness | 20, 22, 24 | Ubuntu, Windows, macOS | `npm run verify` fixture gate |

Node 20 is the minimum v0.1 runtime because the CLI uses built-in Fetch, `AbortController`, `TextDecoder`, and modern ESM behavior. Node 22 and 24 are compatibility lanes. TypeScript is a development dependency; published Core and CLI artifacts contain compiled JavaScript and declarations.

Each repository has its own lockfile, CI workflow, build/typecheck/test/packaging commands, and release ownership. Core is released before CLI when its API changes. Until the first public package release, CLI source CI checks out the compatible Core repository beside it and builds Core before running CLI verification. After publication, CLI resolves the declared Core version from the package registry. The main repository's cross-package contract suite is a local workspace integration gate and does not create a parent repository or merge release ownership.

For all three repositories, the platform smoke check is:

```text
npm ci
npm run verify
```
