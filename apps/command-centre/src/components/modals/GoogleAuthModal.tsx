import React, { useState } from 'react';
import { X, Shield, User, CheckCircle2, UserPlus, LogIn, Mail, Phone, KeyRound, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const GoogleAuthModal: React.FC = () => {
  const { isGoogleAuthModalOpen, closeGoogleAuthModal, loginWithGoogle, switchUserRole, currentUser } = useData();

  const [authMode, setAuthMode] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_IN');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [googleClientId, setGoogleClientId] = useState('10823749811-sentinelx-google-auth.apps.googleusercontent.com');

  if (!isGoogleAuthModalOpen) return null;

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    // In Sign Up mode, role is ALWAYS forced to CITIZEN. Admin registration is strictly prohibited.
    const effectiveRole = authMode === 'SIGN_UP' ? 'CITIZEN' : (email.includes('admin') || email.includes('gov') ? 'ADMIN' : 'CITIZEN');
    loginWithGoogle(email, name, effectiveRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-850 px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <div>
              <h3 className="font-bold text-white text-base">Google Cloud Console Authentication</h3>
              <p className="text-[10px] text-slate-400 font-mono">OAuth 2.0 Client & OpenID Token Verification</p>
            </div>
          </div>
          <button
            onClick={closeGoogleAuthModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* TAB SWITCHER: GOOGLE SIGN IN vs GOOGLE SIGN UP */}
          <div className="grid grid-cols-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setAuthMode('SIGN_IN')}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                authMode === 'SIGN_IN' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Google Sign In</span>
            </button>
            <button
              onClick={() => setAuthMode('SIGN_UP')}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                authMode === 'SIGN_UP' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Google Citizen Sign Up</span>
            </button>
          </div>

          {/* SIGN-IN ONLY: QUICK ACCOUNT PRESETS */}
          {authMode === 'SIGN_IN' ? (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Verified Officer & Citizen Sign-In Presets</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { switchUserRole('ADMIN'); closeGoogleAuthModal(); }}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    currentUser.role === 'ADMIN' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div className="text-left text-[11px]">
                      <p className="font-bold text-white leading-tight">Insp. R. Sharma</p>
                      <p className="text-[9px] text-slate-400 font-mono">ADMIN OFFICER SIGN-IN</p>
                    </div>
                  </div>
                  {currentUser.role === 'ADMIN' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => { switchUserRole('CITIZEN'); closeGoogleAuthModal(); }}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    currentUser.role === 'CITIZEN' ? 'bg-teal-600/20 border-teal-500 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-teal-400 shrink-0" />
                    <div className="text-left text-[11px]">
                      <p className="font-bold text-white leading-tight">Sunita Patel</p>
                      <p className="text-[9px] text-slate-400 font-mono">CITIZEN SIGN-IN</p>
                    </div>
                  </div>
                  {currentUser.role === 'CITIZEN' && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                </button>
              </div>
            </div>
          ) : (
            /* SIGN-UP NOTICE: NO ADMIN SIGN UP */
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200 space-y-1">
                <p className="font-bold">Public Admin Registration Is Prohibited</p>
                <p className="text-[11px] opacity-90 leading-snug">
                  Public Sign Up is strictly restricted to <strong>Citizen accounts</strong>. Admin Officer credentials require Government SSO clearance and can only be accessed via Sign In.
                </p>
              </div>
            </div>
          )}

          <div className="relative border-t border-slate-800 pt-3">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 px-2 text-[10px] text-slate-500 font-semibold uppercase">
              {authMode === 'SIGN_IN' ? 'Or Enter Google Cloud Credentials' : 'Register New Citizen Google Identity'}
            </span>
          </div>

          {/* FORM: GOOGLE CLOUD OAUTH SIGN IN / SIGN UP */}
          <form onSubmit={handleGoogleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                Google Email Address *
              </label>
              <input
                type="email"
                required
                placeholder={authMode === 'SIGN_IN' ? 'admin@sentinelx.gov.in or citizen@gmail.com' : 'your.email@gmail.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                Account Display Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Mehta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 outline-none focus:border-indigo-500"
              />
            </div>

            {authMode === 'SIGN_UP' && (
              <div>
                <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  Mobile Number (For Cyber Alerts)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98110 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                Google Console OAuth Client ID
              </label>
              <input
                type="text"
                value={googleClientId}
                onChange={(e) => setGoogleClientId(e.target.value)}
                className="w-full bg-slate-850 border border-slate-750 text-slate-300 rounded-lg p-2 text-[10px] font-mono outline-none"
              />
            </div>

            <button
              type="submit"
              className={`w-full mt-2 py-3 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                authMode === 'SIGN_IN' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-teal-600 hover:bg-teal-500 text-white'
              }`}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              </svg>
              <span>
                {authMode === 'SIGN_IN'
                  ? 'Sign In via Google Console OAuth'
                  : 'Register Citizen via Google Console OAuth'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
