import React from 'react';
import styles from './RecentActivity.module.css';

interface Activity {
  id: string;
  timestamp: Date;
  description: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  if (activities.length === 0) {
    return <div className={styles.empty}>No recent activity.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recent Activity</h2>
      <ul className={styles.activityList}>
        {activities.map((activity) => (
          <li key={activity.id} className={styles.activityItem}>
            <span className={styles.timestamp}>
              {activity.timestamp.toLocaleString()}
            </span>
            <span className={styles.description}>
              {activity.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;