import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { InvestmentItem } from '../types/types';

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
    switch(logo) {
      case 'bitcoin':
        return <FontAwesome5 name="bitcoin" size={24} color="#f7931a" />;
      case 'ethereum':
        return <FontAwesome5 name="ethereum" size={24} color="#627eea" />;
      case 'bowling-ball':
        return <FontAwesome5 name="bowling-ball" size={24} color="#14f195" />;
      case 'cube':
        return <FontAwesome5 name="cube" size={24} color="#0033ad" />;
      default:
        return <FontAwesome name="dollar" size={24} color="#6b7280" />;
    }
  };

  const renderItem = ({ item }: { item: InvestmentItem }) => (
    <View style={styles.investmentItem}>
      <View style={styles.iconContainer}>
        {getIconForCrypto(item.logo)}
      </View>
      
      <View style={styles.investmentInfo}>
        <Text style={styles.investmentName}>{item.name}</Text>
        <Text style={styles.investmentSymbol}>{item.symbol} • {formatCryptoAmount(item.amount, item.symbol)}</Text>
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

export default CryptoInvestments;