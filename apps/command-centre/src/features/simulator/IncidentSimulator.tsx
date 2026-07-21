import React, { useState } from 'react';
import { Smartphone, Play, AlertTriangle, ShieldCheck, Activity, RefreshCw } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const IncidentSimulator: React.FC = () => {
  const [callerNumber, setCallerNumber] = useState('+919876500112');
  const [transcriptText, setTranscriptText] = useState(
    'You are under digital arrest by CBI officer. Do not hang up the camera. Transfer your account balance to CBI verification vault immediately.'
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any | null>(null);

  const { addToast } = useNotification();

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    setSimulationResult(null);

    // Simulate agent mesh execution flow
    setTimeout(() => {
      const result = {
        correlation_id: `corr-${Math.random().toString(36).substr(2, 9)}`,
        scam_score: 0.94,
        deepfake_score: 0.88,
        graph_risk: 0.92,
        composite_threat_score: 0.93,
        hazard_level: 'CRITICAL',
        impersonated_entity: 'CBI / ED Enforcement Directorate',
        directives: ['LOCK_BANK_APPS', 'TRIGGER_NPCI_HOLD', 'DISPATCH_CYBER_UNIT'],
        mule_nodes_flagged: ['BA-SBI-1002', 'BA-HDFC-9921', 'BA-ICICI-8812', 'BA-BOB-7761'],
        evidence_pdf_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      };

      setSimulationResult(result);
      setIsSimulating(false);

      addToast({
        type: 'critical',
        title: 'CRITICAL SCAM THREAT DETECTED',
        message: `Digital arrest scam confirmed (Score: ${(result.composite_threat_score * 100).toFixed(0)}%). NPCI account hold initiated.`
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Live Incident Simulator & Telco Dialing Console</h3>
            <p className="text-xs text-slate-400">Test ScamPatternAgent, ThreatFusion consensus, and NPCI Mule account hold pipeline</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simulator Input Box */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Simulated Inbound Call Metadata</h4>

          <div>
            <label className="text-xs text-slate-400">Caller Phone Number (CLI)</label>
            <input
              type="text"
              value={callerNumber}
              onChange={(e) => setCallerNumber(e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">Live In-Call Audio Transcript Stream</label>
            <textarea
              rows={5}
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 font-mono outline-none"
            />
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing 17-Agent Defense Mesh...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Execute Live Incident Defense Pipeline</span>
              </>
            )}
          </button>
        </div>

        {/* Simulator Results Box */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Real-time Defense Output</h4>

          {!simulationResult && !isSimulating && (
            <div className="h-64 border border-dashed border-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-500 text-xs">
              <Activity className="w-8 h-8 mb-2 opacity-50" />
              <span>Click "Execute Live Incident Defense Pipeline" to trigger simulation.</span>
            </div>
          )}

          {isSimulating && (
            <div className="h-64 border border-slate-800 rounded-lg flex flex-col items-center justify-center space-y-2 text-indigo-400 text-xs">
              <RefreshCw className="w-8 h-8 animate-spin" />
              <span>Traversing Neo4j fraud graph & evaluating threat consensus...</span>
            </div>
          )}

          {simulationResult && (
            <div className="space-y-4 text-xs animate-in fade-in duration-200">
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between font-bold text-rose-400">
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>HAZARD LEVEL: {simulationResult.hazard_level}</span>
                  </div>
                  <span>{(simulationResult.composite_threat_score * 100).toFixed(0)}% Scam Probability</span>
                </div>
                <p className="text-slate-300">Entity Impersonated: <strong>{simulationResult.impersonated_entity}</strong></p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="text-slate-400">Directives Issued:</div>
                {simulationResult.directives.map((dir: string, idx: number) => (
                  <div key={idx} className="text-emerald-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{dir}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 font-mono text-[11px]">
                <div className="text-slate-400">Neo4j Mule Account Nodes Frozen:</div>
                <div className="text-indigo-300 font-bold">{simulationResult.mule_nodes_flagged.join(' → ')}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
