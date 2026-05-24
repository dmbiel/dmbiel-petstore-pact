import { setupProviderStates } from '../../src/provider/providerStates';
import { pets, resetPets } from '../../src/provider/testData';

describe('Pact provider state handlers', () => {
  beforeEach(() => {
    resetPets();
  });

  it('sets up a provider state from the Pact state field', () => {
    pets.length = 0;

    const states = setupProviderStates({
      action: 'setup',
      state: 'pet with ID 123 exists'
    });

    expect(states).toEqual(['pet with ID 123 exists']);
    expect(pets).toHaveLength(1);
    expect(pets[0].id).toBe(123);
  });

  it('sets up provider states from the Pact states collection', () => {
    const states = setupProviderStates({
      action: 'setup',
      states: [{ name: 'available pets exist' }, { state: 'provider accepts new pet creation' }]
    });

    expect(states).toEqual(['available pets exist', 'provider accepts new pet creation']);
  });

  it('rejects unsupported provider states during setup', () => {
    expect(() =>
      setupProviderStates({
        action: 'setup',
        state: 'missing pet exists'
      })
    ).toThrow('Unsupported provider state: missing pet exists');
  });

  it('does not reset fixture data during teardown', () => {
    pets.length = 0;

    const states = setupProviderStates({
      action: 'teardown',
      state: 'pet with ID 123 exists'
    });

    expect(states).toEqual(['pet with ID 123 exists']);
    expect(pets).toHaveLength(0);
  });
});
