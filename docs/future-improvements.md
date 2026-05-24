# Future Improvements

This document captures the long-term improvement backlog for the Petstore Pact
contract testing project. The current repository intentionally focuses on a stable
basic flow: consumer Pact tests generate a contract, provider verification checks
the local provider against that contract, and GitHub Actions runs the pipeline in
a deterministic way.

The items below are future enhancements that can be implemented incrementally in
separate branches and pull requests.

## Contract Testing

1. Add Pact Broker integration.
2. Add PactFlow integration as a hosted alternative.
3. Add `can-i-deploy` checks to CI.
4. Publish generated consumer contracts from CI.
5. Publish provider verification results.
6. Add consumer versioning using Git commit SHA.
7. Add provider versioning using Git commit SHA.
8. Add branch/environment tags for contracts.
9. Add support for multiple consumers.
10. Add support for multiple providers.

## Provider Verification

1. Expand provider state setup and teardown coverage.
2. Add provider states with dynamic test data.
3. Add verification for missing pet scenario: `404 Pet not found`.
4. Add verification for invalid status query: `400 Bad Request`.
5. Add verification for malformed create pet request.
6. Add stricter response header verification.
7. Add provider verification against pact files downloaded from Pact Broker.
8. Add separate provider fixture lifecycle per interaction.
9. Add request/response logging for failed provider verification.
10. Add provider verification summary artifact in CI.

## Consumer Contracts

1. Add negative consumer contract scenarios.
2. Add contract for updating a pet: `PUT /v2/pet`.
3. Add contract for deleting a pet: `DELETE /v2/pet/{petId}`.
4. Add contract for uploading pet image if useful for Petstore coverage.
5. Add stronger Pact matchers for arrays with minimum item counts.
6. Add regex matchers for URLs in `photoUrls`.
7. Add enum-like matchers for `status`.
8. Add examples for optional fields such as `category` and `tags`.
9. Add tests for query parameter encoding.
10. Add reusable Pact interaction builders.

## OpenAPI Alignment

1. Add OpenAPI schema reference for Swagger Petstore.
2. Compare Pact contracts with OpenAPI schema.
3. Document where Pact and OpenAPI solve different problems.
4. Add OpenAPI linting with Spectral.
5. Add a short `docs/openapi-vs-pact.md`.
6. Add generated API types from OpenAPI as an optional experiment.
7. Validate local provider responses against OpenAPI schema.
8. Document why OpenAPI schema validation is not a replacement for consumer-driven contracts.

## CI/CD

1. Add GitHub Actions job summary with contract test results.
2. Add dependency caching improvements.
3. Add separate artifact upload for provider verification logs.
4. Add CI matrix for Node.js LTS versions.
5. Add scheduled CI run to detect dependency/runtime issues.
6. Add status badges for typecheck, lint, consumer contracts, and provider verification if split into separate workflows.
7. Add issue templates for contract changes and provider verification failures.
8. Add required checks documentation.
9. Add release workflow for tagged portfolio versions.

## Developer Experience

1. Add `npm run test:watch`.
2. Add `npm run test:consumer:watch`.
3. Add `npm run test:provider:watch`.
4. Add VS Code recommended extensions.
5. Add VS Code tasks for consumer/provider contract tests.
6. Add `.editorconfig`.
7. Add `lint-staged` and `husky` pre-commit hooks.
8. Add clearer troubleshooting docs for Pact native binaries.
9. Add troubleshooting docs for Windows-specific Pact issues.

## Test Reporting

1. Add Jest JUnit report generation.
2. Upload test reports as CI artifacts.
3. Add HTML test report.
4. Add Pact verification logs as artifacts.
5. Add coverage report, even if coverage is not the main goal.
6. Add README screenshots of successful CI and generated Pact artifact.
7. Add a sample provider verification failure example in docs.
8. Add documentation showing how to read a Pact file.

## Provider Stub

1. Add basic request validation.
2. Add in-memory create/update/delete behavior.
3. Add deterministic reset endpoint for test setup.
4. Add richer test fixtures.
5. Add validation for allowed pet statuses.
6. Add typed Express request handlers.
7. Add error response types.
8. Add provider unit tests for every route.
9. Add separation between route handlers and data store.
10. Add lightweight service layer if provider logic grows.

## Documentation

1. Add `docs/contract-testing-basics.md`.
2. Add `docs/api-tests-vs-contract-tests.md` if the README section needs more depth.
3. Add `docs/provider-states.md`.
4. Add `docs/ci-pipeline.md`.
5. Add `docs/troubleshooting.md`.
6. Add diagrams for consumer/provider flow.
7. Add PR-by-PR development history.
8. Add a "How to review this portfolio project" section.
9. Add a "What this project intentionally does not cover" section.

## Portfolio Polish

1. Add repository social preview image.
2. Add concise project summary at the top of README.
3. Add architecture diagram.
4. Add CI pipeline diagram.
5. Add a "Skills demonstrated" section.
6. Add an "Interview talking points" section.
7. Add a "Trade-offs and limitations" section.
8. Add badges for CI, TypeScript, Pact, Jest, and license.
9. Add links to related portfolio repositories.
10. Add a final tagged release: `v1.0.0`.

## Not For The First Version

These items are useful, but they are intentionally left outside the initial
portfolio version until the core contract testing flow is already stable.

1. Docker support.
2. Pact Broker.
3. PactFlow.
4. `can-i-deploy`.
5. Multi-consumer examples.
6. Full OpenAPI contract comparison.
7. Mutation testing.
8. Real deployed provider environment.
9. GitHub Pages report publishing.
10. Complex microservice demo.

## Suggested Next Improvements

The most useful next improvements after the current version are:

1. Add `docs/provider-states.md`.
2. Add `docs/troubleshooting.md`.
3. Add a consumer/provider flow diagram.

These improvements increase portfolio maturity without expanding the project
scope too quickly.
