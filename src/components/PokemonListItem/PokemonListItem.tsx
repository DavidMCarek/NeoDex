import { useEffect, useState } from "react";
import { Pokemon } from "../../types/pokeApiList";
import { getOnePokemon } from "../../services/pokemonService";
import { Link } from "react-router-dom";
import styles from "./PokemonListItem.module.scss";
import urlToDexNo from "../../utils/urlToDexNo";

type Props = {
  pokemon: Pokemon;
};

const PokemonListItem: React.FC<Props> = ({ pokemon }) => {
  const [sprite, setSprite] = useState<string | undefined>();
  const [detailFetched, setDetailFetched] = useState(false);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await getOnePokemon(pokemon.name);

      // This could be improved but I assume it's sufficient to just say there's
      // no image if this call fails for whatever reason.
      if (!response.hasError) setSprite(response.data?.sprites.front_default);
      setDetailFetched(true);
    };

    fetchPokemonDetail();
  }, []);

  return (
    <li className={styles.item}>
      <Link className={styles.link} to={`/pokemon/${pokemon.name}`}>
        {sprite && (
          <img
            className={styles.sprite}
            src={sprite}
            alt={`Sprite for ${pokemon.name}`}
          />
        )}
        {!sprite && detailFetched && <span className={styles.noImage}>No image</span>}
        <strong className={styles.name}>{pokemon.name}</strong>
        <span className={styles.dexNo}>DexNo: {urlToDexNo(pokemon.url)}</span>
      </Link>
    </li>
  );
};

export default PokemonListItem;
