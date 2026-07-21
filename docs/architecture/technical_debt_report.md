# SentinelX Technical Debt & Code Smell Audit Report (WS1 Baseline)

## Executive Audit Summary
This report documents the pre-refactoring technical debt baseline across the SentinelX repository.

### Identified Technical Debt Items & Mitigation Plan

| Debt ID | Subsystem | Code Smell / Issue | Root Cause | Business & Technical Impact | Refactoring Strategy | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DEBT-01** | `apps/command-centre` | Monolithic 112KB `App.tsx` file containing 1,913 lines of unorganized React code. | Initial rapid MVP prototyping without component separation. | Severe maintenance friction, high risk of regression, impossibility of unit testing individual UI views. | Refactor into feature-first folders (`src/components/`, `src/features/`, `src/context/`) with <65 line composition root `App.tsx`. | **COMPLETED** |
| **DEBT-02** | `services/*` | Microservices contained all routes, database logic, and OpenCV/NLP code inside single `main.py` files. | Lack of backend architectural boundaries during MVP sprint. | High coupling between web framework (FastAPI) and core business logic; inability to run domain tests independently. | Refactor each service into Clean / Hexagonal Architecture packages (`adapters/`, `core/`, `config/`). | **IN PROGRESS** |
| **DEBT-03** | `services/api-gateway` | Gateway proxied requests using unvalidated Axios calls without Zod schema validation or correlation tracking. | Primitive express routing without resilience middleware. | Vulnerable to invalid payload crashes, lack of request tracing, potential bad gateway cascades. | Add Zod schema validation, W3C `x-correlation-id` tracing, and circuit breaker error handling. | **IN PROGRESS** |
| **DEBT-04** | `services/*` | Silent mock fallbacks in python microservices returning hardcoded data when DB/Neo4j fails. | Fallback logic intended for local testing running in production paths. | Masks database connection failures in production; creates false positive success responses. | Remove silent mock fallbacks in production mode; expose explicit `/health/liveness` and `/health/readiness` probes. | **IN PROGRESS** |
| **DEBT-05** | Monorepo root | Duplicate DTO definitions across frontend, gateway, and python microservices. | Lack of shared workspace monorepo package layout. | Inconsistent data models, type drift between API producer and consumer. | Establish `packages/` workspace layer (`shared-types`, `shared-config`, `shared-utils`, `api-contracts`, `telemetry`). | **COMPLETED** |
