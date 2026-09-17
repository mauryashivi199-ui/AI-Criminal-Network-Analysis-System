from typing import Dict, Any

class SuspectThreatScorer:
    """
    Law Enforcement Lethality & Threat Risk Assessment Engine.
    Combines criminal history, graph centrality, international links, and weapon involvement.
    """

    def calculate_suspect_risk(self, suspect_data: Dict[str, Any], centrality_metrics: Dict[str, float] = None) -> Dict[str, Any]:
        centrality_metrics = centrality_metrics or {}
        
        base_threat = suspect_data.get("threat_score", 50.0)
        fir_count = suspect_data.get("metadata", {}).get("firs_count", 1)
        flight_risk = suspect_data.get("metadata", {}).get("flight_risk", "LOW")
        betweenness = centrality_metrics.get("betweenness", 0.0)

        # Dynamic adjustments
        fir_factor = min(fir_count * 2.5, 20.0)
        flight_factor = 15.0 if flight_risk == "VERY HIGH" else (10.0 if flight_risk == "HIGH" else 0.0)
        centrality_factor = betweenness * 25.0

        final_score = min(round(base_threat + fir_factor + flight_factor + centrality_factor, 1), 99.9)

        if final_score >= 85.0:
            category = "CRITICAL / TIER-1 KINGPIN"
            action = "Immediate Lookout Circular (LOC) & Non-Bailable Arrest Warrant"
        elif final_score >= 70.0:
            category = "HIGH RISK / KEY LIEUTENANT"
            action = "24x7 Physical & Electronic Surveillance"
        else:
            category = "MODERATE / FOOT SOLDIER / MULE"
            action = "Bank Account Freezing & Interrogation"

        return {
            "suspect_id": suspect_data.get("id"),
            "name": suspect_data.get("name"),
            "calculated_score": final_score,
            "category": category,
            "recommended_action": action,
            "risk_factors": {
                "base_score": base_threat,
                "fir_history_impact": fir_factor,
                "flight_risk_impact": flight_factor,
                "graph_centrality_impact": round(centrality_factor, 1)
            }
        }

threat_scorer = SuspectThreatScorer()
