import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "SentinelX Threat Fusion & Geospatial Engine"
    version: str = "1.0.0"
    database_url: str = os.getenv("DATABASE_URL", "postgresql://postgres:password123@localhost:5432/sentinelx?schema=public")

settings = Settings()
