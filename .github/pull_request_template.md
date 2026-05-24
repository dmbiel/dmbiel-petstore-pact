## Summary

Describe what changed and why.

## Change Type

- [ ] Consumer contract change
- [ ] Provider verification change
- [ ] Provider implementation change
- [ ] CI/CD change
- [ ] Documentation change
- [ ] Dependency or tooling change

## Contract Testing Checklist

- [ ] Consumer expectations are clear and focused on `PetstoreClient` behavior.
- [ ] Pact matchers are used instead of brittle full JSON equality where applicable.
- [ ] Generated Pact contract changes in `pacts/` are intentional and reviewed.
- [ ] Provider states are updated when the interaction requires fixture setup.
- [ ] Provider verification uses the local Express provider, not the live Petstore demo API.
- [ ] The change keeps CI deterministic.

## Local Checks

Run the relevant checks before requesting review.

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run test:consumer`
- [ ] `npm run test:provider`
- [ ] `npm run test:contract`

## Notes For Reviewers

Mention anything that deserves extra attention, such as generated contract changes,
provider state behavior, CI pipeline changes, or intentionally skipped checks.
