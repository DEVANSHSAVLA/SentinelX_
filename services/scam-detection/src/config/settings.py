import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "SentinelX Scam & Deepfake Detection Service"
    version: str = "1.0.0"
    environment: str = os.getenv("ENVIRONMENT", "production")
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    debug: bool = os.getenv("DEBUG", "False").lower() == "true"

settings = Settings()
