'use client';

import React from 'react';

interface HeroProps {
  activeTab: 'bonds' | 'lockers' | 'currency' | 'cash';
  setActiveTab: (tab: 'bonds' | 'lockers' | 'currency' | 'cash') => void;
}

export default function Hero({ activeTab, setActiveTab }: HeroProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-10 text-center space-y-4">
      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Next-Gen Financial Suite
      </span>
      <h1 className="text-4xl md:text-6xl font-black leading-tight">
        Pakistan's Most Advanced <br />
        <span className="text-emerald-400">Prize Bond & Utility Platform</span>
      </h1>
      <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
        Real-time draw highlighting, 20+ years complete historical records, offline currency converter, and denomination cash counter.
      </p>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-3 pt-6">
        <button
          onClick={() => setActiveTab('bonds')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${activeTab === 'bonds' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          Prize Bond Engine
        </button>
        <button
          onClick={() => setActiveTab('lockers')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${activeTab === 'lockers' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          Saved Lockers
        </button>
        <button
          onClick={() => setActiveTab('currency')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${activeTab === 'currency' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          Currency Converter
        </button>
        <button
          onClick={() => setActiveTab('cash')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${activeTab === 'cash' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
        >
          Cash Counter
        </button>
      </div>
    </section>
  );
}