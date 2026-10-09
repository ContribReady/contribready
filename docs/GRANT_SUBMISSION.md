# Grant submission preparation

This document defines the clean submission shape for ContribReady. It is a preparation guide, not a claim of eligibility or funding approval.

## Submission structure

Use `contribready` as the primary project repository. It contains the product narrative, architecture, roadmap, state, security model, fixtures, and release coordination that a reviewer needs to understand the whole project.

Link the supporting repositories from the primary submission:

- `contribready-core` — reusable deterministic analysis library.
- `contribready-cli` — executable CLI and its optional GitHub adapter.

Do not submit the parent `ContribReady` workspace folder as a repository. Do not create another documentation-only repository. The umbrella repository already owns project documentation as part of the product source of truth.

## Drips preparation

Drips applications are based on a claimed GitHub repository. Before applying:

1. [x] Publish the three repositories under the maintainer's real GitHub organization or account: [main project](https://github.com/ContribReady/contribready), [Core](https://github.com/ContribReady/contribready-core), and [CLI](https://github.com/ContribReady/contribready-cli).
2. [x] Make the intended default branch and repository history visible and reviewable; all three use `main`.
3. Use the official Drips claim flow for the primary `contribready` repository.
4. Complete ownership verification through the claim flow and commit only the real generated `FUNDING.json` required by Drips.
5. [x] Link Core and CLI in the primary repository and explain their independent roles.

Never add a placeholder wallet address or a hand-written `FUNDING.json` merely to look grant-ready. The file must be generated for the real claimed repository and real funding address through the official process.

Official references: [Drips project and round application](https://docs.drips.network/rpgf/apply-to-a-round/) and [Drips repository claiming](https://docs.drips.network/get-support/claim-your-repository/).

## GrantFox preparation

GrantFox presents itself as a Web3 collaboration ecosystem where projects publish contribution opportunities and contributors apply to tasks. Prepare the public repositories with:

- a clear project overview and architecture map;
- bounded, technically meaningful GitHub issues with acceptance criteria;
- milestone ownership, expected deliverables, and review expectations;
- maintainer contact and security reporting paths;
- evidence of actual implementation, tests, and release intent;
- links from the primary repository to Core and CLI.

This repository does not claim automatic GrantFox eligibility. Confirm the current program, application route, and requirements directly with GrantFox before submission: [GrantFox documentation](https://docs.grantfox.xyz/) and [GrantChain GitHub organization](https://github.com/GrantChain).

Drips is retrospective funding: assemble demonstrable completed impact and apply only when an eligible round is in Registration. A public repository or polished roadmap alone is insufficient; see the [independent audit](../AUDIT_REPORT.md). SCF/GrantFox program eligibility is not established by repository quality. Validate actual ecosystem fit, program criteria, traction, team eligibility, and a credible delivery/budget plan before applying.

## Final pre-submission checklist

- [x] All three repositories are public under the intended maintainer organization.
- [ ] Complete approved license text is present and GitHub detects the intended license in all three repositories.
- [ ] A working private security-reporting route is configured and tested in all three repositories; SECURITY.md files alone do not provide this.
- [x] Contribution and support policy documents are present; support points to enabled issue trackers.
- [x] Core-before-CLI release order is documented; npm package releases remain pending.
- [ ] CLI source-checkout instructions work from a clean checkout; registry installation must wait until Core and CLI are published.
- [x] Main contract tests pass against the checked-out sibling repositories.
- [x] No fake repository URLs, placeholder wallet, secrets, or private local paths were found in the tracked project files during preparation.
- [ ] Grant issues are created only after the maintainer authorizes external issue creation.
- [x] The application guide names `contribready` as the primary repository and explains the Core/CLI boundaries.
