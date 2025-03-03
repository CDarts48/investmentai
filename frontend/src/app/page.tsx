// filepath: /Users/corey/Desktop/investmentai/frontend/src/app/page.tsx
'use client'

import React from 'react';
import './code.module.css'; // Corrected import statement
import Header from './components/header/Header'; // Import the Header component
import Hero from './components/hero/Hero'; // Import the Hero component
import Features from './components/features/Features'; // Import the Features component
import Footer from './components/footer/Footer'; // Import the Footer component

export default function InvestmentAIPage() {
  return (
    <>
      <Header /> {/* Use the Header component */}
      <Hero /> {/* Use the Hero component */}
      <Features /> {/* Use the Features component */}
      <Footer /> {/* Use the Footer component */}
    </>
  );
}