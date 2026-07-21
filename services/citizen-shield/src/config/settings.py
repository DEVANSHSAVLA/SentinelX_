import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "SentinelX Citizen Shield Service"
    version: str = "1.0.0"
    environment: str = os.getenv("ENVIRONMENT", "production")

settings = Settings()
