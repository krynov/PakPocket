'use client';

import React, { useState } from 'react';
import { Search, Download, ShieldCheck, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export default function BondEngine() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDenom, setSelectedDenom] = useState('1500');
  const [isSearched, setIsSearched] = useState(false);

  // Generate a mock master list of all bond numbers for the selected denomination (e.g., 500+ numbers for demo)
  // Real app mein yahan backend ya complete dataset aayega
  const generateMasterList = (denom: string) => {
    const list = [];
    const prefix = denom === '100' ? '12' : denom === '1500' ? '17' : '45';
    for (let i = 100000; i <= 100150; i++) {
      list.push(`${prefix}${i.toString().slice(1)}`);
    }
    return list;
  };

  const masterBondsList = generateMasterList(selectedDenom);

  // Filtered list based on search query
  const filteredBonds = masterBondsList.filter(num => 
    num.includes(searchQuery.trim())
  );

  return (
    <div className="space-y-8">
      {/* Search Bar & Denomination Selector */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search specific bond number (e.g., 177920)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none text-sm font-medium"
            />
          </div>
          
          <div className="w-full md:w-56">
            <select
              value={selectedDenom}
              onChange={(e) => {
                setSelectedDenom(e.target.value);
                setIsSearched(false);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white font-bold focus:border-emerald-500 focus:outline-none text-sm"
            >
              <option value="100">Rs. 100 Bonds</option>
              <option value="200">Rs. 200 Bonds</option>
              <option value="750">Rs. 750 Bonds</option>
              <option value="1500">Rs. 1,500 Bonds</option>
              <option value="25000">Rs. 25,000 Bonds</option>
              <option value="40000">Rs. 40,000 Bonds</option>
            </select>
          </div>

          <button
            onClick={() => setIsSearched(true)}
            className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl transition shadow-lg shadow-emerald-500/20 text-sm flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Load List
          </button>
        </div>
      </div>

      {/* Results Header with PDF Download Option */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-950 border border-emerald-500/30 px-3 py-1 rounded-full">
                Rs. {selectedDenom} Master List
              </span>
              <span className="text-xs text-slate-400 font-mono">Showing {filteredBonds.length} numbers</span>
            </div>
            <h3 className="text-2xl font-black text-white mt-2">
              Complete Draw Series & Number Registry
            </h3>
          </div>

          <button 
            onClick={() => alert(`Downloading official PDF list for Rs. ${selectedDenom} bonds...`)}
            className="bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/40 font-bold px-5 py-3 rounded-2xl text-xs transition flex items-center gap-2 self-start md:self-auto shadow-lg shadow-emerald-950/50"
          >
            <Download className="w-4 h-4" /> Download Official PDF List
          </button>
        </div>

        {/* Numbers Grid Display */}
        <div className="bg-slate-950/90 border border-slate-800/80 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Click search or type digits to instantly dark-highlight numbers
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-emerald-400 hover:underline font-bold"
              >
                Clear Search Filter ×
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredBonds.map((num, i) => {
              const isHighlighted = searchQuery && num.includes(searchQuery.trim());
              return (
                <div 
                  key={i}
                  className={`py-3 px-2 rounded-xl font-mono text-center text-sm font-bold transition-all duration-200 ${
                    isHighlighted 
                      ? 'bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/40 scale-105 border-2 border-emerald-300 z-10' 
                      : searchQuery 
                        ? 'bg-slate-900/30 text-slate-600 border border-slate-900 opacity-30' 
                        : 'bg-slate-900 border border-slate-800 text-slate-200 hover:border-slate-700 hover:text-emerald-400'
                  }`}
                >
                  {num}
                </div>
              );
            })}
          </div>

          {filteredBonds.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <p className="text-slate-400 text-sm">No bond number found matching &quot;<span className="text-emerald-400 font-mono">{searchQuery}</span>&quot;</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs bg-slate-900 text-white px-4 py-2 rounded-xl border border-slate-800"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}