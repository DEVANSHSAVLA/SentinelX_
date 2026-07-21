import logging
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
from src.core.domain.engine import calculate_scam_linguistic_score

logger = logging.getLogger("sentinelx-scam-service")

class ScamAnalyseDTO(BaseModel):
    caller_number: str
    call_transcript: str
    origin_ip: Optional[str] = None
    sip_headers: Optional[Dict[str, str]] = None

class ScamAnalyseResponseDTO(BaseModel):
    scam_score: float
    is_scam: bool
    urgency_level: str
    impersonated_entity: Optional[str]
    cloned_voice_detected: bool
    confidence: float

class ScamService:
    def analyse_session(self, payload: ScamAnalyseDTO) -> ScamAnalyseResponseDTO:
        logger.info(f"Analyzing call session from caller: {payload.caller_number}")
        
        scam_score, urgency_level, matched_entity, _ = calculate_scam_linguistic_score(payload.call_transcript)
        
        cli_spoofed = False
        if payload.sip_headers:
            user_agent = payload.sip_headers.get("user-agent", "").lower()
            if "sip" in user_agent or "asterisk" in user_agent:
                cli_spoofed = True
                
        is_scam = scam_score > 0.65 or cli_spoofed
        cloned_voice_detected = scam_score > 0.80
        confidence_level = max(scam_score, 0.75) if is_scam else 0.90
        
        return ScamAnalyseResponseDTO(
            scam_score=scam_score,
            is_scam=is_scam,
            urgency_level=urgency_level,
            impersonated_entity=matched_entity if is_scam else None,
            cloned_voice_detected=cloned_voice_detected,
            confidence=confidence_level
        )

scam_service = ScamService()
