# SentinelX V2.0 Cross-Platform Architecture Specification

## Unified Architecture Overview

```
                                 +-----------------------------------+
                                 |     SentinelX Unified Clients     |
                                 +-----------------------------------+
                                   │               │               │
                  ┌────────────────┘               │               └────────────────┐
                  ▼                                ▼                                ▼
       ┌─────────────────────┐          ┌─────────────────────┐          ┌─────────────────────┐
       |  Command Centre Web |          |    Desktop App      |          |    Mobile App       |
       | React 18 + Vite     |          | Tauri 2.0 (Win/Mac) |          | Flutter (Android/iOS|
       └─────────────────────┘          └─────────────────────┘          └─────────────────────┘
                  │                                │                                │
                  └────────────────────────────────┼────────────────────────────────┘
                                                   │ Shared Monorepo Packages
                                                   ▼
                                 ┌───────────────────────────────────┐
                                 | packages/api-contracts & SDKs     |
                                 └───────────────────────────────────┘
                                                   │ REST / W3C TraceContext
                                                   ▼
                                 ┌───────────────────────────────────┐
                                 | services/api-gateway (:8000)      |
                                 └───────────────────────────────────┘
                                                   │ Async Event Queue
                                                   ▼
                                 ┌───────────────────────────────────┐
                                 | agents/ 12-Agent Autonomous Mesh  |
                                 └───────────────────────────────────┘
```

## Shared SDK Layer (`packages/`)
- `packages/desktop-sdk`: System tray, encrypted SQLite storage, native OS notifications, auto-updater.
- `packages/mobile-sdk`: Biometric authentication (Android Keystore / iOS Keychain), offline sync queue.
- `packages/shared-ui`: Cross-platform UI primitives and SentinelX design tokens.
