import { Link } from "react-router-dom";
import styles from "./Pagination.module.scss";

type Props = {
  page: number;
  lastPage: number;
};

const Pagination: React.FC<Props> = ({ page, lastPage }) => {
  const previous = page - 1;
  const next = page + 1;

  const hasPrevious = previous > 0;
  const hasNext = page < lastPage;

  return (
    <nav className={styles.nav}>
      {hasPrevious && (
        <Link to={`/dex/${previous}`} className={styles.previous}>
          Previous
        </Link>
      )}
      <span className={styles.page}>{page}</span>
      {hasNext && (
        <Link to={`/dex/${next}`} className={styles.next}>
          Next
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
