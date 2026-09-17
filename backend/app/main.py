from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.api_v1 import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-Powered Criminal Network Analysis System for Ministry of Home Affairs (SIH26189)",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configure CORS for Frontend Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "system": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "sih_code": settings.SIH_PROBLEM_ID,
        "ministry": settings.MINISTRY,
        "status": "OPERATIONAL",
        "docs_url": "/docs"
    }
