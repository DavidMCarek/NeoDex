import styles from "./Sprite.module.scss";

type Props = {
  src?: string;
  pokemonName: string;
  className?: string;
};

const Sprite: React.FC<Props> = ({ src, pokemonName, className }) => {
  return src ? (
    <img
      className={`${styles.sprite} ${className ? className : ""}`}
      src={src}
      alt={`Sprite for ${pokemonName}`}
    />
  ) : (
    <span className={`${styles.noImage} ${className ? className : ""}`}>No image</span>
  );
};

export default Sprite;
