import React from 'react';
import { Cpu, Shield, Network } from 'lucide-react';

export const AgentMeshOverview: React.FC = () => {
  const activeAgents = [
    { name: "PlannerAgent", objective: "Deconstruct incident pipelines", status: "ACTIVE", load: "12%", model: "Claude-3.5 Sonnet / LLaMA-3" },
    { name: "CoordinatorAgent", objective: "Orchestrate sub-agent mesh", status: "ACTIVE", load: "8%", model: "Ray Event Queue" },
    { name: "FraudAgent", objective: "Neo4j graph pathfinding", status: "ACTIVE", load: "15%", model: "GraphSAGE GDS" },
    { name: "EvidenceAgent", objective: "Assemble Section 65B PDFs", status: "IDLE", load: "0%", model: "HSM Signer" },
    { name: "RiskAgent", objective: "MCDA composite threat score", status: "ACTIVE", load: "22%", model: "MCDA Ensemble" },
    { name: "VisionAgent", objective: "OpenCV microprint scanning", status: "ACTIVE", load: "4%", model: "EfficientNet ViT" },
    { name: "CommunicationAgent", objective: "IVR & WhatsApp guidance", status: "ACTIVE", load: "11%", model: "Bhashini REST Bridge" },
    { name: "KnowledgeAgent", objective: "Regulatory & legal lookup", status: "ACTIVE", load: "5%", model: "Vector RAG Store" },
    { name: "MemoryAgent", objective: "Context & session embeddings", status: "ACTIVE", load: "9%", model: "Redis Vector Index" },
    { name: "EvaluatorAgent", objective: "Hallucination & precision score", status: "ACTIVE", load: "3%", model: "Guardrail Verifier" },
    { name: "ReflectionAgent", objective: "Critique agent execution plans", status: "ACTIVE", load: "2%", model: "Self-Reflection Agent" },
    { name: "SupervisorAgent", objective: "Enforce safety & policy overrides", status: "ACTIVE", load: "1%", model: "Policy Engine" }
  ];

  const plannedAgents = [
    {
      name: "CarrierInterceptorAgent",
      objective: "Detect CLI spoofing & Intercept VoIP routing",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "Core Network IMS Interceptor"
    },
    {
      name: "IccIDSyncAgent",
      objective: "Verify SIM registration against central DB",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "Sanchar Saathi Sync"
    },
    {
      name: "DeviceTelemetryAgent",
      objective: "Identify device IMEI modifications",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "CEIR Database Sync"
    },
    {
      name: "DeepfakeAcousticAgent",
      objective: "Analyze voice packets for synthetic features",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "Acoustic ViT Deepfake Classifier"
    },
    {
      name: "BhashiniBridgeAgent",
      objective: "Dynamic translation layer for regional dialects",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "Bhashini Translation API"
    },
    {
      name: "PostalRouteAgent",
      objective: "Track counterfeit note source parcels",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "India Post API Sync"
    },
    {
      name: "RegulatorySyncAgent",
      objective: "Report frozen accounts directly to MHA cyber bureau",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "MHA Bureau Sync"
    },
    {
      name: "MHAAlertAgent",
      objective: "Broadcast scam warnings to nearby mobile towers",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "Cell Broadcast Bridge"
    },
    {
      name: "BankApiWebhookAgent",
      objective: "Sync freezes to non-partner bank accounts",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "NPCI API Gateway v3"
    },
    {
      name: "AutomatedTriageAgent",
      objective: "Categorize incoming citizen reports automatically",
      status: "PLANNED",
      weightLoad: "0%",
      targetSpec: "LLaMA-3-8B Fine-tuned"
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* 12 ACTIVE AGENTS SECTION */}
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                12-Agent Synchronized Defense Mesh Topology
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 uppercase font-bold">
                  12 Active Production Nodes
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Autonomous multi-agent collaboration, risk consensus, guardrails, and real-time execution telemetry
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeAgents.map((agent, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md hover:border-indigo-500/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-xs font-bold text-slate-200">{agent.name}</h4>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  {agent.status}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{agent.objective}</p>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Model: <b className="text-slate-300">{agent.model}</b></span>
                <span>Load: <b className="text-indigo-400">{agent.load}</b></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ENTERPRISE PRODUCTION EXPANSION NETWORK (PLANNED ACTORS) */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-indigo-400" />
              Enterprise Production Expansion Network
            </h3>
            <p className="text-xs text-slate-400">
              Stubs and API interfaces prepared for full national deployment integrations.
            </p>
          </div>

          <div className="self-start sm:self-auto">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full font-mono text-xs font-bold shadow-sm">
              10 Planned Actors
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plannedAgents.map((agent, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 space-y-3 shadow-sm hover:border-slate-700 transition-all">
              
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 font-mono">{agent.name}</h4>
                <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/80 text-[10px] font-mono font-bold tracking-wider">
                  {agent.status}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{agent.objective}</p>

              <div className="pt-2 border-t border-slate-800/70 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500">
                <div>
                  <span className="block text-slate-500 text-[9px]">Core Weight Load</span>
                  <span className="text-slate-400 font-bold">{agent.weightLoad}</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-[9px]">Target Spec</span>
                  <span className="text-slate-300 font-bold truncate block">{agent.targetSpec}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
