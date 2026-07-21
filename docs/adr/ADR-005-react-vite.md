# ADR-005: React 18 + Vite for Command Centre Dashboard

## Status
Accepted

## Context
The law enforcement command centre requires real-time WebSocket transcript streams, interactive Leaflet maps, and rapid UI interaction without server-side rendering latency.

## Decision
We select **React 18 with Vite** and TypeScript.

## Consequences
- **Positive**: Sub-2.0s initial load, instant HMR during development, atomic tree-shaking, lightweight static bundle production (<300KB initial JS).
- **Negative**: Client-side rendering requires proper code splitting and skeleton loading states.
- **Alternatives Rejected**:
  - *Next.js*: Rejected for command dashboard to avoid unnecessary SSR operational overhead.
