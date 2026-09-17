from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from app.services.ner_extractor import ner_extractor
from app.services.graph_engine import graph_engine
from app.data.schema import FIRIngestRequest

router = APIRouter()

@router.post("/fir-text")
def ingest_fir_text(payload: FIRIngestRequest):
    extracted = ner_extractor.extract_entities(
        fir_text=payload.raw_text,
        fir_meta={
            "fir_number": payload.fir_number,
            "police_station": payload.police_station,
            "date": payload.date
        }
    )
    
    # Automatically add newly parsed nodes and edges to live graph
    for n in extracted["generated_nodes"]:
        graph_engine.add_node(n)
    for e in extracted["generated_edges"]:
        graph_engine.add_edge(e)

    return {
        "status": "SUCCESS",
        "message": f"Successfully parsed FIR {payload.fir_number} and synthesized into Knowledge Graph.",
        "extracted_data": extracted,
        "updated_graph_summary": graph_engine.calculate_graph_analytics()["summary"]
    }

@router.post("/upload-document")
async def upload_document(file: UploadFile = File(...), fir_number: Optional[str] = Form("FIR-2026-AUTO")):
    content = await file.read()
    try:
        text = content.decode("utf-8")
    except Exception:
        text = content.decode("latin-1", errors="ignore")

    extracted = ner_extractor.extract_entities(fir_text=text, fir_meta={"fir_number": fir_number})

    for n in extracted["generated_nodes"]:
        graph_engine.add_node(n)
    for e in extracted["generated_edges"]:
        graph_engine.add_edge(e)

    return {
        "status": "SUCCESS",
        "filename": file.filename,
        "extracted_data": extracted
    }
