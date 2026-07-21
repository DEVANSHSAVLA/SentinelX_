import logging
from fastapi import FastAPI
from src.config.settings import settings
from src.adapters.inbound.http.router import router as api_router

logging.basicConfig(level=logging.INFO, format="[%(asctime)s] [%(levelname)s] %(message)s")
logger = logging.getLogger("sentinelx-counterfeit-service")

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="SentinelX Counterfeit Currency Intelligence Service"
)

app.include_router(api_router)

@app.get("/health/liveness")
def liveness():
    return {"status": "UP", "service": "sentinelx-counterfeit-service", "check": "liveness"}

@app.get("/health/readiness")
def readiness():
    return {"status": "UP", "service": "sentinelx-counterfeit-service", "check": "readiness"}

@app.get("/health")
def health():
    return {"status": "UP", "service": "sentinelx-counterfeit-service"}
