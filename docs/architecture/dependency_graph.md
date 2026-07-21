# SentinelX Microservice & Component Dependency Graph

```
                                +-----------------------------------+
                                |    Client Ingress (Web / Mobile)  |
                                +-----------------------------------+
                                                  │
                                                  ▼ HTTP / REST (JWT Auth)
                                +-----------------------------------+
                                |    Express API Gateway (8000)     |
                                |  - Zod Request Schema Validation  |
                                |  - W3C Correlation ID Ingress     |
                                +-----------------------------------+
                                                  │
         ┌──────────────────┬─────────────────────┼─────────────────────┬──────────────────┐
         │                  │                     │                     │                  │
         ▼                  ▼                     ▼                     ▼                  ▼
┌─────────────────┐┌─────────────────┐┌─────────────────────┐┌─────────────────┐┌──────────────────┐
│ Scam Detection  ││Counterfeit Scan ││  Fraud Graph Engine ││ Threat Fusion   ││ Citizen Shield   │
│  (FastAPI: 8001)││ (FastAPI: 8006) ││   (FastAPI: 8002)   ││ (FastAPI: 8004) ││ (FastAPI: 8003)  │
│ - NLP Transcript││ - OpenCV Scan   ││ - Neo4j Cypher      ││ - Multi-modal   ││ - Multilingual   │
│ - WebSocket WS  ││ - Note Quality  ││ - Mule Pathfinding  ││   Consensus     ││   Chatbot        │
└─────────────────┘└─────────────────┘└─────────────────────┘└─────────────────┘└──────────────────┘
         │                  │                     │                     │                  │
         └──────────────────┴─────────────────────┼─────────────────────┴──────────────────┘
                                                  │
                                                  ▼
                                +-----------------------------------+
                                | Evidence Generator Engine (8005)  |
                                | - Section 65B PDF Compiler        |
                                | - SHA-256 Digest & HSM Envelope   |
                                +-----------------------------------+
                                                  │
                                                  ▼
                                +-----------------------------------+
                                |     Persistence & Event Layer     |
                                | - PostgreSQL 15 (Relational DB)   |
                                | - Neo4j 5.x (Graph DB)            |
                                | - Redis 7 (Session & L2 Cache)    |
                                | - Apache Kafka (Event Streaming)  |
                                +-----------------------------------+
```

## Internal Package Dependencies

```
apps/command-centre ──> packages/shared-types ──> packages/design-tokens
services/api-gateway ──> packages/shared-types ──> packages/api-contracts ──> packages/shared-config
services/* (Python) ──> src/adapters ──> src/core/services ──> src/core/domain
```
