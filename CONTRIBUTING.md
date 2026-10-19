# Contributing

This is the ContribReady project source-of-truth repository. Change product direction, architecture, roadmap, release coordination, project documentation, examples, and cross-repository fixtures here. Put reusable analysis logic in `contribready-core` and CLI/GitHub adapter code in `contribready-cli`.

## Local setup

Use Node.js 20, 22, or 24. The project has three repositories, and the CLI package depends on the unpublished Core package. From a common parent directory, clone all three repositories, then follow this order:

```bash
git clone https://github.com/ContribReady/contribready.git
git clone https://github.com/ContribReady/contribready-core.git
git clone https://github.com/ContribReady/contribready-cli.git
npm ci --prefix contribready-core
npm run verify --prefix contribready-core
npm pack ./contribready-core --pack-destination .
npm install --prefix contribready-cli --no-save --package-lock=false --ignore-scripts --no-audit --no-fund ./contribready-core-0.1.0.tgz
npm run verify --prefix contribready-cli
npm ci --prefix contribready
npm run verify --prefix contribready
npm run test:contracts --prefix contribready
```

The tarball step supplies the unpublished Core dependency without relying on a sibling-source link; `--ignore-scripts` prevents dependency lifecycle scripts from running during this setup. Core builds before CLI. The main contract tests expect the three checkout directories to be siblings. The main repository's default fixture verification is offline and reads only its synthetic fixture corpus.

## Change and pull-request workflow

1. Create a focused branch from the current project state.
2. Update the relevant source-of-truth document, fixture, or contract test.
3. Run the main verification and the affected independent repository checks.
4. Open a pull request with the problem, scope, test commands/results, documentation impact, and any security implications.

Maintainers review project-boundary, deterministic-output, security, and documentation changes. Required CI checks must pass before merge; review comments should be resolved or explicitly discussed. Ask general questions through the documented support path; report vulnerabilities through `SECURITY.md`.
