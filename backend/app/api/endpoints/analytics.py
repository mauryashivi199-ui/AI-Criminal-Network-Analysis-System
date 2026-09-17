from fastapi import APIRouter
from app.services.graph_engine import graph_engine
from app.services.cdr_analyzer import cdr_analyzer
from app.services.financial_tracker import financial_tracker

router = APIRouter()

@router.get("/overview")
def get_analytics_overview():
    return graph_engine.calculate_graph_analytics()

@router.get("/kingpins")
def get_kingpin_rankings():
    res = graph_engine.calculate_graph_analytics()
    return {"kingpin_rankings": res.get("kingpin_rankings", [])}

@router.get("/cdr")
def get_cdr_analytics():
    return cdr_analyzer.analyze_cdr_records()

@router.get("/financial")
def get_financial_analytics():
    return financial_tracker.analyze_transactions()
