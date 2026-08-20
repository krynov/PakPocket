'use client';

import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <section className="py-16 bg-slate-950 text-slate-100 space-y-12">
      <div className="bg-gradient-to-b from-emerald-950/60 to-slate-950 border-b border-slate-800/80 py-16 px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-500/30 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-semibold">
          📞 We're Here to Help
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Get in <span className="text-emerald-400">Touch</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30 text-xl font-bold">
              ✉
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Email Us</h3>
              <p className="text-xs text-slate-400">We'll respond within 48 hours</p>
            </div>
            <p className="text-emerald-400 font-mono font-bold text-lg">fahadkhanhereokgmail.com</p>
            <span className="text-xs text-slate-500 block">For all inquiries</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 text-xl font-bold">
              📞
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">WhatsApp / Phone</h3>
              <p className="text-xs text-slate-400">Quick responses on chat</p>
            </div>
            <p className="text-emerald-400 font-mono font-bold text-lg">+92 322 4618085</p>
            <span className="text-xs text-slate-500 block">Usually replies in hours</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20 font-bold">
                ✈
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Send a Message</h3>
                <p className="text-xs text-slate-400">We'll get back to you within 24 hours</p>
              </div>
            </div>

            {submitted && (
              <div className="mb-6 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-sm font-semibold">
                ✓ Message sent successfully! We will contact you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Muhammad Ali"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Prize Bond Support">Prize Bond Support</option>
                    <option value="Technical Issue">Technical Issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 text-sm"
              >
                Send Message ➔
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-900 border border-emerald-700/50 p-6 rounded-3xl shadow-xl space-y-4 text-white">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                🕒 Business Hours
              </div>
              <div className="space-y-2 text-sm border-t border-emerald-800/60 pt-3">
                <div className="flex justify-between">
                  <span className="text-emerald-100">Monday - Friday</span>
                  <span className="font-mono font-bold">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-200/80">Saturday</span>
                  <span className="font-mono font-bold">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-200/80">Sunday</span>
                  <span className="font-mono font-bold">Closed</span>
                </div>
              </div>
              <p className="text-xs text-emerald-200/70 pt-2 border-t border-emerald-800/60">
                📍 All times are in Pakistan Standard Time (PKT)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}