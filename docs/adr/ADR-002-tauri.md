# ADR-002: Tauri 2.0 over Electron for Desktop Packaging

## Status
Accepted

## Context
SentinelX requires desktop application packaging across Windows, macOS, and Linux for law enforcement command centre deployment, operating alongside web dashboard and mobile applications.

## Decision
We select **Tauri 2.0 (React 18 / Vite)** as the primary desktop packaging engine.

## Consequences
- **Positive**: Sub-15MB installer size, <50MB system RAM consumption, zero Chromium overhead, native Rust security isolation.
- **Negative**: Requires Rust toolchain for native release compilation.
- **Alternatives Rejected**:
  - *Electron*: Rejected due to large 120MB+ bundle size and excessive RAM footprint (~300MB+ per window).
