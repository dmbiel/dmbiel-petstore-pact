import { Pet } from '../consumer/types';

export const pets: Pet[] = [
  {
    id: 123,
    category: {
      id: 1,
      name: 'dogs'
    },
    name: 'Rex',
    photoUrls: ['https://example.com/rex.jpg'],
    tags: [
      {
        id: 10,
        name: 'friendly'
      }
    ],
    status: 'available'
  }
];
