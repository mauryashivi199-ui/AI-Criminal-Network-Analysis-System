from fastapi import APIRouter
from app.api.endpoints import graph, analytics, ingestion, copilot, geospatial, dossier

api_router = APIRouter()
api_router.include_router(graph.router, prefix="/graph", tags=["Graph & Knowledge Base"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Forensic Analytics"])
api_router.include_router(ingestion.router, prefix="/ingestion", tags=["Data Ingestion & Extraction"])
api_router.include_router(copilot.router, prefix="/copilot", tags=["AI Copilot"])
api_router.include_router(geospatial.router, prefix="/geospatial", tags=["Geospatial Intelligence"])
api_router.include_router(dossier.router, prefix="/dossier", tags=["Court Dossier Generator"])
