# ADR-003: Apache Kafka for Asynchronous Event Streaming

## Status
Accepted

## Context
Ingesting high-frequency financial transactions from NPCI rails and telecom call detail records requires durable message queuing with consumer-group backpressure control.

## Decision
We select **Apache Kafka** as the asynchronous event bus.

## Consequences
- **Positive**: High throughput event ingestion, durable log persistence, at-least-once delivery, decoupled consumer groups for fraud tracing, threat consensus, and citizen alerting.
- **Negative**: Requires ZooKeeper/KRaft broker orchestration.
- **Alternatives Rejected**:
  - *Direct REST*: Rejected due to cascading timeouts and lack of backpressure management.
