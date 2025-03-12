export interface InvestmentItem {
    id: string;
    name: string;
    symbol: string;
    logo: string;
    amount?: number;
    value: number;
    change: number;
    shares?: number;
  }
  
  export interface PortfolioSummary {
    totalValue: number;
    returns: number;
    todayChange: number;
    allocation: {
      stocks: number;
      crypto: number;
      bonds: number;
      cash: number;
    };
  }
  
  export interface PortfolioData {
    summary: PortfolioSummary;
    chartData: number[];
    traditionalInvestments: InvestmentItem[];
    cryptoInvestments: InvestmentItem[];
    recentActivity: ActivityItem[];
  }
  
  // If you haven't defined ActivityItem elsewhere, add it here too:
  export interface ActivityItem {
    id: string;
    type: 'purchase' | 'sale' | 'dividend' | 'deposit' | 'withdrawal' | string;
    amount?: number | null; // Allow null here
    symbol?: string;
    value: number;
    date: string;
  }
  
  export interface ProfileData {
    name: string;
    location: string;
    bio: string;
    avatar: string;
    socialStats: {
      followers: number;
      following: number;
      posts: number;
      insights: number;
    };
  }

  // filepath: /Users/corey/Desktop/investmentai/frontend/src/app/portfolio/types.ts
export interface InvestmentItem {
    id: string;
    name: string;
    symbol: string;
    logo: string;
    amount?: number;
    value: number;
    change: number;
    shares?: number; // Marked as optional
  }