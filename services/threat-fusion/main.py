import logging
from fastapi import FastAPI
from src.config.settings import settings
from src.adapters.inbound.http.router import router as api_router

logging.basicConfig(level=logging.INFO, format="[%(asctime)s] [%(levelname)s] %(message)s")
logger = logging.getLogger("sentinelx-threat-fusion")

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="SentinelX Threat Fusion & Geospatial Engine"
)

app.include_router(api_router)

@app.get("/health/liveness")
def liveness():
    return {"status": "UP", "service": "sentinelx-threat-fusion", "check": "liveness"}

@app.get("/health/readiness")
def readiness():
    return {"status": "UP", "service": "sentinelx-threat-fusion", "check": "readiness"}

@app.get("/health")
def health():
    return {"status": "UP", "service": "sentinelx-threat-fusion"}
