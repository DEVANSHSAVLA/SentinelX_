from fastapi import APIRouter
from src.core.services.fraud_graph_service import fraud_graph_service, AnalyseNetworkRequestDTO, FraudAnalysisResponseDTO

router = APIRouter()

@router.post("/graph/analyse", response_model=FraudAnalysisResponseDTO)
def analyse_graph(payload: AnalyseNetworkRequestDTO):
    return fraud_graph_service.analyse_graph(payload)
