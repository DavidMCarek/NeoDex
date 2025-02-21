import { useEffect, useState } from "react";
import { getSomePokemon } from "../services/pokemonService";
import { Pokemon } from "../types/pokeApiList";
import PokemonListItem from "../components/PokemonListItem";
import styles from "./PokemonList.module.scss";

const PokemonList = () => {
  const [page, setPage] = useState(1);

  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);

  useEffect(() => {
    const populatePokemon = async () => {
      const pokemonListResponse = await getSomePokemon(page);

      if (pokemonListResponse.hasError) {
        // TODO: handle error
        return;
      }

      setPokemonList(pokemonListResponse.data?.results ?? []);
    };
    populatePokemon();
  }, [page]);

  return (
    <ol className={styles.list}>
      {pokemonList.map((pokemon) => (
        <PokemonListItem key={pokemon.name} pokemon={pokemon} />
      ))}
    </ol>
  );
};

export default PokemonList;
