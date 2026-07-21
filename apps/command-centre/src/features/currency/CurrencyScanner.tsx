import React, { useState } from 'react';
import { DollarSign, Upload, AlertTriangle, Cpu, RefreshCw } from 'lucide-react';

export const CurrencyScanner: React.FC = () => {
  const [claimedDenomination, setClaimedDenomination] = useState<number>(500);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any | null>(null);

  const handleSimulateScan = () => {
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setScanResult({
        isCounterfeit: true,
        confidence: 0.94,
        detectedDenomination: claimedDenomination,
        serialNumber: "5AC982341",
        failedMarkers: [
          { markerName: "security_thread_variance", details: "Optical shift check failed. Hue variance detected: 2.14 (Expected > 8.0)" },
          { markerName: "microprint_clarity", details: "Blurred print signature detected. Edge index: 0.0112 (Expected > 0.02)" }
        ],
        telemetry: {
          imageResolution: "1920x1080",
          edgeDensity: 0.0112,
          hueVariance: 2.14
        }
      });
      setScanning(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Multimodal Counterfeit Currency Intelligence Scanner</h3>
            <p className="text-xs text-slate-400">Computer Vision macro-topography, microprint edge density & security thread hue variance analysis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Currency Inspection Inputs</h4>

          <div>
            <label className="text-xs text-slate-400">Claimed Denomination</label>
            <select
              value={claimedDenomination}
              onChange={(e) => setClaimedDenomination(Number(e.target.value))}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none"
            >
              <option value={100}>₹100 Note</option>
              <option value={200}>₹200 Note</option>
              <option value={500}>₹500 Note</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-slate-700/80 rounded-xl p-8 text-center bg-slate-950/40 hover:border-indigo-500/50 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-200">Upload High-Resolution Note Photo</p>
            <p className="text-[10px] text-slate-500 mt-1">Supports PNG, JPG, WEBP (Min 12MP camera resolution recommended)</p>
          </div>

          <button
            onClick={handleSimulateScan}
            disabled={scanning}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {scanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running OpenCV Feature Extraction...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Run OpenCV Counterfeit Diagnostics</span>
              </>
            )}
          </button>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Inspection Analysis Report</h4>

          {!scanResult && !scanning && (
            <div className="h-64 border border-dashed border-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-500 text-xs">
              <DollarSign className="w-8 h-8 mb-2 opacity-50" />
              <span>Upload or click "Run OpenCV Counterfeit Diagnostics".</span>
            </div>
          )}

          {scanning && (
            <div className="h-64 border border-slate-800 rounded-lg flex flex-col items-center justify-center space-y-2 text-indigo-400 text-xs">
              <RefreshCw className="w-8 h-8 animate-spin" />
              <span>Evaluating Canny edge density & HSV security thread variance...</span>
            </div>
          )}

          {scanResult && (
            <div className="space-y-4 text-xs animate-in fade-in duration-200">
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between font-bold text-rose-400">
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>FLAGGED COUNTERFEIT NOTE</span>
                  </div>
                  <span>{(scanResult.confidence * 100).toFixed(0)}% Confidence</span>
                </div>
                <div className="text-slate-300 font-mono">
                  Extracted Serial: <strong className="text-indigo-400">{scanResult.serialNumber}</strong>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300">Failed Security Markers:</div>
                {scanResult.failedMarkers.map((marker: any, idx: number) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-rose-400 font-bold text-[11px] font-mono">{marker.markerName}</div>
                    <div className="text-[10px] text-slate-400">{marker.details}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
