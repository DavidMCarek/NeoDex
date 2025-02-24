import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Neodex
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
