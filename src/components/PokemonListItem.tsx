import { useEffect, useState } from "react";
import { Pokemon } from "../types/pokeApiList";
import { getOnePokemon } from "../services/pokemonService";
import { PokemonDetailResponse } from "../types/pokeApiDetail";

type Props = {
  pokemon: Pokemon;
};

type DetailModel = {};

const PokemonListItem: React.FC<Props> = ({ pokemon }) => {
  const [details, setDetails] = useState<PokemonDetailResponse | undefined>();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await getOnePokemon(pokemon.name);

      if (response.hasError) {
        // TODO: handle error
        return;
      }

      setDetails(details);
    };

    fetchPokemonDetail();
  }, []);

  return (
    <li>
      <strong>{pokemon.name}</strong>
      <img src={details?.sprites.front_default} />
    </li>
  );
};

export default PokemonListItem;
