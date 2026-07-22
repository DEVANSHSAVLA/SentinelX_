import React from 'react';
import { Shield, Bell, Moon, Sun, Search, Plus, AlertCircle, CheckCircle, Info, UserCheck, ShieldAlert, QrCode } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import { useData } from '../../context/DataContext';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenExpoQR?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette, onOpenExpoQR }) => {
  const { theme, toggleTheme } = useTheme();
  const { toasts, removeToast } = useNotification();
  const { openRegisterCaseModal, currentUser, openGoogleAuthModal } = useData();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-slate-100 tracking-tight">SentinelX</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">V7 Enterprise</span>
          </div>
          <p className="text-xs text-slate-400">National Public Safety AI Command Platform</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* EXPO MOBILE QR CODE MODAL BUTTON */}
        {onOpenExpoQR && (
          <button
            onClick={onOpenExpoQR}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 transition-all text-xs font-bold cursor-pointer"
            title="Scan Expo QR Code to launch Mobile App on Physical Device"
          >
            <QrCode className="w-3.5 h-3.5 text-teal-400" />
            <span>Expo Mobile QR</span>
          </button>
        )}

        <button
          onClick={openRegisterCaseModal}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Register Case</span>
        </button>

        <button
          onClick={onOpenCommandPalette}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors text-xs cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick Search / Commands</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-700 text-[10px] font-mono">Ctrl+K</kbd>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        <div className="relative">
          <button className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors relative">
            <Bell className="w-4 h-4" />
            {toasts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {toasts.length}
              </span>
            )}
          </button>
        </div>

        {/* GOOGLE AUTH / USER PROFILE SWITCHER BUTTON */}
        <button
          onClick={openGoogleAuthModal}
          className="flex items-center space-x-2.5 pl-3 border-l border-slate-800 cursor-pointer hover:opacity-90 transition-opacity"
          title="Click to Switch User Role / Sign In With Google"
        >
          <div className="relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white overflow-hidden border ${currentUser.role === 'ADMIN' ? 'border-indigo-500 bg-indigo-950' : 'border-teal-500 bg-teal-950'}`}>
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : currentUser.role === 'ADMIN' ? (
                <ShieldAlert className="w-4 h-4 text-indigo-300" />
              ) : (
                <UserCheck className="w-4 h-4 text-teal-300" />
              )}
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${currentUser.role === 'ADMIN' ? 'bg-indigo-500' : 'bg-teal-500'}`} />
          </div>

          <div className="hidden md:block text-left">
            <div className="flex items-center space-x-1.5">
              <p className="text-xs font-bold text-slate-200 leading-tight">{currentUser.name}</p>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${currentUser.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'}`}>
                {currentUser.role}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">{currentUser.email}</p>
          </div>
        </button>
      </div>

      {/* DYNAMIC TOAST MESSAGES OVERLAY */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 space-y-2 max-w-sm w-full">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              onClick={() => removeToast(toast.id)}
              className={`p-3.5 rounded-xl border shadow-2xl backdrop-blur-md cursor-pointer transition-all animate-in slide-in-from-bottom-5 duration-200 flex items-start gap-3 ${
                toast.type === 'critical'
                  ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
                  : toast.type === 'success'
                  ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                  : 'bg-slate-900/90 border-indigo-500/50 text-slate-200'
              }`}
            >
              {toast.type === 'critical' ? (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              ) : toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span>{toast.title}</span>
                  <span className="text-[10px] opacity-70 font-mono">{toast.timestamp}</span>
                </div>
                <p className="mt-0.5 opacity-90 leading-snug">{toast.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
