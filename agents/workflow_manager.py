from agents.core.services.workflow_manager import workflow_manager
from agents.core.domain.mesh_models import IncidentPayloadDTO

def execute_workflow(incident_dict: dict):
    payload = IncidentPayloadDTO(**incident_dict)
    return workflow_manager.start_workflow(payload)
