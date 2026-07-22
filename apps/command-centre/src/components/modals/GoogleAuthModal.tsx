import React, { useState } from 'react';
import { X, Shield, User, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const GoogleAuthModal: React.FC = () => {
  const { isGoogleAuthModalOpen, closeGoogleAuthModal, loginWithGoogle, switchUserRole, currentUser } = useData();

  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'CITIZEN'>('CITIZEN');

  if (!isGoogleAuthModalOpen) return null;

  const handleCustomGoogleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customName) return;
    loginWithGoogle(customEmail, customName, selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-850 px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <h3 className="font-bold text-white text-base">Google Identity Authentication</h3>
          </div>
          <button
            onClick={closeGoogleAuthModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-xs text-slate-300">
            Sign in with your Google account to test role-based data isolation (Admin view vs Citizen private view).
          </p>

          {/* Quick Preset Buttons */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Quick One-Click Sign In</label>
            
            <button
              onClick={() => { switchUserRole('ADMIN'); closeGoogleAuthModal(); }}
              className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                currentUser.role === 'ADMIN' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Shield className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-white">Insp. R. Sharma (Admin Officer)</p>
                  <p className="text-[10px] text-slate-400 font-mono">admin@sentinelx.gov.in (All Data Access)</p>
                </div>
              </div>
              {currentUser.role === 'ADMIN' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
            </button>

            <button
              onClick={() => { switchUserRole('CITIZEN'); closeGoogleAuthModal(); }}
              className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                currentUser.role === 'CITIZEN' ? 'bg-teal-600/20 border-teal-500 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                  <User className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-white">Sunita Patel (Citizen User)</p>
                  <p className="text-[10px] text-slate-400 font-mono">sunita.patel@gmail.com (Personal Cases Only)</p>
                </div>
              </div>
              {currentUser.role === 'CITIZEN' && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
            </button>
          </div>

          <div className="relative border-t border-slate-800 pt-4">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 px-2 text-[10px] text-slate-500 font-semibold uppercase">Or Custom Google Sign-In</span>
          </div>

          {/* Custom Google Sign-in Form */}
          <form onSubmit={handleCustomGoogleLogin} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Google Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. user@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Mehta"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Access Role Level</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('CITIZEN')}
                  className={`py-2 px-3 rounded-lg border font-bold text-xs cursor-pointer transition-all ${
                    selectedRole === 'CITIZEN' ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Citizen (Private View)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('ADMIN')}
                  className={`py-2 px-3 rounded-lg border font-bold text-xs cursor-pointer transition-all ${
                    selectedRole === 'ADMIN' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Admin (All Data Access)
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Sign In With Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
