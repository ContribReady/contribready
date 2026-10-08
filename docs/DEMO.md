# Demo

The current Phase 2 flow is:

```text
contribready audit ./project
contribready audit ./project --format json
contribready issue ./issue.md
```

The audit reads bounded conventional files and applies the current core rules. Reports show the readiness summary, evidence, failed rules, and next fixes. `--strict` returns exit code `1` when a rule fails; invalid input/options return exit code `2`.
