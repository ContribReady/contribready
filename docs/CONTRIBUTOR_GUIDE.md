# Contributor Guide

Choose the repository matching the change: project direction/docs/fixtures in `contribready`, rules/models in `contribready-core`, and commands/presentation/GitHub transport in `contribready-cli`. Read project state and the relevant phase first. Keep changes small, add deterministic tests, preserve dependency direction, and update docs for behavioral changes. Contribution-readiness behavior is specified in [CONTRIBUTION_READINESS.md](CONTRIBUTION_READINESS.md).

Use Node.js 20, 22, or 24. In the main repository, run `npm ci`, `npm run verify`, and—after building both sibling packages—`npm run test:contracts`. In Core or CLI, run `npm ci` and `npm run verify`. Never run scripts from a repository being audited as part of ContribReady analysis.

Before opening a pull request, state the affected repository, rule or contract impact, verification commands and results, fixture changes, and any compatibility/security implications. Review requires passing CI and maintainer approval; support questions belong in `SUPPORT.md`, while vulnerability reports must remain private.
