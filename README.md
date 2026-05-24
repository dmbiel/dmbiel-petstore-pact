# Petstore Pact Contract Testing

Consumer-driven contract testing example for Swagger Petstore API using Pact JS and
TypeScript.

## Purpose

This repository demonstrates how to test API contracts between a consumer and provider without
relying on full end-to-end environments.

The project models a small Petstore client that defines expectations for a Petstore API provider.
Consumer Pact tests generate a contract file, and provider verification checks that a local Express
provider can satisfy that contract.

## Tech Stack

- TypeScript
- Pact JS
- Jest
- Axios
- Express
- ESLint
- Prettier
- GitHub Actions

## System Under Test

Consumer: `PetstoreClient`  
Provider: `PetstoreAPI`

The example is inspired by Swagger Petstore, a sample API commonly used for OpenAPI demonstrations.

```text
Petstore Web/Mobile Client  --->  Petstore API
        Consumer                    Provider
```

## What Is Contract Testing?

Contract testing verifies that two systems agree on the shape and behavior of their interaction.

Unlike traditional API tests, contract tests do not primarily check whether a deployed API works
end-to-end. Instead, they verify whether the provider can satisfy expectations defined by the
consumer. In consumer-driven contract testing, the consumer records the behavior it needs, and the
provider is verified against that already generated contract.

This reduces dependency on slow, expensive, and brittle end-to-end integration tests while still
protecting service integration quality.

## Covered Contracts

| Interaction | Method | Endpoint |
| --- | ---: | --- |
| Get pet by ID | GET | `/v2/pet/{petId}` |
| Find pets by status | GET | `/v2/pet/findByStatus` |
| Create pet | POST | `/v2/pet` |

## Project Structure

```text
.
├── .github/workflows/contract-tests.yml
├── pacts/
├── src/
│   ├── consumer/
│   │   ├── petstoreClient.ts
│   │   └── types.ts
│   ├── provider/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   └── testData.ts
│   └── shared/
│       └── petMatchers.ts
└── tests/
    ├── consumer/
    └── provider/
```

- `src/consumer` contains the TypeScript API client and Petstore domain types.
- `src/provider` contains a local Express provider stub used for deterministic verification.
- `src/shared` contains Pact matchers shared by the consumer contract tests.
- `tests/consumer` generates Pact contracts from consumer expectations.
- `tests/provider` verifies the local provider against generated Pact files.
- `pacts` stores generated contract artifacts for review and CI upload.

## How to Install

```bash
npm install
```

## How to Run Consumer Pact Tests

```bash
npm run test:consumer
```

## How to Run Provider Verification

```bash
npm run test:provider
```

## How to Run All Contract Tests

```bash
npm run test:contract
```

## Quality Checks

```bash
npm run typecheck
npm run lint
```

## Generated Pact Contract

Consumer tests generate a Pact file in:

```text
pacts/PetstoreClient-PetstoreAPI.json
```

The generated contract is intentionally not ignored by Git. For a portfolio repository, keeping the
contract visible makes the consumer/provider flow easier to inspect.

## CI

GitHub Actions runs:

- TypeScript check
- ESLint
- Consumer Pact tests
- Provider Pact verification
- Pact artifact upload

## Why Local Provider Instead of Live Petstore?

The public Petstore API is useful as a learning reference, but it should not be a hard dependency
for CI. Public demo APIs can be unstable, reset data, change behavior, or respond unpredictably.

A stable local provider makes the contract testing pipeline deterministic while still demonstrating
the important Pact workflow:

1. Consumer tests define expectations.
2. Consumer tests generate the Pact contract.
3. Provider verification checks compatibility with that contract.

## Portfolio Value

This project demonstrates practical contract testing skills relevant for distributed systems and
microservice-based architectures.

It shows how to:

- define consumer expectations;
- generate Pact contracts;
- verify provider compatibility;
- keep tests deterministic in CI;
- avoid overusing slow and brittle end-to-end tests.

Alongside Playwright, k6, and ReqnRoll examples, this repository covers service integration quality
without requiring a full environment dependency.

## Future Improvements

- Add Pact Broker or PactFlow integration
- Add can-i-deploy checks
- Add negative contract scenarios
- Add OpenAPI schema comparison
- Add Docker support
- Add GitHub Pages test report
