# Security

The project defaults to static analysis and does not execute target repository code. Do not post vulnerability details in a public issue. GitHub private vulnerability reporting is enabled for the [main repository](https://github.com/ContribReady/contribready/security/advisories), [Core](https://github.com/ContribReady/contribready-core/security/advisories), and [CLI](https://github.com/ContribReady/contribready-cli/security/advisories). On the repository's Security → Advisories page, use **Report a vulnerability** to submit a private report.

The current security controls and residual risks are documented in [docs/SECURITY_THREAT_MODEL.md](docs/SECURITY_THREAT_MODEL.md). GitHub access is opt-in, limited to canonical HTTPS GitHub URLs, and uses `GITHUB_TOKEN` only as an authorization header. Tokens, issue instructions, repository commands, and workflow content are never executed or included in reports.
