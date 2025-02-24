import { PokemonDetailResponse } from "../types/pokeApiDetail";
import { PokemonListResponse } from "../types/pokeApiList";
import { PaginatedServiceResponse, ServiceResponse } from "../types/serviceResponse";
import apiGet from "../utils/apiGet";

const baseUrl = "https://pokeapi.co/api/v2/";
const pokemonPerPage = 10;

export async function getSomePokemon(
  page: number,
): Promise<PaginatedServiceResponse<PokemonListResponse>> {
  const offset = (page - 1) * pokemonPerPage;

  const endpointUrl = new URL(`${baseUrl}pokemon/`);
  endpointUrl.searchParams.set("limit", pokemonPerPage.toString());
  endpointUrl.searchParams.set("offset", offset.toString());

  const response = await apiGet<PokemonListResponse>(endpointUrl);

  const lastPage = Math.ceil((response.data?.count ?? 0) / pokemonPerPage);

  return {
    ...response,
    lastPage,
  };
}

export function getOnePokemon(
  name: string,
): Promise<ServiceResponse<PokemonDetailResponse>> {
  const endpointUrl = new URL(`${baseUrl}pokemon/${name}/`);
  return apiGet(endpointUrl);
}
