import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to HANA-Chat</h1>

        <p className={styles.description}>
          Get started with code
          <br />
          <input type='text' placeholder='your code here...' /> <br />
          or <br />
          <Link href='/rooms/abvd-egfa-888a-3267'>
            <button>create room</button>
          </Link>
        </p>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
