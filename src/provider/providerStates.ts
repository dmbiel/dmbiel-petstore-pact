import { resetPets } from './testData';

type ProviderStateAction = 'setup' | 'teardown';

interface PactProviderState {
  name?: string;
  state?: string;
}

export interface PactProviderStateChangeRequest {
  action?: ProviderStateAction;
  state?: string;
  states?: PactProviderState[];
}

const supportedProviderStates = new Set([
  'pet with ID 123 exists',
  'available pets exist',
  'provider accepts new pet creation'
]);

function extractProviderStateNames(request: PactProviderStateChangeRequest = {}): string[] {
  if (typeof request.state === 'string') {
    return [request.state];
  }

  return (
    request.states
      ?.map((state) => state.name ?? state.state)
      .filter((state): state is string => typeof state === 'string') ?? []
  );
}

export function setupProviderStates(request: PactProviderStateChangeRequest = {}): string[] {
  const states = extractProviderStateNames(request);

  if (request.action === 'teardown') {
    return states;
  }

  for (const state of states) {
    if (!supportedProviderStates.has(state)) {
      throw new Error(`Unsupported provider state: ${state}`);
    }
  }

  resetPets();

  return states;
}
