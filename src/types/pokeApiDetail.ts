export interface PokemonDetailResponse {
  name: string;
  sprites: {
    front_default?: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  base_experience: number;
  height: number;
  weight: number;
  game_indices: Array<{
    version: {
      name: string;
    };
  }>;
  cries?: {
    latest?: string;
  };
}
