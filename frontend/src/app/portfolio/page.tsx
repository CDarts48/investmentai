import Head from 'next/head';
import HomeScreen from './HomeScreen';
import styles from './portfolio.module.css';

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <div className={styles.container}>
        <HomeScreen />
      </div>
    </>
  );
}