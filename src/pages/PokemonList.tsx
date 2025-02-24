import { useEffect, useState } from "react";
import { getSomePokemon } from "../services/pokemonService";
import { Pokemon } from "../types/pokeApiList";
import PokemonListItem from "../components/PokemonListItem";
import styles from "./PokemonList.module.scss";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import { ErrorType } from "../types/serviceResponse";

const PokemonList = () => {
  const { page } = useParams();
  const pageNumber = parseInt(page ?? "1");

  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [lastPage, setLastPage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<String | undefined>();

  useEffect(() => {
    const populatePokemon = async () => {
      const pokemonListResponse = await getSomePokemon(pageNumber);

      if (pokemonListResponse.hasError) {
        switch (pokemonListResponse.errorType) {
          case ErrorType.HttpError:
            setErrorMessage("Sorry, the service is unavailable");
            break;
          case ErrorType.InternalError:
            setErrorMessage("Something went wrong.");
            break;
        }
        return;
      }

      setErrorMessage(undefined);
      setLastPage(pokemonListResponse.lastPage);
      setPokemonList(pokemonListResponse.data?.results ?? []);
    };
    populatePokemon();
  }, [pageNumber]);

  return (
    <>
      <h1 className={styles.header}>Pokemon</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {pokemonList.length > 0 && (
        <ol className={styles.list}>
          {pokemonList.map((pokemon) => (
            <PokemonListItem key={pokemon.name} pokemon={pokemon} />
          ))}
        </ol>
      )}
      <Pagination page={pageNumber} lastPage={lastPage} />
    </>
  );
};

export default PokemonList;
