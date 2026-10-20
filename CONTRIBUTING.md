# Contributing

This is the ContribReady project source-of-truth repository. Change product direction, architecture, roadmap, release coordination, project documentation, examples, and cross-repository fixtures here. Put reusable analysis logic in `contribready-core` and CLI/GitHub adapter code in `contribready-cli`.

## Local setup

Use Node.js 20, 22, or 24. Clone the three repositories into a common parent directory, then verify them in dependency order:

```bash
git clone https://github.com/ContribReady/contribready.git
git clone https://github.com/ContribReady/contribready-core.git
git clone https://github.com/ContribReady/contribready-cli.git
npm ci --prefix contribready-core
npm run verify --prefix contribready-core
npm ci --prefix contribready-cli
npm run verify --prefix contribready-cli
npm ci --prefix contribready
npm run verify --prefix contribready
npm run test:contracts --prefix contribready
```

Core and CLI `0.1.0` are public npm packages, so CLI's lockfile resolves the released Core package during normal contributor setup. Coordinated CI additionally packs Core and installs that tarball into CLI to test unreleased cross-repository changes without a sibling-source import. Core still verifies before CLI. The main contract tests expect the three checkout directories to be siblings. The main repository's default fixture verification is offline and reads only its synthetic fixture corpus.

## Change and pull-request workflow

1. Create a focused branch from the current project state.
2. Update the relevant source-of-truth document, fixture, or contract test.
3. Run the main verification and the affected independent repository checks.
4. Open a pull request with the problem, scope, test commands/results, documentation impact, and any security implications.

Maintainers review project-boundary, deterministic-output, security, and documentation changes. Required CI checks must pass before merge; review comments should be resolved or explicitly discussed. Ask general questions through the documented support path; report vulnerabilities through `SECURITY.md`.
