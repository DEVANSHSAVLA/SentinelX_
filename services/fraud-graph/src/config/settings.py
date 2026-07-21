import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "SentinelX Fraud Graph Intelligence Service"
    version: str = "1.0.0"
    neo4j_uri: str = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    neo4j_user: str = os.getenv("NEO4J_USER", "neo4j")
    neo4j_password: str = os.getenv("NEO4J_PASSWORD", "password123")

settings = Settings()
