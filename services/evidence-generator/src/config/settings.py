import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "SentinelX Digital Evidence Package Generator"
    version: str = "1.0.0"
    reports_dir: str = os.getenv("REPORTS_DIR", "./reports")

settings = Settings()
