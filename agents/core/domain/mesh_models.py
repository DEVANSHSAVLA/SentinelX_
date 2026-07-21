from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class AgentInput(BaseModel):
    correlation_id: str = Field(..., example="corr-uuid-123")
    metadata: Dict[str, Any] = Field(default_factory=dict)

class IncidentPayloadDTO(BaseModel):
    correlation_id: str
    caller_number: str
    transcript_text: str
    seed_account_id: Optional[str] = None
    currency_image_base64: Optional[str] = None
    claimed_denomination: int = 500
    reporter_name: str = "Anonymous Citizen"
    language_code: str = "en"

class MeshExecutionResultDTO(BaseModel):
    correlation_id: str
    hazard_level: str
    composite_risk_score: float
    is_scam: bool
    is_mule_ring: bool
    is_counterfeit: bool
    evaluated_guardrails: bool
    directives: List[str]
    evidence_pdf_path: Optional[str] = None
    evidence_sha256: Optional[str] = None
    agent_telemetry: Dict[str, Any] = Field(default_factory=dict)
