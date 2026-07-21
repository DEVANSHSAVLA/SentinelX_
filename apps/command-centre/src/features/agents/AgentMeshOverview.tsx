import React from 'react';
import { Cpu, Shield } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">12-Agent Synchronized Defense Mesh Topology</h3>
            <p className="text-xs text-slate-400">Autonomous multi-agent collaboration, risk consensus, guardrails, and execution telemetry</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeAgents.map((agent, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-slate-200">{agent.name}</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                {agent.status}
              </span>
            </div>

            <p className="text-xs text-slate-400">{agent.objective}</p>

            <div className="pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Model: {agent.model}</span>
              <span>Load: {agent.load}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
