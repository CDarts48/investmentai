import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { InvestmentItem } from '../types/types';

interface TraditionalInvestmentsProps {
  investments: InvestmentItem[];
}

const TraditionalInvestments = ({ investments }: TraditionalInvestmentsProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const getIconForInvestment = (logo: string) => {
    switch(logo) {
      case 'apple':
        return <FontAwesome name="apple" size={24} color="#333333" />;
      case 'microsoft':
        return <FontAwesome name="windows" size={24} color="#00a1f1" />;
      case 'line-chart':
        return <FontAwesome name="line-chart" size={24} color="#6b7280" />;
      case 'car':
        return <FontAwesome5 name="car" size={24} color="#e82127" />;
      default:
        return <FontAwesome name="building" size={24} color="#6b7280" />;
    }
  };

  const renderItem = ({ item }: { item: InvestmentItem }) => (
    <View style={styles.investmentItem}>
      <View style={styles.iconContainer}>
        {getIconForInvestment(item.logo)}
      </View>
      
      <View style={styles.investmentInfo}>
        <Text style={styles.investmentName}>{item.name}</Text>
        <Text style={styles.investmentSymbol}>{item.symbol} • {item.shares} shares</Text>
      </View>
      
      <View style={styles.investmentValue}>
        <Text style={styles.valueText}>{formatCurrency(item.value)}</Text>
        <View style={styles.changeContainer}>
          <FontAwesome5 
            name={item.change >= 0 ? "caret-up" : "caret-down"} 
            size={14} 
            color={item.change >= 0 ? "#10b981" : "#ef4444"} 
            style={styles.changeIcon}
          />
          <Text style={[
            styles.changeText, 
            {color: item.change >= 0 ? "#10b981" : "#ef4444"}
          ]}>
            {Math.abs(item.change).toFixed(1)}%
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={investments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  investmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  investmentInfo: {
    flex: 1,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  investmentSymbol: {
    fontSize: 14,
    color: '#6b7280',
  },
  investmentValue: {
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    marginRight: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
});

export default TraditionalInvestments;