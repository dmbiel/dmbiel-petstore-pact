import { MatchersV3 } from '@pact-foundation/pact/src/v3';
import { CreatePetRequest } from '../consumer/types';

const { eachLike, integer, like, regex, string } = MatchersV3;

export const jsonContentTypeHeader = regex(
  /^application\/json(;\s?charset=[\w-]+)?$/i,
  'application/json'
);

export const petResponseMatcher = {
  id: integer(123),
  category: {
    id: integer(1),
    name: string('dogs')
  },
  name: string('Rex'),
  photoUrls: eachLike(string('https://example.com/rex.jpg')),
  tags: eachLike({
    id: integer(10),
    name: string('friendly')
  }),
  status: regex('available|pending|sold', 'available')
};

export const petArrayResponseMatcher = eachLike({
  id: integer(123),
  name: string('Rex'),
  photoUrls: eachLike(string('https://example.com/rex.jpg')),
  status: 'available'
});

export const createPetRequestBody: CreatePetRequest = {
  id: 456,
  category: {
    id: 1,
    name: 'dogs'
  },
  name: 'Buddy',
  photoUrls: ['https://example.com/buddy.jpg'],
  tags: [
    {
      id: 20,
      name: 'puppy'
    }
  ],
  status: 'available'
};

export const createPetResponseMatcher = like(createPetRequestBody);
