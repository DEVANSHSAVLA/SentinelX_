import React, { useState } from 'react';
import { Play, RefreshCw, Activity } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

export const DigitalArrestTriage: React.FC = () => {
  const [simActive, setSimActive] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [simTranscript, setSimTranscript] = useState('');

  const runSimulation = () => {
    setSimActive(true);
    setSimStep(1);
    setSimTranscript('VoIP Stream Connected. Caller: +919876500112 | Signal: Encrypted VoIP');

    setTimeout(() => {
      setSimStep(2);
      setSimTranscript('Linguistic Script Match: CBI Impersonation, Narcotics threat, Digital Arrest order.');
    }, 1500);

    setTimeout(() => {
      setSimStep(3);
    }, 3000);

    setTimeout(() => {
      setSimStep(4);
    }, 4500);

    setTimeout(() => {
      setSimStep(5);
    }, 6000);

    setTimeout(() => {
      setSimStep(6);
      setSimActive(false);
    }, 7500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Play className="w-6 h-6 text-red-500 animate-pulse" />
            SentinelX V7 Coercive Cyber Incident Pipeline Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Traces a unified multi-pillar response flow in real-time, bridging citizen speech ingestion, deep NLP scoring, inter-bank block webhooks, and geocoded mapping.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={simActive}
          className={`px-5 py-3 rounded-lg font-bold text-sm tracking-wide transition-all shadow-lg flex items-center gap-2 ${
            simActive
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-rose-600 hover:bg-rose-500 text-white animate-bounce'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${simActive ? 'animate-spin' : ''}`} />
          {simActive ? 'Simulation Running...' : 'Initiate Active Mitigation Demo'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TIMELINE STEPPER */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg space-y-6">
          <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Mitigation Pipeline Stages</h4>

          <div className="relative border-l border-slate-800 ml-3 pl-6 space-y-6">
            <div className="relative">
              <span
                className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  simStep >= 1 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                1
              </span>
              <p className={`text-sm font-semibold transition-all ${simStep >= 1 ? 'text-white' : 'text-slate-500'}`}>
                Citizen Call Ingestion
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Ingesting live voice stream from user mobile node</p>
            </div>

            <div className="relative">
              <span
                className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  simStep >= 2 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                2
              </span>
              <p className={`text-sm font-semibold transition-all ${simStep >= 2 ? 'text-white' : 'text-slate-500'}`}>
                AI Scam Trigger Verdict
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">NLP trigger checks & voice deepfake scoring</p>
            </div>

            <div className="relative">
              <span
                className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  simStep >= 3 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                3
              </span>
              <p className={`text-sm font-semibold transition-all ${simStep >= 3 ? 'text-white' : 'text-slate-500'}`}>
                Multi-Hop Trail Traversed
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Neo4j query traces money flow routes</p>
            </div>

            <div className="relative">
              <span
                className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  simStep >= 4 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                4
              </span>
              <p className={`text-sm font-semibold transition-all ${simStep >= 4 ? 'text-white' : 'text-slate-500'}`}>
                Inter-Bank Isolation
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Hold placed on Hop 1 & Hop 2 accounts</p>
            </div>

            <div className="relative">
              <span
                className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  simStep >= 5 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                5
              </span>
              <p className={`text-sm font-semibold transition-all ${simStep >= 5 ? 'text-white' : 'text-slate-500'}`}>
                Evidence Packaged & Signed
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">PDF ledger signed using secure HSM keys</p>
            </div>

            <div className="relative">
              <span
                className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  simStep >= 6 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                6
              </span>
              <p className={`text-sm font-semibold transition-all ${simStep >= 6 ? 'text-white' : 'text-slate-500'}`}>
                Geospatial Hotspot Mapped
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Flashed caller IMEI/BTS coordinates on map</p>
            </div>
          </div>
        </div>

        {/* TELEMETRY VISUALIZATION PANEL */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg lg:col-span-2 flex flex-col justify-between min-h-[480px]">
          {simStep === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4 my-auto">
              <Activity className="w-16 h-16 text-slate-700 animate-pulse" />
              <p className="text-slate-300 font-semibold text-lg">System Armed - Awaiting Simulation</p>
              <p className="text-xs text-slate-500 max-w-sm">
                Click "Initiate Active Mitigation Demo" above to witness the coordinated actor response in one unified loop.
              </p>
            </div>
          )}

          {simStep === 1 && (
            <div className="space-y-6 my-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded font-bold">1. VoIP Stream Ingestion</span>
                <span className="text-slate-500 text-xs font-mono">Caller ID: +91 98765 00112</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-lg flex items-center gap-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <p className="text-xs font-mono text-emerald-400">CONNECTING SECURE VOICE TRANSCRIPT CHANNEL...</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded text-sm text-slate-300 italic font-mono h-32 overflow-y-auto">
                "{simTranscript}"
              </div>
            </div>
          )}

          {simStep === 2 && (
            <div className="space-y-6 my-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="bg-rose-500/10 text-rose-400 text-xs px-2.5 py-1 rounded font-bold">2. NLP & Deepfake Consensus</span>
                <span className="text-slate-500 text-xs font-mono">Verdict: CRITICAL (96% Risk)</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg text-xs leading-relaxed space-y-2">
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Linguistic Script Triggers Checked:</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="bg-rose-500/20 border border-rose-500/40 text-rose-400 px-2 py-0.5 rounded text-[10px] font-bold">CBI (Match: 0.95)</span>
                  <span className="bg-rose-500/20 border border-rose-500/40 text-rose-400 px-2 py-0.5 rounded text-[10px] font-bold">arrest (Match: 0.92)</span>
                  <span className="bg-rose-500/20 border border-rose-500/40 text-rose-400 px-2 py-0.5 rounded text-[10px] font-bold">narcotics (Match: 0.88)</span>
                  <span className="bg-rose-500/20 border border-rose-500/40 text-rose-400 px-2 py-0.5 rounded text-[10px] font-bold">verification vault (Match: 0.96)</span>
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded text-xs text-slate-300 font-mono h-32 overflow-y-auto leading-relaxed">
                "Transcript: 'This is Inspector Raghavan from <b className="text-rose-400 underline">CBI</b> Headquarters. A parcel containing illicit <b className="text-rose-400 underline">narcotics</b> was registered under your Aadhaar ID. Transfer all bank funds to our <b className="text-rose-400 underline">verification vault</b> immediately or face <b className="text-rose-400 underline">arrest</b>.'"
              </div>
            </div>
          )}

          {simStep === 3 && (
            <div className="space-y-6 my-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="bg-teal-500/10 text-teal-400 text-xs px-2.5 py-1 rounded font-bold">3. Neo4j Multi-Hop Flow Tracing</span>
                <span className="text-slate-500 text-xs font-mono">Consolidation Pattern: MATCHED</span>
              </div>

              <div className="h-56 bg-slate-950 border border-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 600 200">
                  <line x1="80" y1="100" x2="200" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
                  <line x1="200" y1="60" x2="340" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
                  <line x1="340" y1="60" x2="480" y2="100" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="80" cy="100" r="22" fill="#4b5563" />
                  <text x="80" y="103" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">Complainant (SBI)</text>
                  <circle cx="200" cy="60" r="22" fill="#ef4444" />
                  <text x="200" y="63" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">Mule 1 (HDFC)</text>
                  <text x="200" y="96" textAnchor="middle" fill="#8892b0" fontSize="7">BA-HDFC-9921</text>
                  <circle cx="340" cy="60" r="22" fill="#ef4444" />
                  <text x="340" y="63" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">Mule 2 (ICICI)</text>
                  <text x="340" y="96" textAnchor="middle" fill="#8892b0" fontSize="7">BA-ICICI-8812</text>
                  <circle cx="480" cy="100" r="22" fill="#ef4444" />
                  <text x="480" y="103" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">Cash Out (BOB)</text>
                  <text x="140" y="70" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold">₹2,50,000</text>
                  <text x="270" y="50" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold">₹2,40,000</text>
                  <text x="410" y="75" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold">₹2,35,000</text>
                </svg>
              </div>
            </div>
          )}

          {simStep === 4 && (
            <div className="space-y-6 my-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded font-bold">4. NPCI Inter-Bank Webhooks</span>
                <span className="text-slate-500 text-xs font-mono">Freezing Action: ACTIVE</span>
              </div>
              <div className="space-y-3 font-mono text-[10px]">
                <div className="border border-teal-500/35 bg-teal-500/5 p-3 rounded flex justify-between items-center">
                  <div>
                    <p className="text-teal-400 font-bold">POST http://api.hdfc.com/v1/accounts/BA-HDFC-9921/freeze</p>
                    <p className="text-slate-500 text-[9px] mt-1">Payload: {"{hold_amount: 240000.0, incident_ref: 'SX-SIM-001'}"}</p>
                  </div>
                  <span className="bg-teal-500/20 text-teal-400 border border-teal-500/40 px-2 py-0.5 rounded font-bold">200 OK</span>
                </div>
                <div className="border border-teal-500/35 bg-teal-500/5 p-3 rounded flex justify-between items-center">
                  <div>
                    <p className="text-teal-400 font-bold">POST http://api.icici.com/v1/accounts/BA-ICICI-8812/freeze</p>
                    <p className="text-slate-500 text-[9px] mt-1">Payload: {"{hold_amount: 235000.0, incident_ref: 'SX-SIM-001'}"}</p>
                  </div>
                  <span className="bg-teal-500/20 text-teal-400 border border-teal-500/40 px-2 py-0.5 rounded font-bold">200 OK</span>
                </div>
                <div className="bg-rose-950/20 border border-rose-500/30 p-3 rounded flex justify-between items-center">
                  <span className="text-rose-400 font-bold uppercase tracking-wider text-[9px]">Total Blocked Capital</span>
                  <span className="text-rose-400 font-extrabold text-sm">₹2,40,000 (Hop 1 Freezing Secured)</span>
                </div>
              </div>
            </div>
          )}

          {simStep === 5 && (
            <div className="space-y-6 my-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="bg-violet-500/10 text-violet-400 text-xs px-2.5 py-1 rounded font-bold">5. Evidence Package Generation</span>
                <span className="text-slate-500 text-xs font-mono">Sec 65B Compliant</span>
              </div>
              <div className="border border-slate-300 bg-white text-slate-850 p-4 rounded space-y-4 max-h-56 overflow-y-auto text-[10px]">
                <div className="flex justify-between items-center border-b border-slate-300 pb-2">
                  <h5 className="font-extrabold text-slate-900">SENTINELX DIGITAL FORENSIC REPORT</h5>
                  <span className="text-emerald-600 font-bold border border-emerald-500 px-1 py-0.5 text-[8px] uppercase rounded">Legally Signed</span>
                </div>
                <table className="w-full text-left border-collapse border border-slate-300">
                  <tbody>
                    <tr className="bg-slate-50 border-b border-slate-300">
                      <td className="p-1 font-bold">Case Reference</td>
                      <td className="p-1">SX-CASE-SIM-2026-9811</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-1 font-bold">AI Verdict</td>
                      <td className="p-1 text-rose-600 font-bold">CRITICAL DIGITAL ARREST PATTERN MATCHED</td>
                    </tr>
                    <tr className="bg-slate-50 border-b border-slate-300">
                      <td className="p-1 font-bold">SHA-256 Checksum</td>
                      <td className="p-1 font-mono text-[9px]">4a9b2c3d8e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {simStep === 6 && (
            <div className="space-y-6 my-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <span className="bg-rose-500/10 text-rose-400 text-xs px-2.5 py-1 rounded font-bold">6. Geospatial Threat Mapping</span>
                <span className="text-slate-500 text-xs font-mono">Location: Noida, Sec 62</span>
              </div>
              <div className="h-56 w-full rounded-lg border border-slate-800 bg-slate-950 relative overflow-hidden">
                <div style={{ height: '100%', width: '100%', filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}>
                  <MapContainer center={[28.6139, 77.2090]} zoom={8} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <CircleMarker center={[28.5355, 77.3910]} radius={14} fillColor="#ef4444" color="#0f172a" weight={2} fillOpacity={0.7}>
                      <Popup>
                        <div className="text-slate-900 font-sans p-1 text-xs">
                          <p className="font-bold text-rose-600">Simulated Scam Call Cell</p>
                          <p className="text-[10px] mt-0.5">Noida Sec 62 Centroid Node</p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  </MapContainer>
                </div>
              </div>
            </div>
          )}

          {simStep > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Simulation Progress</span>
                <span>{Math.round((simStep / 6) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: `${(simStep / 6) * 100}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
