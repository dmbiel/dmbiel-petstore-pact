import axios, { AxiosInstance } from 'axios';
import { CreatePetRequest, Pet, PetStatus } from './types';

export class PetstoreClient {
  private readonly http: AxiosInstance;

  constructor(baseUrl: string) {
    this.http = axios.create({
      baseURL: baseUrl,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  async getPetById(petId: number): Promise<Pet> {
    const response = await this.http.get<Pet>(`/v2/pet/${petId}`);
    return response.data;
  }

  async findPetsByStatus(status: PetStatus): Promise<Pet[]> {
    const response = await this.http.get<Pet[]>('/v2/pet/findByStatus', {
      params: { status }
    });

    return response.data;
  }

  async createPet(pet: CreatePetRequest): Promise<Pet> {
    const response = await this.http.post<Pet>('/v2/pet', pet, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }
}
