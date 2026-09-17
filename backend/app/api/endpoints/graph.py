from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.services.graph_engine import graph_engine

router = APIRouter()

@router.get("/")
def get_graph(case_key: Optional[str] = Query("operation_garuda", description="Selected crime case")):
    if case_key != graph_engine.dataset_key:
        graph_engine.load_dataset(case_key)
    return graph_engine.get_full_graph()

@router.get("/switch-dataset/{dataset_key}")
def switch_dataset(dataset_key: str):
    graph_engine.load_dataset(dataset_key)
    return {"message": f"Successfully loaded dataset: {dataset_key}", "graph": graph_engine.get_full_graph()}

@router.get("/shortest-path")
def get_shortest_path(source: str, target: str):
    return graph_engine.find_shortest_path(source, target)

@router.get("/predicted-links")
def get_predicted_links():
    return graph_engine.predict_covert_links()
