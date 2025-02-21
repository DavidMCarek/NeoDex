import { PokemonDetailResponse } from "../types/pokeApiDetail";
import { PokemonListResponse } from "../types/pokeApiList";
import { ServiceResponse } from "../types/serviceResponse";
import apiGet from "../utils/apiGet";

const baseUrl = "https://pokeapi.co/api/v2/";
const pokemonPerPage = 10;

export async function getSomePokemon(
  page: number,
): Promise<ServiceResponse<PokemonListResponse>> {
  const offset = (page - 1) * pokemonPerPage;

  const endpointUrl = new URL(`${baseUrl}pokemon/`);
  endpointUrl.searchParams.set("limit", pokemonPerPage.toString());
  endpointUrl.searchParams.set("offset", offset.toString());

  return apiGet<PokemonListResponse>(endpointUrl);
}

export function getOnePokemon(
  name: string,
): Promise<ServiceResponse<PokemonDetailResponse>> {
  const endpointUrl = new URL(`${baseUrl}/pokemon/${name}/`);
  return apiGet(endpointUrl);
}
