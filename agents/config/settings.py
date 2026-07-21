import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "SentinelX 12-Agent Autonomous Mesh Engine"
    version: str = "2.0.0"
    scam_service_url: str = os.getenv("SCAM_SERVICE_URL", "http://localhost:8001")
    counterfeit_service_url: str = os.getenv("COUNTERFEIT_SERVICE_URL", "http://localhost:8006")
    fraud_graph_url: str = os.getenv("FRAUD_GRAPH_URL", "http://localhost:8002")
    citizen_shield_url: str = os.getenv("CITIZEN_SHIELD_URL", "http://localhost:8003")
    threat_fusion_url: str = os.getenv("THREAT_FUSION_URL", "http://localhost:8004")
    evidence_service_url: str = os.getenv("EVIDENCE_SERVICE_URL", "http://localhost:8005")

settings = Settings()
