# Clean-checkout contributor walkthrough

**Date:** 2026-10-19  
**Scope:** Review branches only; no PRs, merges, releases, or package publications.  
**Environment:** Fresh Windows temporary directory, Node.js 24, public GitHub checkouts.

## Result

The documented source setup now works from a clean checkout after correcting two command-level blockers found during this walkthrough. Core, CLI, the main fixture suite, and the cross-repository contract suite all passed. CLI local repository and issue audits emitted JSON; SARIF parsed as version 2.1.0; strict mode returned exit 1 for the deliberately vague issue fixture.

This was a maintainer-led simulation using only the cloned public documentation during command execution, not an independent blind participant study. Understanding time and issue-selection time were not separately timed. Therefore it does not measure a new contributor's comprehension, and no conversion or time-to-first-PR claim follows from it.

## Walkthrough

1. Cloned the three review branches as siblings under `C:\Users\user\AppData\Local\Temp\contribready-unaided-20261019\`.
2. Read the main README and `CONTRIBUTING.md`, then followed the CLI README quick-start. The product purpose and repository ownership were findable; the README points users to the CLI and Core repositories and to the contribution guide.
3. Ran Core `npm ci` and `npm run verify`: passed, including 13 tests and package dry-run.
4. Packed Core locally, installed that tarball into CLI with lifecycle scripts disabled, then ran CLI `npm run verify`: 32 passed, 1 skipped (file-symlink creation unavailable to this account), 0 failed; package dry-run passed. The directory junction test ran and passed.
5. Ran main `npm ci`, `npm run verify` and `npm run test:contracts`: fixture validation passed and all 5 contract tests passed.
6. Audited the main checkout and a complete issue fixture with JSON output; both outputs parsed and included scores. Audited the repository as SARIF and parsed the output as SARIF 2.1.0. The vague issue fixture in strict mode returned exit code 1 as expected.
7. At the time of the walkthrough, seven Core/CLI issues were open without labels. Per subsequent maintainer direction, all seven were closed as not planned; no contributor tasks are currently offered before repository/program approval.

The measured CLI-plus-main dependency/setup/verification sequence took **42.36 seconds** after Core had already been installed and verified. Core's install/verification was successful but not separately timed with a stopwatch. The JSON/SARIF/strict audit commands took **1.29 seconds**. Clone and network time are excluded from these command timings.

## Documentation blockers found and corrected

- The CLI quick-start instructed `npm ci` in the CLI checkout even though `@contribready/core@0.1.0` is unpublished. A clean checkout cannot resolve that dependency from npm. The instructions now build and pack Core locally, then install the tarball into CLI with `--ignore-scripts`.
- `npm pack --prefix contribready-core` did not select the package directory when run from the common parent. The instructions now use `npm pack ./contribready-core --pack-destination .`, which was verified in the clean checkout.
- The main `CONTRIBUTING.md` now gives the complete sibling-repository order and commands, including the main cross-repository contract test.

An initial dependency install in the restricted command environment failed because DNS/network access to the public npm registry was unavailable. The same public dependency installation succeeded when rerun with network access; this was an environment permission issue, not a repository or package error.

## CI evidence

Each proposal branch completed all 9 Node/OS combinations successfully:

| Repository | Branch | Result | Run |
|---|---|---:|---|
| `contribready` | `audit/readiness-review-20261018-main` | 9/9 | [GitHub Actions](https://github.com/ContribReady/contribready/actions/runs/39217203320) |
| `contribready-core` | `audit/readiness-review-20261018-core` | 9/9 | [GitHub Actions](https://github.com/ContribReady/contribready-core/actions/runs/39216575294) |
| `contribready-cli` | `audit/readiness-review-20261018-cli` | 9/9 | [GitHub Actions](https://github.com/ContribReady/contribready-cli/actions/runs/39217202072) |

At the time of this walkthrough, the main repository's GitHub matrix ran fixture verification but did not run cross-repository contracts; all five contracts passed locally on Windows/Node 24. A later integration change added Core verification, packed-Core CLI installation/verification, and the contract suite to the main Node/OS matrix. The coordinated Core-main/CLI-proposal workflow passed 9/9 on Node 20/22/24 × Ubuntu/Windows/macOS in [run 39231291888](https://github.com/ContribReady/contribready/actions/runs/39231291888); the final documentation head also passed 9/9 in [run 39231949300](https://github.com/ContribReady/contribready/actions/runs/39231949300).

The first CI attempt exposed a real Windows issue: a junction could appear as a directory in `Dirent`, and traversal followed it. CLI now checks each entry with `lstat` before recursing, and the Windows junction regression passes in the matrix. The first CLI integration run also exposed a Core-version mismatch; the reviewed CLI workflow now checks out Core `main`, which contains the merged compatible contracts.

## Post-walkthrough integration status (2026-10-19)

Core PR #9 merged the Windows workflow-path normalization fix after 9/9 protected checks. CLI PR #8 head `cde13b4` adds an automated offline Core+CLI tarball install test and passed 9/9 on Node 20/22/24 × Ubuntu/Windows/macOS (run 39236884638); local verification passed 34 tests, with 2 symlink-creation skips. Main PR #4 head `8119979` passed the coordinated 9/9 matrix against CLI `cde13b4` (run 39237457143). CLI PR #8 and main PR #4 remain open and unmerged; after CLI merges, the main workflow must be switched from the proposal branch back to `main` and rerun. The seven pre-approval issues were closed as not planned and no contributor task is currently offered. See [the full readiness review](READINESS_REVIEW_20261018.md).

## Remaining limitations

- No independent external contributor participated; comprehension and issue-selection time are unmeasured.
- Contributor issue publication is deliberately deferred until relevant repository/program approval; only then should the maintainer select tasks, labels, complexity, and response expectations.
- One file-symlink test skipped on this Windows account because link creation was unavailable. Windows directory-junction coverage passed in CI. Replacement races, unusual reparse-point behavior, and live remote failure cases remain outside this walkthrough.
- The matrix validates the proposed branches; it does not prove semantic rule quality or establish false-positive/false-negative rates. The evaluation corpus remains synthetic.
- At walkthrough completion, no PRs had been opened. Subsequently, Core PR #7, CLI PR #8, and main PR #4 were opened. Core PR #7 is now merged; CLI PR #8 and main PR #4 remain open and unmerged. Packages remain unpublished. All seven pre-approval contributor issues created during preparation have since been closed as not planned at maintainer direction.
