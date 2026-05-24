import { Pet } from '../consumer/types';

const initialPets: Pet[] = [
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

function clonePet(pet: Pet): Pet {
  return {
    ...pet,
    category: pet.category ? { ...pet.category } : undefined,
    photoUrls: [...pet.photoUrls],
    tags: pet.tags?.map((tag) => ({ ...tag }))
  };
}

export const pets: Pet[] = initialPets.map(clonePet);

export function resetPets(): void {
  pets.splice(0, pets.length, ...initialPets.map(clonePet));
}
