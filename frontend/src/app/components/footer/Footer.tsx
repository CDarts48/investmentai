import React from 'react';
import styles from './Footer.module.css'; // Import the CSS module

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.addressContainer}>
        <div>
          {/* <div className={styles.topRow}>
            <p className={`${styles.boldTitle} ${styles.typography}`}>New York</p>
            <p className={`${styles.boldSubtitle} ${styles.typography}`}>
              1 Wall Street,<br />
                Entire Building <br />
              New York, NY $$$$$
            </p>
          </div>
        </div>
        <div>
          <div className={styles.topRow}>
            <p className={`${styles.boldTitle} ${styles.typography}`}>Louisville</p>
            <p className={`${styles.boldSubtitle} ${styles.typography}`}>
               <br />
             <br />
              Boulder, CO 80301
            </p>
          </div>
        </div>
        <div> */}
          <div className={styles.topRow}>
            <p className={`${styles.boldTitle} ${styles.typography}`}>Quick Links</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a className={`${styles.boldSubtitle} ${styles.quickLink}`} href="/stocks">Stocks</a>
              <a className={`${styles.boldSubtitle} ${styles.quickLink}`} href="/etf">ETFs</a>
              <a className={`${styles.boldSubtitle} ${styles.quickLink}`} href="/mutual-fund">Mutual Funds</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.supportContainer}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
            <p className={`${styles.boldTitleRight} ${styles.typography}`}>Get in touch with us</p>
            <div>
              <p className={`${styles.boldSubtitle} ${styles.subTitleMedia} ${styles.typography}`}>
                For questions & support, contact <br />
                <a href="mailto:support@example.com" style={{ fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px', color: 'inherit', textAlign: 'right' }}>
                  support@example.com
                </a>
              </p>
              <div className={styles.socialIcon}>
                {/* Add your social media icons here */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.disclaimer}>
        <p>This is not investment advice. For entertainment purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;