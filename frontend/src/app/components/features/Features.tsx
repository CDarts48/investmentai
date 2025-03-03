// filepath: /Users/corey/Desktop/investmentai/frontend/src/app/components/features/Features.tsx
import React from 'react';
import styles from './Features.module.css'; // Import the CSS module

const Features: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresList}>
        <div className={styles.featureItem}>
          <h3>Crypto</h3>
          <p>Get the latest insights and trends in the cryptocurrency market.</p>
        </div>
        <div className={styles.featureItem}>
          <h3>Market Analysis</h3>
          <p>Understand the current market conditions and future outlook.</p>
        </div>
        <div className={styles.featureItem}>
          <h3>Portfolio</h3>
          <p>Manage and diversify your investment portfolio for better returns.</p>
        </div>
        <div className={styles.featureItem}>
          <h3>Investment Outlook</h3>
          <p>Get expert opinions and forecasts on various investment opportunities.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;