'use client';

import React, { useState } from 'react';

// Mock Draw Database (20+ Years Sample)
const DRAW_DATABASE = [
  { drawNo: "102", date: "15 Aug 2026", city: "Lahore", denomination: "1500", firstPrize: "177920", secondPrizes: ["045123", "882190", "310455"], thirdPrizes: ["177100", "177850", "177900", "177920", "177999", "250411", "901244"] },
  { drawNo: "98", date: "01 Jun 2026", city: "Karachi", denomination: "750", firstPrize: "482019", secondPrizes: ["112450", "981204", "551209"], thirdPrizes: ["112100", "112400", "482010", "482019", "601244"] },
  { drawNo: "45", date: "15 Mar 2026", city: "Faisalabad", denomination: "200", firstPrize: "001289", secondPrizes: ["120944", "654109", "332109"], thirdPrizes: ["001200", "001280", "001289", "771029"] }
];

export default function BondEngine() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDenom, setSelectedDenom] = useState('1500');

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

  return (
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
  );
}