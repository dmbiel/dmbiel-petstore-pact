import path from 'path';
import { PactV3 } from '@pact-foundation/pact';
import { PetstoreClient } from '../../src/consumer/petstoreClient';
import { jsonContentTypeHeader, petArrayResponseMatcher } from '../../src/shared/petMatchers';

describe('Pact consumer test: find pets by status', () => {
  const provider = new PactV3({
    consumer: 'PetstoreClient',
    provider: 'PetstoreAPI',
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info'
  });

  it('returns available pets', async () => {
    provider
      .given('available pets exist')
      .uponReceiving('a request to find pets by status')
      .withRequest({
        method: 'GET',
        path: '/v2/pet/findByStatus',
        query: {
          status: 'available'
        },
        headers: {
          Accept: 'application/json'
        }
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': jsonContentTypeHeader
        },
        body: petArrayResponseMatcher
      });

    await provider.executeTest(async (mockServer) => {
      const client = new PetstoreClient(mockServer.url);
      const pets = await client.findPetsByStatus('available');

      expect(pets.length).toBeGreaterThan(0);
      expect(pets[0].status).toEqual('available');
    });
  });
});
