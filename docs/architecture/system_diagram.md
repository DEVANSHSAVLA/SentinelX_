# SentinelX V2.0 System Architecture Diagram

```mermaid
graph TD
    A1[Command Centre Web - React 18] -->|REST / JWT| B[API Gateway :8000]
    A2[Desktop App - Tauri 2.0 Win/Mac/Linux] -->|REST / JWT| B
    A3[Mobile App - Flutter Android/iOS] -->|REST / JWT| B
    
    B -->|Zod Validation| C[Apache Kafka Event Bus :9092]
    C -->|Async Signal Topic| D[Kafka Consumer Stream]
    D -->|State Transition| E[WorkflowManager State Machine]
    E -->|Dispatch DAG| F[12-Agent Autonomous Mesh Engine]
    
    subgraph 12-Agent Autonomous Mesh Topology
        F --> F1[PlannerAgent]
        F --> F2[ReflectionAgent]
        F --> F3[CoordinatorAgent]
        F --> F4[FraudAgent - Neo4j Pathfinding]
        F --> F5[VisionAgent - OpenCV Macro Scanner]
        F --> F6[RiskAgent - MCDA Consensus]
        F --> F7[CommunicationAgent - Bhashini Multilingual]
        F --> F8[KnowledgeAgent - Legal Statutes RAG]
        F --> F9[MemoryAgent - Redis Vector Store]
        F --> F10[EvidenceAgent - Section 65B PDF Compiler]
        F --> F11[EvaluatorAgent - Guardrail Verifier]
        F --> F12[SupervisorAgent - Policy Overrides & Audit Log]
    end

    F4 -->|Bolt :7687| G[(Neo4j Graph Database)]
    F9 -->|RESP :6379| H[(Redis 7 Vector Cache)]
    F10 -->|ReportLab HSM| I[Section 65B PDF Storage]
    B -->|W3C TraceContext| J[Prometheus & Grafana Observability]
```

## System Component Topology

```text
+---------------------------------------------------------------------------------+
|                       SentinelX V2.0 Unified Cross-Platform Suite               |
+---------------------------------------------------------------------------------+
| apps/command-centre | React 18 + Vite + Tailwind + Lucide + Leaflet (103 KB Gzip) |
| apps/desktop        | Tauri 2.0 (Windows MSI, macOS DMG, Linux AppImage)        |
| apps/mobile         | Flutter (Android APK/AAB, iOS IPA)                        |
+---------------------------------------------------------------------------------+
                                       │ HTTP / REST / W3C TraceContext
                                       ▼
+---------------------------------------------------------------------------------+
| services/api-gateway| Express + TypeScript + Zod Validation + Rate Limit (:8000) |
+---------------------------------------------------------------------------------+
                                       │ Async Event Queue
                                       ▼
+---------------------------------------------------------------------------------+
| services/event-bus  | Apache Kafka Topic Producer & Consumer Stream             |
+---------------------------------------------------------------------------------+
                                       │ Stateful Execution
                                       ▼
+---------------------------------------------------------------------------------+
| agents/             | 12-Agent Autonomous Defense Mesh Orchestrator Engine      |
|                     | Planner, Coordinator, Fraud, Evidence, Risk, Vision,      |
|                     | Communication, Knowledge, Memory, Evaluator, Reflection,  |
|                     | Supervisor                                                |
+---------------------------------------------------------------------------------+
                                       │ Layered Clean Microservices
        ┌──────────────────┬───────────┴────────┬──────────────────┐
        ▼                  ▼                    ▼                  ▼
┌──────────────┐   ┌──────────────┐     ┌──────────────┐   ┌──────────────┐
│scam-detection│   │ counterfeit  │     │ fraud-graph  │   │threat-fusion │
│ (FastAPI:8001)│  │ (FastAPI:8006)│    │ (FastAPI:8002)│  │ (FastAPI:8004)│
└──────────────┘   └──────────────┘     └──────────────┘   └──────────────┘
```
