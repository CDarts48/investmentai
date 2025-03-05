import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

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

const PortfolioSummary = ({ summary }: PortfolioSummaryProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const chartData = [
    {
      name: 'Stocks',
      population: summary.allocation.stocks,
      color: '#3b82f6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Crypto',
      population: summary.allocation.crypto,
      color: '#10b981',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Bonds',
      population: summary.allocation.bonds,
      color: '#f59e0b',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Cash',
      population: summary.allocation.cash,
      color: '#6b7280',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Value</Text>
          <Text style={styles.summaryValue}>{formatCurrency(summary.totalValue)}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Overall Returns</Text>
          <View style={styles.percentContainer}>
            <FontAwesome5 
              name={summary.returns >= 0 ? "arrow-up" : "arrow-down"} 
              size={12} 
              color={summary.returns >= 0 ? "#10b981" : "#ef4444"} 
              style={styles.arrow}
            />
            <Text style={[
              styles.percentValue, 
              {color: summary.returns >= 0 ? "#10b981" : "#ef4444"}
            ]}>
              {Math.abs(summary.returns).toFixed(1)}%
            </Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Today</Text>
          <View style={styles.percentContainer}>
            <FontAwesome5 
              name={summary.todayChange >= 0 ? "arrow-up" : "arrow-down"} 
              size={12} 
              color={summary.todayChange >= 0 ? "#10b981" : "#ef4444"} 
              style={styles.arrow}
            />
            <Text style={[
              styles.percentValue, 
              {color: summary.todayChange >= 0 ? "#10b981" : "#ef4444"}
            ]}>
              {Math.abs(summary.todayChange).toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.allocationTitle}>Asset Allocation</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 32 - 32}
          height={180}
          chartConfig={{
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  percentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    marginRight: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#d1d5db',
  },
  allocationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 24,
    marginBottom: 8,
  },
  chartContainer: {
    alignItems: 'center',
  },
});

export default PortfolioSummary;