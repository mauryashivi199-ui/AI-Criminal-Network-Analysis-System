# SMART INDIA HACKATHON 2026 - PROJECT REPORT

**Problem Statement ID:** SIH26189 / 189  
**Ministry / Organization:** Ministry of Home Affairs (MHA)  
**Theme:** Blockchain & Cybersecurity / AI / Law Enforcement Intelligence  
**Project Title:** KavachNet-AI: AI-Powered Criminal Network Analysis & Syndicate Intelligence Platform  

---

## 1. Executive Summary
Modern law enforcement agencies (Police Departments, State Special Cells, CID, NIA, NCB, I4C) face unprecedented challenges in investigating organized crime syndicates, illicit narcotics cartels, cyber-fraud rackets, and terror-financing channels. Key evidence is fractured across disparate data silos: Call Detail Records (CDRs), First Information Reports (FIRs), bank/UPI statements, cryptocurrency ledger flows, and cell tower dumps. 

**KavachNet-AI** is an AI and multi-relational Knowledge Graph intelligence platform designed to ingest multi-source forensic evidence, dynamically construct linked criminal ontologies, compute structural centrality to pinpoint cartel kingpins and brokers, predict covert links using Graph AI heuristics, and provide investigating officers with an interactive tactical Command Center, an AI Forensic Copilot, and automated court-admissible dossiers.

---

## 2. Key Capabilities & Innovations

### A. Multi-Source Ingestion & NLP Entity Extraction
- **Automated FIR & Case Diary Parser:** Utilizes domain-specialized Named Entity Recognition (NER) to extract suspects, aliases, offenses (IPC / Bharatiya Nyaya Sanhita 2023 / NDPS / UAPA), vehicle license plates, bank accounts, and phone numbers.
- **CDR / IPDR Telemetry Analyzer:** Identifies high-frequency calling corridors, nocturnal bursts (1 AM – 5 AM), and flags burner phones exhibiting multiple IMEI swaps on a single SIM.

### B. Graph AI & Syndicate Topology Intelligence
- **Kingpin vs. Mule Differentiation:** Computes **PageRank** and **Betweenness Centrality** ($\mathcal{C}_B(v) = \sum_{s \neq v \neq t} \frac{\sigma_{st}(v)}{\sigma_{st}}$) to isolate true syndicate directors from expendable foot soldiers.
- **AI Link Prediction:** Uncovers hidden / unobserved relationships between conspirators using **Adamic-Adar Index** and resource allocation heuristics.
- **Community Detection:** Employs **Louvain modularity clustering** to partition complex networks into distinct operational cells (e.g., Command, Logistics, Mule Banking, Enforcement).

### C. Financial Forensics & Crypto Off-Ramp Tracing
- **Mule Pass-Through Velocity:** Detects smurfing funnels where funds are deposited via UPI batches and evacuated within $<15$ minutes.
- **Hawala & Stablecoin Tracking:** Flags P2P crypto off-ramps routing laundered proceeds to offshore TRON (TRC-20 USDT) and Ethereum wallets.

### D. Judicial Chain of Custody & Court Dossiers
- **Bharatiya Sakshya Adhiniyam 2023 Compliance:** Every graph transformation and evidence link maintains a cryptographic SHA-256 audit log ensuring electronic record admissibility under Section 65B equivalents.
- **One-Click Dossier Generation:** Produces formatted police case briefs, including evidence chains, suspect hierarchy, and recommended legal charges.

---

## 3. Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend UI** | React 18, Vite, Tailwind CSS, Lucide Icons, Recharts |
| **Network Graph** | Cytoscape.js, Cola & CoSE Physics Force-Directed Layouts |
| **Geospatial Intelligence** | Leaflet.js, CartoDB Dark Matter Geo-Tiles |
| **Backend Framework** | FastAPI (Python 3.11+), Uvicorn ASGI Server |
| **Graph & ML Algorithms** | NetworkX, Scikit-learn, NumPy |
| **Natural Language Processing** | Custom Law-Enforcement NER & Multi-Hop Reasoning Copilot |
| **Security & Auditing** | SHA-256 Evidence Hashing, Role-Based Access Control (RBAC) |

---

## 4. Mathematical Formulations

### 1. Betweenness Centrality (Broker / Hub Identification)
$$C_B(v) = \sum_{s \neq v \neq t} \frac{\sigma_{st}(v)}{\sigma_{st}}$$
Where $\sigma_{st}$ is total number of shortest paths from node $s$ to node $t$ and $\sigma_{st}(v)$ is the number of those paths that pass through $v$.

### 2. Adamic-Adar Link Prediction (Covert Accomplice Detection)
$$AA(u, v) = \sum_{z \in N(u) \cap N(v)} \frac{1}{\log |N(z)|}$$
Measures the closeness of two unlinked suspects based on the degree of their shared criminal associates.

### 3. Composite Kingpin Influence Score
$$I(u) = (0.40 \times PR(u)) + (0.35 \times C_B(u)) + (0.25 \times T(u))$$
Where $PR(u)$ is PageRank, $C_B(u)$ is Betweenness Centrality, and $T(u)$ is base threat score.

---

## 5. Hackathon Deliverables Checklist
- [x] Full-stack working prototype with live FastAPI backend and React frontend.
- [x] Multi-case support (Inter-State Narcotics Cartel, AI Phishing & Mule Ring).
- [x] Interactive 2D/3D Force-Directed Graph Explorer with path tracing.
- [x] Real-time CDR call matrix & burner phone alert engine.
- [x] Financial smurfing tracker & crypto wallet monitor.
- [x] Geo-spatial crime hotspot map.
- [x] AI Forensic Copilot for conversational graph queries.
- [x] Exportable police case dossier with judicial evidence attestation.
