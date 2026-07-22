import React from 'react';
import { 
  Activity, FileText, Smartphone, DollarSign, Cpu, Network, ShieldCheck, Play
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: 'Command Overview', icon: Activity },
    { id: 'triage', label: 'Live Incident Triage', icon: Play },
    { id: 'scam', label: 'Scam Monitor', icon: Smartphone },
    { id: 'graph', label: 'Fraud Graph Explorer', icon: Network },
    { id: 'currency', label: 'Counterfeit Scanner', icon: DollarSign },
    { id: 'reports', label: 'Citizen Inbox & Cases', icon: FileText },
    { id: 'evidence', label: 'Evidence Package Vault', icon: ShieldCheck },
    { id: 'agents', label: '12-Agent Mesh Engine', icon: Cpu },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hidden lg:flex">
      <div className="p-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Command Workspaces
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="text-slate-500">System State</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            OPERATIONAL
          </span>
        </div>
        <div className="text-[10px] text-slate-500 space-y-1">
          <div className="flex justify-between">
            <span>Graph Nodes:</span>
            <span className="text-slate-400 font-mono">142,890</span>
          </div>
          <div className="flex justify-between">
            <span>Latency (P95):</span>
            <span className="text-slate-400 font-mono">42ms</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
