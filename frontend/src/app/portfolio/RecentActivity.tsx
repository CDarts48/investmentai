import React from "react";
import { format, parseISO } from "date-fns";
import styles from "./RecentActivity.module.css";
import { ActivityItem } from "./types"; // Ensure this import path points to your types file

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy • h:mm a");
  };

  if (activities.length === 0) {
    return <div className={styles.empty}>No recent activity.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recent Activity</h2>
      <ul className={styles.activityList}>
        {activities.map((activity) => (
          <li key={activity.id} className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <div className={styles.activityTitle}>
                {activity.type === "dividend"
                  ? `${activity.symbol} Dividend`
                  : activity.type}
              </div>
              <div className={styles.activityDate}>
                {formatDate(activity.date)}
              </div>
            </div>
            <div className={styles.activityValue}>
              <span className={styles.valueText}>
                {activity.amount !== undefined && activity.amount !== null
                  ? activity.amount
                  : activity.value}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;