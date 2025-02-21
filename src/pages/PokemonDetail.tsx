import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOnePokemon } from "../services/pokemonService";
import { PokemonDetailResponse } from "../types/pokeApiDetail";

const PokemonDetail: React.FC = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetailResponse | undefined>();

  useEffect(() => {
    const populatePokemon = async () => {
      if (!name) return;

      const pokemonDetailResponse = await getOnePokemon(name);

      if (pokemonDetailResponse.hasError) {
        // TODO: handle error
        return;
      }

      setPokemon(pokemonDetailResponse.data);
    };
    populatePokemon();
  }, [name]);

  return (
    <>
      <h1>{pokemon?.name}</h1>
      <img src={pokemon?.sprites.front_default} />
    </>
  );
};

export default PokemonDetail;
