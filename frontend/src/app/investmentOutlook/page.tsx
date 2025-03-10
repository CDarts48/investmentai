import styles from './investmentOutlook.module.css';

export default function InvestmentOutlook() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Investment Outlook</h1>
      <p className={styles.description}>
        Investment outlook market insights and trends
      </p>
    </div>
  );
}