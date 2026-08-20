'use client';

import React, { useState } from 'react';

interface HeaderProps {
  scrollToTop: () => void;
  setActiveTab: (tab: 'bonds' | 'lockers' | 'currency' | 'cash') => void;
  handleInstallPWA: () => void;
}

export default function Header({ scrollToTop, setActiveTab, handleInstallPWA }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div 
          onClick={scrollToTop} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition">
            P
          </div>
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition">
            Pak<span className="text-emerald-400 group-hover:text-white">Pocket</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-slate-300">
          <button onClick={scrollToTop} className="hover:text-emerald-400 transition">Home</button>
          <button onClick={() => setActiveTab('bonds')} className="hover:text-emerald-400 transition">Marketplace <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">NEW</span></button>
          <button onClick={() => alert('Partner Program coming soon!')} className="hover:text-emerald-400 transition">Partner Program <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">EARN</span></button>
          <button onClick={() => setActiveTab('currency')} className="hover:text-emerald-400 transition">Pricing</button>
          <button onClick={() => setActiveTab('lockers')} className="hover:text-emerald-400 transition">Saved Lockers</button>
        </nav>

        <div className="flex items-center space-x-3">
          <button onClick={handleInstallPWA} className="hidden sm:block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition shadow-md">
            Install App
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:bg-slate-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3 shadow-2xl">
          <button onClick={() => { scrollToTop(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-slate-300 hover:text-emerald-400">Home</button>
          <button onClick={() => { setActiveTab('bonds'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-slate-300 hover:text-emerald-400">Marketplace</button>
          <button onClick={() => { alert('Partner Program coming soon!'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-slate-300 hover:text-emerald-400">Partner Program</button>
          <button onClick={() => { setActiveTab('currency'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-slate-300 hover:text-emerald-400">Pricing</button>
          <button onClick={() => { setActiveTab('lockers'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-slate-300 hover:text-emerald-400">Saved Lockers</button>
          <div className="pt-2">
            <button onClick={() => { handleInstallPWA(); setMobileMenuOpen(false); }} className="w-full bg-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl text-center">
              Install App
            </button>
          </div>
        </div>
      )}
    </>
  );
}