import path from 'path';
import { PactV3 } from '@pact-foundation/pact';
import { PetstoreClient } from '../../src/consumer/petstoreClient';
import {
  createPetRequestBody,
  createPetResponseMatcher,
  jsonContentTypeHeader
} from '../../src/shared/petMatchers';

describe('Pact consumer test: create pet', () => {
  const provider = new PactV3({
    consumer: 'PetstoreClient',
    provider: 'PetstoreAPI',
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info'
  });

  it('creates a new pet', async () => {
    provider
      .given('provider accepts new pet creation')
      .uponReceiving('a request to create a pet')
      .withRequest({
        method: 'POST',
        path: '/v2/pet',
        headers: {
          Accept: 'application/json',
          'Content-Type': jsonContentTypeHeader
        },
        body: createPetRequestBody
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': jsonContentTypeHeader
        },
        body: createPetResponseMatcher
      });

    await provider.executeTest(async (mockServer) => {
      const client = new PetstoreClient(mockServer.url);
      const createdPet = await client.createPet(createPetRequestBody);

      expect(createdPet.id).toEqual(456);
      expect(createdPet.name).toEqual('Buddy');
      expect(createdPet.status).toEqual('available');
    });
  });
});
