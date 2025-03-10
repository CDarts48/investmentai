// filepath: /Users/corey/Desktop/investmentai/frontend/src/app/portfolio/components/PortfolioSummary.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from './PortfolioSummary.module.css';

interface PortfolioSummaryProps {
  summary: {
    totalValue: number;
    returns: number;
    todayChange: number;
    allocation: {
      stocks: number;
      crypto: number;
      bonds: number;
      cash: number;
    };
  };
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ summary }) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const chartData = {
    labels: ['Stocks', 'Crypto', 'Bonds', 'Cash'],
    datasets: [
      {
        data: [
          summary.allocation.stocks,
          summary.allocation.crypto,
          summary.allocation.bonds,
          summary.allocation.cash,
        ],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6b7280'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12,
          },
          color: '#7F7F7F',
        },
      },
    },
    layout: {
      padding: {
        left: 15,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Total Value</p>
          <p className={styles.summaryValue}>{formatCurrency(summary.totalValue)}</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Overall Returns</p>
          <div className={styles.percentContainer}>
            {summary.returns >= 0 ? (
              <FaArrowUp size={12} color="#10b981" className={styles.arrow} />
            ) : (
              <FaArrowDown size={12} color="#ef4444" className={styles.arrow} />
            )}
            <p
              className={styles.percentValue}
              style={{ color: summary.returns >= 0 ? '#10b981' : '#ef4444' }}
            >
              {Math.abs(summary.returns).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.summaryItem}>
          <p className={styles.summaryLabel}>Today</p>
          <div className={styles.percentContainer}>
            {summary.todayChange >= 0 ? (
              <FaArrowUp size={12} color="#10b981" className={styles.arrow} />
            ) : (
              <FaArrowDown size={12} color="#ef4444" className={styles.arrow} />
            )}
            <p
              className={styles.percentValue}
              style={{ color: summary.todayChange >= 0 ? '#10b981' : '#ef4444' }}
            >
              {Math.abs(summary.todayChange).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <p className={styles.allocationTitle}>Asset Allocation</p>
      <div className={styles.chartContainer}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PortfolioSummary;