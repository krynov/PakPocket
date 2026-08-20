'use client';

import React, { useState, useEffect } from 'react';

interface BondLocker {
  id: string;
  name: string;
  denomination: string;
  bondNumbers: string[];
}

export default function SavedLockers() {
  const [lockers, setLockers] = useState<BondLocker[]>([]);
  const [lockerName, setLockerName] = useState('');
  const [denom, setDenom] = useState('1500');
  const [bondInput, setBondInput] = useState('');

  // Load saved lockers from LocalStorage (Offline Support)
  useEffect(() => {
    const saved = localStorage.getItem('pakpocket_family_lockers');
    if (saved) {
      try {
        setLockers(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save to LocalStorage
  const saveToStorage = (updatedLockers: BondLocker[]) => {
    setLockers(updatedLockers);
    localStorage.setItem('pakpocket_family_lockers', JSON.stringify(updatedLockers));
  };

  const handleAddLocker = () => {
    if (!lockerName.trim() || !bondInput.trim()) {
      alert('Kripya Locker ka naam aur Bond numbers darj karein!');
      return;
    }

    const parsedBonds = bondInput
      .split(/[\n,]+/)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const newLocker: BondLocker = {
      id: Date.now().toString(),
      name: lockerName,
      denomination: denom,
      bondNumbers: parsedBonds,
    };

    const updated = [newLocker, ...lockers];
    saveToStorage(updated);

    // Reset inputs
    setLockerName('');
    setBondInput('');
  };

  const handleDeleteLocker = (id: string) => {
    const updated = lockers.filter((l) => l.id !== id);
    saveToStorage(updated);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white">Family Saved Lockers</h2>
          <p className="text-xs text-slate-400">Offline Local Storage Supported (Zero Data Required)</p>
        </div>
        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-bold">
          {lockers.length} Active Lockers
        </span>
      </div>

      {/* Add New Locker Form */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200">Add New Family Locker</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Locker Name (e.g., Papa's Bonds, My Bonds)"
            value={lockerName}
            onChange={(e) => setLockerName(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
          <select
            value={denom}
            onChange={(e) => setDenom(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-bold"
          >
            <option value="1500">Rs. 1500</option>
            <option value="750">Rs. 750</option>
            <option value="200">Rs. 200</option>
            <option value="100">Rs. 100</option>
            <option value="25000">Rs. 25,000 Premium</option>
            <option value="40000">Rs. 40,000 Premium</option>
          </select>
        </div>
        <textarea
          placeholder="Enter bond numbers separated by commas or new lines (e.g., 177920, 045123, 882190)..."
          rows={3}
          value={bondInput}
          onChange={(e) => setBondInput(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={handleAddLocker}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl transition shadow-md"
        >
          Save Locker
        </button>
      </div>

      {/* Display Lockers List */}
      <div className="space-y-4">
        {lockers.length === 0 ? (
          <p className="text-center text-slate-500 text-sm py-4">Abhi tak koi locker save nahi hua.</p>
        ) : (
          lockers.map((locker) => (
            <div key={locker.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-emerald-400">{locker.name}</h4>
                  <span className="text-xs text-slate-400">Denomination: Rs. {locker.denomination}</span>
                </div>
                <button
                  onClick={() => handleDeleteLocker(locker.id)}
                  className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1 rounded-lg text-xs font-bold transition border border-red-500/20"
                >
                  Delete
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                {locker.bondNumbers.map((num, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-200">
                    {num}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}