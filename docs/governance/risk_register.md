# SentinelX Production Risk Register & Governance Matrix

## Risk Assessment Framework
Risks are evaluated on Likelihood (Low, Medium, High) and Impact (Low, Medium, High, Critical).

| Risk ID | Category | Risk Description | Likelihood | Impact | Mitigation Strategy | Rollback Strategy | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | Architecture | Breaking Fraud Graph API contract during microservice refactoring | Medium | High | Consumer-driven contract testing (OpenAPI / Zod validation) & backward compatibility checks | Instantly toggle Feature Flag `ENABLE_V2_GRAPH_API` to false | ACTIVE |
| **RSK-02** | Database | Neo4j query performance degradation under high concurrent transaction load | Low | High | Add graph schema indices on `BankAccount(id)` and query execution timeouts (50ms limit) | Fall back to cached high-risk mule lists in Redis | ACTIVE |
| **RSK-03** | Communication | Latency spike in call transcript WebSocket stream during peak traffic | Medium | Medium | Client-side debounce and audio chunk buffering (200ms windows) | Fall back to REST batch transcript classification | ACTIVE |
| **RSK-04** | Desktop Packaging| Desktop build failure on non-Windows target platform | Low | Medium | CI/CD GitHub Actions multi-matrix runners for Windows, macOS, Linux | Revert to Web PWA distribution model | ACTIVE |
| **RSK-05** | Security | Secret leakage or hardcoded JWT credentials in repository source | Low | Critical | Automated Trivy secret scan, HashiCorp Vault key rotation | Immediate key invalidation & emergency secret rotation | MITIGATED |
