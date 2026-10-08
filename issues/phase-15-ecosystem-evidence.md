# Expand contributor evidence classification beyond the initial ecosystems

## Problem

The current evidence classifier recognizes common Node.js, Python, Rust, Go, Java, Ruby, PHP, and Elixir manifests, but contributor setup and testing conventions from additional ecosystems may be missed or categorized as unknown.

## Steps to reproduce

1. Add a representative ecosystem manifest and contributor guide to a fixture repository.
2. Run a local audit in JSON format.
3. Compare the evidence inventory and setup findings with the repository's documented toolchain.

## Expected and observed behavior

Expected behavior: supported ecosystem evidence is classified deterministically and the relevant setup/testing rules recognize its documented commands. Observed behavior: unsupported or uncommon manifest names may be omitted from the contributor evidence inventory and produce unknown findings.

## Technical scope

Affected areas: Core path classification and metadata, setup/testing rules, fixture repositories, rule catalog, and cross-package contract tests. No dynamic execution or package installation is allowed.

## Acceptance criteria

- At least three additional ecosystems are selected from fixture-backed requirements before implementation.
- Each new category has explicit path, evidence, pass/fail/unknown/not-applicable, and false-positive behavior.
- Existing ecosystem classifications and report schema remain backward compatible.
- Fixtures cover complete, missing, and contradictory ecosystem evidence.
- Core, CLI, and main contract tests pass deterministically.

## Definition of done

The selected ecosystem scope is documented before coding, rule/catalog/docs/changelogs are updated, representative fixtures are added, and all independent and cross-package verification commands pass.
