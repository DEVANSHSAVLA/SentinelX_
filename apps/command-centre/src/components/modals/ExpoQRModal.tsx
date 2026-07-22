import React from 'react';
import { X, Smartphone, QrCode, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ExpoQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpoQRModal: React.FC<ExpoQRModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const expoUri = "exp://192.168.1.100:8081";
  const webMobileUrl = "http://localhost:8082";

  // High quality QR Code image generated via quickchart / google charts API
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(webMobileUrl)}&color=008080&bkgd=0f172a`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-850 px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">SentinelX Mobile Expo QR</h3>
              <p className="text-[10px] text-slate-400 font-mono">Scan on iOS & Android via Expo Go App</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 flex flex-col items-center text-center">
          {/* QR CODE DISPLAY BOX */}
          <div className="p-4 bg-slate-950 border-2 border-teal-500/40 rounded-2xl shadow-xl relative group">
            <img
              src={qrImageUrl}
              alt="SentinelX Expo Mobile QR Code"
              className="w-56 h-56 rounded-xl object-contain"
            />
            <div className="absolute inset-0 bg-teal-950/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-teal-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                Scan with Phone Camera / Expo
              </span>
            </div>
          </div>

          {/* APP DETAILS */}
          <div className="space-y-1.5 w-full text-left bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Expo Deep Link Protocol:</span>
              <span className="font-mono text-teal-300 font-bold bg-slate-900 px-2 py-0.5 rounded text-[10px]">
                {expoUri}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Mobile Web Live URL:</span>
              <a
                href={webMobileUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-indigo-400 font-bold hover:underline flex items-center gap-1 text-[10px]"
              >
                {webMobileUrl} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-slate-700">
              <span className="text-slate-400 font-medium">Platforms Supported:</span>
              <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> iOS & Android Native
              </span>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="text-[11px] text-slate-400 space-y-1 text-left w-full bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <p className="font-bold text-slate-200 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-teal-400" /> How to connect physical phone:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-1 text-[10.5px]">
              <li>Install <strong className="text-white">Expo Go</strong> from App Store (iOS) or Play Store (Android).</li>
              <li>Open phone camera or Expo Go scanner and point at this QR code.</li>
              <li>SentinelX Mobile App will automatically compile and launch live!</li>
            </ol>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Close QR Modal
          </button>
        </div>
      </div>
    </div>
  );
};
