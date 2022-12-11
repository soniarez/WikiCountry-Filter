import Meta from './Meta';
import Nav from './Nav';
import styles from '../styles/Layout.module.css';

const Layout = ({ children } : any) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;