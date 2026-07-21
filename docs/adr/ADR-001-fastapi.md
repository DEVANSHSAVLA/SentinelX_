# ADR-001: FastAPI over Django/Flask for ASGI Microservices

## Status
Accepted

## Context
SentinelX microservices require high asynchronous I/O performance to handle multi-modal threat analysis (NLP transcript parsing, OpenCV currency note scan processing, Neo4j graph traversals) while automatically generating OpenAPI specs for API gateway proxy contracts.

## Decision
We select **FastAPI (Python 3.11)** for all backend microservices.

## Consequences
- **Positive**: High throughput via ASGI (Uvicorn), automatic OpenAPI JSON documentation, native Pydantic schema validation, seamless integration with PyTorch/OpenCV/ReportLab.
- **Negative**: Requires explicit clean architecture structuring (adapters/core/application) to avoid single-file `main.py` anti-patterns.
- **Alternatives Rejected**:
  - *Django*: Rejected due to heavy synchronous ORM overhead and unneeded admin portal.
  - *Flask*: Rejected due to synchronous execution bottlenecks under concurrent WebSocket streams.
