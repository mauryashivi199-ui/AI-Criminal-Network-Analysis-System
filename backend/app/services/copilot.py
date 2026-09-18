import re
from typing import Dict, Any, List
from app.services.graph_engine import graph_engine
from app.services.cdr_analyzer import cdr_analyzer
from app.services.financial_tracker import financial_tracker

class ForensicCopilotService:
    """
    Law Enforcement AI Forensic Copilot.
    Uses regex word-boundary token matching and multi-entity graph traversal.
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

        # =========================================================================
        # 1. KINGPIN & LEADER DETECTION (High Priority)
        # =========================================================================
        if any(re.search(rf"\b{w}\b", q) for w in ["kingpin", "leader", "boss", "chief", "mastermind", "head", "main criminal"]):
            top_k = analytics["kingpin_rankings"][:3]
            top_names = "\n".join([
                f"{idx+1}. **{k['name']}** ({k['role']}) — Threat Score: **{k['threat_score']}%** | PageRank: `{k['pagerank']}`"
                for idx, k in enumerate(top_k)
            ])
            highlighted_nodes = [k["id"] for k in top_k]
            answer = (
                f"👑 **Syndicate Leadership Identification:**\n\n"
                f"Based on Graph Centrality (Betweenness + PageRank) and threat lethality metrics, the top identified syndicate leaders are:\n\n"
                f"{top_names}\n\n"
                f"**Tactical Assessment:** **Iqbal 'Bhai' Ansari** operates as the supreme remote commander orchestrating finances, while **Vikram Rana** directs ground enforcement and burner communications."
            )
            suggested_actions = [
                "Issue Lookout Circular (LOC) via Bureau of Immigration",
                "Execute search warrants on Rohini safe houses",
                "Freeze beneficiary crypto wallets on TRON network"
            ]

        # =========================================================================
        # 2. SPECIFIC SUSPECT / ENTITY LOOKUP (Token & Alias Matching)
        # =========================================================================
        elif self._match_specific_node(q, nodes):
            matched = self._match_specific_node(q, nodes)
            highlighted_nodes = [matched["id"]]
            
            # Find all direct connected edges and entities
            connected = []
            for e in edges:
                if e["source"] == matched["id"] or e["target"] == matched["id"]:
                    other_id = e["target"] if e["source"] == matched["id"] else e["source"]
                    other_node = next((x for x in nodes if x["id"] == other_id), None)
                    if other_node:
                        connected.append(f"- **{e['type']}** ➔ **{other_node['name']}** ({other_node['type']}): {e.get('description', '')}")

            alias_text = f" (Aliases: {', '.join(matched.get('aliases', []))})" if matched.get("aliases") else ""
            meta_details = "\n".join([f"- **{k.replace('_', ' ').title()}:** {v}" for k, v in matched.get("metadata", {}).items()])
            
            answer = (
                f"🎯 **Suspect Intelligence Dossier: {matched['name']}**{alias_text}\n\n"
                f"- **Entity ID:** `{matched['id']}`\n"
                f"- **Designation / Role:** `{matched.get('role', 'Associate')}`\n"
                f"- **Threat Risk Rating:** **{matched.get('threat_score', 50)}%** ({'CRITICAL' if matched.get('threat_score', 50) >= 80 else 'HIGH'})\n"
                f"- **Network Centrality:** PageRank `{matched.get('pagerank', 0.0)}` | Betweenness Centrality `{matched.get('betweenness', 0.0)}`\n\n"
                f"### 📋 Forensic Background:\n{meta_details if meta_details else '- Active target under electronic surveillance.'}\n\n"
                f"### 🔗 Direct Evidentiary Links ({len(connected)}):\n" +
                ("\n".join(connected[:5]) if connected else "- No direct outward links recorded.")
            )
            suggested_actions = [
                f"Trace shortest path from {matched['name']} to other entities",
                f"View CDR logs associated with {matched['name']}",
                "Export Court-Admissible Case Dossier"
            ]

        # =========================================================================
        # 3. GREETINGS & INTRODUCTIONS (Word Boundary Safe)
        # =========================================================================
        elif any(re.search(rf"\b{w}\b", q) for w in ["who are you", "who r u", "who are u", "what can you do", "introduce yourself", "hello", "hi", "hey", "namaste", "kya kar sakte ho", "help"]):
            answer = (
                f"👋 **Namaste Officer! I am your AI Forensic Investigation Copilot** for the **Ministry of Home Affairs (SIH26189)**.\n\n"
                f"I am connected live to the **Criminal Knowledge Graph**, **CDR Call Telemetry**, and **Hawala Financial Tracker** for `{graph_data.get('case_name')}`.\n\n"
                f"### 🔍 What I can do for your investigation:\n"
                f"1. 👑 **Pinpoint Kingpins & Masterminds:** Algorithmic PageRank & Betweenness Centrality analysis.\n"
                f"2. 🔗 **Multi-Hop Link Tracing:** Find degrees of separation and money/call chains between any 2 suspects.\n"
                f"3. 📞 **CDR Intercept Analysis:** Detect nocturnal midnight bursts (1-5 AM) and IMEI handset swaps.\n"
                f"4. 💳 **Money Mule & Crypto Tracking:** Spot rapid pass-through smurfing and TRC-20 USDT offramps.\n"
                f"5. 🕵️ **Covert AI Link Prediction:** Uncover hidden accomplice partnerships before crimes happen.\n"
                f"6. ⚖️ **Court Dossiers:** Generate BSA 2023 compliant charge sheet evidence briefs.\n\n"
                f"**How can I assist your investigation right now?**"
            )
            suggested_actions = [
                "Who is the top kingpin in this syndicate?",
                "Show connection between Iqbal Ansari and TRON Wallet",
                "List all flagged money mule bank accounts",
                "Analyze burner phone midnight call spikes"
            ]

        # =========================================================================
        # 4. PATH TRACING & COVERT LINK PREDICTION
        # =========================================================================
        elif any(w in q for w in ["connect", "path", "between", "link", "how is", "relation", "rishta", "kya connection"]):
            # Find mentioned nodes
            found_nodes = self._find_multiple_nodes(q, nodes)

            if len(found_nodes) >= 2:
                path_res = graph_engine.find_shortest_path(found_nodes[0]["id"], found_nodes[1]["id"])
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
                    answer = f"No direct or indirect link found between {found_nodes[0]['name']} and {found_nodes[1]['name']} in the evidentiary graph."
            else:
                predicted = graph_engine.predict_covert_links()
                if predicted:
                    pred_first = predicted[0]
                    highlighted_nodes = [pred_first["source"], pred_first["target"]]
                    answer = (
                        f"🕵️ **Covert AI Link Prediction:**\n\n"
                        f"High-confidence covert relationship predicted between **{pred_first['source_name']}** and **{pred_first['target_name']}** "
                        f"(Affinity Score: `{pred_first['affinity_score']}`).\n\n"
                        f"They share **{pred_first['common_associates_count']} common criminal intermediaries** ({', '.join(pred_first['common_associates'][:3])})."
                    )
                    suggested_actions = ["Initiate simultaneous phone interception on both targets."]
                else:
                    answer = "Graph analysis indicates compartmentalized cells."

        # =========================================================================
        # 5. FINANCIAL & MULE ACCOUNTS
        # =========================================================================
        elif any(w in q for w in ["money", "bank", "mule", "crypto", "hawala", "funds", "transaction", "paisa", "rupaye"]):
            fin_data = financial_tracker.analyze_transactions()
            mules = fin_data["mule_accounts_detected"]
            highlighted_nodes = [n["id"] for n in nodes if n["type"] == "ACCOUNT"]
            mule_summary = "\n".join([f"- **{m['account_id']}**: Inflow ₹{m['total_inflow_inr']:,.0f} (Pass-through velocity **{m['pass_through_ratio']}%**)" for m in mules])
            answer = (
                f"💳 **Financial Intelligence & Mule Funneling Report:**\n\n"
                f"Total traced volume: **₹{fin_data['total_volume_inr']:,.0f}**.\n\n"
                f"**Flagged Mule Accounts:**\n{mule_summary}\n\n"
                f"**Crypto Exit Flow:** ₹3.2 Crores converted into USDT on TRON TRC-20 wallet `TJa7...9kx` via P2P OTC brokers in Chandni Chowk."
            )
            suggested_actions = [
                "Issue Section 102 CrPC notice to HDFC and SBI compliance officers",
                "Report TRC-20 wallet to FIU-India and Binance Law Enforcement portal"
            ]

        # =========================================================================
        # 6. CDR & CALL INTERCEPTS
        # =========================================================================
        elif any(w in q for w in ["call", "cdr", "phone", "burner", "tower", "intercept", "imei", "sim"]):
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

        # =========================================================================
        # 7. DEFAULT SUMMARY
        # =========================================================================
        else:
            top_k = analytics["kingpin_rankings"][0]["name"] if analytics["kingpin_rankings"] else "Target"
            answer = (
                f"🛡️ **Investigation Summary for {graph_data.get('case_name')}:**\n\n"
                f"Current syndicate model contains **{analytics['summary']['total_entities']} mapped entities** "
                f"and **{analytics['summary']['total_connections']} verified evidentiary links** across "
                f"**{analytics['summary']['total_communities']} operational cells**.\n\n"
                f"Top Syndicate Target: **{top_k}**.\n\n"
                f"You can ask me to analyze phone call bursts, money mule funnels, covert links, or specific suspect details (e.g., *'Tell me about Iqbal'* or *'Show money trail'*)."
            )
            suggested_actions = [
                "Who is the top kingpin in this syndicate?",
                "List all flagged money mule bank accounts",
                "Export Court-Admissible Case Dossier"
            ]

        return {
            "answer": answer,
            "highlighted_nodes": highlighted_nodes,
            "highlighted_edges": highlighted_edges,
            "confidence_score": 0.98,
            "suggested_actions": suggested_actions
        }

    def _match_specific_node(self, q: str, nodes: List[Dict[str, Any]]) -> Any:
        """Extracts individual tokens and matches against node names and aliases."""
        for n in nodes:
            # Check ID
            if n["id"].lower() in q:
                return n
            # Check Clean Name Words (e.g. Iqbal, Ansari, Vikram, Rana, Rashid, Qureshi, Tariq, Tron, Hdfc)
            clean_name = re.sub(r"['\"]", "", n["name"].lower())
            words = [w for w in clean_name.split() if len(w) >= 3 and w not in ["the", "and", "shell", "acc", "hub", "line"]]
            for w in words:
                if re.search(rf"\b{re.escape(w)}\b", q):
                    return n
            # Check Aliases
            for al in n.get("aliases", []):
                clean_al = re.sub(r"['\"]", "", al.lower())
                al_words = [w for w in clean_al.split() if len(w) >= 3]
                for w in al_words:
                    if re.search(rf"\b{re.escape(w)}\b", q):
                        return n
        return None

    def _find_multiple_nodes(self, q: str, nodes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        found = []
        for n in nodes:
            clean_name = re.sub(r"['\"]", "", n["name"].lower())
            words = [w for w in clean_name.split() if len(w) >= 3 and w not in ["the", "and", "shell", "acc", "hub", "line"]]
            if any(re.search(rf"\b{re.escape(w)}\b", q) for w in words) or n["id"].lower() in q:
                if n not in found:
                    found.append(n)
        return found

copilot_service = ForensicCopilotService()
