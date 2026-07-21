from fastapi import APIRouter
from src.core.services.citizen_service import citizen_service, AssessScamRequestDTO, AssessScamResponseDTO

router = APIRouter()

@router.post("/citizen/assess", response_model=AssessScamResponseDTO)
def assess_incident(payload: AssessScamRequestDTO):
    return citizen_service.assess_incident(payload)
