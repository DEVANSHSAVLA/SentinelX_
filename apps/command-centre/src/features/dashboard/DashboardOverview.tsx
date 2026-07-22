import React from 'react';
import { Activity, DollarSign, Users, Shield, ArrowUpRight, AlertTriangle, ChevronRight, Plus, User, ShieldAlert } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface DashboardOverviewProps {
  onNavigateTab: (tabId: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const { kpis, userSessions, sessions, setActiveSessionId, openRegisterCaseModal, currentUser } = useData();

  const activeStreamList = currentUser.role === 'ADMIN' ? sessions : userSessions;

  const kpiItems = [
    { title: "Active Scam Streams", value: `${activeStreamList.filter(s => s.status !== 'CLOSED').length}`, change: "+12%", trend: "up", icon: Activity, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
    { title: "Prevented Capital Loss", value: kpis.preventedLoss, change: "+18%", trend: "up", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { title: "Scam Networks Traced", value: `${kpis.networksTraced}`, change: "+5%", trend: "up", icon: Users, color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
    { title: "Dismantled Rings", value: `${kpis.dismantledRings}`, change: "+2", trend: "up", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" }
  ];

  return (
    <div className="space-y-6">
      {/* ACCESS LEVEL BANNER */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-lg gap-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${currentUser.role === 'ADMIN' ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' : 'bg-teal-500/20 border-teal-500/30 text-teal-400'}`}>
            {currentUser.role === 'ADMIN' ? <ShieldAlert className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-semibold text-slate-100">National Defense Mesh Synchronized</h2>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${currentUser.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'}`}>
                {currentUser.role} ACCESS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {currentUser.role === 'ADMIN'
                ? 'All-India Administrative View: Monitoring national telecom switches, NPCI UPI rails, and 12-language gateways.'
                : `Private Citizen Isolation Mode: Displaying active threat feeds relevant to ${currentUser.name} (${currentUser.email}).`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openRegisterCaseModal}
            className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md flex items-center space-x-1 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>File New Case</span>
          </button>
          <button
            onClick={() => onNavigateTab('triage')}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center space-x-1 transition-all cursor-pointer"
          >
            <span>Launch Triage Simulator</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiItems.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium">{kpi.title}</p>
                <h3 className="text-xl font-bold text-slate-100 mt-1">{kpi.value}</h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {kpi.change} this week
                </span>
              </div>
              <div className={`w-10 h-10 rounded-xl ${kpi.bg} border flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-100">Live Active Scam Streams ({currentUser.role === 'ADMIN' ? 'All National Feeds' : `${currentUser.name} Isolated Feed`})</h3>
          </div>
          <span className="text-xs text-slate-400">Real-time Stream Engine</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {activeStreamList.filter(s => s.status !== 'CLOSED').length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <Shield className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="font-bold text-slate-300">No Active Threat Streams Registered</p>
              <p className="text-[11px] text-slate-500">
                You have no active threat feeds or open cyber crime cases registered under <b className="text-slate-300">{currentUser.email}</b>.
              </p>
              <div className="pt-2">
                <button
                  onClick={openRegisterCaseModal}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>File New Incident Case</span>
                </button>
              </div>
            </div>
          ) : (
            activeStreamList.filter(s => s.status !== 'CLOSED').map((threat) => (
              <div
                key={threat.id}
                onClick={() => { setActiveSessionId(threat.id); onNavigateTab('scam'); }}
                className="p-4 hover:bg-slate-800/40 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${threat.priority === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-semibold text-slate-200">{threat.caller}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{threat.impersonating}</span>
                      <span className="text-[10px] text-slate-500">{threat.timestamp} ({threat.location})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1 italic">"{threat.transcript}"</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-bold text-rose-400">{(threat.risk * 100).toFixed(0)}% Scam Risk</div>
                    <div className="text-[10px] text-slate-500 font-mono">{threat.status}</div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 text-xs font-medium transition-colors border border-slate-700">
                    Inspect & Direct Action
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
