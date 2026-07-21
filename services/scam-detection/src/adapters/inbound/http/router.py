from typing import List, Optional
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel, Field
from src.core.services.scam_service import scam_service, ScamAnalyseDTO, ScamAnalyseResponseDTO
from src.core.domain.engine import calculate_scam_linguistic_score

router = APIRouter()

class TranscriptClassifyRequest(BaseModel):
    text: str = Field(..., example="This is Customs department. Pay clearance fee of 20000 rupees.")

class TranscriptClassifyResponse(BaseModel):
    category: str
    impersonated_official: str
    risk_score: float
    trigger_phrases: List[str]

@router.post("/sessions/analyse", response_model=ScamAnalyseResponseDTO)
def analyse_session(payload: ScamAnalyseDTO):
    return scam_service.analyse_session(payload)

@router.post("/transcripts/classify", response_model=TranscriptClassifyResponse)
def classify_transcript(payload: TranscriptClassifyRequest):
    scam_score, urgency_level, matched_entity, trigger_words = calculate_scam_linguistic_score(payload.text)
    return TranscriptClassifyResponse(
        category="DIGITAL_ARREST" if scam_score > 0.5 else "OTHER",
        impersonated_official=matched_entity,
        risk_score=scam_score,
        trigger_phrases=trigger_words
    )

@router.websocket("/live-session")
async def live_websocket_session(websocket: WebSocket):
    await websocket.accept()
    call_transcript_builder = []
    try:
        while True:
            data = await websocket.receive_json()
            event_type = data.get("event")
            
            if event_type == "audio_chunk":
                transcript_text = data.get("text", "")
                if transcript_text:
                    call_transcript_builder.append(transcript_text)
                    full_text = " ".join(call_transcript_builder)
                    
                    scam_score, urgency_level, matched_entity, _ = calculate_scam_linguistic_score(full_text)
                    
                    if scam_score > 0.70:
                        await websocket.send_json({
                            "event": "threat_alert",
                            "risk_score": scam_score,
                            "urgency": urgency_level,
                            "entity": matched_entity,
                            "directive": "WARN_AND_LOCK"
                        })
                    else:
                        await websocket.send_json({
                            "event": "session_progress",
                            "risk_score": scam_score
                        })
            elif event_type == "hangup":
                break
    except WebSocketDisconnect:
        pass
    finally:
        try:
            await websocket.close()
        except Exception:
            pass
