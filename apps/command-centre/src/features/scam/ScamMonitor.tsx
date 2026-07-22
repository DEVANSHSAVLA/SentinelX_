import React from 'react';
import { Lock, XCircle, Shield, User, ShieldAlert } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ScamMonitor: React.FC = () => {
  const { userSessions, sessions, activeSessionId, setActiveSessionId, updateSessionStatus, userCases, cases, updateCaseStatus, currentUser } = useData();

  const activeSessionDetails = userSessions.find(s => s.id === activeSessionId) || userSessions[0] || sessions[0];
  const activeCaseDetails = userCases.find(c => c.id === activeSessionId) || cases.find(c => c.id === activeSessionId);

  const isCase = activeSessionId.startsWith('REP-');

  return (
    <div className="space-y-6">
      {/* ROLE ACCESS BANNER */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${currentUser.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'}`}>
            {currentUser.role === 'ADMIN' ? <ShieldAlert className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-white">{currentUser.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${currentUser.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'}`}>
                {currentUser.role} THREAT FEED ACCESS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {currentUser.role === 'ADMIN'
                ? 'All-India National Threat Feed: Viewing live threat streams across all regions.'
                : `Citizen Isolated Threat Feed: Viewing active threat streams relevant to ${currentUser.name} (${currentUser.email}).`}
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Streams: <b className="text-white">{userSessions.length + userCases.length}</b> Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SESSIONS & ACTIVE CASES LIST */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-lg text-white">Live Threat Analysis Streams</h4>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
              {userSessions.filter(s => s.status !== 'CLOSED').length + userCases.filter(c => c.status !== 'CLOSED').length} Active
            </span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {/* Live VoIP Streams */}
            {userSessions.filter(s => s.status !== 'CLOSED').map((s) => (
              <div
                key={s.id}
                onClick={() => setActiveSessionId(s.id)}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  s.id === activeSessionId ? 'bg-teal-500/10 border-teal-400' : 'bg-slate-800 border-slate-700 hover:bg-slate-750'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-white text-sm">{s.caller}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-bold ${
                      s.risk > 0.8 ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {(s.risk * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-1">"{s.transcript}"</p>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2">
                  <span>{s.impersonating}</span>
                  <span>{s.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Active Citizen Cases */}
            {userCases.filter(c => c.status !== 'CLOSED').map((rep) => (
              <div
                key={rep.id}
                onClick={() => setActiveSessionId(rep.id)}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  rep.id === activeSessionId ? 'bg-teal-500/10 border-teal-400' : 'bg-slate-850 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-teal-400 text-sm flex items-center gap-1">
                    <Shield className="w-3 h-3 text-teal-400" />
                    {rep.id} - {rep.reporter}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      rep.priority === 'CRITICAL'
                        ? 'bg-rose-500/10 text-rose-400'
                        : rep.priority === 'HIGH'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}
                  >
                    {rep.priority}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-200 mt-1">{rep.crimeCategory}</p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{rep.detail}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2">
                  <span>{rep.location}</span>
                  <span className="text-amber-400 font-bold">{rep.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS & ACTION CONTROLS PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-xl text-white">
                {isCase ? activeCaseDetails?.reporter : activeSessionDetails?.caller}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ref ID: {isCase ? activeCaseDetails?.id : activeSessionDetails?.id} | Location:{' '}
                {isCase ? activeCaseDetails?.location : activeSessionDetails?.location}
              </p>
            </div>
            <div className="text-right flex items-center gap-2">
              <span className="bg-rose-500/10 text-rose-400 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {isCase ? activeCaseDetails?.priority : activeSessionDetails?.priority} SEVERITY
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-slate-400 text-xs font-semibold uppercase">Category / Impersonator</p>
              <p className="font-bold text-white mt-1">
                {isCase ? activeCaseDetails?.crimeCategory : activeSessionDetails?.impersonating}
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-slate-400 text-xs font-semibold uppercase">Current Status</p>
              <p className="font-bold text-amber-400 mt-1">
                {isCase ? activeCaseDetails?.status : activeSessionDetails?.status}
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-slate-400 text-xs font-semibold uppercase">Active Defense Agent</p>
              <p className="font-bold text-teal-400 mt-1">12-Agent Orchestrator Mesh</p>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-white text-sm">Transcript & Case Intelligence Log</h5>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 h-40 overflow-y-auto text-sm leading-relaxed text-slate-300 font-mono">
              "{isCase ? activeCaseDetails?.detail : activeSessionDetails?.transcript}"
            </div>
          </div>

          {/* INTERACTIVE SCAM STATUS & ACTION DIRECTIVES */}
          <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" />
                Live Scam Action Directives
              </span>
              <span className="text-[10px] text-slate-400">Updates sync to Citizen Inbox in real-time</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  if (isCase && activeCaseDetails) updateCaseStatus(activeCaseDetails.id, 'INVESTIGATING');
                  else if (activeSessionDetails) updateSessionStatus(activeSessionDetails.id, 'WARN_CITIZEN');
                }}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-bold px-3 py-2 rounded-lg transition-all cursor-pointer"
              >
                ⚠️ Warn Citizen
              </button>

              <button
                onClick={() => {
                  if (isCase && activeCaseDetails) updateCaseStatus(activeCaseDetails.id, 'INVESTIGATING');
                  else if (activeSessionDetails) updateSessionStatus(activeSessionDetails.id, 'LOCK_BANK_APPS');
                }}
                className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 text-xs font-bold px-3 py-2 rounded-lg transition-all cursor-pointer"
              >
                🔒 Lock Banking Apps
              </button>

              <button
                onClick={() => {
                  if (isCase && activeCaseDetails) updateCaseStatus(activeCaseDetails.id, 'INVESTIGATING');
                  else if (activeSessionDetails) updateSessionStatus(activeSessionDetails.id, 'INVESTIGATING');
                }}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/40 text-xs font-bold px-3 py-2 rounded-lg transition-all cursor-pointer"
              >
                🔍 Set Investigating
              </button>

              <button
                onClick={() => {
                  if (isCase && activeCaseDetails) updateCaseStatus(activeCaseDetails.id, 'RESOLVED');
                  else if (activeSessionDetails) updateSessionStatus(activeSessionDetails.id, 'RESOLVED');
                }}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold px-3 py-2 rounded-lg transition-all cursor-pointer"
              >
                ✅ Mark Resolved
              </button>

              <button
                onClick={() => {
                  if (isCase && activeCaseDetails) updateCaseStatus(activeCaseDetails.id, 'CLOSED');
                  else if (activeSessionDetails) updateSessionStatus(activeSessionDetails.id, 'CLOSED');
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <XCircle className="w-4 h-4" />
                CLOSE CASE & ARCHIVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
