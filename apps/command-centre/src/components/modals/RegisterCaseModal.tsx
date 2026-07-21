import React, { useState } from 'react';
import { Shield, X, RefreshCw } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CYBER_CRIME_CATEGORIES = [
  "Email Frauds",
  "Social Media crimes",
  "Mobile App related crimes",
  "Business Email Compromise",
  "Data Theft",
  "Ransomeware",
  "Net Banking/ATM Frauds",
  "Fake Calls Frauds",
  "Insurance Frauds",
  "Lottery Scam",
  "Bitcoin",
  "Cheating Scams",
  "Online Transactions Frauds",
  "Gift Card Frauds",
  "OLX QR Code Frauds",
  "PayTM KYC Frauds",
  "Sextortion Frauds",
  "Phishing-Vishing Fraud",
  "Counterfeit Currency Note"
];

export const RegisterCaseModal: React.FC = () => {
  const { isRegisterCaseModalOpen, closeRegisterCaseModal, addCase } = useData();

  const [form, setForm] = useState({
    reporter: '',
    phone: '',
    crimeCategory: CYBER_CRIME_CATEGORIES[0],
    detail: '',
    location: '',
    status: 'OPEN' as const,
    priority: 'HIGH' as const
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isRegisterCaseModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addCase({
        reporter: form.reporter || 'Anonymous Citizen',
        phone: form.phone || '+91 98765 00000',
        crimeCategory: form.crimeCategory,
        detail: form.detail,
        location: form.location || 'Mumbai',
        status: form.status,
        priority: form.priority
      });

      setForm({
        reporter: '',
        phone: '',
        crimeCategory: CYBER_CRIME_CATEGORIES[0],
        detail: '',
        location: '',
        status: 'OPEN',
        priority: 'HIGH'
      });

      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center bg-slate-850 px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-white text-base">Register New Cyber Incident Report</h3>
          </div>
          <button
            onClick={closeRegisterCaseModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Cyber Crime Category *</label>
            <select
              value={form.crimeCategory}
              onChange={(e) => setForm({ ...form, crimeCategory: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-teal-400 font-bold rounded-lg p-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              {CYBER_CRIME_CATEGORIES.map((cat, idx) => (
                <option key={idx} value={cat} className="bg-slate-900 text-white">
                  ● {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Complainant / Reporter Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Inspector Ramesh Kumar / Citizen Name"
              value={form.reporter}
              onChange={(e) => setForm({ ...form, reporter: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Location / District *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mumbai, Pune, Delhi, Noida, Bengaluru"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Initial Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                <option value="OPEN">OPEN</option>
                <option value="INVESTIGATING">INVESTIGATING</option>
                <option value="EVIDENCE_PACKAGED">EVIDENCE PACKAGED</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Priority Level (Map Severity)</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-teal-500 cursor-pointer font-bold"
              >
                <option value="CRITICAL" className="text-red-400 font-bold">🔴 CRITICAL SEVERITY (Red Pin)</option>
                <option value="HIGH" className="text-amber-400 font-bold">🟠 HIGH SEVERITY (Orange Pin)</option>
                <option value="MEDIUM" className="text-yellow-400 font-bold">🟡 MEDIUM / LOW SEVERITY (Yellow Pin)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Incident Detail & Modus Operandi *</label>
            <textarea
              required
              rows={3}
              placeholder="Describe the cyber arrest call, extortion attempt, counterfeit note serials, or fraudulent UPI handle..."
              value={form.detail}
              onChange={(e) => setForm({ ...form, detail: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={closeRegisterCaseModal}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white rounded-lg font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Resolving Geocoded Pin & Registering...
                </>
              ) : (
                "File & Register Case"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
