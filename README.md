# AI-Powered Criminal Network Analysis System (SIH26189)
### Ministry of Home Affairs (MHA) | Smart India Hackathon 2026

[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React 18](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Cytoscape](https://img.shields.io/badge/Cytoscape.js-Graph_Visualizer-EA5959?style=for-the-badge)](https://js.cytoscape.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Overview
* **Problem ID:** SIH26189 / 189
* **Organization:** Ministry of Home Affairs (MHA)
* **Domain:** Blockchain & Cybersecurity / Artificial Intelligence

Law enforcement agencies analyze vast unstructured forensic data: First Information Reports (FIRs), Call Detail Records (CDRs), Tower Dumps, Bank/UPI statements, and Cryptocurrency transactions. Connecting criminal dots manually across cross-border syndicates takes weeks.

**AI-Powered Criminal Network Analysis System** automatically reconstructs multi-relational criminal knowledge graphs, identifies syndicate kingpins using **PageRank** and **Betweenness Centrality**, detects **money mule pass-through accounts**, predicts hidden accomplice ties using **Adamic-Adar link prediction**, and generates court-admissible dossiers compliant with **Bharatiya Sakshya Adhiniyam 2023 (BSA)**.

---

## 🌟 Key Features

1. **Interactive Force-Directed Network Graph (Cytoscape.js):**
   - Color-coded entities: Suspects (Red), Gangs (Purple), Burner Phones (Blue), Mule Accounts (Emerald), Vehicles (Amber).
   - Physics layouts (CoSE, Cola, Grid, Breadthfirst).
   - Shortest path & degrees of separation tracer between any two suspects or bank accounts.

2. **Algorithmic Kingpin & Broker Radar (NetworkX):**
   - Betweenness Centrality ($\mathcal{C}_B$) to spot critical middlemen and hawala funnelers.
   - PageRank ($PR$) to rank syndicate chiefs and command nodes.

3. **CDR & Burner Phone Telemetry Analyzer:**
   - 24-Hour call distribution histogram detecting nocturnal communication bursts (1 AM – 5 AM).
   - Single SIM card par multiple IMEI device swap detection.

4. **Financial Smurfing & Crypto Offramp Tracker:**
   - Detects mule accounts with $>85\%$ pass-through velocity within 15 minutes.
   - Monitors offshore stablecoin conversions (TRON TRC-20 USDT / Ethereum).

5. **AI Forensic Copilot (Graph-RAG):**
   - Natural language investigation assistant answering complex multi-hop queries.
   - Automatically highlights relevant evidentiary paths in the interactive graph canvas.

6. **Court-Admissible Evidence Dossier:**
   - 1-Click exportable police case dossier with SHA-256 cryptographic chain of custody.

---

## 🚀 Quick Start Guide

### Option 1: 1-Click Windows Launcher
Double click `start_system.bat` in the project root folder to start both Backend and Frontend automatically.

### Option 2: Manual Terminal Setup

#### 1. Start Backend (FastAPI):
```bash
cd backend
pip install -r requirements.txt
python run_backend.py
```
*Backend runs on `http://localhost:8000` (API Docs: `http://localhost:8000/docs`)*

#### 2. Start Frontend (React + Vite):
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173` (Fully mobile & desktop responsive)*

---

## 📂 Project Structure
```
KavachNet-AI/
├── backend/
│   ├── app/
│   │   ├── api/endpoints/       # FastAPI REST endpoints
│   │   ├── services/            # Graph Engine, NER, CDR, AML, Copilot, Dossier
│   │   ├── data/                # Preloaded Realistic Syndicates (Narcotics & Cyber)
│   │   └── main.py              # Application entrypoint
│   ├── tests/                   # Automated integration test suite
│   ├── requirements.txt
│   └── run_backend.py
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Graph, Kingpins, CDR, Mule Tracker, Copilot, Dossier
│   │   ├── services/api.js      # Backend API Client
│   │   ├── App.jsx              # Responsive Shell
│   │   └── main.jsx
│   └── package.json
│
├── docs/                        # Presentation & SIH 2026 Documentation
│   ├── SIH26189_AI_Criminal_Network_Analysis_System.pptx
│   └── Project_Report_SIH26189.md
└── start_system.bat             # 1-Click Launch Script
```

---

## ⚖️ License
Distributed under the MIT License. Developed for Smart India Hackathon 2026.
