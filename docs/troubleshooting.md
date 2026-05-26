# Troubleshooting

This guide covers common local and CI issues for the Petstore Pact contract
testing project.

## Consumer Tests Do Not Generate A Pact File

Expected file:

```text
pacts/PetstoreClient-PetstoreAPI.json
```

Run:

```bash
npm run test:consumer
```

If the file is missing:

1. Make sure the consumer test finished successfully.
2. Check that `PactV3` uses `dir: path.resolve(process.cwd(), 'pacts')`.
3. Check that the consumer and provider names match across tests:
   `PetstoreClient` and `PetstoreAPI`.
4. Delete any stale local pact file and rerun the consumer tests.

## Provider Verification Cannot Find The Pact File

Provider verification expects the generated contract at:

```text
pacts/PetstoreClient-PetstoreAPI.json
```

Run the consumer tests before provider verification:

```bash
npm run test:consumer
npm run test:provider
```

The combined script does this in order:

```bash
npm run test:contract
```

## Provider State Is Unsupported

Example failure:

```text
Unsupported provider state: missing pet exists
```

This means the Pact contract contains a `.given(...)` state that is not supported
by `src/provider/providerStates.ts`.

To fix it:

1. Add the state name to `supportedProviderStates`.
2. Update fixture setup if the state requires specific data.
3. Add or update provider state unit tests.
4. Run provider verification again.

## Content-Type Header Mismatch

Express may return a content type such as:

```text
application/json; charset=utf-8
```

The project uses a Pact `regex` matcher for JSON content type headers so that
valid charset variants do not break verification.

If this fails, check:

- the expected response headers in consumer Pact tests;
- `jsonContentTypeHeader` in `src/shared/petMatchers.ts`;
- the actual provider response header in the verifier output.

## VS Code Test Runner Keeps Running Tests

This project is configured for on-demand Jest runs in VS Code.

Check:

```text
.vscode/settings.json
```

Expected behavior:

- Jest should not rerun continuously after every file change.
- Tests should run when explicitly triggered from the UI.

If tests keep running repeatedly, confirm the Jest extension is not overriding
the workspace run mode.

## Native Pact Or Verifier Issues On Windows

If Pact native tooling or provider verification fails on Windows:

1. Run the tests from a normal terminal first, outside the editor UI.
2. Confirm dependencies were installed with `npm install` or `npm ci`.
3. Delete `node_modules` and reinstall if native packages look corrupted.
4. Confirm Node.js matches the project runtime expectation: Node.js 22.
5. Check whether antivirus or corporate endpoint tooling blocked a native Pact
   binary.

## Port Conflicts

Consumer Pact tests start a mock provider server. Provider verification starts
the local Express app on a random available port.

If a test fails with a port-related error:

1. Rerun the test once.
2. Check whether another stuck Node.js process is running.
3. Restart the terminal or editor if the process is owned by a previous test
   session.

## CI Fails But Local Tests Pass

Check the GitHub Actions job that failed:

- `quality`
- `consumer-contracts`
- `provider-verification`

Common causes:

- dependency lockfile was not updated;
- generated Pact contract was not committed when expected;
- provider verification ran before the contract artifact was available;
- behavior depends on local state that CI does not have.

CI should not depend on the live Swagger Petstore demo API. Required checks
should use the local provider fixture.

## Useful Commands

```bash
npm run typecheck
npm run lint
npm run test:consumer
npm run test:provider
npm run test:contract
```
