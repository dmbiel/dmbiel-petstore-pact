import path from 'path';
import { PactV3 } from '@pact-foundation/pact/src/v3';
import { PetstoreClient } from '../../src/consumer/petstoreClient';
import { jsonContentTypeHeader, petResponseMatcher } from '../../src/shared/petMatchers';

describe('Pact consumer test: get pet by ID', () => {
  const provider = new PactV3({
    consumer: 'PetstoreClient',
    provider: 'PetstoreAPI',
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info'
  });

  it('returns a pet by ID', async () => {
    provider
      .given('pet with ID 123 exists')
      .uponReceiving('a request to get pet by ID')
      .withRequest({
        method: 'GET',
        path: '/v2/pet/123',
        headers: {
          Accept: 'application/json'
        }
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': jsonContentTypeHeader
        },
        body: petResponseMatcher
      });

    await provider.executeTest(async (mockServer) => {
      const client = new PetstoreClient(mockServer.url);
      const pet = await client.getPetById(123);

      expect(pet.id).toEqual(123);
      expect(pet.name).toEqual('Rex');
      expect(pet.status).toEqual('available');
    });
  });
});
