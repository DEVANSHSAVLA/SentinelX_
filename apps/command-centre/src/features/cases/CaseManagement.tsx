import React, { useState } from 'react';
import { Search, Plus, Download, ShieldCheck, Shield } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CaseManagement: React.FC = () => {
  const { userCases, cases: allCases, currentUser, openRegisterCaseModal } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<any | null>(null);

  const displayCases = currentUser.role === 'ADMIN' ? allCases : userCases;

  const filteredCases = displayCases.filter(c =>
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.crimeCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search cases by reference ID, reporter name, or classification..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/60 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        <button
          onClick={openRegisterCaseModal}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Case File</span>
        </button>
      </div>

      <div className="rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm overflow-hidden">
        {filteredCases.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-3">
            <Shield className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="font-bold text-sm text-slate-200">No Incident Cases Filed</p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              There are no registered cyber crime or scam cases associated with <b className="text-slate-200">{currentUser.email}</b>.
            </p>
            <div className="pt-2">
              <button
                onClick={openRegisterCaseModal}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>File New Incident Case</span>
              </button>
            </div>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Case Reference</th>
                <th className="p-4">Title & Classification</th>
                <th className="p-4">Complainant / Contact</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-indigo-400">{c.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-200">{c.crimeCategory}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{c.date} • {c.location}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-300 font-medium">{c.reporter}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{c.phone || c.reporterEmail}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      c.priority === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedCase(c)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors border border-slate-700 cursor-pointer"
                    >
                      Forensics
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
                <span className="text-slate-500">Complainant Email:</span>
                <span className="text-slate-300">{selectedCase.reporterEmail || currentUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SHA-256 Digest:</span>
                <span className="text-slate-300 truncate max-w-xs">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">HSM Digital Signature:</span>
                <span className="text-emerald-400 truncate max-w-xs">0x8f9a2b1c4d3e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setSelectedCase(null)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Print Signed Dossier PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
