// types.ts
export type AnimalType = {
  id?: number;
  espece: string;
  race: string;
  sexe: string;
  city: string;
  description: string;
  date_ajout: string;
  likes: number;
  image_url: string;
  vacciné: boolean;
  dressé: boolean;
  age?: string;
  _score?: number;
};

export type FilterType = {
  espece: string;
  race: string;
  city: string;
  sexe: string;
  vacciné: boolean | null;
  dressé: boolean | null;
  age: string;
  search: string;
};

export type AggregationsType = {
  cities: string[];
  breeds: string[];
  species: string[];
  vaccinated_count: number;
  trained_count: number;
};

export type ApiResponse = {
  animals: AnimalType[];
  total: number;
  suggestions: string[];
  aggregations: AggregationsType;
  search_performed: boolean;
};