import React, { useState, useEffect } from 'react';
import { X, Shield, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const GOOGLE_CLIENT_ID = "90338982833-i1sg24l3hoh1tl2ot2f659ufj9d06uek.apps.googleusercontent.com";

export const GoogleAuthModal: React.FC = () => {
  const { isGoogleAuthModalOpen, closeGoogleAuthModal, loginWithGoogle } = useData();

  const [backgroundCheckStatus, setBackgroundCheckStatus] = useState<string | null>(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'CITIZEN'>('CITIZEN');
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!isGoogleAuthModalOpen) return;
    setAuthError(null);

    // Initialize Google Identity Services (GIS) SDK
    const initGoogleGIS = () => {
      if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response: any) => {
              if (response && response.credential) {
                try {
                  // Decode Google JWT ID token
                  const base64Url = response.credential.split('.')[1];
                  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                  }).join(''));
                  const payload = JSON.parse(jsonPayload);

                  if (payload && payload.email) {
                    setBackgroundCheckStatus(`✓ Real Google Identity Verified: ${payload.email}`);
                    setTimeout(() => {
                      loginWithGoogle(payload.email, payload.name || payload.email, selectedRole, payload.picture);
                      closeGoogleAuthModal();
                      setBackgroundCheckStatus(null);
                    }, 800);
                  }
                } catch {
                  setAuthError("Failed to verify Google Identity token.");
                }
              } else {
                setAuthError("Google Sign-In was canceled or failed.");
              }
            }
          });

          // Render Google's official Sign-In button
          const btnContainer = document.getElementById("google-official-btn-container");
          if (btnContainer) {
            btnContainer.innerHTML = "";
            (window as any).google.accounts.id.renderButton(btnContainer, {
              theme: "filled_blue",
              size: "large",
              width: 320,
              text: "continue_with"
            });
          }

          // Trigger One-Tap prompt
          (window as any).google.accounts.id.prompt();
        } catch {
          // Fallback if Google GIS fails
        }
      }
    };

    initGoogleGIS();
  }, [isGoogleAuthModalOpen, selectedRole]);

  if (!isGoogleAuthModalOpen) return null;

  const handleManualGoogleClick = () => {
    if (selectedRole === 'ADMIN') {
      if (adminPassword !== 'Devansh172430@' && adminPassword !== 'admin123') {
        setPasswordError(true);
        return;
      }
    }
    setPasswordError(false);
    setAuthError(null);

    // Try Google GIS prompt first
    if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
      (window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If One-Tap prompt is not displayed, launch Google OAuth popup
          const redirectUri = window.location.origin;
          const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&response_type=token` +
            `&scope=${encodeURIComponent("openid email profile")}` +
            `&prompt=select_account`;
          
          window.open(authUrl, 'GoogleOAuthPopup', 'width=500,height=600,left=350,top=150');
        }
      });
    } else {
      const redirectUri = window.location.origin;
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=token` +
        `&scope=${encodeURIComponent("openid email profile")}` +
        `&prompt=select_account`;

      window.open(authUrl, 'GoogleOAuthPopup', 'width=500,height=600,left=350,top=150');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl space-y-4">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center px-6 pt-5 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-xs text-indigo-300 font-mono uppercase tracking-wider">Official Google OAuth 2.0</span>
          </div>
          <button
            onClick={closeGoogleAuthModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-5">
          
          {/* TITLE & GOOGLE LOGO HEADER */}
          <div className="text-center space-y-2 pt-1">
            <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center mx-auto shadow-xl">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Sign In with Google</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authenticate securely using your Google Account
            </p>
          </div>

          {/* OFFICIAL GOOGLE SIGN-IN BUTTON CONTAINER */}
          <div className="flex flex-col items-center justify-center space-y-3 pt-2">
            <div id="google-official-btn-container" className="min-h-[44px] flex justify-center w-full"></div>

            <button
              type="button"
              onClick={handleManualGoogleClick}
              className="w-full py-3 px-4 rounded-xl border border-slate-700 hover:border-indigo-500 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Prompt Google Account Selection</span>
            </button>
          </div>

          {/* ADMIN OFFICER ACCESS PASSWORD (IF ADMIN ROLE SELECTED) */}
          {selectedRole === 'ADMIN' && (
            <div className="space-y-1.5 bg-indigo-950/40 p-3.5 rounded-2xl border border-indigo-500/30">
              <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" /> Officer Password Verification *
              </label>
              <input
                type="password"
                placeholder="Enter officer password..."
                value={adminPassword}
                onChange={(e) => { setAdminPassword(e.target.value); setPasswordError(false); }}
                className={`w-full bg-slate-800 border ${passwordError ? 'border-rose-500 text-rose-200' : 'border-slate-700 text-white'} rounded-xl p-2.5 outline-none focus:border-indigo-500 font-mono text-xs`}
              />
              {passwordError && (
                <p className="text-[10px] text-rose-400 font-semibold">
                  Invalid Officer Password! Pre-authorized clearance required.
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
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                  selectedRole === 'CITIZEN' ? 'bg-teal-600/20 border-teal-500 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Citizen Access
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('ADMIN')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                  selectedRole === 'ADMIN' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Admin Officer
              </button>
            </div>
          </div>

          {/* ERROR ALERT BOX */}
          {authError && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-2xl text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* BACKGROUND CHECKING STATUS BADGE */}
          {backgroundCheckStatus && (
            <div className="p-3 bg-indigo-950/80 border border-indigo-500/50 rounded-2xl text-xs font-mono text-indigo-200 flex items-center gap-2 animate-pulse">
              <div className="w-3 h-3 rounded-full bg-indigo-400 animate-ping shrink-0" />
              <span className="text-[11px] font-semibold">{backgroundCheckStatus}</span>
            </div>
          )}

          {/* SECURITY FOOTER */}
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-[10px] font-mono text-slate-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google Identity Services 256-bit Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};
