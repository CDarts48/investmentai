import React from 'react';
import {
  FaBitcoin,
  FaEthereum,
  FaCube,
  FaDollarSign,
  FaCaretUp,
  FaCaretDown,
} from 'react-icons/fa';
import { InvestmentItem } from '../../portfolio/types';
import styles from './CryptoInvestments.module.css';

interface CryptoInvestmentsProps {
  investments: InvestmentItem[];
}

const CryptoInvestments = ({ investments }: CryptoInvestmentsProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatCryptoAmount = (amount: number | undefined, symbol: string) => {
    if (!amount) return '';
    if (amount < 1) {
      return `${amount.toFixed(4)} ${symbol}`;
    } else if (amount > 1000) {
      return `${amount.toLocaleString()} ${symbol}`;
    } else {
      return `${amount.toFixed(2)} ${symbol}`;
    }
  };

  const getIconForCrypto = (logo: string) => {
    switch (logo) {
      case 'bitcoin':
        return <FaBitcoin size={24} color="#f7931a" />;
      case 'ethereum':
        return <FaEthereum size={24} color="#627eea" />;
      case 'bowling-ball':
        // Fallback for bowling-ball: using a cube icon or default icon
        return <FaDollarSign size={24} color="#14f195" />;
      case 'cube':
        return <FaCube size={24} color="#0033ad" />;
      default:
        return <FaDollarSign size={24} color="#6b7280" />;
    }
  };

  return (
    <div className={styles.listContainer}>
      {investments.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={styles.investmentItem}>
            <div className={styles.iconContainer}>
              {getIconForCrypto(item.logo)}
            </div>

            <div className={styles.investmentInfo}>
              <div className={styles.investmentName}>{item.name}</div>
              <div className={styles.investmentSymbol}>
                {item.symbol} • {formatCryptoAmount(item.amount, item.symbol)}
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
                  style={{ color: item.change >= 0 ? "#10b981" : "#ef4444" }}
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

export default CryptoInvestments;