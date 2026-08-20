'use client';

import React from 'react';

interface HeroProps {
  activeTab: string;
  setActiveTab: (tab: 'bonds' | 'lockers' | 'currency' | 'cash' | 'contact') => void;
}

export default function Hero({ activeTab, setActiveTab }: HeroProps) {
  const tabs = [
    { id: 'bonds', label: 'Prize Bond Engine' },
    { id: 'lockers', label: 'Saved Lockers' },
    { id: 'currency', label: 'Currency Converter' },
    { id: 'cash', label: 'Cash Counter' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <section className="pt-16 pb-12 px-6 text-center bg-slate-950 text-slate-100 space-y-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          Pakistan's Most Advanced <br />
          <span className="text-emerald-400">Prize Bond & Utility Platform</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          Real-time draw highlighting, 20+ years complete historical records, offline currency converter, and denomination cash counter.
        </p>
      </div>

      {/* Interactive Tabs with Hover Glow & Lift Effect */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/40 shadow-xl'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white hover:shadow-emerald-500/20'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}