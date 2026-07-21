from fastapi import APIRouter
from src.core.services.counterfeit_service import counterfeit_service, CurrencyDetectRequestDTO, CurrencyDetectResponseDTO

router = APIRouter()

@router.post("/currency/detect", response_model=CurrencyDetectResponseDTO)
def detect_currency(payload: CurrencyDetectRequestDTO):
    return counterfeit_service.detect_currency(payload)

@router.post("/currency/detect/mobile", response_model=CurrencyDetectResponseDTO)
def detect_currency_mobile(payload: CurrencyDetectRequestDTO):
    return counterfeit_service.detect_currency(payload)
