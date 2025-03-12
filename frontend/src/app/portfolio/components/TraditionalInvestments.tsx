import React from 'react';
import {
  FaApple,
  FaWindows,
  FaChartLine,
  FaCar,
  FaBuilding,
  FaCaretUp,
  FaCaretDown,
} from 'react-icons/fa';
import { InvestmentItem } from '../../portfolio/types';
import styles from './TraditionalInvestments.module.css';

interface TraditionalInvestmentsProps {
  investments: InvestmentItem[];
}

const TraditionalInvestments: React.FC<TraditionalInvestmentsProps> = ({ investments }) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const getIconForInvestment = (logo: string) => {
    switch (logo) {
      case 'apple':
        return <FaApple size={24} color="#333333" />;
      case 'microsoft':
        return <FaWindows size={24} color="#00a1f1" />;
      case 'line-chart':
        return <FaChartLine size={24} color="#6b7280" />;
      case 'car':
        return <FaCar size={24} color="#e82127" />;
      default:
        return <FaBuilding size={24} color="#6b7280" />;
    }
  };

  return (
    <div className={styles.container}>
      {investments.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={styles.investmentItem}>
            <div className={styles.iconContainer}>
              {getIconForInvestment(item.logo)}
            </div>
            <div className={styles.investmentInfo}>
              <div className={styles.investmentName}>{item.name}</div>
              <div className={styles.investmentSymbol}>
                {item.symbol} • {item.shares} shares
              </div>
            </div>
            <div className={styles.investmentValue}>
              <div className={styles.valueText}>{formatCurrency(item.value)}</div>
              <div className={styles.changeContainer}>
                {item.change >= 0 ? (
                  <FaCaretUp size={14} color="#10b981" className={styles.changeIcon} />
                ) : (
                  <FaCaretDown size={14} color="#ef4444" className={styles.changeIcon} />
                )}
                <div
                  className={styles.changeText}
                  style={{ color: item.change >= 0 ? '#10b981' : '#ef4444' }}
                >
                  {Math.abs(item.change).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
          {index < investments.length - 1 && <div className={styles.separator} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TraditionalInvestments;