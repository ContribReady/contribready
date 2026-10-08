# Contributing

This is the ContribReady project source-of-truth repository. Change product direction, architecture, roadmap, release coordination, project documentation, examples, and cross-repository fixtures here. Put reusable analysis logic in `contribready-core` and CLI/GitHub adapter code in `contribready-cli`.

## Local setup

Use Node.js 20, 22, or 24. From this repository run `npm ci`, `npm run verify`, and `npm run test:contracts` after building and testing the sibling Core and CLI repositories. The default project tests are offline and read only the fixture corpus.

## Change and pull-request workflow

1. Create a focused branch from the current project state.
2. Update the relevant source-of-truth document, fixture, or contract test.
3. Run the main verification and the affected independent repository checks.
4. Open a pull request with the problem, scope, test commands/results, documentation impact, and any security implications.

Maintainers review project-boundary, deterministic-output, security, and documentation changes. Required CI checks must pass before merge; review comments should be resolved or explicitly discussed. Ask general questions through the documented support path; report vulnerabilities through `SECURITY.md`.
