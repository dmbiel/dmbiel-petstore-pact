# Contributing

Thank you for taking an interest in this project. This repository is a portfolio
example for consumer-driven contract testing with Pact JS, TypeScript, Jest, and
a local Express provider.

The main goal is to keep the project easy to understand, deterministic to run,
and useful as a practical contract testing reference.

## Development Principles

- Keep the consumer/provider contract testing flow explicit.
- Prefer small, focused pull requests.
- Keep CI independent from the live Swagger Petstore demo API.
- Use Pact matchers for contract shape and compatibility checks.
- Avoid turning Pact tests into broad end-to-end API tests.
- Keep generated Pact contracts reviewable in the `pacts/` directory.
- Pin dependency versions to keep clean checkouts reproducible.

## Branch And Pull Request Workflow

Create a new branch from `main` for each logical change.

Recommended branch examples:

- `docs/future-improvements`
- `docs/provider-state-verification`
- `test/provider-state-handlers`
- `ci/split-contract-workflow`
- `chore/pin-dependencies`

Use neutral branch names that describe the change. Avoid vendor- or tool-branded
branch prefixes.

Before opening a pull request:

1. Rebase or update from the latest `main`.
2. Keep the PR focused on one theme.
3. Explain what changed and why.
4. Mention whether the change affects consumer contracts, provider verification,
   documentation, or CI.
5. Run the relevant local checks.

## Local Setup

Use Node.js 22 to match the GitHub Actions runtime.

```bash
npm install
```

## Local Checks

Run type checking:

```bash
npm run typecheck
```

Run linting:

```bash
npm run lint
```

Run consumer Pact tests:

```bash
npm run test:consumer
```

Run provider verification:

```bash
npm run test:provider
```

Run the full contract testing flow:

```bash
npm run test:contract
```

## Contract Testing Guidelines

Consumer Pact tests should define the expectations of `PetstoreClient` against
`PetstoreAPI`. They should generate a Pact contract in:

```text
pacts/PetstoreClient-PetstoreAPI.json
```

When adding or changing a consumer interaction:

1. Add or update the consumer Pact test.
2. Use Pact matchers for flexible but meaningful compatibility checks.
3. Regenerate the Pact contract with `npm run test:consumer`.
4. Verify the local provider with `npm run test:provider`.
5. Review the generated Pact file before committing.

Provider verification should check the local Express provider against the
generated contract. Do not make required CI checks depend on the public
Petstore demo API.

## Provider State Guidelines

Provider states should describe the fixture setup needed by a specific Pact
interaction, for example:

- `pet with ID 123 exists`
- `available pets exist`
- `provider accepts new pet creation`

When adding provider states:

1. Keep state names readable and consumer-focused.
2. Reset local test data before setting up a state.
3. Keep state setup deterministic.
4. Avoid sharing mutable state between interactions.

## Documentation Guidelines

Documentation should help a reviewer understand the project quickly.

Good documentation changes explain:

- why contract tests are used;
- how consumer tests generate Pact contracts;
- how provider verification works;
- why the local provider is used in CI;
- what is intentionally left for future improvements.

## Commit Message Style

Use short conventional commit-style messages when possible:

- `docs: add future improvements roadmap`
- `test: add provider state verification coverage`
- `ci: split contract testing workflow`
- `chore: pin dependency versions`

## Definition Of Done

A change is ready when:

- the implementation or documentation is focused and reviewable;
- relevant local checks pass;
- generated Pact changes are intentional;
- CI is expected to remain deterministic;
- README or docs are updated when behavior changes.
