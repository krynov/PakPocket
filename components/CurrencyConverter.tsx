'use client';

import React, { useState } from 'react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('PKR');
  const [convertedResult, setConvertedResult] = useState<number | null>(null);

  const handleCurrencyConvert = () => {
    const rates: { [key: string]: number } = { USD: 278.5, EUR: 302.1, GBP: 355.4, AED: 75.8, SAR: 74.2, PKR: 1.0 };
    const inPKR = amount * (rates[fromCurr] || 1);
    const finalVal = inPKR / (rates[toCurr] || 1);
    setConvertedResult(Number(finalVal.toFixed(2)));
  };

  return (
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
  );
}