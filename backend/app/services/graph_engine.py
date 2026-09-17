import networkx as nx
from typing import Dict, List, Any, Optional, Tuple
from app.data.schema import NodeModel, EdgeModel, GraphData, NodeType, EdgeType
from app.data.sample_datasets import DATASETS

class CriminalGraphEngine:
    def __init__(self, initial_dataset_key: str = "operation_garuda"):
        self.dataset_key = initial_dataset_key
        self.nx_graph = nx.Graph()
        self.node_store: Dict[str, Dict[str, Any]] = {}
        self.edge_store: List[Dict[str, Any]] = []
        self.load_dataset(initial_dataset_key)

    def load_dataset(self, dataset_key: str):
        if dataset_key not in DATASETS:
            dataset_key = "operation_garuda"
        self.dataset_key = dataset_key
        dataset = DATASETS[dataset_key]
        
        self.nx_graph = nx.Graph()
        self.node_store = {}
        self.edge_store = []

        for node in dataset["nodes"]:
            self.add_node(node)

        for edge in dataset["edges"]:
            self.add_edge(edge)

    def add_node(self, node: Dict[str, Any]):
        node_id = node["id"]
        self.node_store[node_id] = node
        self.nx_graph.add_node(
            node_id,
            name=node["name"],
            type=node["type"],
            role=node.get("role", "Associate"),
            threat_score=node.get("threat_score", 50.0),
            lat=node.get("lat"),
            lng=node.get("lng"),
            metadata=node.get("metadata", {})
        )

    def add_edge(self, edge: Dict[str, Any]):
        u = edge["source"]
        v = edge["target"]
        self.edge_store.append(edge)
        self.nx_graph.add_edge(
            u, v,
            type=edge.get("type", "ASSOCIATED_WITH"),
            weight=float(edge.get("weight", 1.0)),
            evidence_count=int(edge.get("evidence_count", 1)),
            description=edge.get("description", "")
        )

    def get_full_graph(self) -> Dict[str, Any]:
        """Returns nodes and edges formatted for frontend Cytoscape visualization."""
        analytics = self.calculate_graph_analytics()
        
        formatted_nodes = []
        for n_id, n_data in self.node_store.items():
            metrics = analytics["node_metrics"].get(n_id, {})
            formatted_nodes.append({
                **n_data,
                "degree": metrics.get("degree", 0),
                "betweenness": metrics.get("betweenness", 0.0),
                "pagerank": metrics.get("pagerank", 0.0),
                "community_id": metrics.get("community_id", 0)
            })

        return {
            "case_id": DATASETS.get(self.dataset_key, {}).get("case_id", "CASE-MHA"),
            "case_name": DATASETS.get(self.dataset_key, {}).get("case_name", "Criminal Network Investigation"),
            "threat_level": DATASETS.get(self.dataset_key, {}).get("threat_level", "HIGH"),
            "nodes": formatted_nodes,
            "edges": self.edge_store,
            "summary_metrics": analytics["summary"]
        }

    def calculate_graph_analytics(self) -> Dict[str, Any]:
        """Computes Betweenness Centrality, PageRank, Degree, and Louvain Community Detection."""
        if len(self.nx_graph) == 0:
            return {"node_metrics": {}, "summary": {}, "kingpin_rankings": []}

        degrees = dict(self.nx_graph.degree())
        
        # Betweenness Centrality identifies Key Brokers and Intermediaries
        try:
            betweenness = nx.betweenness_centrality(self.nx_graph, weight="weight")
        except Exception:
            betweenness = {n: 0.0 for n in self.nx_graph.nodes()}

        # PageRank identifies Kingpins with high structural influence
        try:
            pagerank = nx.pagerank(self.nx_graph, weight="weight", alpha=0.85)
        except Exception:
            pagerank = {n: 1.0 / max(len(self.nx_graph.nodes()), 1) for n in self.nx_graph.nodes()}

        # Native NetworkX Community Detection
        communities = {}
        try:
            comm_sets = nx.community.louvain_communities(self.nx_graph, seed=42)
            for c_id, members in enumerate(comm_sets):
                for m in members:
                    communities[m] = c_id
        except Exception:
            try:
                comm_sets = nx.community.greedy_modularity_communities(self.nx_graph)
                for c_id, members in enumerate(comm_sets):
                    for m in members:
                        communities[m] = c_id
            except Exception:
                for i, comp in enumerate(nx.connected_components(self.nx_graph)):
                    for n in comp:
                        communities[n] = i

        node_metrics = {}
        for n in self.nx_graph.nodes():
            node_metrics[n] = {
                "degree": degrees.get(n, 0),
                "betweenness": round(betweenness.get(n, 0.0), 4),
                "pagerank": round(pagerank.get(n, 0.0), 4),
                "community_id": communities.get(n, 0)
            }

        # Identify Top Kingpins based on hybrid score (PageRank + Betweenness + Threat)
        kingpin_rankings = []
        for n_id, n_data in self.node_store.items():
            b = betweenness.get(n_id, 0.0)
            pr = pagerank.get(n_id, 0.0)
            ts = n_data.get("threat_score", 50.0)
            influence_score = round((pr * 40.0) + (b * 35.0) + (ts * 0.25), 2)
            kingpin_rankings.append({
                "id": n_id,
                "name": n_data.get("name"),
                "role": n_data.get("role"),
                "type": n_data.get("type"),
                "threat_score": ts,
                "pagerank": round(pr, 4),
                "betweenness": round(b, 4),
                "influence_score": influence_score
            })

        kingpin_rankings.sort(key=lambda x: x["influence_score"], reverse=True)

        return {
            "node_metrics": node_metrics,
            "kingpin_rankings": kingpin_rankings,
            "summary": {
                "total_entities": len(self.nx_graph.nodes()),
                "total_connections": len(self.nx_graph.edges()),
                "total_communities": len(set(communities.values())) if communities else 1,
                "graph_density": round(nx.density(self.nx_graph), 4) if len(self.nx_graph) > 1 else 0,
                "top_kingpin": kingpin_rankings[0]["name"] if kingpin_rankings else "None"
            }
        }

    def find_shortest_path(self, source_id: str, target_id: str) -> Dict[str, Any]:
        """Finds evidence chain and degrees of separation between any two entities."""
        if not self.nx_graph.has_node(source_id) or not self.nx_graph.has_node(target_id):
            return {"found": False, "message": "Source or target node does not exist in graph"}

        try:
            path = nx.shortest_path(self.nx_graph, source=source_id, target=target_id)
            path_nodes = [self.node_store[n] for n in path]
            
            path_edges = []
            for i in range(len(path) - 1):
                u, v = path[i], path[i+1]
                for edge in self.edge_store:
                    if (edge["source"] == u and edge["target"] == v) or (edge["source"] == v and edge["target"] == u):
                        path_edges.append(edge)
                        break

            return {
                "found": True,
                "degrees_of_separation": len(path) - 1,
                "path_node_ids": path,
                "nodes": path_nodes,
                "edges": path_edges
            }
        except nx.NetworkXNoPath:
            return {"found": False, "message": "No direct or indirect connection found between entities."}

    def predict_covert_links(self) -> List[Dict[str, Any]]:
        """AI Link Prediction to uncover hidden accomplice relationships."""
        if len(self.nx_graph) < 3:
            return []

        predicted = []
        non_edges = list(nx.non_edges(self.nx_graph))
        
        try:
            aa_scores = list(nx.adamic_adar_index(self.nx_graph, non_edges))
            aa_scores.sort(key=lambda x: x[2], reverse=True)
            
            for u, v, score in aa_scores[:10]:
                if score > 0.1:
                    u_data = self.node_store.get(u, {})
                    v_data = self.node_store.get(v, {})
                    common_neighbors = list(nx.common_neighbors(self.nx_graph, u, v))
                    predicted.append({
                        "source": u,
                        "target": v,
                        "source_name": u_data.get("name", u),
                        "target_name": v_data.get("name", v),
                        "affinity_score": round(score, 3),
                        "common_associates_count": len(common_neighbors),
                        "common_associates": [self.node_store.get(cn, {}).get("name", cn) for cn in common_neighbors],
                        "inference": f"High probability of covert alliance through {len(common_neighbors)} common intermediary nodes."
                    })
        except Exception:
            pass

        return predicted

graph_engine = CriminalGraphEngine()
