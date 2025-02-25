import { useEffect, useState } from "react";
import { Pokemon } from "../../types/pokeApiList";
import { getOnePokemon } from "../../services/pokemonService";
import { Link } from "react-router-dom";
import styles from "./PokemonListItem.module.scss";
import urlToDexNo from "../../utils/urlToDexNo";
import Sprite from "../Sprite";
import { PokemonDetailResponse } from "../../types/pokeApiDetail";
import { ServiceResponse } from "../../types/serviceResponse";

type Props = {
  pokemon: Pokemon;
};

const PokemonListItem: React.FC<Props> = ({ pokemon }) => {
  const [response, setResponse] = useState<
    ServiceResponse<PokemonDetailResponse> | undefined
  >();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await getOnePokemon(pokemon.name);
      // We're basically just going to ignore any error here. If the call fails
      // the Sprite component will just assume there's no image.
      setResponse(response);
    };

    fetchPokemonDetail();
  }, []);

  return (
    <li className={styles.item}>
      <Link className={styles.link} to={`/pokemon/${pokemon.name}`}>
        {response && (
          <Sprite
            src={response?.data?.sprites?.front_default}
            pokemonName={pokemon.name}
            className={styles.sprite}
          />
        )}
        <strong className={styles.name}>{pokemon.name}</strong>
        <span className={styles.dexNo}>DexNo: {urlToDexNo(pokemon.url)}</span>
      </Link>
    </li>
  );
};

export default PokemonListItem;
