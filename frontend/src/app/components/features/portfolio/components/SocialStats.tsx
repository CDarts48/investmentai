import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SocialStatsProps {
  stats: {
    followers: number;
    following: number;
    posts: number;
    insights: number;
  };
}

const SocialStats = ({ stats }: SocialStatsProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statValue}>{formatNumber(stats.followers)}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statValue}>{formatNumber(stats.following)}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statValue}>{formatNumber(stats.posts)}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statValue}>{formatNumber(stats.insights)}</Text>
          <Text style={styles.statLabel}>Insights</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  followButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  followButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#4b5563',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SocialStats;