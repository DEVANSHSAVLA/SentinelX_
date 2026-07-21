import logging
from typing import List, Tuple
from pydantic import BaseModel, Field

logger = logging.getLogger("sentinelx-threat-fusion")

class ThreatEvaluateRequestDTO(BaseModel):
    scam_linguistic_score: float = Field(..., ge=0.0, le=1.0)
    cli_spoofed: bool
    voice_deepfake_score: float = Field(..., ge=0.0, le=1.0)
    graph_risk_score: float = Field(..., ge=0.0, le=1.0)
    currency_counterfeit_score: float = Field(0.0, ge=0.0, le=1.0)

class ThreatEvaluateResponseDTO(BaseModel):
    composite_threat_score: float
    hazard_level: str
    recommended_mitigations: List[str]
    system_directives: List[str]

class ThreatFusionService:
    def evaluate_threat(self, req: ThreatEvaluateRequestDTO) -> ThreatEvaluateResponseDTO:
        logger.info("Executing threat fusion scoring model pipeline")
        cli_weight = 0.15 if req.cli_spoofed else 0.0
        
        composite = (
            (0.35 * req.scam_linguistic_score) +
            cli_weight +
            (0.25 * req.voice_deepfake_score) +
            (0.25 * req.graph_risk_score)
        )
        composite = min(composite, 1.0)
        
        if req.currency_counterfeit_score > 0.90:
            composite = max(composite, 0.85)

        if composite > 0.85:
            level = "CRITICAL"
            mitigations = [
                "Initiate dynamic blocking of financial portals on target device.",
                "Alert cooperating banks to execute instant transaction holds.",
                "Dispatch court-admissible evidence package file."
            ]
            directives = ["LOCK_BANK_APPS", "TRIGGER_NPCI_HOLD", "DISPATCH_CYBER_UNIT"]
        elif composite > 0.60:
            level = "HIGH"
            mitigations = [
                "Display full-screen alert overlay on citizen device.",
                "Add caller and bank details to regional investigative ledger."
            ]
            directives = ["WARN_CITIZEN", "LOG_THREAT_SIGNATURE"]
        elif composite > 0.30:
            level = "MEDIUM"
            mitigations = ["Recommend citizen blocks caller number and checks official credentials."]
            directives = ["SHOW_ALERT_OVERLAY"]
        else:
            level = "LOW"
            mitigations = ["Normal communication signature verified. No actions required."]
            directives = ["PASS"]

        return ThreatEvaluateResponseDTO(
            composite_threat_score=composite,
            hazard_level=level,
            recommended_mitigations=mitigations,
            system_directives=directives
        )

fusion_service = ThreatFusionService()
