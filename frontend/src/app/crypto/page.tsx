import styles from './crypto.module.css';

export default function CryptoScreen() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crypto</h1>
      <p className={styles.description}>
        Cryptocurrency market insights and trends
      </p>
    </div>
  );
}