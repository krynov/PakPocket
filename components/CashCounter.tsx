'use client';

import React, { useState } from 'react';

export default function CashCounter() {
  const [cashNotes, setCashNotes] = useState<{ [key: number]: number }>({
    5000: 0, 1000: 0, 500: 0, 100: 0, 50: 0, 20: 0, 10: 0
  });

  const calculateCashTotal = () => {
    return Object.entries(cashNotes).reduce((acc, [note, count]) => acc + Number(note) * count, 0);
  };

  return (
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
  );
}