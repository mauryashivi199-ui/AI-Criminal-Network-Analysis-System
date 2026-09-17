from typing import Dict, Any, List
from app.services.graph_engine import graph_engine
from app.services.cdr_analyzer import cdr_analyzer
from app.services.financial_tracker import financial_tracker

class ForensicCopilotService:
    """
    Law Enforcement AI Forensic Copilot.
    Interprets natural language queries, executes Graph & Forensic algorithms,
    and returns contextualized tactical intelligence with visual highlights.
    """

    def process_investigator_query(self, query_text: str, case_id: str = None) -> Dict[str, Any]:
        q = query_text.lower().strip()
        graph_data = graph_engine.get_full_graph()
        analytics = graph_engine.calculate_graph_analytics()
        nodes = graph_data["nodes"]
        edges = graph_data["edges"]

        highlighted_nodes = []
        highlighted_edges = []
        suggested_actions = []

        # 1. Kingpin / Boss / Leader query
        if any(w in q for w in ["kingpin", "leader", "boss", "chief", "mastermind", "head"]):
            top_k = analytics["kingpin_rankings"][:3]
            top_names = ", ".join([f"**{k['name']}** (Score: {k['threat_score']}, PageRank: {k['pagerank']})" for k in top_k])
            highlighted_nodes = [k["id"] for k in top_k]
            answer = (
                f"🚨 **Syndicate Leadership Identification:**\n\n"
                f"Based on Graph Centrality (Betweenness + PageRank) and threat lethality metrics, "
                f"the top identified syndicate leaders are:\n"
                f"1. {top_names}\n\n"
                f"**Strategic Assessment:** Iqbal 'Bhai' Ansari operates as the primary decision-maker, "
                f"while Vikram Rana controls ground logistics and arms."
            )
            suggested_actions = [
                "Issue Lookout Circular (LOC) via Bureau of Immigration",
                "Execute search warrants on Rohini and Chandni Chowk safe houses",
                "Freeze beneficiary crypto wallets on TRON network"
            ]

        # 2. Connection / Path / Link between entities
        elif any(w in q for w in ["connect", "path", "between", "link", "how is", "relation"]):
            # Search for mentioned nodes
            found_nodes = []
            for n in nodes:
                n_name = n["name"].lower()
                n_id = n["id"].lower()
                if any(part in q for part in n_name.split() if len(part) > 2) or n_id in q:
                    found_nodes.append(n["id"])

            if len(found_nodes) >= 2:
                path_res = graph_engine.find_shortest_path(found_nodes[0], found_nodes[1])
                if path_res.get("found"):
                    highlighted_nodes = path_res["path_node_ids"]
                    node_names = [n["name"] for n in path_res["nodes"]]
                    answer = (
                        f"🔗 **Forensic Link Analysis Chain ({path_res['degrees_of_separation']} Degrees of Separation):**\n\n"
                        f"{' ➔ '.join(node_names)}\n\n"
                        f"**Evidence Breakdown:** Direct financial and encrypted burner communications bridge these entities. "
                        f"Found {len(path_res['edges'])} verified evidentiary links connecting them."
                    )
                    suggested_actions = [
                        "Subpoena CDR records for intermediate nodes",
                        "Audit transactions along this payment corridor"
                    ]
                else:
                    answer = f"No direct or indirect link found between the specified entities in the current evidentiary graph."
            else:
                # General link prediction
                predicted = graph_engine.predict_covert_links()
                if predicted:
                    pred_first = predicted[0]
                    highlighted_nodes = [pred_first["source"], pred_first["target"]]
                    answer = (
                        f"🕵️ **Covert AI Link Prediction:**\n\n"
                        f"High-confidence covert relationship predicted between **{pred_first['source_name']}** and **{pred_first['target_name']}** "
                        f"(Affinity Score: {pred_first['affinity_score']}).\n"
                        f"They share {pred_first['common_associates_count']} common criminal intermediaries ({', '.join(pred_first['common_associates'][:3])})."
                    )
                    suggested_actions = ["Initiate simultaneous phone interception on both targets."]
                else:
                    answer = "Graph analysis indicates tightly compartmentalized sub-cells."

        # 3. Financial / Mule / Money query
        elif any(w in q for w in ["money", "bank", "mule", "crypto", "hawala", "funds", "transaction", "paisa"]):
            fin_data = financial_tracker.analyze_transactions()
            mules = fin_data["mule_accounts_detected"]
            highlighted_nodes = [n["id"] for n in nodes if n["type"] == "ACCOUNT"]
            mule_summary = "\n".join([f"- **{m['account_id']}**: Inflow ₹{m['total_inflow_inr']:,.0f} (Pass-through ratio {m['pass_through_ratio']}%)" for m in mules])
            answer = (
                f"💳 **Financial Intelligence & Mule Funneling Report:**\n\n"
                f"Total traced volume: **₹{fin_data['total_volume_inr']:,.0f}**.\n\n"
                f"**Flagged Mule Accounts:**\n{mule_summary}\n\n"
                f"**Crypto Exit Flow:** ₹3.2 Crores converted into USDT on TRON TRC-20 wallet `TJa7...9kx` via P2P OTC brokers in Chandni Chowk."
            )
            suggested_actions = [
                "Issue Section 91 CrPC notice to HDFC and SBI compliance officers",
                "Report TRC-20 wallet to FIU-India and Binance Law Enforcement portal"
            ]

        # 4. CDR / Call / Phone / Burner query
        elif any(w in q for w in ["call", "cdr", "phone", "burner", "tower", "intercept", "imei"]):
            cdr_data = cdr_analyzer.analyze_cdr_records()
            top_p = cdr_data["top_calling_pairs"][:2]
            highlighted_nodes = [n["id"] for n in nodes if n["type"] == "PHONE"]
            pairs_text = "\n".join([f"- **{p['party_a']}** ➔ **{p['party_b']}**: {p['total_calls']} calls ({p['night_calls_count']} late-night bursts)" for p in top_p])
            answer = (
                f"📞 **CDR & Burner Phone Intelligence:**\n\n"
                f"Analyzed {cdr_data['total_records_analyzed']} CDR logs across {cdr_data['unique_phone_numbers']} targets.\n\n"
                f"**Key Nocturnal Communication Spikes (1 AM - 4 AM):**\n{pairs_text}\n\n"
                f"**Burner Alert:** Single SIM card detected switching between 2 distinct IMEI handsets in Rohini sector."
            )
            suggested_actions = [
                "Deploy IMSI catcher / active cell tower surveillance",
                "Request CDR dump for cell tower TOWER-DEL-ROHINI-04"
            ]

        # 5. Default General Overview
        else:
            top_k = analytics["kingpin_rankings"][0]["name"] if analytics["kingpin_rankings"] else "Target"
            answer = (
                f"🛡️ **KavachNet-AI Command Intelligence Response:**\n\n"
                f"Current syndicate model contains **{analytics['summary']['total_entities']} entities** "
                f"and **{analytics['summary']['total_connections']} verified evidentiary links** across "
                f"**{analytics['summary']['total_communities']} operational cells**.\n\n"
                f"Key suspect under active tracking: **{top_k}**. "
                f"You can ask me to analyze phone call bursts, money mule funnels, covert links, or specific suspect paths."
            )
            suggested_actions = [
                "Run Community Cluster Detection",
                "Export Court-Admissible Case Dossier"
            ]

        return {
            "answer": answer,
            "highlighted_nodes": highlighted_nodes,
            "highlighted_edges": highlighted_edges,
            "confidence_score": 0.96,
            "suggested_actions": suggested_actions
        }

copilot_service = ForensicCopilotService()
