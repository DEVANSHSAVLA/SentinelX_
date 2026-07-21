# SentinelX System Baseline Performance & Security Audit Report

## 1. System Performance Baseline (Pre-Refactoring)

| Component | Metric | Baseline Measurement | Target Benchmark | Target Compliance Status |
| :--- | :--- | :--- | :--- | :--- |
| **Command Centre Frontend** | Initial Bundle Size | 112 KB uncompressed App.tsx | < 300 KB initial JS | **PASSED (103 KB Gzip)** |
| **Command Centre Frontend** | Composition Root Lines | 1,913 lines | < 200 lines | **PASSED (63 lines)** |
| **Command Centre Frontend** | TypeScript Compilation | 0 Errors | 0 Errors | **PASSED (0 Errors)** |
| **API Gateway** | Request Proxy Latency | 45 ms | < 20 ms P95 | **TARGETED IN WS4** |
| **Fraud Graph** | 5-Hop Query Duration | 68 ms | < 50 ms P95 | **TARGETED IN WS2** |
| **Counterfeit Scanner** | OpenCV Note Processing | 210 ms | < 400 ms | **PASSED** |

## 2. System Security Baseline
- **JWT Authentication**: JWT secret migrated to environment variables (`JWT_SECRET`).
- **Input Validation**: Gateway requests validated against Zod contracts (`packages/api-contracts`).
- **Dependencies**: Zero high-severity vulnerabilities reported by npm audit.
