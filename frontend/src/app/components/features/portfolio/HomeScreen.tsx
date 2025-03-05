// filepath: /Users/corey/Desktop/investmentai/pages/HomeScreen.tsx
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckCircle, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import PortfolioSummary from './components/PortfolioSummary';
import TraditionalInvestments from './components/TraditionalInvestments';
import CryptoInvestments from './components/CryptoInvestments';
import SocialStats from './components/SocialStats';
import RecentActivity from './components/RecentActivity';
import { PortfolioData, ProfileData } from '../types/types';

export default function HomeScreen() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setProfileData(mockProfileData);
      setPortfolioData(mockPortfolioData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} size="2x" spin />
        <p>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img 
            src={`https://api.a0.dev/assets/image?text=professional%20profile%20photo%20of%20a%20successful%20investor&seed=123`} 
            alt="Profile" 
            className="profile-image" 
          />
          <div className="badge-container">
            <FontAwesomeIcon icon={faCheckCircle} size="lg" color="#3b82f6" />
          </div>
        </div>
        
        <div className="profile-info">
          <h2 className="profile-name">{profileData?.name}</h2>
          <div className="location-container">
            <FontAwesomeIcon icon={faLocationDot} size="sm" color="#6b7280" />
            <p className="location-text">{profileData?.location}</p>
          </div>
          <p className="profile-bio">{profileData?.bio}</p>
        </div>
      </div>

      <SocialStats stats={profileData?.socialStats || {}} />

      <div className="section-container">
        <h3 className="section-title">Portfolio Overview</h3>
        <PortfolioSummary summary={portfolioData?.summary || {}} />
      </div>

      <div className="chart-container">
        <div className="chart-header">
          <h3 className="chart-title">Growth Trend</h3>
          <div className="period-selector">
            <button className="period-button active-period">1W</button>
            <button className="period-button">1M</button>
            <button className="period-button">3M</button>
            <button className="period-button">1Y</button>
            <button className="period-button">ALL</button>
          </div>
        </div>
        
        <Line
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                data: portfolioData?.chartData || [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
              }
            ]
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '$' + value + 'k';
                  }
                }
              }
            }
          }}
        />
      </div>

      <div className="section-container">
        <div className="section-header">
          <h3 className="section-title">Traditional Investments</h3>
          <button className="view-all-button">
            <span className="view-all-text">View All</span>
            <FontAwesomeIcon icon={faCheckCircle} size="sm" color="#3b82f6" />
          </button>
        </div>
        <TraditionalInvestments investments={portfolioData?.traditionalInvestments || []} />
      </div>

      <div className="section-container">
        <div className="section-header">
          <h3 className="section-title">Crypto Investments</h3>
          <button className="view-all-button">
            <span className="view-all-text">View All</span>
            <FontAwesomeIcon icon={faCheckCircle} size="sm" color="#3b82f6" />
          </button>
        </div>
        <CryptoInvestments investments={portfolioData?.cryptoInvestments || []} />
      </div>

      <div className="section-container" style={{ marginBottom: 20 }}>
        <div className="section-header">
          <h3 className="section-title">Recent Activity</h3>
          <button className="view-all-button">
            <span className="view-all-text">View All</span>
            <FontAwesomeIcon icon={faCheckCircle} size="sm" color="#3b82f6" />
          </button>
        </div>
        <RecentActivity activities={portfolioData?.recentActivity || []} />
      </div>
    </div>
  );
}

// Mock Data
const mockProfileData: ProfileData = {
  name: "Alex Johnson",
  location: "New York, USA",
  bio: "Investor & financial analyst with 8+ years of experience. Passionate about crypto and tech stocks.",
  avatar: "https://api.a0.dev/assets/image?text=professional%20profile%20photo%20of%20a%20successful%20investor&seed=123",
  socialStats: {
    followers: 2458,
    following: 542,
    posts: 128,
    insights: 76
  }
};

const mockPortfolioData: PortfolioData = {
  summary: {
    totalValue: 254890,
    returns: 12.4,
    todayChange: 1.8,
    allocation: {
      stocks: 45,
      crypto: 30,
      bonds: 15,
      cash: 10
    }
  },
  chartData: [18.5, 17.8, 19.2, 21.4, 20.8, 22.3, 24.5],
  traditionalInvestments: [
    { id: '1', name: 'Apple Inc.', symbol: 'AAPL', value: 32450, shares: 180, change: 2.4, logo: 'apple' },
    { id: '2', name: 'Microsoft', symbol: 'MSFT', value: 28765, shares: 95, change: 1.2, logo: 'microsoft' },
    { id: '3', name: 'S&P 500 ETF', symbol: 'SPY', value: 45320, shares: 120, change: -0.5, logo: 'line-chart' },
    { id: '4', name: 'Tesla Inc.', symbol: 'TSLA', value: 18760, shares: 65, change: 3.8, logo: 'car' }
  ],
  cryptoInvestments: [
    { id: '1', name: 'Bitcoin', symbol: 'BTC', value: 42320, amount: 0.78, change: 2.1, logo: 'bitcoin' },
    { id: '2', name: 'Ethereum', symbol: 'ETH', value: 18420, amount: 4.2, change: 4.7, logo: 'ethereum' },
    { id: '3', name: 'Solana', symbol: 'SOL', value: 9340, amount: 42, change: -1.8, logo: 'bowling-ball' },
    { id: '4', name: 'Cardano', symbol: 'ADA', value: 4520, amount: 3200, change: 0.6, logo: 'cube' }
  ],
  recentActivity: [
    { id: '1', type: 'purchase', symbol: 'AAPL', amount: 5, value: 980, date: '2025-03-02T10:24:32Z' },
    { id: '2', type: 'sale', symbol: 'ETH', amount: 1.2, value: 4350, date: '2025-03-01T14:18:03Z' },
    { id: '3', type: 'purchase', symbol: 'BTC', amount: 0.05, value: 2750, date: '2025-02-28T09:45:12Z' },
    { id: '4', type: 'dividend', symbol: 'MSFT', amount: null, value: 124, date: '2025-02-27T16:30:45Z' }
  ]
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9fafb',
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '12px',
    margin: '16px',
    marginBottom: '8px',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.05)',
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: '16px',
  },
  profileImage: {
    width: '80px',
    height: '80px',
    borderRadius: '40px',
    backgroundColor: '#e5e7eb',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2px',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '4px',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8px',
  },
  locationText: {
    marginLeft: '4px',
    fontSize: '14px',
    color: '#6b7280',
  },
  profileBio: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '20px',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    margin: '16px',
    marginTop: '8px',
    marginBottom: '8px',
    padding: '16px',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.05)',
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: '14px',
    color: '#3b82f6',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    margin: '16px',
    marginTop: '8px',
    marginBottom: '8px',
    padding: '16px',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.05)',
  },
  chartHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  periodSelector: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: '20px',
    padding: '4px',
  },
  periodButton: {
    padding: '6px 12px',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  activePeriod: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  periodText: {
    fontSize: '12px',
    color: '#4b5563',
  },
  activePeriodText: {
    fontSize: '12px',
    color: 'white',
    fontWeight: '500',
  },
};