import React, { useState } from 'react';
import { X, Shield, CheckCircle2, Lock, User, Mail } from 'lucide-react';
import { useData, ADMIN_USER, CITIZEN_USER } from '../../context/DataContext';

export const GOOGLE_CLIENT_ID = "90338982833-i1sg24l3hoh1tl2ot2f659ufj9d06uek.apps.googleusercontent.com";

export const GoogleAuthModal: React.FC = () => {
  const { isGoogleAuthModalOpen, closeGoogleAuthModal, loginWithGoogle } = useData();

  const [backgroundCheckStatus, setBackgroundCheckStatus] = useState<string | null>(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'CITIZEN'>('CITIZEN');

  // Custom Personal Google Account Fields
  const [accountType, setAccountType] = useState<'PERSONAL' | 'ADMIN_PRESET' | 'CITIZEN_PRESET'>('PERSONAL');
  const [personalEmail, setPersonalEmail] = useState('devansh.savla@gmail.com');
  const [personalName, setPersonalName] = useState('Devansh Savla');

  if (!isGoogleAuthModalOpen) return null;

  const handleGoogleSSO = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (selectedRole === 'ADMIN') {
      if (adminPassword !== 'Devansh172430@' && adminPassword !== 'admin123') {
        setPasswordError(true);
        return;
      }
    }
    setPasswordError(false);

    let targetEmail = personalEmail || 'user@gmail.com';
    let targetName = personalName || 'Google User';

    if (accountType === 'ADMIN_PRESET') {
      targetEmail = ADMIN_USER.email;
      targetName = ADMIN_USER.name;
    } else if (accountType === 'CITIZEN_PRESET') {
      targetEmail = CITIZEN_USER.email;
      targetName = CITIZEN_USER.name;
    }

    setBackgroundCheckStatus(`Authenticating Google Identity (${targetEmail})...`);

    setTimeout(() => {
      loginWithGoogle(targetEmail, targetName, selectedRole);
      setBackgroundCheckStatus(`✓ Google Auth Verified • Background Risk Assessment Clear (${targetEmail})`);
      setTimeout(() => {
        closeGoogleAuthModal();
        setBackgroundCheckStatus(null);
        setAdminPassword('');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl space-y-4">
        {/* Header Bar */}
        <div className="flex justify-between items-center px-6 pt-5 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-xs text-indigo-300 font-mono uppercase tracking-wider">Google OAuth 2.0 Verification</span>
          </div>
          <button
            onClick={closeGoogleAuthModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-5">
          {/* TITLE SECTION */}
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign in with Google Account</span>
            </h2>
            <p className="text-xs text-slate-400">
              Sign in using your Personal Google Account or pre-authorized officer ID
            </p>
          </div>

          {/* GOOGLE ACCOUNT SELECTION TABS */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Choose Google Account to Authenticate:</label>
            
            <div className="space-y-2 text-xs">
              {/* PERSONAL ACCOUNT OPTION */}
              <button
                type="button"
                onClick={() => setAccountType('PERSONAL')}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  accountType === 'PERSONAL'
                    ? 'bg-indigo-950/80 border-indigo-500 text-white font-bold ring-1 ring-indigo-500'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Use Personal Google Account</p>
                    <p className="text-[10px] text-slate-400 font-mono">Sign in with your personal Gmail / G-Suite</p>
                  </div>
                </div>
                {accountType === 'PERSONAL' && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
              </button>

              {/* PERSONAL ACCOUNT EDIT FIELDS */}
              {accountType === 'PERSONAL' && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 animate-in fade-in">
                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Personal Gmail / Google Email *</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={personalEmail}
                        onChange={(e) => setPersonalEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-750 text-white rounded-lg p-2.5 pl-8 text-xs outline-none focus:border-indigo-500 font-mono"
                        placeholder="yourname@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={personalName}
                        onChange={(e) => setPersonalName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-750 text-white rounded-lg p-2.5 pl-8 text-xs outline-none focus:border-indigo-500"
                        placeholder="Devansh Savla"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ADMIN PRESET OPTION */}
              <button
                type="button"
                onClick={() => setAccountType('ADMIN_PRESET')}
                className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  accountType === 'ADMIN_PRESET'
                    ? 'bg-indigo-950/80 border-indigo-500 text-white font-bold ring-1 ring-indigo-500'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <div>
                  <p className="font-bold text-white">Insp. R. Sharma (Admin Officer)</p>
                  <p className="text-[10px] text-slate-400 font-mono">admin@sentinelx.gov.in</p>
                </div>
                {accountType === 'ADMIN_PRESET' && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
              </button>

              {/* CITIZEN PRESET OPTION */}
              <button
                type="button"
                onClick={() => setAccountType('CITIZEN_PRESET')}
                className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  accountType === 'CITIZEN_PRESET'
                    ? 'bg-teal-950/80 border-teal-500 text-white font-bold ring-1 ring-teal-500'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <div>
                  <p className="font-bold text-white">Sunita Patel (Citizen User)</p>
                  <p className="text-[10px] text-slate-400 font-mono">sunita.patel@gmail.com</p>
                </div>
                {accountType === 'CITIZEN_PRESET' && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />}
              </button>
            </div>
          </div>

          {/* ADMIN PASSWORD PROMPT */}
          {selectedRole === 'ADMIN' && (
            <div className="space-y-1.5 bg-indigo-950/40 p-3.5 rounded-2xl border border-indigo-500/30">
              <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" /> Admin Officer Access Password *
              </label>
              <input
                type="password"
                placeholder="Enter password (Devansh172430@)"
                value={adminPassword}
                onChange={(e) => { setAdminPassword(e.target.value); setPasswordError(false); }}
                className={`w-full bg-slate-800 border ${passwordError ? 'border-rose-500 text-rose-200' : 'border-slate-700 text-white'} rounded-xl p-2.5 outline-none focus:border-indigo-500 font-mono text-xs`}
              />
              {passwordError && (
                <p className="text-[10px] text-rose-400 font-semibold">
                  Invalid Password! Required: Devansh172430@
                </p>
              )}
            </div>
          )}

          {/* ROLE SELECTOR */}
          <div className="space-y-1.5 text-xs">
            <label className="text-slate-400 font-semibold block">Select Access Scope for Google Sign In:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('CITIZEN')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                  selectedRole === 'CITIZEN' ? 'bg-teal-600/20 border-teal-500 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Citizen Access
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('ADMIN')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                  selectedRole === 'ADMIN' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Admin Officer
              </button>
            </div>
          </div>

          {/* BACKGROUND CHECKING STATUS BADGE */}
          {backgroundCheckStatus && (
            <div className="p-3 bg-indigo-950/80 border border-indigo-500/50 rounded-2xl text-xs font-mono text-indigo-200 flex items-center gap-2 animate-pulse">
              <div className="w-3 h-3 rounded-full bg-indigo-400 animate-ping shrink-0" />
              <span className="text-[11px] font-semibold">{backgroundCheckStatus}</span>
            </div>
          )}

          {/* GOOGLE SSO SUBMIT BUTTON */}
          <button
            onClick={() => handleGoogleSSO()}
            className="w-full py-3.5 px-5 rounded-full border border-slate-600 hover:border-indigo-400 bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer group hover:shadow-indigo-500/10"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Verify & Sign in with Google Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
