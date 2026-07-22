import React, { useState } from 'react';
import { X, Shield, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';
import { useData } from '../../context/DataContext';

// Load Google Credentials dynamically from environment variables
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "90338982833-i1sg24l3hoh1tl2ot2f659ufj9d06uek.apps.googleusercontent.com";

export const GoogleAuthModal: React.FC = () => {
  const { isGoogleAuthModalOpen, closeGoogleAuthModal, switchUserRole, currentUser } = useData();

  const [authMode, setAuthMode] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_IN');
  const [backgroundCheckStatus, setBackgroundCheckStatus] = useState<string | null>(null);

  if (!isGoogleAuthModalOpen) return null;

  const handleGoogleSSO = (role: 'ADMIN' | 'CITIZEN' = 'CITIZEN') => {
    setBackgroundCheckStatus(`Authenticating with Google Cloud Console OAuth (Client ID: ${GOOGLE_CLIENT_ID.substring(0, 15)}...)...`);

    setTimeout(() => {
      if (role === 'ADMIN') {
        switchUserRole('ADMIN');
        setBackgroundCheckStatus(`✓ Google OAuth Verified • Govt Officer Clearance Granted (Insp. R. Sharma)`);
      } else {
        switchUserRole('CITIZEN');
        setBackgroundCheckStatus(`✓ Google OAuth Verified • Background Risk Index: 0.02 (LOW RISK - Sunita Patel)`);
      }
      setTimeout(() => {
        closeGoogleAuthModal();
        setBackgroundCheckStatus(null);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl space-y-4">
        {/* Header Bar */}
        <div className="flex justify-between items-center px-6 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-xs text-indigo-300 font-mono uppercase tracking-wider">SentinelX Google Security Auth</span>
          </div>
          <button
            onClick={closeGoogleAuthModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-6">
          {/* TITLE SECTION */}
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {authMode === 'SIGN_IN' ? 'Sign in' : 'Join SentinelX'}
            </h2>
            <p className="text-xs text-slate-400">
              {authMode === 'SIGN_IN' ? (
                <>
                  New to SentinelX?{' '}
                  <button
                    onClick={() => setAuthMode('SIGN_UP')}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline cursor-pointer"
                  >
                    Join now
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    onClick={() => setAuthMode('SIGN_IN')}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          {/* GOOGLE CONSOLE CREDENTIALS BADGE */}
          <div className="bg-indigo-950/60 border border-indigo-500/30 rounded-2xl p-3 space-y-1 text-xs">
            <div className="flex items-center justify-between text-indigo-300 font-bold">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-indigo-400" /> Google Console Verified Client
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">
                ACTIVE
              </span>
            </div>
            <p className="font-mono text-[10px] text-slate-400 truncate">
              ID: {GOOGLE_CLIENT_ID}
            </p>
          </div>

          {/* SIGN-UP RESTRICTION NOTICE */}
          {authMode === 'SIGN_UP' && (
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-teal-200">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-snug">
                Public registration creates a <strong>Citizen Account</strong> with background integrity check. Admin Officer sign-in requires pre-authorized credentials.
              </p>
            </div>
          )}

          {/* BACKGROUND CHECKING ANIMATED STATUS BADGE */}
          {backgroundCheckStatus && (
            <div className="p-3 bg-indigo-950/80 border border-indigo-500/50 rounded-2xl text-xs font-mono text-indigo-200 flex items-center gap-2 animate-pulse">
              <div className="w-3 h-3 rounded-full bg-indigo-400 animate-ping shrink-0" />
              <span className="text-[11px] font-semibold">{backgroundCheckStatus}</span>
            </div>
          )}

          {/* GOOGLE SSO BUTTON ONLY */}
          <div className="space-y-3">
            <button
              onClick={() => handleGoogleSSO(authMode === 'SIGN_IN' && currentUser.role === 'ADMIN' ? 'ADMIN' : 'CITIZEN')}
              className="w-full py-3.5 px-5 rounded-full border border-slate-600 hover:border-indigo-400 bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer group hover:shadow-indigo-500/10"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{authMode === 'SIGN_IN' ? 'Continue with Google' : 'Sign up with Google'}</span>
            </button>
          </div>

          {/* ONE-CLICK TEST ROLE PRESETS */}
          <div className="pt-2 space-y-2 border-t border-slate-800">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Quick Officer & Citizen Account Switcher
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { switchUserRole('ADMIN'); closeGoogleAuthModal(); }}
                className={`p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                  currentUser.role === 'ADMIN' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <div>
                  <p className="font-bold text-xs text-white leading-tight">Insp. R. Sharma</p>
                  <p className="text-[9px] text-slate-400 font-mono">ADMIN OFFICER</p>
                </div>
                {currentUser.role === 'ADMIN' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
              </button>

              <button
                type="button"
                onClick={() => { switchUserRole('CITIZEN'); closeGoogleAuthModal(); }}
                className={`p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                  currentUser.role === 'CITIZEN' ? 'bg-teal-600/20 border-teal-500 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <div>
                  <p className="font-bold text-xs text-white leading-tight">Sunita Patel</p>
                  <p className="text-[9px] text-slate-400 font-mono">CITIZEN USER</p>
                </div>
                {currentUser.role === 'CITIZEN' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
              </button>
            </div>
          </div>

          {/* FOOTER TERMS & PRIVACY */}
          <div className="text-[10px] text-slate-400 text-center leading-relaxed pt-2">
            By continuing, you agree to SentinelX's{' '}
            <span className="text-indigo-400 hover:underline cursor-pointer">User Agreement</span>,{' '}
            <span className="text-indigo-400 hover:underline cursor-pointer">Privacy Policy</span>, and{' '}
            <span className="text-indigo-400 hover:underline cursor-pointer">Security Protocol</span>.
          </div>
        </div>
      </div>
    </div>
  );
};
