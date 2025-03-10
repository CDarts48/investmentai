"use client";

import { useEffect, useState } from "react";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Line } from "react-chartjs-2";
import PortfolioSummary from "./components/PortfolioSummary";
import TraditionalInvestments from "./components/TraditionalInvestments";
import CryptoInvestments from "./components/CryptoInvestments";
import SocialStats from "./components/SocialStats";
import RecentActivity from "./components/RecentActivity";
import { PortfolioData, ProfileData } from "../types/types";
import styles from "./HomeScreen.module.css";

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
      <div className={styles.loadingContainer}>
        <FaSpinner size={32} className={styles.spinner} />
        <p>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.profileImageContainer}>
          <img
            src="https://api.a0.dev/assets/image?text=professional%20profile%20photo%20of%20a%20successful%20investor&seed=123"
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.badgeContainer}>
            <FaCheckCircle size={24} color="#3b82f6" />
          </div>
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>{profileData?.name}</h2>
          <div className={styles.locationContainer}>
            <MdLocationOn size={16} color="#6b7280" />
            <p className={styles.locationText}>{profileData?.location}</p>
          </div>
          <p className={styles.profileBio}>{profileData?.bio}</p>
        </div>
      </div>

      {/* Social Stats */}
      <SocialStats stats={profileData?.socialStats || {}} />

      {/* Portfolio Summary */}
      <div className={styles.sectionContainer}>
        <h3 className={styles.sectionTitle}>Portfolio Overview</h3>
        <PortfolioSummary summary={portfolioData?.summary || {}} />
      </div>

      {/* Growth Trend Chart */}
      <div className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>Growth Trend</h3>
          <div className={styles.periodSelector}>
            <button className={`${styles.periodButton} ${styles.activePeriod}`}>
              1W
            </button>
            <button className={styles.periodButton}>1M</button>
            <button className={styles.periodButton}>3M</button>
            <button className={styles.periodButton}>1Y</button>
            <button className={styles.periodButton}>ALL</button>
          </div>
        </div>
        <Line
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                data: portfolioData?.chartData || [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + value + "k",
                },
              },
            },
          }}
        />
      </div>

      {/* Traditional Investments */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Traditional Investments</h3>
          <button className={styles.viewAllButton}>
            <span className={styles.viewAllText}>View All</span>
            <FaCheckCircle size={16} color="#3b82f6" />
          </button>
        </div>
        <TraditionalInvestments
          investments={portfolioData?.traditionalInvestments || []}
        />
      </div>

      {/* Crypto Investments */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Crypto Investments</h3>
          <button className={styles.viewAllButton}>
            <span className={styles.viewAllText}>View All</span>
            <FaCheckCircle size={16} color="#3b82f6" />
          </button>
        </div>
        <CryptoInvestments
          investments={portfolioData?.cryptoInvestments || []}
        />
      </div>

      {/* Recent Activity */}
      <div className={styles.sectionContainer} style={{ marginBottom: 20 }}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Recent Activity</h3>
          <button className={styles.viewAllButton}>
            <span className={styles.viewAllText}>View All</span>
            <FaCheckCircle size={16} color="#3b82f6" />
          </button>
        </div>
        <RecentActivity activities={portfolioData?.recentActivity || []} />
      </div>
    </div>
  );
}

// --- Mock Data ---
const mockProfileData: ProfileData = {
  name: "Alex Johnson",
  location: "New York, USA",
  bio: "Investor & financial analyst with 8+ years of experience. Passionate about crypto and tech stocks.",
  avatar:
    "https://api.a0.dev/assets/image?text=professional%20profile%20photo%20of%20a%20successful%20investor&seed=123",
  socialStats: {
    followers: 2458,
    following: 542,
    posts: 128,
    insights: 76,
  },
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
      cash: 10,
    },
  },
  chartData: [18.5, 17.8, 19.2, 21.4, 20.8, 22.3, 24.5],
  traditionalInvestments: [
    {
      id: "1",
      name: "Apple Inc.",
      symbol: "AAPL",
      value: 32450,
      shares: 180,
      change: 2.4,
      logo: "apple",
    },
    {
      id: "2",
      name: "Microsoft",
      symbol: "MSFT",
      value: 28765,
      shares: 95,
      change: 1.2,
      logo: "microsoft",
    },
    {
      id: "3",
      name: "S&P 500 ETF",
      symbol: "SPY",
      value: 45320,
      shares: 120,
      change: -0.5,
      logo: "line-chart",
    },
    {
      id: "4",
      name: "Tesla Inc.",
      symbol: "TSLA",
      value: 18760,
      shares: 65,
      change: 3.8,
      logo: "car",
    },
  ],
  cryptoInvestments: [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      value: 42320,
      amount: 0.78,
      change: 2.1,
      logo: "bitcoin",
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      value: 18420,
      amount: 4.2,
      change: 4.7,
      logo: "ethereum",
    },
    {
      id: "3",
      name: "Solana",
      symbol: "SOL",
      value: 9340,
      amount: 42,
      change: -1.8,
      logo: "bowling-ball",
    },
    {
      id: "4",
      name: "Cardano",
      symbol: "ADA",
      value: 4520,
      amount: 3200,
      change: 0.6,
      logo: "cube",
    },
  ],
  recentActivity: [
    {
      id: "1",
      type: "purchase",
      symbol: "AAPL",
      amount: 5,
      value: 980,
      date: "2025-03-02T10:24:32Z",
    },
    {
      id: "2",
      type: "sale",
      symbol: "ETH",
      amount: 1.2,
      value: 4350,
      date: "2025-03-01T14:18:03Z",
    },
    {
      id: "3",
      type: "purchase",
      symbol: "BTC",
      amount: 0.05,
      value: 2750,
      date: "2025-02-28T09:45:12Z",
    },
    {
      id: "4",
      type: "dividend",
      symbol: "MSFT",
      amount: null,
      value: 124,
      date: "2025-02-27T16:30:45Z",
    },
  ],
};