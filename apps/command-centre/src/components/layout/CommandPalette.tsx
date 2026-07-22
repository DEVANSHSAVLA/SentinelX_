import React, { useState, useEffect } from 'react';
import { Search, Shield, MapPin, FileText, Smartphone, DollarSign, X, Plus, Network, Cpu } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
  onTriggerSimulator: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onTriggerSimulator
}) => {
  const { openRegisterCaseModal } = useData();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 'add_case', title: 'Register / File New Cyber Incident Case', category: 'Actions', icon: Plus, action: () => { openRegisterCaseModal(); onClose(); } },
    { id: 'dashboard', title: 'Open Executive Command Overview', category: 'Navigation', icon: Shield, action: () => { onSelectTab('home'); onClose(); } },
    { id: 'triage', title: 'Open Live Incident Triage Simulator', category: 'Navigation', icon: Smartphone, action: () => { onSelectTab('triage'); onClose(); } },
    { id: 'scam', title: 'Open Scam Monitor & Live Call Directives', category: 'Navigation', icon: Smartphone, action: () => { onSelectTab('scam'); onClose(); } },
    { id: 'graph', title: 'Open Fraud Graph & Mule Ring Pathfinder', category: 'Navigation', icon: Network, action: () => { onSelectTab('graph'); onClose(); } },
    { id: 'map', title: 'Open Geospatial Crime Hotspot Heatmap', category: 'Navigation', icon: MapPin, action: () => { onSelectTab('map'); onClose(); } },
    { id: 'reports', title: 'Open Citizen Inbox & Active Cases Desk', category: 'Navigation', icon: FileText, action: () => { onSelectTab('reports'); onClose(); } },
    { id: 'evidence', title: 'Open Digital Evidence Package Vault', category: 'Navigation', icon: FileText, action: () => { onSelectTab('evidence'); onClose(); } },
    { id: 'currency', title: 'Open Counterfeit Currency Note Scanner', category: 'Navigation', icon: DollarSign, action: () => { onSelectTab('currency'); onClose(); } },
    { id: 'agents', title: 'Open 12-Agent Autonomous Mesh Status', category: 'Navigation', icon: Cpu, action: () => { onSelectTab('agents'); onClose(); } },
    { id: 'run_sim', title: 'Trigger Live Cyber Arrest Mitigation Demo', category: 'Actions', icon: Shield, action: () => { onTriggerSimulator(); onClose(); } }
  ];

  const filtered = commands.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search action (Ctrl+K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none text-sm"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-sm text-slate-500">No matching commands found.</div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center px-3 py-2.5 rounded-lg text-left text-sm text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors group cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 mr-3 flex-shrink-0" />
                  <div className="flex-1 truncate">
                    <span className="font-medium">{cmd.title}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span>Use <strong>↑</strong> <strong>↓</strong> to navigate</span>
          <span><strong>Esc</strong> to close</span>
        </div>
      </div>
    </div>
  );
};
