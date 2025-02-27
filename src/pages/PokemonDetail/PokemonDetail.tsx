import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOnePokemon } from "../../services/pokemonService";
import { PokemonDetailResponse } from "../../types/pokeApiDetail";
import styles from "./PokemonDetail.module.scss";
import { convertDmToFeetInches, convertHgToLbs } from "../../utils/unitConversion";
import { ErrorType } from "../../types/serviceResponse";
import Sprite from "../../components/Sprite";

const PokemonDetail: React.FC = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetailResponse | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    const populatePokemon = async () => {
      if (!name) return;

      const pokemonDetailResponse = await getOnePokemon(name);

      if (pokemonDetailResponse.hasError) {
        switch (pokemonDetailResponse.errorType) {
          case ErrorType.HttpError:
            setErrorMessage("Sorry, the service is unavailable.");
            break;
          case ErrorType.InternalError:
            setErrorMessage("Something went wrong.");
            break;
        }
        return;
      }

      setErrorMessage(undefined);
      setPokemon(pokemonDetailResponse.data);
    };
    populatePokemon();
  }, [name]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className={styles.main}>
      <button className={styles.back} onClick={goBack}>
        Go back
      </button>
      <h1 className={styles.header}>{name}</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {!errorMessage && (
        <>
          {pokemon && (
            <>
              <Sprite
                pokemonName={pokemon.name}
                src={pokemon?.sprites.front_default}
                className={styles.sprite}
              />
              <ul className={styles.types}>
                {pokemon?.types?.map((type) => (
                  <li key={type.type.name} className={`${styles.type} ${type.type.name}`}>
                    {type.type.name}
                  </li>
                ))}
              </ul>
              <dl className={styles.descriptionList}>
                <dt className={styles.descriptionTitle}>Height</dt>
                <dd className={styles.descriptionDetails}>
                  {convertDmToFeetInches(pokemon?.height ?? 0)}
                </dd>
                <dt className={styles.descriptionTitle}>Weight</dt>
                <dd className={styles.descriptionDetails}>
                  {convertHgToLbs(pokemon?.weight ?? 0)}
                </dd>
              </dl>
              {(pokemon?.game_indices?.length ?? 0) > 0 && (
                <>
                  <h2 className={styles.gamesHeader}>Games</h2>
                  <ul className={styles.games}>
                    {pokemon?.game_indices?.map((game) => (
                      <li
                        key={game.version.name}
                        className={`${styles.game} ${game.version.name}`}
                      >
                        {game.version.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {pokemon?.cries?.latest && (
                <>
                  <h2 className={styles.cryHeader}>Cry</h2>
                  <audio className={styles.cry} controls>
                    <source
                      src={pokemon?.cries?.latest}
                      type="audio/ogg"
                      data-testid="source-pokemon-cry"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};

export default PokemonDetail;
