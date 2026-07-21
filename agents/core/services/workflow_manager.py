import logging
import time
from typing import Dict, Any, Optional, List
from pydantic import BaseModel, Field
from agents.core.domain.mesh_models import IncidentPayloadDTO, MeshExecutionResultDTO
from agents.core.services.mesh_orchestrator import agent_mesh_orchestrator

logger = logging.getLogger("sentinelx-workflow-manager")

class WorkflowStateDTO(BaseModel):
    workflow_id: str
    status: str = Field("PENDING", example="PENDING, IN_PROGRESS, COMPLETED, FAILED, RETRYING")
    current_step: str = "INIT"
    attempt_count: int = 0
    max_retries: int = 3
    started_at: float = Field(default_factory=time.time)
    completed_at: Optional[float] = None
    result: Optional[MeshExecutionResultDTO] = None
    error_log: List[str] = Field(default_factory=list)

class WorkflowManager:
    def __init__(self):
        self.state_store: Dict[str, WorkflowStateDTO] = {}

    def start_workflow(self, payload: IncidentPayloadDTO) -> MeshExecutionResultDTO:
        wf_id = f"wf-{payload.correlation_id}"
        logger.info(f"[WorkflowManager] Starting resilient workflow execution: {wf_id}")

        state = WorkflowStateDTO(workflow_id=wf_id, status="IN_PROGRESS", current_step="ORCHESTRATING_MESH")
        self.state_store[wf_id] = state

        for attempt in range(1, state.max_retries + 1):
            state.attempt_count = attempt
            try:
                logger.info(f"[WorkflowManager] Executing mesh pipeline (Attempt {attempt}/{state.max_retries})")
                result = agent_mesh_orchestrator.execute_incident_pipeline(payload)
                
                state.status = "COMPLETED"
                state.current_step = "DONE"
                state.completed_at = time.time()
                state.result = result
                logger.info(f"[WorkflowManager] Workflow {wf_id} completed successfully in {time.time() - state.started_at:.2f}s")
                return result
            except Exception as e:
                err_msg = f"Attempt {attempt} failed: {str(e)}"
                state.error_log.append(err_msg)
                logger.warning(f"[WorkflowManager] {err_msg}")
                if attempt == state.max_retries:
                    state.status = "FAILED"
                    state.current_step = "COMPENSATION_HANDLED"
                    logger.error(f"[WorkflowManager] Executing compensation policy for failed workflow {wf_id}")

        raise RuntimeError(f"Workflow {wf_id} failed after {state.max_retries} attempts.")

workflow_manager = WorkflowManager()
