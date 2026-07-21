import React, { useState } from 'react';
import { Search, Plus, Download, ShieldCheck } from 'lucide-react';

export const CaseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<any | null>(null);

  const cases = [
    {
      id: "SX-2026-0041",
      title: "Digital Arrest Scam Extortion - CBI Impersonation",
      reporter: "Rajesh Sharma",
      phone: "+919811223344",
      type: "DIGITAL_ARREST",
      status: "UNDER_INVESTIGATION",
      date: "2026-06-22",
      scamScore: 0.94,
      deepfakeScore: 0.88,
      evidencePdf: "DEP_SX-2026-0041.pdf",
      sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      signature: "0x8f9a2b1c4d3e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0"
    },
    {
      id: "SX-2026-0042",
      title: "Counterfeit ₹500 Note Scan Batch - Colaba Retailer",
      reporter: "Sunita Vyas",
      phone: "+919922003344",
      type: "COUNTERFEIT",
      status: "OPEN",
      date: "2026-06-22",
      scamScore: 0.88,
      deepfakeScore: 0.0,
      evidencePdf: "DEP_SX-2026-0042.pdf",
      sha256: "5d41402abc4b2a76b9719d911017c592",
      signature: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2"
    }
  ];

  const filteredCases = cases.filter(c =>
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.reporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search cases by reference ID, reporter name, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/60 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500"
          />
        </div>

        <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Case File</span>
        </button>
      </div>

      <div className="rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="p-4">Case Reference</th>
              <th className="p-4">Title & Classification</th>
              <th className="p-4">Complainant</th>
              <th className="p-4">Risk Indices</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {filteredCases.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-mono font-bold text-indigo-400">{c.id}</td>
                <td className="p-4">
                  <div className="font-semibold text-slate-200">{c.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{c.date}</div>
                </td>
                <td className="p-4">
                  <div className="text-slate-300 font-medium">{c.reporter}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{c.phone}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-[10px]">
                      Scam: {(c.scamScore * 100).toFixed(0)}%
                    </span>
                    {c.deepfakeScore > 0 && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-[10px]">
                        Deepfake: {(c.deepfakeScore * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => setSelectedCase(c)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors border border-slate-700"
                  >
                    Forensics
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100">Section 65B Digital Evidence Package (DEP)</h3>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-slate-400 hover:text-slate-200">
                ✕
              </button>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Case Reference:</span>
                <span className="text-indigo-400 font-bold">{selectedCase.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SHA-256 Digest:</span>
                <span className="text-slate-300 truncate max-w-xs">{selectedCase.sha256}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">HSM Digital Signature:</span>
                <span className="text-emerald-400 truncate max-w-xs">{selectedCase.signature}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setSelectedCase(null)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs">
                Close
              </button>
              <a
                href={`/api/v1/evidence/download/${selectedCase.id}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Signed PDF</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
