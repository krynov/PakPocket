'use client';

import React, { useState, useEffect } from 'react';
import SavedLockers from '../components/SavedLockers';

// Mock Draw Database (20+ Years Sample)
const DRAW_DATABASE = [
  { drawNo: "102", date: "15 Aug 2026", city: "Lahore", denomination: "1500", firstPrize: "177920", secondPrizes: ["045123", "882190", "310455"], thirdPrizes: ["177100", "177850", "177900", "177920", "177999", "250411", "901244"] },
  { drawNo: "98", date: "01 Jun 2026", city: "Karachi", denomination: "750", firstPrize: "482019", secondPrizes: ["112450", "981204", "551209"], thirdPrizes: ["112100", "112400", "482010", "482019", "601244"] },
  { drawNo: "45", date: "15 Mar 2026", city: "Faisalabad", denomination: "001289", secondPrizes: ["120944", "654109", "332109"], thirdPrizes: ["001200", "001280", "001289", "771029"] }
];

export default function PakPocketHome() {
  const [activeTab, setActiveTab] = useState<'bonds' | 'lockers' | 'currency' | 'cash'>('bonds');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDenom, setSelectedDenom] = useState('1500');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Cash Counter States
  const [cashNotes, setCashNotes] = useState<{ [key: number]: number }>({
    5000: 0, 1000: 0, 500: 0, 100: 0, 50: 0, 20: 0, 10: 0
  });

  // Currency Converter States
  const [amount, setAmount] = useState<number>(100);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('PKR');
  const [convertedResult, setConvertedResult] = useState<number | null>(null);

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
      alert("PWA Install Ready! Agar popup nahi aya toh browser menu (three dots) mein ja kar 'Install PakPocket' ya 'Save to Desktop' select karein.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('bonds');
  };

  // Dynamic Text Highlighting Function
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={index} className="bg-emerald-500 text-slate-950 font-extrabold px-0.5 rounded shadow-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // Calculate Cash Total
  const calculateCashTotal = () => {
    return Object.entries(cashNotes).reduce((acc, [note, count]) => acc + Number(note) * count, 0);
  };

  // Convert Currency
  const handleCurrencyConvert = () => {
    const rates: { [key: string]: number } = { USD: 278.5, EUR: 302.1, GBP: 355.4, AED: 75.8, SAR: 74.2, PKR: 1.0 };
    const inPKR = amount * (rates[fromCurr] || 1);
    const finalVal = inPKR / (rates[toCurr] || 1);
    setConvertedResult(Number(finalVal.toFixed(2)));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Dynamic Header with Navigation */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
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

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-300">
          <button onClick={scrollToTop} className="hover:text-emerald-400 transition">Home</button>
          <button onClick={() => { setActiveTab('bonds'); }} className="hover:text-emerald-400 transition">Marketplace <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">NEW</span></button>
          <button onClick={() => alert('Partner Program coming soon!')} className="hover:text-emerald-400 transition">Partner Program <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">EARN</span></button>
          <button onClick={() => { setActiveTab('currency'); }} className="hover:text-emerald-400 transition">Pricing</button>
          <button onClick={() => { setActiveTab('lockers'); }} className="hover:text-emerald-400 transition">Saved Lockers</button>
        </nav>

        <div className="flex items-center space-x-3">
          <button onClick={handleInstallPWA} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition shadow-md">
            Install App
          </button>
        </div>
      </header>

      {/* Hero Banner */}
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

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        
        {/* TAB 1: PRIZE BOND ENGINE */}
        {activeTab === 'bonds' && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Type bond digits to live highlight (e.g., 177, 482)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-lg font-mono tracking-wider"
                />
                <select
                  value={selectedDenom}
                  onChange={(e) => setSelectedDenom(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-bold"
                >
                  <option value="1500">Rs. 1500</option>
                  <option value="750">Rs. 750</option>
                  <option value="200">Rs. 200</option>
                  <option value="100">Rs. 100</option>
                  <option value="25000">Rs. 25,000 Premium</option>
                  <option value="40000">Rs. 40,000 Premium</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-200">Draw Results & History</h2>
              {DRAW_DATABASE.filter(d => d.denomination === selectedDenom).map((draw, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs text-emerald-400 font-bold uppercase">Draw #{draw.drawNo}</span>
                      <h3 className="text-lg font-bold text-white">{draw.city} ({draw.date})</h3>
                    </div>
                    <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700">
                      Download PDF List
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                      <span className="text-xs text-slate-400 block font-semibold mb-1">1st Prize Number</span>
                      <p className="text-2xl font-mono font-bold text-emerald-400">
                        {renderHighlightedText(draw.firstPrize, searchQuery)}
                      </p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                      <span className="text-xs text-slate-400 block font-semibold mb-1">2nd Prize Numbers</span>
                      <div className="flex flex-wrap gap-2 text-base font-mono font-bold text-slate-200">
                        {draw.secondPrizes.map((num, i) => (
                          <span key={i}>{renderHighlightedText(num, searchQuery)}{i < draw.secondPrizes.length - 1 ? ',' : ''}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <span className="text-xs text-slate-400 block font-semibold">3rd Prize Numbers (Live Highlight Active)</span>
                    <div className="flex flex-wrap gap-3 font-mono text-sm">
                      {draw.thirdPrizes.map((num, i) => (
                        <span key={i} className="bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                          {renderHighlightedText(num, searchQuery)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SAVED LOCKERS */}
        {activeTab === 'lockers' && <SavedLockers />}

        {/* TAB 3: CURRENCY CONVERTER */}
        {activeTab === 'currency' && (
          <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold text-center text-white">Global Offline Currency Converter</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-semibold">From</label>
                  <select
                    value={fromCurr}
                    onChange={(e) => setFromCurr(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="SAR">SAR (ر.س)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="PKR">PKR (Rs)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-semibold">To</label>
                  <select
                    value={toCurr}
                    onChange={(e) => setToCurr(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="PKR">PKR (Rs)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="SAR">SAR (ر.س)</option>
                    <option value="AED">AED (د.إ)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleCurrencyConvert}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/20"
              >
                Calculate Rate
              </button>

              {convertedResult !== null && (
                <div className="bg-slate-950 border border-emerald-500/30 p-4 rounded-xl text-center">
                  <span className="text-xs text-slate-400">Converted Amount</span>
                  <p className="text-3xl font-black text-emerald-400 font-mono">
                    {convertedResult} {toCurr}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CASH COUNTER */}
        {activeTab === 'cash' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold text-center text-white">Pakistani Rupee Cash Counter</h2>
            
            <div className="space-y-3">
              {[5000, 1000, 500, 100, 50, 20, 10].map((note) => (
                <div key={note} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold font-mono text-emerald-400 w-24">Rs. {note}</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={cashNotes[note] || ''}
                    onChange={(e) => setCashNotes({ ...cashNotes, [note]: Number(e.target.value) })}
                    className="w-28 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-center text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="font-mono text-slate-300 w-32 text-right">
                    = Rs. {(cashNotes[note] || 0) * note}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-xs text-emerald-300 font-bold uppercase">Grand Total Amount</span>
                <p className="text-3xl font-black text-emerald-400 font-mono">Rs. {calculateCashTotal().toLocaleString()}</p>
              </div>
              <button onClick={() => setCashNotes({ 5000: 0, 1000: 0, 500: 0, 100: 0, 50: 0, 20: 0, 10: 0 })} className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold border border-slate-700">
                Clear All
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}