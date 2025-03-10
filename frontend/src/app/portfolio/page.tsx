import Head from 'next/head';
import HomeScreen from './HomeScreen';
import { Toaster } from 'sonner-native';
import styles from './portfolio.module.css';

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Toaster />
      <div className={styles.container}>
        <HomeScreen />
      </div>
    </>
  );
}