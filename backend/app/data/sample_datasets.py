"""
Realistic Law Enforcement Crime & Syndicate Datasets for SIH26189 - Ministry of Home Affairs.
Includes:
1. Case Garuda: Inter-State Narcotics & Hawala Cartel
2. Case Cyber-Trap: AI Phishing & Crypto Money-Mule Ring
3. Case Red-Shield: Armed Extortion & Arms Trafficking Syndicate
"""

DATASETS = {
    "operation_garuda": {
        "case_id": "CASE-MHA-2026-089",
        "case_name": "Operation Garuda: Inter-State Narcotics & Hawala Cartel",
        "jurisdiction": "Special Cell Delhi & NCB Mumbai",
        "threat_level": "CRITICAL - TIER 1",
        "summary": "Multi-state organized syndicate smuggling synthetic opioids and laundering money through 18 mule bank accounts and Dubai-connected hawala nodes.",
        "nodes": [
            {
                "id": "SUSP-001",
                "name": "Iqbal 'Bhai' Ansari",
                "type": "SUSPECT",
                "role": "Kingpin / Syndicate Chief",
                "threat_score": 98.5,
                "aliases": ["Bhaijaan", "Operator-D", "The Shadow"],
                "lat": 18.9220,
                "lng": 72.8347,
                "metadata": {
                    "age": 52,
                    "location": "Mumbai (Colaba) / Dubai Expat",
                    "firs_count": 14,
                    "status": "Red Corner Notice Pending",
                    "flight_risk": "VERY HIGH",
                    "modus_operandi": "Remote orchestration of hawala transactions and synthetic drug shipments."
                }
            },
            {
                "id": "SUSP-002",
                "name": "Vikram 'Vicky' Rana",
                "type": "SUSPECT",
                "role": "Chief Enforcer / Logistics Head",
                "threat_score": 89.2,
                "aliases": ["Vicky Shooter", "Falcon"],
                "lat": 28.6139,
                "lng": 77.2090,
                "metadata": {
                    "age": 36,
                    "location": "Delhi NCR (Rohini)",
                    "firs_count": 8,
                    "status": "Active Under Surveillance",
                    "flight_risk": "HIGH",
                    "modus_operandi": "Coordinates ground drops, safe-houses, and burner phone distribution."
                }
            },
            {
                "id": "SUSP-003",
                "name": "Rashid 'Doctor' Qureshi",
                "type": "SUSPECT",
                "role": "Hawala Broker / Money Launderer",
                "threat_score": 84.0,
                "aliases": ["Doctor Cash", "Accountant"],
                "lat": 28.6507,
                "lng": 77.2334,
                "metadata": {
                    "age": 46,
                    "location": "Old Delhi (Chandni Chowk)",
                    "firs_count": 5,
                    "status": "Detained for Interrogation",
                    "flight_risk": "MEDIUM",
                    "modus_operandi": "Manages 20+ shell firm current accounts and crypto OTC cash conversions."
                }
            },
            {
                "id": "SUSP-004",
                "name": "Tariq 'Courier' Sheikh",
                "type": "SUSPECT",
                "role": "Mid-level Distributor",
                "threat_score": 72.4,
                "aliases": ["Speedy", "T-Point"],
                "lat": 26.8467,
                "lng": 80.9462,
                "metadata": {
                    "age": 29,
                    "location": "Lucknow / Kanpur corridor",
                    "firs_count": 3,
                    "status": "Wanted",
                    "flight_risk": "HIGH",
                    "modus_operandi": "Inter-state highway transport using false-bottom container trucks."
                }
            },
            {
                "id": "SUSP-005",
                "name": "Anil 'Mule' Kumar",
                "type": "SUSPECT",
                "role": "Money Mule Operator",
                "threat_score": 58.1,
                "aliases": ["Anil Banker"],
                "lat": 28.7041,
                "lng": 77.1025,
                "metadata": {
                    "age": 24,
                    "location": "Outer Delhi",
                    "firs_count": 2,
                    "status": "Arrested",
                    "flight_risk": "LOW",
                    "modus_operandi": "Supplies student & farmer bank accounts for UPI smurfing deposits."
                }
            },
            {
                "id": "GANG-01",
                "name": "Ansari-Rana Trans-National Syndicate",
                "type": "GANG",
                "role": "Organized Crime Syndicate",
                "threat_score": 96.0,
                "aliases": ["Garuda Network"],
                "lat": 28.6139,
                "lng": 77.2090,
                "metadata": {
                    "estimated_members": 45,
                    "active_regions": ["Delhi", "Mumbai", "Punjab", "Dubai"],
                    "annual_turnover_inr": "₹120 Crores"
                }
            },
            {
                "id": "PHONE-98110",
                "name": "+91-98110-XXXXX (Burner-1)",
                "type": "PHONE",
                "role": "Encrypted Burner Line",
                "threat_score": 88.0,
                "aliases": ["Ghost-01"],
                "lat": 28.6200,
                "lng": 77.2150,
                "metadata": {
                    "imei": "864290045192831",
                    "activation_date": "2026-06-01",
                    "fake_kyc_name": "Ramesh Lal (Deceased)"
                }
            },
            {
                "id": "PHONE-98220",
                "name": "+91-98220-XXXXX (Burner-2)",
                "type": "PHONE",
                "role": "Encrypted Burner Line",
                "threat_score": 85.0,
                "aliases": ["Ghost-02"],
                "lat": 18.9300,
                "lng": 72.8400,
                "metadata": {
                    "imei": "359870023419088",
                    "activation_date": "2026-06-15",
                    "fake_kyc_name": "Sunil Verma"
                }
            },
            {
                "id": "ACC-HDFC-991",
                "name": "HDFC Shell Acc #991048",
                "type": "ACCOUNT",
                "role": "Layering Mule Account",
                "threat_score": 82.5,
                "aliases": ["Skyline Trading Account"],
                "lat": 28.6500,
                "lng": 77.2300,
                "metadata": {
                    "bank": "HDFC Bank",
                    "branch": "Chandni Chowk",
                    "total_inflow": "₹4.85 Crores",
                    "rapid_outflow_pct": "98.2%"
                }
            },
            {
                "id": "ACC-CRYPTO-TRX",
                "name": "TRON/USDT Wallet (TJa7...9kx)",
                "type": "ACCOUNT",
                "role": "Offshore Crypto Stash",
                "threat_score": 93.0,
                "aliases": ["Tether Mule-01"],
                "lat": None,
                "lng": None,
                "metadata": {
                    "blockchain": "TRON (TRC-20)",
                    "balance_usdt": "480,000 USDT",
                    "connected_exchanges": ["Binance-P2P", "OKX"]
                }
            },
            {
                "id": "VEH-DL01-8899",
                "name": "Scorpio DL-1CA-8899",
                "type": "VEHICLE",
                "role": "Contraband Courier Vehicle",
                "threat_score": 75.0,
                "aliases": ["Black Falcon"],
                "lat": 28.6139,
                "lng": 77.2090,
                "metadata": {
                    "registered_owner": "Dummy Fake KYC",
                    "anpr_hits": 48,
                    "toll_corridor": "Delhi-Jaipur NH-48"
                }
            },
            {
                "id": "LOC-KOTWALI",
                "name": "Kashmere Gate Transit Hub",
                "type": "LOCATION",
                "role": "Drop Point & Safe Zone",
                "threat_score": 68.0,
                "aliases": ["Hub-KG"],
                "lat": 28.6675,
                "lng": 77.2285,
                "metadata": {
                    "police_station": "Kashmere Gate PS",
                    "cctv_coverage": "Moderate"
                }
            }
        ],
        "edges": [
            {
                "source": "SUSP-001",
                "target": "GANG-01",
                "type": "LEADER_OF",
                "weight": 1.0,
                "evidence_count": 14,
                "description": "Supreme Commander of Syndicate operations."
            },
            {
                "source": "SUSP-002",
                "target": "GANG-01",
                "type": "ASSOCIATED_WITH",
                "weight": 0.9,
                "evidence_count": 10,
                "description": "Second-in-command operational head."
            },
            {
                "source": "SUSP-001",
                "target": "SUSP-002",
                "type": "CO_ACCUSED",
                "weight": 0.95,
                "evidence_count": 6,
                "description": "Jointly named in FIR 142/2025 and FIR 88/2026."
            },
            {
                "source": "SUSP-001",
                "target": "PHONE-98110",
                "type": "OWNS",
                "weight": 0.85,
                "evidence_count": 4,
                "description": "Used for satellite VOIP forwarding."
            },
            {
                "source": "SUSP-002",
                "target": "PHONE-98220",
                "type": "OWNS",
                "weight": 0.9,
                "evidence_count": 5,
                "description": "Primary burner line for ground operations."
            },
            {
                "source": "PHONE-98110",
                "target": "PHONE-98220",
                "type": "COMMUNICATED",
                "weight": 0.98,
                "evidence_count": 142,
                "description": "142 calls in last 30 days, heavily concentrated between 1 AM and 4 AM."
            },
            {
                "source": "SUSP-002",
                "target": "SUSP-003",
                "type": "COMMUNICATED",
                "weight": 0.82,
                "evidence_count": 28,
                "description": "Frequent encrypted WhatsApp call coordination."
            },
            {
                "source": "SUSP-003",
                "target": "ACC-HDFC-991",
                "type": "OWNS",
                "weight": 0.95,
                "evidence_count": 8,
                "description": "Authorized signatory of fake corporate account."
            },
            {
                "source": "ACC-HDFC-991",
                "target": "ACC-CRYPTO-TRX",
                "type": "TRANSFERRED_FUNDS",
                "weight": 0.92,
                "evidence_count": 18,
                "description": "₹3.2 Crores routed to P2P USDT escrow in 12 batches."
            },
            {
                "source": "SUSP-003",
                "target": "SUSP-005",
                "type": "TRANSFERRED_FUNDS",
                "weight": 0.78,
                "evidence_count": 45,
                "description": "Weekly commission payouts of ₹50,000 for mule account supply."
            },
            {
                "source": "SUSP-002",
                "target": "SUSP-004",
                "type": "CO_ACCUSED",
                "weight": 0.75,
                "evidence_count": 3,
                "description": "Co-conspirators in NDPS Act Case 44/2026."
            },
            {
                "source": "SUSP-004",
                "target": "VEH-DL01-8899",
                "type": "OWNS",
                "weight": 0.88,
                "evidence_count": 6,
                "description": "Captured on ANPR cameras at toll plazas with Tariq behind wheels."
            },
            {
                "source": "SUSP-004",
                "target": "LOC-KOTWALI",
                "type": "OPERATES_IN",
                "weight": 0.7,
                "evidence_count": 12,
                "description": "Cell tower pings frequent at night time."
            },
            {
                "source": "SUSP-001",
                "target": "ACC-CRYPTO-TRX",
                "type": "PREDICTED_LINK",
                "weight": 0.86,
                "evidence_count": 0,
                "description": "[AI PREDICTED] Jaccard & Flow Link analysis indicates Iqbal Ansari is the ultimate beneficiary of TRC20 wallet."
            }
        ]
    },

    "operation_cyber_trap": {
        "case_id": "CASE-MHA-2026-114",
        "case_name": "Operation Cyber-Trap: Jamtara-Nuh AI Phishing & Mule Ring",
        "jurisdiction": "I4C (Indian Cyber Crime Coordination Centre) & State Cyber Cells",
        "threat_level": "HIGH - CYBER HEIST",
        "summary": "AI Voice Clone scamming racket targeting elderly citizens across 12 states, siphoning funds into 45 mule accounts and instant crypto conversions.",
        "nodes": [
            {
                "id": "CYBER-001",
                "name": "Wasim Akram",
                "type": "SUSPECT",
                "role": "Mastermind / Voice-AI Spoofer",
                "threat_score": 94.2,
                "aliases": ["Hacker-W", "DeepVoice"],
                "lat": 24.2183,
                "lng": 86.6432,
                "metadata": {"location": "Jamtara, Jharkhand", "firs_count": 22, "status": "Absconding"}
            },
            {
                "id": "CYBER-002",
                "name": "Deepak Mandal",
                "type": "SUSPECT",
                "role": "SIM-Box Operator & OTP Interceptor",
                "threat_score": 87.5,
                "aliases": ["SIM Master"],
                "lat": 28.1062,
                "lng": 77.0028,
                "metadata": {"location": "Nuh, Haryana", "firs_count": 11, "status": "Under Raid"}
            },
            {
                "id": "CYBER-003",
                "name": "Manish 'Trader' Shah",
                "type": "SUSPECT",
                "role": "Crypto P2P Cashout Broker",
                "threat_score": 81.0,
                "aliases": ["CoinKing"],
                "lat": 23.0225,
                "lng": 72.5714,
                "metadata": {"location": "Ahmedabad, Gujarat", "firs_count": 7, "status": "Surveillance"}
            },
            {
                "id": "ACC-SBI-4412",
                "name": "SBI Mule Pool Account #4412",
                "type": "ACCOUNT",
                "role": "Primary Smurfing Funnel",
                "threat_score": 89.0,
                "aliases": ["Mule-101"],
                "lat": 24.2183,
                "lng": 86.6432,
                "metadata": {"bank": "State Bank of India", "daily_velocity": "₹35 Lakhs"}
            },
            {
                "id": "ACC-USDT-VAULT",
                "name": "USDT Escrow Pool (0x89f...b2a)",
                "type": "ACCOUNT",
                "role": "Laundered Cold Wallet",
                "threat_score": 92.0,
                "aliases": ["Ethereum Mixer Vault"],
                "lat": None,
                "lng": None,
                "metadata": {"blockchain": "Ethereum ERC-20", "balance": "$320,000"}
            }
        ],
        "edges": [
            {
                "source": "CYBER-001",
                "target": "CYBER-002",
                "type": "COMMUNICATED",
                "weight": 0.95,
                "evidence_count": 310,
                "description": "Real-time OTP relay and SIM-Box dispatch."
            },
            {
                "source": "CYBER-001",
                "target": "ACC-SBI-4412",
                "type": "TRANSFERRED_FUNDS",
                "weight": 0.91,
                "evidence_count": 84,
                "description": "Siphoned victim funds credited and dispersed in <5 minutes."
            },
            {
                "source": "ACC-SBI-4412",
                "target": "CYBER-003",
                "type": "TRANSFERRED_FUNDS",
                "weight": 0.88,
                "evidence_count": 32,
                "description": "P2P payments to crypto merchants."
            },
            {
                "source": "CYBER-003",
                "target": "ACC-USDT-VAULT",
                "type": "TRANSFERRED_FUNDS",
                "weight": 0.96,
                "evidence_count": 14,
                "description": "Converted fiat into offshore stablecoin vault."
            },
            {
                "source": "CYBER-001",
                "target": "CYBER-003",
                "type": "PREDICTED_LINK",
                "weight": 0.79,
                "evidence_count": 0,
                "description": "[AI PREDICTED] High transaction flow affinity and Telegram alias matching."
            }
        ]
    }
}
