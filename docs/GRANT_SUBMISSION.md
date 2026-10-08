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

1. Publish the three repositories under the maintainer's real GitHub organization or account.
2. Make the intended default branch and repository history visible and reviewable.
3. Use the official Drips claim flow for the primary `contribready` repository.
4. Complete ownership verification through the claim flow and commit only the real generated `FUNDING.json` required by Drips.
5. Link Core and CLI in the primary repository and explain their independent roles in the application.

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

## Final pre-submission checklist

- [ ] All three repositories are public under the intended maintainer organization.
- [ ] Maintainer identity, license, contribution, support, and security paths are complete.
- [ ] Core is published or has a documented release order before CLI publication.
- [ ] CLI installation and example commands work from a clean checkout.
- [ ] Main contract tests pass against the checked-out sibling repositories.
- [ ] No fake URLs, placeholder wallets, secrets, or private local paths remain in tracked files.
- [ ] Grant issues are created only after the maintainer authorizes external issue creation.
- [ ] The application names `contribready` as the primary repository and explains the Core/CLI boundaries.
