# License and security remediation status

**Reviewed:** 2026-10-18. This report supersedes the earlier pending-PR wording. It records currently verified public repository metadata and the date of security-setting verification separately.

## License status — verified on default branches

| Repository | GitHub detected license | Applicable package metadata | Current result |
|---|---|---|---|
| [`contribready`](https://github.com/ContribReady/contribready) | MIT | Main project has no npm package manifest/SPDX field | Complete MIT license merged; GitHub reports MIT |
| [`contribready-core`](https://github.com/ContribReady/contribready-core) | MIT | `package.json`: `MIT` | Complete MIT license merged; GitHub reports MIT |
| [`contribready-cli`](https://github.com/ContribReady/contribready-cli) | MIT | `package.json`: `MIT` | Complete MIT license merged; GitHub reports MIT |

The complete license corrections were merged in each repository's PR #2. They preserve `Copyright (c) 2026 ContribReady contributors`. GitHub's repository metadata returned `license.spdx_id: MIT` for all three on 2026-10-18.

## Security settings — historical verification and current limitation

The 2026-10-09 remediation run recorded readback of private vulnerability reporting, Dependabot alerts/security updates, secret scanning, and push protection as enabled across all three repositories; its setting-level commands and snapshot are preserved in the merged [audit report](../AUDIT_REPORT.md). This review did not obtain a new setting-level readback. The installed `gh` CLI reported its saved token invalid on 2026-10-18, and the connected GitHub tool did not expose the sensitive security-settings endpoints. Therefore those settings are **previously verified (2026-10-09), not reverified on 2026-10-18**. No security setting was changed during this review. No alert counts or current vulnerability state are asserted here.

The GitHub API did verify that each repository still has an active `Protect main` ruleset on 2026-10-18:

| Repository | Ruleset ID | State |
|---|---:|---|
| `contribready` | `24795267` | Active |
| `contribready-core` | `24795398` | Active |
| `contribready-cli` | `24795367` | Active |

Only ruleset identity and enforcement were read. Rule contents were not changed. The GitHub connector confirmed admin permission on each repository; to reverify/change security settings, reauthenticate GitHub CLI (`gh auth login -h github.com`) or use the repository's authenticated GitHub Security settings UI. Do not weaken `Protect main` or expose vulnerability details publicly.

## Security-documentation merge state

The focused security-policy updates merged as PR #3 in Core and CLI. Main's broader report/security update merged as PR #3. They document GitHub's private reporting route and recommend using the repository Security → Advisories → Report a vulnerability interface. A setting being enabled does not establish that maintainers monitor reports or respond within a service level.

No secrets, reports, public vulnerability issues, releases, package publication, or branch-protection changes were created by this audit.
