import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { ActivityItem } from '../types/types';
import { format, parseISO } from 'date-fns';

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'purchase':
        return <FontAwesome5 name="shopping-cart" size={16} color="white" />;
      case 'sale':
        return <MaterialIcons name="attach-money" size={16} color="white" />;
      case 'dividend':
        return <FontAwesome5 name="gift" size={16} color="white" />;
      case 'deposit':
        return <MaterialIcons name="add" size={16} color="white" />;
      case 'withdrawal':
        return <MaterialIcons name="remove" size={16} color="white" />;
      default:
        return <FontAwesome5 name="exchange-alt" size={16} color="white" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'purchase':
        return '#3b82f6';
      case 'sale':
        return '#10b981';
      case 'dividend':
        return '#f59e0b';
      case 'deposit':
        return '#8b5cf6';
      case 'withdrawal':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getActivityTitle = (activity: ActivityItem) => {
    switch(activity.type) {
      case 'purchase':
        return `Bought ${activity.amount} ${activity.symbol}`;
      case 'sale':
        return `Sold ${activity.amount} ${activity.symbol}`;
      case 'dividend':
        return `${activity.symbol} Dividend`;
      case 'deposit':
        return `Deposited ${formatCurrency(activity.value)}`;
      case 'withdrawal':
        return `Withdrew ${formatCurrency(activity.value)}`;
      default:
        return activity.symbol;
    }
  };

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy • h:mm a');
  };

  const renderItem = ({ item }: { item: ActivityItem }) => (
    <View style={styles.activityItem}>
      <View style={[styles.iconContainer, { backgroundColor: getActivityColor(item.type) }]}>
        {getActivityIcon(item.type)}
      </View>
      
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{getActivityTitle(item)}</Text>
        <Text style={styles.activityDate}>{formatDate(item.date)}</Text>
      </View>
      
      <View style={styles.activityValue}>
        <Text style={[
          styles.valueText, 
          {
            color: item.type === 'purchase' || item.type === 'withdrawal' 
              ? '#ef4444' 
              : '#10b981'
          }
        ]}>
          {item.type === 'purchase' || item.type === 'withdrawal' ? '-' : '+'}
          {formatCurrency(item.value)}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={activities}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  activityValue: {
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginLeft: 48,
  },
});

export default RecentActivity;