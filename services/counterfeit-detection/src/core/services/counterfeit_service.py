import base64
import re
import logging
from typing import List, Optional
from pydantic import BaseModel, Field
from src.core.domain.cv_engine import preprocess_and_verify_note, FailedMarker

logger = logging.getLogger("sentinelx-counterfeit-service")

class CurrencyDetectRequestDTO(BaseModel):
    image_base64: str = Field(..., description="Base64 encoded string of the note image")
    claimed_denomination: int = Field(500, description="Denomination to verify (e.g. 100, 200, 500)")
    device_metadata: Optional[str] = None

class CurrencyDetectResponseDTO(BaseModel):
    is_counterfeit: bool
    confidence: float
    detected_denomination: int
    serial_number: str
    failed_markers: List[FailedMarker]
    cv_pipeline_telemetry: dict

class CounterfeitService:
    def detect_currency(self, payload: CurrencyDetectRequestDTO) -> CurrencyDetectResponseDTO:
        logger.info(f"Counterfeit check invoked for claimed denomination: {payload.claimed_denomination}")
        try:
            header_regex = re.compile(r'^data:image/.+;base64,')
            clean_base64 = header_regex.sub('', payload.image_base64)
            image_bytes = base64.b64decode(clean_base64)
            
            is_counterfeit, confidence, denom, serial, failed, telemetry = preprocess_and_verify_note(
                image_bytes, payload.claimed_denomination
            )
            return CurrencyDetectResponseDTO(
                is_counterfeit=is_counterfeit,
                confidence=confidence,
                detected_denomination=denom,
                serial_number=serial,
                failed_markers=failed,
                cv_pipeline_telemetry=telemetry
            )
        except Exception as e:
            logger.error(f"Detection failed: {str(e)}")
            return CurrencyDetectResponseDTO(
                is_counterfeit=True,
                confidence=0.50,
                detected_denomination=payload.claimed_denomination,
                serial_number="UNKNOWN",
                failed_markers=[FailedMarker(marker_name="image_read_error", details=str(e))],
                cv_pipeline_telemetry={"error": str(e)}
            )

counterfeit_service = CounterfeitService()
