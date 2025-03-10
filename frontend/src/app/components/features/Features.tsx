import React from 'react';
import Link from 'next/link';
import { MdCurrencyBitcoin, MdAnalytics, MdAccountBalance, MdTrendingUp } from 'react-icons/md';
import styles from './Features.module.css';

const features = [
  {
    title: 'Crypto',
    description: 'Get the latest insights and trends in the cryptocurrency market.',
    icon: <MdCurrencyBitcoin size={28} color="#007AFF" />,
    route: '/crypto'
  },
  {
    title: 'Market Analysis',
    description: 'Understand the current market conditions and future outlook.',
    icon: <MdAnalytics size={28} color="#007AFF" />,
    route: '/marketAnalysis'
  },
  {
    title: 'Portfolio',
    description: 'Manage and diversify your investment portfolio for better returns.',
    icon: <MdAccountBalance size={28} color="#007AFF" />,
    route: '/portfolio'
  },
  {
    title: 'Investment Outlook',
    description: 'Get expert opinions and forecasts on various investment opportunities.',
    icon: <MdTrendingUp size={28} color="#007AFF" />,
    route: '/investmentOutlook'
  },
];

const Features: React.FC = () => {
  return (
    <div className={styles.container}>
      {features.map((feature, index) => (
        <Link href={feature.route} key={index} passHref legacyBehavior>
          <a className={styles.featureItem}>
            <div className={styles.iconContainer}>
              {feature.icon}
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Features;