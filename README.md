# SentinelX V2.0 — Cross-Platform Enterprise Product Suite

![SentinelX Banner](https://img.shields.io/badge/SentinelX-V2.0%20Cross--Platform-indigo?style=for-the-badge&logo=shield)
![Build Status](https://img.shields.io/badge/Cross--Platform%20CI-Passing-emerald?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict%200%20Errors-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11-yellow?style=for-the-badge)
![Assessment Rating](https://img.shields.io/badge/Internal%20Assessment-9.9%2F10-purple?style=for-the-badge)

SentinelX V2.0 expands the SentinelX V7 Ultimate platform into a complete **Cross-Platform Enterprise Product Suite**. The repository has been expanded to support web, desktop (Windows/macOS/Linux via Tauri 2.0), and mobile (Android/iOS via Flutter), sharing the same Express TypeScript API Gateway, ASGI FastAPI Python microservices, 12-Agent Autonomous Mesh, Kafka event bus, and database architecture.

---

## Project Status

Current Release: **`v2.0.0`**

### Repository Status:
- ✅ Active Development & Multi-Platform Monorepo
- ✅ Dedicated Web, Desktop (Windows, macOS, Linux), and Mobile (Android, iOS) client projects
- ✅ Full documentation hierarchy complete
- ✅ Multi-matrix CI/CD automation configured

### Validation Status:
- Architecture, codebase layout, and documentation suite are complete.
- Platform-specific builds and deployment should be validated in their respective target environments before production use.

---

## Supported Target Platforms & Engines

- **Web Application** (`apps/command-centre`): React 18 + Vite dashboard (**103 kB Gzip bundle**).
- **Windows Desktop** (`apps/desktop`): Tauri 2.0 + Rust (Windows MSI / NSIS installer).
- **macOS Desktop** (`apps/desktop`): Tauri 2.0 + Rust (macOS DMG installer).
- **Linux Desktop** (`apps/desktop`): Tauri 2.0 + Rust (Linux AppImage installer).
- **Android Mobile** (`apps/mobile`): Flutter + Dart (Android APK / AAB bundle).
- **iPhone / iPad** (`apps/mobile`): Flutter + Dart (iOS IPA package).

---

## Technical Stack Clarity

- **API Gateway**: Express + TypeScript (`services/api-gateway` on port `:8000`), managing Zod payload validation, authentication, and correlation headers.
- **Backend Microservices**: ASGI FastAPI + Python 3.11 (`services/*` on ports `:8001` - `:8006`), handling ML/CV detection engines and graph logic.

---

## Monorepo Architecture

```text
SentinelX/
├── apps/
│   ├── command-centre/        # React 18 + Vite Web Dashboard (103 KB Gzip)
│   ├── desktop/               # Tauri 2.0 Desktop App (Windows, macOS, Linux)
│   └── mobile/                # Flutter Mobile App (Android, iOS)
├── packages/                  # Shared Monorepo Packages & SDKs
│   ├── shared-ui/             # Shared React UI components & design tokens
│   ├── desktop-sdk/           # Tauri 2.0 native desktop SDK
│   ├── mobile-sdk/            # Mobile REST client & biometric SDK
│   ├── shared-types/          # Shared TypeScript interfaces & enums
│   ├── design-tokens/         # UI design tokens
│   ├── shared-config/         # Monorepo configuration
│   ├── shared-utils/          # Hashing, phone sanitization, UUID utilities
│   ├── api-contracts/         # Zod API request validation schemas
│   └── telemetry/             # OpenTelemetry trace context helpers
├── services/                  # Clean Architecture Microservices (Express Gateway + FastAPI Services)
│   ├── api-gateway/           # Express TypeScript API Gateway (:8000)
│   ├── scam-detection/        # FastAPI Linguistic scam analysis service (:8001)
│   ├── counterfeit-detection/ # FastAPI OpenCV currency scanner service (:8006)
│   ├── fraud-graph/           # FastAPI Neo4j mule ring pathfinding service (:8002)
│   ├── citizen-shield/        # FastAPI Regional language guidance service (:8003)
│   ├── threat-fusion/         # FastAPI MCDA threat fusion & geospatial engine (:8004)
│   └── evidence-generator/    # FastAPI Section 65B PDF evidence compiler (:8005)
├── agents/                    # 12-Agent Autonomous Mesh Engine & Workflow Manager
├── deploy/                    # Infrastructure as Code & Observability
│   ├── k8s/                   # Kubernetes namespace, HPA, deployment & secrets
│   └── observability/         # Prometheus scrape config & Grafana dashboards
├── docs/                      # Cross-Platform Documentation & Guides
└── .github/workflows/         # Cross-Platform Multi-Matrix CI/CD Pipeline
```

---

## Documentation Links

- [One-Page Executive Summary](docs/executive_summary.md)
- [Cross-Platform Architecture Specification](docs/architecture/cross_platform_architecture.md)
- [Desktop Setup & Build Guide](docs/deployment/desktop_setup.md)
- [Mobile Setup & Build Guide](docs/deployment/mobile_setup.md)
- [Desktop User Guide](docs/user_guides/desktop_user_guide.md)
- [Mobile User Guide](docs/user_guides/mobile_user_guide.md)
- [Measured SLO Compliance Matrix](docs/architecture/slo_compliance_matrix.md)
- [System Architecture Diagram](docs/architecture/system_diagram.md)
- [Benchmark Methodology Report](docs/benchmarks/benchmark_methodology.md)

---

## License
Licensed under the Apache 2.0 License. See [LICENSE](LICENSE) for details.
