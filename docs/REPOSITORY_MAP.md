# Repository map

ContribReady uses one workspace folder for navigation and three independently maintained Git repositories. The workspace folder is not itself a Git repository.

## Ownership

| Repository | Owns | Does not own |
|---|---|---|
| `contribready` | Product mission, requirements, architecture, roadmap, project state, documentation, fixtures, contract tests, release coordination, and grant-facing narrative | The reusable Core implementation or the published CLI package |
| `contribready-core` | The deterministic, framework-independent analysis library, typed contracts, rules, scoring, recommendations, and Core tests | CLI argument parsing, terminal behavior, GitHub transport, or product-level release coordination |
| `contribready-cli` | The executable `contribready` command, local filesystem inspection, output formats, exit codes, and the optional GitHub adapter | The Core rule/scoring implementation or the umbrella project's roadmap |

The dependency direction is:

```text
contribready-cli  ->  @contribready/core
```

GitHub integration remains inside the CLI because it is currently an adapter used by that executable. It should become a separate repository only if it develops an independently reusable and deployable API with its own lifecycle.

## Which repository should reviewers start with?

Start with `contribready` for product intent, architecture, security boundaries, evidence fixtures, roadmap, and release status. Follow the links to Core for implementation contracts and to CLI for the user-facing command. This makes the main repository the product source of truth without pretending that every component belongs in one repository.

## Local workspace conventions

The expected local layout is:

```text
ContribReady/
  contribready/
  contribready-core/
  contribready-cli/
```

The CLI currently uses the sibling Core repository during local development and source CI. Once Core is published, the CLI release consumes the versioned registry package. The main repository's contract suite is an integration gate across these repositories; it is not a fourth repository.
