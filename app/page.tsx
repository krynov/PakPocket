'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BondEngine from '../components/BondEngine';
import SavedLockers from '../components/SavedLockers';
import CurrencyConverter from '../components/CurrencyConverter';
import CashCounter from '../components/CashCounter';

export default function PakPocketHome() {
  const [activeTab, setActiveTab] = useState<'bonds' | 'lockers' | 'currency' | 'cash'>('bonds');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Register PWA Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => console.log('SW reg error:', err));
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    } else {
      alert("PWA Install Ready! Agar popup nahi aya toh browser menu (three dots) mein ja kar 'Install PakPocket' select karein.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('bonds');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Dynamic Header Component */}
      <Header 
        scrollToTop={scrollToTop} 
        setActiveTab={setActiveTab} 
        handleInstallPWA={handleInstallPWA} 
      />

      {/* Hero Section & Tabs Component */}
      <Hero 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Dynamic Switching Area */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        {activeTab === 'bonds' && <BondEngine />}
        {activeTab === 'lockers' && <SavedLockers />}
        {activeTab === 'currency' && <CurrencyConverter />}
        {activeTab === 'cash' && <CashCounter />}
      </div>
    </main>
  );
}