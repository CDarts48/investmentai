// filepath: /Users/corey/Desktop/investmentai/frontend/src/app/page.tsx
'use client'

import React from 'react';
import './code.module.css'; // Corrected import statement
import Header from './components/header/Header'; // Import the Header component
import Hero from './components/hero/Hero'; // Import the Hero component

export default function InvestmentAIPage() {
  return (
    <>
      <Header /> {/* Use the Header component */}
      <Hero /> {/* Use the Hero component */}
    </>
  );
}