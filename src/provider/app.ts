import express from 'express';
import { Pet } from '../consumer/types';
import { pets } from './testData';
import { PactProviderStateChangeRequest, setupProviderStates } from './providerStates';

export interface ProviderAppOptions {
  enablePactStateSetup?: boolean;
}

export function createProviderApp(options: ProviderAppOptions = {}) {
  const app = express();

  app.use(express.json());

  if (options.enablePactStateSetup) {
    app.all('/_pact/provider-states', (req, res) => {
      try {
        const states = setupProviderStates(req.body as PactProviderStateChangeRequest);

        return res.status(200).json({ states });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Provider state setup failed';

        return res.status(400).json({ message });
      }
    });
  }

  app.get('/v2/pet/findByStatus', (req, res) => {
    const status = req.query.status;

    if (!status || typeof status !== 'string') {
      return res.status(400).json({ message: 'Status query parameter is required' });
    }

    const filteredPets = pets.filter((pet) => pet.status === status);

    return res.status(200).json(filteredPets);
  });

  app.get('/v2/pet/:petId', (req, res) => {
    const petId = Number(req.params.petId);
    const pet = pets.find((item) => item.id === petId);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    return res.status(200).json(pet);
  });

  app.post('/v2/pet', (req, res) => {
    const pet = req.body as Pet;

    return res.status(200).json(pet);
  });

  return app;
}
