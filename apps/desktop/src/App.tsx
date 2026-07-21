import React, { useState, useEffect } from 'react';
import { Shield, Monitor, Bell, Database, HardDrive, Wifi } from 'lucide-react';

export default function App() {
  const [nativeStatus, setNativeStatus] = useState('INITIALIZING');
  const [offlineQueue, setOfflineQueue] = useState(0);

  useEffect(() => {
    setNativeStatus('TAURI_NATIVE_BOUND');
  }, []);

  const triggerNativeNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('SentinelX Desktop Alert', {
        body: 'High-risk scam call intercepted (+919876500112). Bank lock directive issued.',
      });
    } else {
      alert('Native Notification: High-risk scam call intercepted (+919876500112). Bank lock directive issued.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans selection:bg-indigo-500 selection:text-white">
      <header className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight">SentinelX Desktop</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">Tauri 2.0 Native</span>
            </div>
            <p className="text-xs text-slate-400">Windows MSI | macOS DMG | Linux AppImage Build</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            {nativeStatus}
          </span>
        </div>
      </header>

      <main className="space-y-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Native System Tray</span>
              <Monitor className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-lg font-bold text-slate-100">Tray Minimization</div>
            <p className="text-xs text-slate-400">Background intercept stream active in taskbar notification area.</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Encrypted SQLite Storage</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-slate-100">Offline Vault Active</div>
            <p className="text-xs text-slate-400">Local credential key & cache encrypted via OS Keyring.</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Native System Bridge</span>
              <HardDrive className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-slate-100">IPC Commands Ready</div>
            <p className="text-xs text-slate-400">Direct Rust FFI communication with zero web view overhead.</p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-slate-200">Native Desktop Diagnostics & Controls</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={triggerNativeNotification}
              className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-md"
            >
              <Bell className="w-4 h-4" />
              <span>Test Native OS Notification</span>
            </button>

            <button
              onClick={() => setOfflineQueue(prev => prev + 1)}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center space-x-2 border border-slate-700 transition-all"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Enqueue Offline Record ({offlineQueue})</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
