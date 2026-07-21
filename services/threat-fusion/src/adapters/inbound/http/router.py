from typing import List, Optional
from fastapi import APIRouter
from pydantic import BaseModel, Field
from src.core.services.fusion_service import fusion_service, ThreatEvaluateRequestDTO, ThreatEvaluateResponseDTO

router = APIRouter()

class GeoEventRequestDTO(BaseModel):
    incident_type: str = Field(..., example="DIGITAL_ARREST")
    latitude: float = Field(..., example=19.0760)
    longitude: float = Field(..., example=72.8777)
    risk_score: float = Field(0.0, ge=0.0, le=1.0)
    description: Optional[str] = None

class GeoEventResponseDTO(BaseModel):
    status: str
    event_id: str

@router.post("/threat/evaluate", response_model=ThreatEvaluateResponseDTO)
def evaluate_threat(payload: ThreatEvaluateRequestDTO):
    return fusion_service.evaluate_threat(payload)

@router.get("/geo/hotspots")
def get_geo_hotspots():
    features = [
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [72.8777, 19.0760]}, "properties": {"incidentType": "DIGITAL_ARREST", "riskScore": 0.94, "description": "Bandra East Call Centroid", "isHotspot": True}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [72.8347, 18.9220]}, "properties": {"incidentType": "COUNTERFEIT", "riskScore": 0.88, "description": "Colaba Retailer Scan Node", "isHotspot": True}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [72.9781, 19.2183]}, "properties": {"incidentType": "FRAUD_NETWORK", "riskScore": 0.96, "description": "Thane ATM Cash Out Group", "isHotspot": True}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [77.2090, 28.6139]}, "properties": {"incidentType": "DIGITAL_ARREST", "riskScore": 0.91, "description": "ED Impersonation Centroid", "isHotspot": True}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [77.3910, 28.5355]}, "properties": {"incidentType": "COUNTERFEIT", "riskScore": 0.95, "description": "Noida Sec 62 Retail Node", "isHotspot": True}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [88.3639, 22.5726]}, "properties": {"incidentType": "FRAUD_NETWORK", "riskScore": 0.98, "description": "Mule Bank Registry", "isHotspot": True}},
    ]
    return {"type": "FeatureCollection", "features": features}

@router.post("/geo/events", response_model=GeoEventResponseDTO)
def create_geo_event(payload: GeoEventRequestDTO):
    return GeoEventResponseDTO(status="SUCCESS", event_id="evt-mock-001")
