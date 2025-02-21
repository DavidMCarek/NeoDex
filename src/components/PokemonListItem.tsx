import { useEffect, useState } from "react";
import { Pokemon } from "../types/pokeApiList";
import { getOnePokemon, urlToDexNo } from "../services/pokemonService";
import { PokemonDetailResponse } from "../types/pokeApiDetail";
import { Link } from "react-router-dom";
import styles from "./PokemonListItem.module.scss";

type Props = {
  pokemon: Pokemon;
};

const PokemonListItem: React.FC<Props> = ({ pokemon }) => {
  const [details, setDetails] = useState<PokemonDetailResponse | undefined>();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await getOnePokemon(pokemon.name);

      if (response.hasError) {
        // TODO: handle error
        return;
      }

      setDetails(response.data);
    };

    fetchPokemonDetail();
  }, []);

  return (
    <li className={styles.item}>
      <Link className={styles.link} to={`/pokemon/${pokemon.name}`}>
        <strong className={styles.name}>{pokemon.name}</strong>
        <span>DexNo: {urlToDexNo(pokemon.url)}</span>
        <img className={styles.sprite} src={details?.sprites.front_default} />
      </Link>
    </li>
  );
};

export default PokemonListItem;
