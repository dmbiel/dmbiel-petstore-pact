import { Server } from 'http';
import { AddressInfo } from 'net';
import path from 'path';
import { Verifier } from '@pact-foundation/pact';
import { createProviderApp } from '../../src/provider/app';

describe('Pact provider verification: Petstore API', () => {
  let server: Server;
  let providerBaseUrl: string;

  beforeAll((done) => {
    const app = createProviderApp();

    server = app.listen(0, () => {
      const address = server.address() as AddressInfo;
      providerBaseUrl = `http://127.0.0.1:${address.port}`;
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('verifies PetstoreAPI provider against generated Pact contracts', async () => {
    const verifier = new Verifier({
      provider: 'PetstoreAPI',
      providerBaseUrl,
      pactUrls: [path.resolve(process.cwd(), 'pacts', 'PetstoreClient-PetstoreAPI.json')],
      stateHandlers: {
        'pet with ID 123 exists': async () => Promise.resolve(),
        'available pets exist': async () => Promise.resolve(),
        'provider accepts new pet creation': async () => Promise.resolve()
      }
    });

    await verifier.verifyProvider();
  });
});
