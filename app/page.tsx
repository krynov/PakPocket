'use client';

import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { Camera, DollarSign, Award, Calculator } from 'lucide-react';
import drawsData from '@/app/data/draws.json';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'bond' | 'currency' | 'counter'>('bond');
  
  // Prize Bond State
  const [bondNumber, setBondNumber] = useState('');
  const [denomination, setDenomination] = useState('1500');
  const [bondResult, setBondResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Currency State
  const [amount, setAmount] = useState('100');
  const [currency, setCurrency] = useState('USD');
  const [converted, setConverted] = useState<string | null>(null);

  // Cash Counter State
  const [notes, setNotes] = useState<{ [key: number]: number }>({
    5000: 0,
    1000: 0,
    500: 0,
    100: 0,
    50: 0,
    20: 0,
    10: 0,
  });

  const rates: Record<string, number> = {
    USD: 278.5,
    EUR: 302.1,
    GBP: 355.4,
    SAR: 74.2,
    AED: 75.8,
  };

  // Updated checkBond function supporting single or multiple bonds
  const checkBond = (numString: string, denom: string) => {
    if (!numString.trim()) return;

    // Comma, space, or newline se numbers split karein
    const numbersArray = numString
      .split(/[\s,\n]+/)
      .map((n) => n.trim())
      .filter((n) => n.length === 6);

    if (numbersArray.length === 0) {
      setBondResult('❌ Please enter valid 6-digit bond numbers.');
      return;
    }

    const winningList = (drawsData as Record<string, string[]>)[denom] || [];
    const winners = numbersArray.filter((num) => winningList.includes(num));

    if (winners.length > 0) {
      setBondResult(`🎉 WINNER FOUND! Matching Bond(s): ${winners.join(', ')} in Rs. ${denom} draw list!`);
    } else {
      setBondResult(`❌ No winner found out of ${numbersArray.length} checked bond(s) for Rs. ${denom}.`);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setBondResult('Scanning image for 6-digit bond number...');

    try {
      const { data } = await Tesseract.recognize(file, 'eng');
      const foundNumbers = data.text.match(/\b\d{6}\b/g);

      if (foundNumbers && foundNumbers.length > 0) {
        const detected = foundNumbers[0];
        setBondNumber(detected);
        checkBond(detected, denomination);
      } else {
        setBondResult('❌ Could not read a clear 6-digit bond number from image.');
      }
    } catch {
      setBondResult('❌ Image scanning failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val)) return;
    const rate = rates[currency] || 0;
    setConverted(`${val} ${currency} = PKR ${(val * rate).toLocaleString()}`);
  };

  const totalCash = Object.entries(notes).reduce(
    (sum, [denom, count]) => sum + Number(denom) * count,
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-emerald-400 tracking-tight">PakPocket</h1>
          <p className="text-slate-400 text-sm mt-1">Smart Pakistan Utility Companion</p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-slate-800/60 p-1.5 rounded-2xl mb-8 border border-slate-700/50">
          <button
            onClick={() => setActiveTab('bond')}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'bond'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" /> Prize Bond
          </button>
          <button
            onClick={() => setActiveTab('currency')}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'currency'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Currency
          </button>
          <button
            onClick={() => setActiveTab('counter')}
            className={`flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'counter'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" /> Cash Counter
          </button>
        </div>

        {/* Prize Bond Tab */}
        {activeTab === 'bond' && (
          <div className="space-y-5">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-2xl p-6 transition bg-slate-800/30">
              <Camera className="w-10 h-10 text-emerald-400 mb-2" />
              <p className="text-sm font-medium text-slate-300">Scan Bond Picture</p>
              <p className="text-xs text-slate-500 mt-1">Auto-detects 6-digit number from photo</p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isScanning}
                className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-xs font-semibold transition"
              >
                {isScanning ? 'Scanning...' : 'Upload Image'}
              </button>
            </div>

            <div className="relative flex items-center my-4">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-500 uppercase font-semibold">Or Check Manually</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                checkBond(bondNumber, denomination);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Denomination</label>
                  <select
                    value={denomination}
                    onChange={(e) => setDenomination(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-100 text-xs font-bold"
                  >
                    <option value="100">Rs. 100</option>
                    <option value="200">Rs. 200</option>
                    <option value="750">Rs. 750</option>
                    <option value="1500">Rs. 1500</option>
                    <option value="7500">Rs. 7,500</option>
                    <option value="15000">Rs. 15,000</option>
                    <option value="25000">Rs. 25,000 P.</option>
                    <option value="40000">Rs. 40,000 P.</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Bond Numbers</label>
                  <textarea
                    rows={3}
                    placeholder="Enter numbers separated by commas or new lines (e.g. 123456, 789012)"
                    value={bondNumber}
                    onChange={(e) => setBondNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-600 font-mono text-xs sm:text-sm resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-emerald-500/10 text-sm"
              >
                Search Official Draw
              </button>
            </form>

            {bondResult && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-center font-medium leading-relaxed">
                {bondResult}
              </div>
            )}
          </div>
        )}

        {/* Currency Converter Tab */}
        {activeTab === 'currency' && (
          <form onSubmit={handleConvert} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-100 text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-100 text-sm font-medium"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="SAR">SAR - Saudi Riyal</option>
                <option value="AED">AED - UAE Dirham</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition text-sm"
            >
              Convert to PKR
            </button>
            {converted && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-base font-bold text-center text-emerald-400">
                {converted}
              </div>
            )}
          </form>
        )}

        {/* Cash Denomination Counter Tab */}
        {activeTab === 'counter' && (
          <div className="space-y-4">
            <div className="max-h-64 overflow-y-auto pr-1 space-y-2">
              {[5000, 1000, 500, 100, 50, 20, 10].map((denom) => (
                <div key={denom} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-emerald-400 w-20">PKR {denom}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">x</span>
                    <input
                      type="number"
                      min="0"
                      value={notes[denom] || ''}
                      onChange={(e) =>
                        setNotes({ ...notes, [denom]: Math.max(0, parseInt(e.target.value) || 0) })
                      }
                      className="w-20 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-center text-xs font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-300 w-24 text-right">
                    Rs. {((notes[denom] || 0) * denom).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-emerald-400">Total Cash:</span>
              <span className="text-xl font-black text-emerald-300">PKR {totalCash.toLocaleString()}</span>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}