from fastapi import APIRouter
from app.services.dossier_generator import dossier_generator

router = APIRouter()

@router.get("/generate")
def generate_dossier():
    return dossier_generator.generate_dossier()
