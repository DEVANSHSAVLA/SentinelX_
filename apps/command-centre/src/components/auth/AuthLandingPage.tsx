import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, ShieldCheck, KeyRound, UserCheck, AlertCircle } from 'lucide-react';
import { useData, ADMIN_USER, CITIZEN_USER } from '../../context/DataContext';

export const AuthLandingPage: React.FC = () => {
  const { loginWithCredentials, openGoogleAuthModal } = useData();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  const [email, setEmail] = useState('admin@sentinelx.gov.in');
  const [password, setPassword] = useState('Devansh172430@');
  const [role, setRole] = useState<'ADMIN' | 'CITIZEN'>('ADMIN');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter valid email address and password.');
      return;
    }

    if (role === 'ADMIN' && password !== 'Devansh172430@' && password !== 'admin123') {
      setErrorMsg('Incorrect Admin Officer Password! (Default: Devansh172430@)');
      return;
    }

    const success = loginWithCredentials(email, password, role);
    if (!success) {
      setErrorMsg('Authentication failed. Please verify credentials.');
    }
  };

  const handleQuickLogin = (targetRole: 'ADMIN' | 'CITIZEN') => {
    if (targetRole === 'ADMIN') {
      loginWithCredentials(ADMIN_USER.email, 'Devansh172430@', 'ADMIN');
    } else {
      loginWithCredentials(CITIZEN_USER.email, 'citizen123', 'CITIZEN');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* BACKGROUND GRADIENT DECORATION */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-900/30 via-slate-900/10 to-transparent pointer-events-none blur-3xl" />

      {/* TOP BRANDING BAR */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl text-white tracking-tight">SentinelX</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold tracking-wider uppercase">
                Official Command Portal
              </span>
            </div>
            <p className="text-xs text-slate-400">National Cyber Defense & Public Safety Command System</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-3 text-xs">
          <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> 256-Bit HSM Encrypted Gateway
          </span>
        </div>
      </header>

      {/* MAIN AUTHENTICATION CARD */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10 my-8">
        <div className="bg-slate-900/90 border border-slate-750/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl space-y-6 backdrop-blur-xl">
          
          {/* TAB HEADER SWITCHER */}
          <div className="flex bg-slate-950 p-1.5 border-b border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In to Account
            </button>

            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create New Account
            </button>
          </div>

          <div className="p-7 space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-extrabold text-white">
                {activeTab === 'signin' ? 'Welcome Back to SentinelX' : 'Register for SentinelX Access'}
              </h2>
              <p className="text-xs text-slate-400">
                {activeTab === 'signin'
                  ? 'Select your role and enter credentials to launch command mesh'
                  : 'Join the national cyber safety network as Officer or Citizen'}
              </p>
            </div>

            {/* OFFICIAL GOOGLE SSO BUTTON */}
            <button
              type="button"
              onClick={openGoogleAuthModal}
              className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-3 group"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{activeTab === 'signin' ? 'Continue with Google' : 'Sign up with Google'}</span>
            </button>

            <div className="flex items-center space-x-3 text-xs text-slate-500 my-2">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="uppercase text-[10px] font-bold tracking-widest text-slate-500">Or credentials sign in</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* ERROR DISPLAY */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* ROLE SELECTION */}
              <div>
                <label className="text-slate-400 font-semibold block mb-1.5">Select Authorization Scope:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('ADMIN');
                      setEmail('admin@sentinelx.gov.in');
                      setPassword('Devansh172430@');
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      role === 'ADMIN'
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 font-bold ring-1 ring-indigo-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-xs">Senior Officer</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Insp. R. Sharma</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRole('CITIZEN');
                      setEmail('sunita.patel@gmail.com');
                      setPassword('citizen123');
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      role === 'CITIZEN'
                        ? 'bg-teal-950/80 border-teal-500 text-teal-200 font-bold ring-1 ring-teal-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-teal-400" />
                      <span className="text-xs">Citizen Public</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Sunita Patel</p>
                  </button>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Official Email / ID</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-750 text-white rounded-xl p-3 text-xs outline-none focus:border-indigo-500 transition-colors font-mono"
                  placeholder="name@sentinelx.gov.in"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-400 font-semibold">Password</label>
                  {role === 'ADMIN' && (
                    <span className="text-[10px] text-amber-400 font-mono">Pass: Devansh172430@</span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-750 text-white rounded-xl p-3 text-xs outline-none focus:border-indigo-500 transition-colors font-mono"
                  placeholder="••••••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>{activeTab === 'signin' ? 'Sign In & Launch Platform' : 'Create Account & Access'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* QUICK DEMO ONE-CLICK LOGIN BUTTONS */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block text-center">Quick 1-Click Demo Login:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('ADMIN')}
                  className="py-2 px-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Lock className="w-3 h-3 text-indigo-400" />
                  <span>Insp. R. Sharma</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('CITIZEN')}
                  className="py-2 px-3 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <UserCheck className="w-3 h-3 text-teal-400" />
                  <span>Sunita Patel</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-6 py-4 border-t border-slate-800/80 bg-slate-950 text-center text-xs text-slate-500 relative z-10">
        <p>SentinelX v2.0.0 • Cryptographically Authenticated National Cyber Public Safety Mesh</p>
      </footer>
    </div>
  );
};
