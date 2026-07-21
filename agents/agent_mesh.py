import logging
from typing import Dict, Any
from agents.core.domain.mesh_models import IncidentPayloadDTO, MeshExecutionResultDTO
from agents.core.services.mesh_orchestrator import agent_mesh_orchestrator

logging.basicConfig(level=logging.INFO, format="[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s")
logger = logging.getLogger("sentinelx-12agent-mesh-entrypoint")

def run_12_agent_mesh_pipeline(payload_dict: Dict[str, Any]) -> MeshExecutionResultDTO:
    logger.info("Triggering 12-Agent Autonomous Defense Mesh Pipeline")
    dto = IncidentPayloadDTO(**payload_dict)
    return agent_mesh_orchestrator.execute_incident_pipeline(dto)

if __name__ == "__main__":
    sample_incident = {
        "correlation_id": "corr-sample-88219921",
        "caller_number": "+919876500112",
        "transcript_text": "This is CBI officer. There is an arrest warrant against you for narcotics trafficking. Transfer money to verification vault.",
        "seed_account_id": "BA-SBI-1002",
        "reporter_name": "Insp. Rajesh Sharma",
        "language_code": "en"
    }
    result = run_12_agent_mesh_pipeline(sample_incident)
    print("\n--- 12-AGENT MESH EXECUTION RESULT ---")
    print(f"Correlation ID       : {result.correlation_id}")
    print(f"Hazard Level         : {result.hazard_level}")
    print(f"Composite Risk Score : {result.composite_risk_score:.2f}")
    print(f"Directives           : {result.directives}")
    print(f"Evidence PDF Hash    : {result.evidence_sha256}")
    print(f"Agents Executed      : {result.agent_telemetry.get('active_agents_count')} Agents Synchronized")
