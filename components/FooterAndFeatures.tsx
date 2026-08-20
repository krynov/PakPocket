'use client';

import React from 'react';
import { ShieldCheck, Zap, Smartphone, Heart, Globe, CheckCircle2, Download, Monitor } from 'lucide-react';

export default function FooterAndFeatures() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Security First",
      desc: "Your data is protected with bank-grade encryption. We never compromise on security."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Instant result checking with real-time notifications. Know when you win in seconds."
    },
    {
      icon: Smartphone,
      title: "Always Accessible",
      desc: "Access your bonds from any device, anywhere. Your portfolio is always in your pocket."
    },
    {
      icon: Heart,
      title: "User Focused",
      desc: "Every feature is designed with you in mind. Simple, intuitive, and delightful to use."
    },
    {
      icon: Globe,
      title: "Made for Pakistan",
      desc: "Built by Pakistanis, for Pakistanis. We understand your needs and speak your language."
    },
    {
      icon: CheckCircle2,
      title: "Always Reliable",
      desc: "Trust us to check every draw, every bond, every time. Never miss a winning opportunity."
    }
  ];

  return (
    <div className="space-y-16 mt-16 bg-slate-950 text-slate-100">
      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-500/30 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-semibold">
            ❤️ Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Built on Values That Matter
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm">
            Every decision we make is guided by our commitment to you, our users.
          </p>
        </div>

        {/* Features Grid with Glow & Lift Hover Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 space-y-4 group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ready to Never Miss a Win Banner */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Ready to Never Miss a Win?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm">
              Join over a million Pakistanis who trust PakPocket to manage their prize bonds. Start for free today.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-2">
            <button 
              onClick={() => alert("Downloading Android App...")}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/20 text-sm transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" /> Download for Android
            </button>
            <button 
              onClick={() => alert("Downloading Windows App...")}
              className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold px-6 py-3.5 rounded-xl transition flex items-center gap-2 text-sm transform hover:-translate-y-0.5"
            >
              <Monitor className="w-4 h-4" /> Download for Windows
            </button>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 pt-16 pb-10 text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-emerald-400">Pak</span>Pocket
            </h3>
            <p className="text-slate-400 text-xs md:text-sm max-w-sm">
              Your trusted platform for managing prize bonds in Pakistan. Check results, track bonds, and never miss a win.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-emerald-400 transition">Home</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition">Pricing</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition">About</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition">Contact</a></li>
              <li><a href="#results" className="hover:text-emerald-400 transition">Download Results</a></li>
              <li><a href="#schedule" className="hover:text-emerald-400 transition">Draw Schedule</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#privacy" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-emerald-400 transition">Terms & Conditions</a></li>
              <li><a href="#legal" className="hover:text-emerald-400 transition">Legal Info</a></li>
              <li><a href="#fair" className="hover:text-emerald-400 transition">Fair Usage Policy</a></li>
              <li><a href="#refund" className="hover:text-emerald-400 transition">Refund Policy</a></li>
              <li><a href="#deletion" className="hover:text-emerald-400 transition">Account Deletion</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-6 text-center text-xs text-slate-500">
          © 2026 PakPocket. All rights reserved.
        </div>
      </footer>
    </div>
  );
}