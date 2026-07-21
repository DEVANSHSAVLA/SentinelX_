import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Shield, MapPin, FolderCheck, ChevronUp, ChevronDown, Printer } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CitizenInbox: React.FC = () => {
  const { cases, updateCaseStatus, openRegisterCaseModal } = useData();

  const [reportSearch, setReportSearch] = useState('');
  const [reportStatusFilter, setReportStatusFilter] = useState('ALL');
  const [showClosedCases, setShowClosedCases] = useState(false);

  const handlePrintLedger = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* ACTIVE CASES DESK */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
          <div>
            <h4 className="font-bold text-xl text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              Citizen Incident Inbox & Active Cases Desk
            </h4>
            <p className="text-xs text-slate-400 mt-1">Register new cybercrime cases, update investigation status, and print digital evidence ledgers.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintLedger}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Case History Ledger
            </button>

            <button
              onClick={openRegisterCaseModal}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Register / File New Case
            </button>
          </div>
        </div>

        {/* TOOLBAR: SEARCH & STATUS FILTERS */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-850 p-3.5 rounded-lg border border-slate-800">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Case ID, Reporter, Category, Location..."
              value={reportSearch}
              onChange={(e) => setReportSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 pl-9 pr-3 py-1.5 rounded-md text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-semibold">Filter Status:</span>
            <select
              value={reportStatusFilter}
              onChange={(e) => setReportStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="ALL">All Active Statuses ({cases.filter(r => r.status !== 'CLOSED').length})</option>
              <option value="OPEN">Open</option>
              <option value="INVESTIGATING">Investigating</option>
              <option value="EVIDENCE_PACKAGED">Evidence Packaged</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </div>

        {/* ACTIVE CASE MANAGEMENT TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold bg-slate-850">
                <th className="py-3 px-4">Case Ref</th>
                <th className="py-3 px-4">Complainant / Reporter</th>
                <th className="py-3 px-4">Crime Category & Details</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-800">
              {cases
                .filter(rep => rep.status !== 'CLOSED')
                .filter(rep => {
                  const matchesFilter = reportStatusFilter === 'ALL' || rep.status === reportStatusFilter;
                  const matchesSearch = !reportSearch ||
                    rep.id.toLowerCase().includes(reportSearch.toLowerCase()) ||
                    rep.reporter.toLowerCase().includes(reportSearch.toLowerCase()) ||
                    rep.crimeCategory.toLowerCase().includes(reportSearch.toLowerCase()) ||
                    rep.location.toLowerCase().includes(reportSearch.toLowerCase());
                  return matchesFilter && matchesSearch;
                })
                .map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-teal-400 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-teal-500" />
                      {rep.id}
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      <span className="text-slate-100">{rep.reporter}</span>
                      <br/>
                      <span className="text-xs text-slate-400 font-mono font-normal">{rep.phone}</span>
                    </td>
                    <td className="py-3 px-4 max-w-sm">
                      <span className="inline-block bg-teal-500/10 text-teal-400 border border-teal-500/30 text-[10px] font-bold px-2 py-0.5 rounded mb-1">
                        {rep.crimeCategory}
                      </span>
                      <p className="text-xs text-slate-300 line-clamp-2">{rep.detail}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-300 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {rep.location}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400 font-mono">{rep.date}</td>
                    <td className="py-3 px-4">
                      <select
                        value={rep.status}
                        onChange={(e) => updateCaseStatus(rep.id, e.target.value as any)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer transition-all ${
                          rep.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          rep.status === 'INVESTIGATING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          rep.status === 'EVIDENCE_PACKAGED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                          rep.status === 'OPEN' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                          'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="OPEN" className="bg-slate-900 text-blue-400">● OPEN</option>
                        <option value="INVESTIGATING" className="bg-slate-900 text-amber-400">● INVESTIGATING</option>
                        <option value="EVIDENCE_PACKAGED" className="bg-slate-900 text-purple-400">● EVIDENCE PACKAGED</option>
                        <option value="RESOLVED" className="bg-slate-900 text-emerald-400">● RESOLVED</option>
                        <option value="CLOSED" className="bg-slate-900 text-rose-400">✖ CLOSE CASE</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={handlePrintLedger}
                        className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <Printer className="w-3.5 h-3.5 text-indigo-400" />
                        Print Dossier
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CLOSED CASES ARCHIVE */}
      <div className="border border-slate-800 rounded-xl bg-slate-900 shadow-lg overflow-hidden">
        <button
          onClick={() => setShowClosedCases(!showClosedCases)}
          className="w-full flex justify-between items-center px-6 py-4 bg-slate-850 hover:bg-slate-800 transition-colors cursor-pointer border-b border-slate-800"
        >
          <div className="flex items-center gap-3">
            <FolderCheck className="w-5 h-5 text-slate-400" />
            <h5 className="font-bold text-white text-base">Closed Cases Archive</h5>
            <span className="bg-slate-800 text-slate-400 border border-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {cases.filter(r => r.status === 'CLOSED').length} Closed
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <span>{showClosedCases ? 'Collapse Section' : 'Expand Section'}</span>
            {showClosedCases ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showClosedCases && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-xs font-semibold">
                    <th className="py-3 px-4">Case Ref</th>
                    <th className="py-3 px-4">Complainant</th>
                    <th className="py-3 px-4">Crime Category</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Reopen</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-800/60 opacity-80">
                  {cases
                    .filter(r => r.status === 'CLOSED')
                    .map((rep) => (
                      <tr key={rep.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-400">{rep.id}</td>
                        <td className="py-3 px-4 text-slate-300 font-semibold">{rep.reporter}</td>
                        <td className="py-3 px-4 text-slate-400 text-xs">{rep.crimeCategory}</td>
                        <td className="py-3 px-4 text-xs text-slate-400">{rep.location}</td>
                        <td className="py-3 px-4 text-xs text-slate-500 font-mono">{rep.date}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => updateCaseStatus(rep.id, 'OPEN')}
                            className="text-xs bg-slate-800 hover:bg-slate-750 text-teal-400 border border-slate-700 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            Reopen Case
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
