import React, { useState } from 'react';
import { X, Shield, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const GoogleAuthModal: React.FC = () => {
  const { isGoogleAuthModalOpen, closeGoogleAuthModal, switchUserRole, currentUser } = useData();

  const [authMode, setAuthMode] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_IN');
  const [backgroundCheckStatus, setBackgroundCheckStatus] = useState<string | null>(null);

  if (!isGoogleAuthModalOpen) return null;

  const handleSSOAction = (providerName: 'GOOGLE' | 'MICROSOFT' | 'APPLE', role: 'ADMIN' | 'CITIZEN' = 'CITIZEN') => {
    setBackgroundCheckStatus(`Running ${providerName} Identity Integrity & Background Check...`);

    setTimeout(() => {
      if (role === 'ADMIN') {
        switchUserRole('ADMIN');
        setBackgroundCheckStatus(`✓ ${providerName} Auth Passed • Govt Admin Clearance Verified (Insp. R. Sharma)`);
      } else {
        switchUserRole('CITIZEN');
        setBackgroundCheckStatus(`✓ ${providerName} Auth Passed • Background Risk Index: 0.02 (LOW RISK - Sunita Patel)`);
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
            <span className="font-bold text-xs text-indigo-300 font-mono uppercase tracking-wider">SentinelX Security Auth</span>
          </div>
          <button
            onClick={closeGoogleAuthModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-6">
          {/* TITLE SECTION (EXACT LINKEDIN MATCH) */}
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

          {/* SSO BUTTONS LIST */}
          <div className="space-y-3">
            {/* 1. CONTINUE WITH GOOGLE */}
            <button
              onClick={() => handleSSOAction('GOOGLE', authMode === 'SIGN_IN' && currentUser.role === 'ADMIN' ? 'ADMIN' : 'CITIZEN')}
              className="w-full py-3 px-5 rounded-full border border-slate-600 hover:border-slate-400 bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer group"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{authMode === 'SIGN_IN' ? 'Continue with Google' : 'Sign up with Google'}</span>
            </button>

            {/* 2. SIGN IN WITH MICROSOFT */}
            <button
              onClick={() => handleSSOAction('MICROSOFT', 'CITIZEN')}
              className="w-full py-3 px-5 rounded-full border border-slate-600 hover:border-slate-400 bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              <span>{authMode === 'SIGN_IN' ? 'Sign in with Microsoft' : 'Sign up with Microsoft'}</span>
            </button>

            {/* 3. SIGN IN WITH APPLE */}
            <button
              onClick={() => handleSSOAction('APPLE', 'CITIZEN')}
              className="w-full py-3 px-5 rounded-full border border-slate-600 hover:border-slate-400 bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0 fill-current text-white" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.8.13-9.68-1.92-14.65-6.14-3.47-3.01-7.44-7.85-11.91-14.53-7.51-11.28-13.39-24.16-17.65-38.64-4.26-14.48-6.39-28.08-6.39-40.8 0-16.14 4.16-29.49 12.48-40.06 8.32-10.57 18.73-15.98 31.23-16.23 4.93 0 10.36 1.25 16.3 3.75 5.94 2.5 9.94 3.75 12 3.75 1.7 0 5.86-1.32 12.48-3.96 6.62-2.64 12.18-3.8 16.68-3.48 13.06.87 23.63 5.48 31.7 13.84-11.45 6.94-17.06 16.71-16.83 29.31.23 10.12 4.16 18.57 11.79 25.35 7.63 6.78 16.63 10.51 27.01 11.19-2.61 7.78-6.18 15.65-10.72 23.61zM119.22 31.84c0-7.72 2.76-15.11 8.28-22.17 5.52-7.06 12.39-11.4 20.61-13.02.58 7.37-1.89 14.71-7.41 22.02-5.52 7.31-12.48 11.53-20.88 12.66-.25-.49-.44-1.02-.6-1.49z"/>
              </svg>
              <span>{authMode === 'SIGN_IN' ? 'Sign in with Apple' : 'Sign up with Apple'}</span>
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
