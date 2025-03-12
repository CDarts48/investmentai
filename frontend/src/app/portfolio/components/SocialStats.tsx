import React from 'react';
import styles from './SocialStats.module.css';

interface SocialStatsProps {
  stats: {
    followers: number;
    following: number;
    posts: number;
    insights: number;
  };
}

const SocialStats: React.FC<SocialStatsProps> = ({ stats }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.statsContainer}>
        <button className={styles.statItem}>
          <p className={styles.statValue}>{formatNumber(stats.followers)}</p>
          <p className={styles.statLabel}>Followers</p>
        </button>
        <div className={styles.divider} />
        <button className={styles.statItem}>
          <p className={styles.statValue}>{formatNumber(stats.following)}</p>
          <p className={styles.statLabel}>Following</p>
        </button>
        <div className={styles.divider} />
        <button className={styles.statItem}>
          <p className={styles.statValue}>{formatNumber(stats.posts)}</p>
          <p className={styles.statLabel}>Posts</p>
        </button>
        <div className={styles.divider} />
        <button className={styles.statItem}>
          <p className={styles.statValue}>{formatNumber(stats.insights)}</p>
          <p className={styles.statLabel}>Insights</p>
        </button>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.followButton}>
          Follow
        </button>
        <button className={styles.messageButton}>
          Message
        </button>
      </div>
    </div>
  );
};

export default SocialStats;