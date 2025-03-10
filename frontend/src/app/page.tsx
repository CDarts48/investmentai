'use client'

import React from 'react';
import './code.module.css'; 
import Header from './components/header/Header'; 
import Hero from './components/hero/Hero'; 
import Features from './components/features/Features'; 
import Footer from './components/footer/Footer'; 

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