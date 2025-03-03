'use client'

import React, { useState } from 'react';
import './code.module.css'; // Corrected import statement
import Header from './components/header/Header'; // Import the Header component
import Hero from './components/hero/Hero'; // Import the Hero component

export default function InvestmentAIPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Best tech stocks for 2025',
    'High dividend ETFs',
    'Cryptocurrency investment strategy'
  ]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    try {
      // Using the provided AI LLM API
      const response = await fetch('https://api.a0.dev/ai/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an expert investment advisor AI. Provide concise, actionable investment advice based on the query. Include relevant market insights, risks, and potential opportunities. Format your response with clear sections and bullet points where appropriate.'
            },
            {
              role: 'user',
              content: query
            }
          ]
        })
      });
      
      const data = await response.json();
      setResults(data.completion);
      
      // Add to recent searches if not already present
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header /> {/* Use the Header component */}
      <Hero 
        query={query} 
        setQuery={setQuery} 
        handleSearch={handleSearch} 
        loading={loading} 
        results={results} 
      /> {/* Use the Hero component */}
    </>
  );
}