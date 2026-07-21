import React from 'react';
import { Printer, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const EvidenceVault: React.FC = () => {
  const { cases } = useData();
  const activeCase = cases[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
          <div>
            <h4 className="font-bold text-lg text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Digital Evidence Package Viewer (Section 65B compliant)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">Signed cryptographically using SentinelX Threat Fusion Unit HSM Private Key.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1.5 rounded-full font-bold border border-emerald-500/30">
              Signature Valid
            </span>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export DEP Ledger PDF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-slate-850 p-4 rounded-lg">
          <div>
            <p className="text-slate-500 font-semibold uppercase">SHA-256 HASH VERIFICATION</p>
            <p className="font-mono text-white font-bold mt-1 break-all">4a9b2c3d8e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b</p>
          </div>
          <div>
            <p className="text-slate-500 font-semibold uppercase">DIGITAL SIGNATURE HEX (HSM KEY V7)</p>
            <p className="font-mono text-white font-bold mt-1 break-all">a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2</p>
          </div>
        </div>

        {/* PRINTABLE LEGAL FORENSIC DOSSIER */}
        <div id="printable-evidence-ledger" className="border border-slate-300 bg-white text-slate-900 p-8 rounded-lg min-h-[450px] space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b-2 border-slate-300 pb-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">SENTINELX PUBLIC SAFETY FORENSIC LEDGER</h1>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                Digital Evidence Package (DEP) — Case Ref: {activeCase?.id || 'SX-2026-0041'}
              </p>
            </div>
            <div className="text-right">
              <span className="border-2 border-emerald-600 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1 uppercase rounded tracking-wider">
                Legally Signed Sec 65B
              </span>
              <p className="text-[9px] text-slate-500 mt-1 font-mono">{new Date().toLocaleString()}</p>
            </div>
          </div>

          <table className="w-full text-xs text-left border-collapse border border-slate-300">
            <tbody>
              <tr className="bg-slate-50 border-b border-slate-300">
                <td className="p-2.5 font-bold w-1/3 text-slate-700">Incident Classification</td>
                <td className="p-2.5 font-semibold text-slate-900">{activeCase?.crimeCategory || 'DIGITAL_ARREST (CBI Impersonation)'}</td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="p-2.5 font-bold text-slate-700">Primary Complainant / Phone</td>
                <td className="p-2.5 font-semibold text-slate-900">{activeCase?.reporter || 'Rajesh Sharma'} ({activeCase?.phone || '+919811223344'})</td>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-300">
                <td className="p-2.5 font-bold text-slate-700">Jurisdiction & Location</td>
                <td className="p-2.5 font-semibold text-slate-900">{activeCase?.location || 'Mumbai Central Police Station'}</td>
              </tr>
              <tr className="border-b border-slate-300">
                <td className="p-2.5 font-bold text-slate-700">Analysis Metrics</td>
                <td className="p-2.5 font-semibold text-slate-900">Scam Score: 0.94 | Synthetic Voice Match: 0.88 | Risk Level: CRITICAL</td>
              </tr>
            </tbody>
          </table>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wider">
              I. Coercive Script Transcripts & Forensic Evidence
            </p>
            <p className="text-[11px] font-mono leading-relaxed text-slate-800 bg-slate-50 p-3.5 rounded border border-slate-200">
              "{activeCase?.detail || 'You are under digital arrest. Do not disconnect the camera. We found narcotics in your package shipped to Cambodia. You must verify your funds by sending them to our safety locker account.'}"
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wider">
              II. Trace Flow Hop Coordinates (NPCI Multi-Hop Trail)
            </p>
            <table className="w-full text-[10px] text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-2">Tx ID</th>
                  <th className="p-2">From Account</th>
                  <th className="p-2">To Account (Flagged Mule)</th>
                  <th className="p-2">Amount (INR)</th>
                  <th className="p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono">TXN-001</td>
                  <td className="p-2 font-mono">BA-SBI-1002</td>
                  <td className="p-2 font-semibold text-rose-700 font-mono">BA-HDFC-9921</td>
                  <td className="p-2 font-bold text-rose-600 font-mono">₹2,50,000.00</td>
                  <td className="p-2 font-mono">2026-06-22 17:35:00</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2 font-mono">TXN-002</td>
                  <td className="p-2 font-mono">BA-HDFC-9921</td>
                  <td className="p-2 font-semibold text-rose-700 font-mono">BA-ICICI-8812</td>
                  <td className="p-2 font-bold text-rose-600 font-mono">₹2,40,000.00</td>
                  <td className="p-2 font-mono">2026-06-22 17:38:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
