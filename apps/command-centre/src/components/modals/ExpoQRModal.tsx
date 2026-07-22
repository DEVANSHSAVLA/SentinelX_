import React, { useState } from 'react';
import { X, Smartphone, QrCode, ExternalLink, CheckCircle2, Copy, Wifi, Layers } from 'lucide-react';

interface ExpoQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpoQRModal: React.FC<ExpoQRModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'wifi' | 'expo' | 'localhost'>('wifi');
  const [copied, setCopied] = useState(false);

  // Machine local network IPv4 address (accessible over Wi-Fi network)
  const lanIp = "10.177.200.94";
  
  const targetUrls = {
    wifi: `http://${lanIp}:8082`,
    expo: `exp://${lanIp}:8081`,
    localhost: "http://localhost:8082"
  };

  const activeUrl = targetUrls[activeTab];

  // High resolution QR code using QR server API
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(activeUrl)}&color=008080&bkgd=0f172a`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-850 px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">SentinelX Mobile Expo Connect</h3>
              <p className="text-[10px] text-slate-400 font-mono">Real-Time Mobile Pairing (Wi-Fi & Expo Go)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 flex flex-col items-center text-center">
          {/* TOGGLE TABS */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full text-xs font-semibold">
            <button
              onClick={() => setActiveTab('wifi')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'wifi'
                  ? 'bg-teal-600 text-white shadow font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Wi-Fi Mobile (Camera Scan)</span>
            </button>

            <button
              onClick={() => setActiveTab('expo')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'expo'
                  ? 'bg-teal-600 text-white shadow font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Expo Go Native</span>
            </button>

            <button
              onClick={() => setActiveTab('localhost')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'localhost'
                  ? 'bg-teal-600 text-white shadow font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Localhost Web</span>
            </button>
          </div>

          {/* QR CODE DISPLAY BOX */}
          <div className="p-4 bg-slate-950 border-2 border-teal-500/40 rounded-2xl shadow-xl relative group">
            <img
              src={qrImageUrl}
              alt="SentinelX Expo Mobile QR Code"
              className="w-56 h-56 rounded-xl object-contain bg-slate-950"
            />
            <div className="absolute inset-0 bg-teal-950/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-teal-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                Scan with Phone Camera or Expo Go
              </span>
            </div>
          </div>

          {/* APP DETAILS & COPY URL BOX */}
          <div className="space-y-2 w-full text-left bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Target URL Address:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-teal-300 font-bold bg-slate-900 px-2 py-0.5 rounded text-[11px]">
                  {activeUrl}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 bg-slate-700 hover:bg-teal-600 text-white rounded transition-all cursor-pointer"
                  title="Copy link to clipboard"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-700">
              <span className="text-slate-400 font-medium">Platform Compatibility:</span>
              <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> iOS, Android, Expo Go & Mobile Browsers
              </span>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="text-[11px] text-slate-400 space-y-1.5 text-left w-full bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <p className="font-bold text-slate-200 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-teal-400" /> How to connect your physical phone:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-1 text-[10.5px]">
              <li>Ensure your phone is connected to the <strong className="text-teal-300">same Wi-Fi network</strong> as this PC.</li>
              <li>Open your phone's <strong className="text-white">Camera App</strong> (iOS & Android) or <strong className="text-white">Expo Go App</strong>.</li>
              <li>Point the phone camera at the QR code above and tap the notification link that pops up.</li>
              <li>SentinelX Mobile App will open live on your phone with real-time sync enabled!</li>
            </ol>
          </div>

          <div className="flex gap-2 w-full">
            <a
              href={activeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Open Direct in Browser
            </a>
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Close QR Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
