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
}
