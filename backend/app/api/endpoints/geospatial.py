from fastapi import APIRouter
from app.services.graph_engine import graph_engine

router = APIRouter()

@router.get("/hotspots")
def get_geo_hotspots():
    graph_data = graph_engine.get_full_graph()
    geo_nodes = []
    for n in graph_data["nodes"]:
        if n.get("lat") and n.get("lng"):
            geo_nodes.append({
                "id": n["id"],
                "name": n["name"],
                "type": n["type"],
                "role": n.get("role"),
                "threat_score": n.get("threat_score"),
                "lat": n["lat"],
                "lng": n["lng"],
                "metadata": n.get("metadata", {})
            })

    return {
        "case_id": graph_data.get("case_id"),
        "geo_entities": geo_nodes,
        "total_geo_points": len(geo_nodes)
    }
