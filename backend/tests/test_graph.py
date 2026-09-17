import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services.graph_engine import graph_engine
from app.services.ner_extractor import ner_extractor
from app.services.cdr_analyzer import cdr_analyzer
from app.services.financial_tracker import financial_tracker
from app.services.copilot import copilot_service
from app.services.dossier_generator import dossier_generator

def test_graph_initialization():
    graph_engine.load_dataset("operation_garuda")
    data = graph_engine.get_full_graph()
    assert len(data["nodes"]) >= 10, "Nodes count should be >= 10"
    assert len(data["edges"]) >= 10, "Edges count should be >= 10"
    assert data["case_id"] == "CASE-MHA-2026-089"
    print("[PASS] test_graph_initialization passed")

def test_centrality_and_kingpins():
    analytics = graph_engine.calculate_graph_analytics()
    rankings = analytics["kingpin_rankings"]
    assert len(rankings) > 0, "Rankings should not be empty"
    top_names = [r["name"] for r in rankings[:3]]
    print(f"Top 3 ranked targets: {top_names}")
    assert any("Ansari" in n or "Rana" in n for n in top_names)
    assert rankings[0]["pagerank"] > 0
    assert rankings[0]["betweenness"] >= 0
    print("[PASS] test_centrality_and_kingpins passed")

def test_shortest_path():
    res = graph_engine.find_shortest_path("SUSP-001", "SUSP-004")
    assert res["found"] is True, "Shortest path should be found"
    assert res["degrees_of_separation"] >= 1
    assert "SUSP-001" in res["path_node_ids"]
    assert "SUSP-004" in res["path_node_ids"]
    print("[PASS] test_shortest_path passed")

def test_ner_extractor():
    sample_text = "Accused Vikram Rana was arrested in Rohini with phone +91-9811099221 and vehicle DL-1CA-8899 under NDPS Sec 21."
    extracted = ner_extractor.extract_entities(sample_text, {"fir_number": "FIR-TEST-01"})
    assert len(extracted["extracted_phones"]) >= 1
    assert len(extracted["extracted_vehicles"]) >= 1
    assert len(extracted["generated_nodes"]) >= 2
    print("[PASS] test_ner_extractor passed")

def test_cdr_analyzer():
    cdr = cdr_analyzer.analyze_cdr_records()
    assert cdr["total_records_analyzed"] > 0
    assert len(cdr["top_calling_pairs"]) > 0
    assert len(cdr["hourly_distribution"]) == 24
    print("[PASS] test_cdr_analyzer passed")

def test_financial_tracker():
    fin = financial_tracker.analyze_transactions()
    assert fin["total_transactions"] > 0
    assert len(fin["mule_accounts_detected"]) > 0
    print("[PASS] test_financial_tracker passed")

def test_copilot_queries():
    resp1 = copilot_service.process_investigator_query("Who is the top kingpin?")
    assert len(resp1["suggested_actions"]) > 0
    print("[PASS] test_copilot_queries passed")

def test_dossier_generator():
    dossier = dossier_generator.generate_dossier()
    assert "MHA-DOSSIER" in dossier["dossier_id"]
    assert len(dossier["primary_targets"]) > 0
    assert len(dossier["recommended_legal_charges"]) > 0
    print("[PASS] test_dossier_generator passed")

if __name__ == "__main__":
    test_graph_initialization()
    test_centrality_and_kingpins()
    test_shortest_path()
    test_ner_extractor()
    test_cdr_analyzer()
    test_financial_tracker()
    test_copilot_queries()
    test_dossier_generator()
    print("\n>>> ALL 8 BACKEND INTEGRATION TESTS PASSED SUCCESSFULLY! <<<")
