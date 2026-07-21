# ADR-004: Neo4j Graph Database for Mule Ring Detection

## Status
Accepted

## Context
Tracing money movement across suspect accounts (up to 5-10 hops) to locate mule account rings and execute automated holds requires rapid graph pathfinding.

## Decision
We select **Neo4j 5.x Graph Database** with Cypher query language.

## Consequences
- **Positive**: Sub-50ms execution of 5-hop path discovery, native Graph Data Science (GDS) algorithms (Weakly Connected Components, PageRank).
- **Negative**: Requires separate graph persistence management alongside PostgreSQL.
- **Alternatives Rejected**:
  - *PostgreSQL Recursive CTEs*: Rejected due to exponential performance degradation as hop depth increases.
