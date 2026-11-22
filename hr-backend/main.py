from fastapi import FastAPI

from src.api.health import router as health_router
from src.api.router import router as api_router

app = FastAPI()
app.include_router(health_router)
app.include_router(api_router)
