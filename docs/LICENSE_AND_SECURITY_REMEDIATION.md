# License and Security Remediation

**Work date:** 2026-10-09 (Africa/Lagos)

## Scope and verified repository identity

Authenticated GitHub account: `Marvelg256`. GitHub API repository records show this account has administrator permission on each target. Credentials were not read or included in output.

| Repository | Local checkout | Git remote | Default branch |
| --- | --- | --- | --- |
| [`ContribReady/contribready`](https://github.com/ContribReady/contribready) | `C:\Users\user\Projects\ContribReady\contribready` | `https://github.com/ContribReady/contribready.git` | `main` |
| [`ContribReady/contribready-core`](https://github.com/ContribReady/contribready-core) | `C:\Users\user\Projects\ContribReady\contribready-core` | `https://github.com/ContribReady/contribready-core.git` | `main` |
| [`ContribReady/contribready-cli`](https://github.com/ContribReady/contribready-cli) | `C:\Users\user\Projects\ContribReady\contribready-cli` | `https://github.com/ContribReady/contribready-cli.git` | `main` |

The original checkouts were clean on their existing pushed audit branches; no user changes were overwritten. License corrections were made in isolated worktrees based on each repository's fetched `origin/main`.

## License corrections

Each proposed `LICENSE` preserves `Copyright (c) 2026 ContribReady contributors` and exactly matches the requested complete standard MIT text (line endings normalized for comparison). Core and CLI `package.json` declare `MIT`. The main repository uses a private project manifest with no SPDX license field; its README was corrected so it no longer claims that manifest declares MIT.

| Repository | License branch / commit | Pull request | Merge state | GitHub detection |
| --- | --- | --- | --- | --- |
| `contribready` | `fix/complete-mit-license` / `1767c5a` | [#2](https://github.com/ContribReady/contribready/pull/2) | Open; not merged at report time | `NOASSERTION` / Other on `main`; recheck after merge |
| `contribready-core` | `fix/complete-mit-license` / `77818b6` | [#2](https://github.com/ContribReady/contribready-core/pull/2) | Open; not merged at report time | `NOASSERTION` / Other on `main`; recheck after merge |
| `contribready-cli` | `fix/complete-mit-license` / `d32fc9d` | [#2](https://github.com/ContribReady/contribready-cli/pull/2) | Open; not merged at report time | `NOASSERTION` / Other on `main`; recheck after merge |

The exact-text comparison passed for all three proposed files. `git diff --check` passed. These are text-only changes; package tests were not necessary for the license content itself. No PR was merged automatically.

## Security settings verified after changes

| Setting | `contribready` | `contribready-core` | `contribready-cli` |
| --- | --- | --- | --- |
| Private vulnerability reporting | Enabled and API-verified | Enabled and API-verified | Enabled and API-verified |
| Dependabot alerts | Already enabled (HTTP 204) | Already enabled (HTTP 204) | Already enabled (HTTP 204) |
| Open Dependabot alerts | 0 | 0 | 0 |
| Dependabot security updates | Enabled; `paused: false` | Enabled; `paused: false` | Enabled; `paused: false` |
| Secret scanning | Enabled | Enabled | Enabled |
| Repository push protection | Enabled | Enabled | Enabled |
| Open secret-scanning alerts | 0 | 0 | 0 |
| `Protect main` ruleset | Active (ID 24795267) | Active (ID 24795398) | Active (ID 24795367) |

Dependabot alerts were already enabled and were not toggled. The other enabled settings were verified by reading their corresponding repository API state after the change. GitHub's secret-scanning API was queried for open-alert counts only; no alert content or secret material was retrieved. Public repositories receive free secret-scanning coverage; the repository-level scanning and push-protection settings now also report enabled. Non-provider secret patterns and validity checks remain disabled and were not requested or changed.

Private vulnerability reporting was enabled with GitHub's documented repository API. The main, Core, and CLI `SECURITY.md` instructions are being updated in focused documentation PRs to point to the private **Security → Advisories → Report a vulnerability** path:

- Main report/guidance: [contribready PR #3](https://github.com/ContribReady/contribready/pull/3) (open; contains this report)
- Core guidance: [contribready-core PR #3](https://github.com/ContribReady/contribready-core/pull/3)
- CLI guidance: [contribready-cli PR #3](https://github.com/ContribReady/contribready-cli/pull/3)

The `Protect main` rulesets were read before and after; all three remain active with the same IDs and enforcement. No branch rule, bypass actor, target, visibility, or default branch was modified. No direct push to `main`, force-push, merge, release, or plan/billing change was performed.

## Operations and validation

Read-only inspection used `git status --porcelain=v2 --branch`, `git remote -v`, `gh auth status`, `gh api user`, repository metadata, ruleset listings, and the license/package files. The authenticated identity and admin permission were verified without exposing credentials.

GitHub security operations used `PUT /repos/{owner}/{repo}/private-vulnerability-reporting`, `PUT /repos/{owner}/{repo}/automated-security-fixes`, and `PATCH /repos/{owner}/{repo}` with only the `secret_scanning` and `secret_scanning_push_protection` status fields. Dependabot alerts were verified with `GET /repos/{owner}/{repo}/vulnerability-alerts`; alert counts used the Dependabot and secret-scanning list endpoints with output restricted to counts/severity groups. Final states were then read back from the API.

License branches were compared exactly against the required standard MIT wording (line endings normalized), checked for the preserved notice, checked against applicable package metadata, and run through `git diff --check`. The main project manifest has no applicable SPDX `license` declaration; Core and CLI both declare MIT.

## Remaining actions

1. Review and merge the three license PRs through the active Protect main workflow; then query GitHub's `license.spdx_id` again for each repository. Until merge, detected license remains `NOASSERTION`/Other and must not be represented as corrected on `main`.
2. Review and merge the three security-policy documentation PRs. The private-reporting settings themselves are already enabled and verified; no test vulnerability was submitted.
3. Recheck all security settings and Protect main rulesets after merges. Dependabot and secret-alert counts were zero at this audit snapshot; enabling alerts does not imply dependencies are risk-free.

No setting change was rejected or blocked by permissions or plan limitations. The three license PRs and two component security-documentation PRs had passing automated CI checks and were reported mergeable with no conflicts at the last readback. This report-only update created a new head for the main report PR; its CI rerun was pending at final verification, so recheck it before merging. All six PRs remain open and unmerged for maintainer review.
