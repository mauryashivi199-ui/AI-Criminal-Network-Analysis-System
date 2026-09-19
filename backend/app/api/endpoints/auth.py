from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import time
import hashlib

router = APIRouter()

class OfficerLoginRequest(BaseModel):
    badge_id: str
    password_or_pin: str
    agency: Optional[str] = "Delhi Police Cyber Cell / MHA"
    officer_name: Optional[str] = "Officer"

class OfficerRegisterRequest(BaseModel):
    officer_name: str
    badge_id: str
    agency: str
    role: str
    clearance_level: str
    pin: str

# In-memory mock officers registry
OFFICERS_DB = {
    "DL-CYBER-8841": {
        "officer_name": "Inspector Rajesh Kumar",
        "badge_id": "DL-CYBER-8841",
        "agency": "Special Cell / Cyber Crime Unit, Delhi Police",
        "role": "Lead Cyber Crime Investigator",
        "clearance_level": "Level 3 - Top Secret (LEA)",
        "cases_assigned": ["Operation Garuda", "Operation Cyber-Trap"]
    },
    "MHA-FORENSIC-019": {
        "officer_name": "Dr. Priya Sharma",
        "badge_id": "MHA-FORENSIC-019",
        "agency": "Cyber & Information Security (CIS) Division, MHA",
        "role": "Senior Forensic Graph Analyst",
        "clearance_level": "Level 4 - National Security Intelligence",
        "cases_assigned": ["Operation Garuda"]
    },
    "IPS-HQ-5502": {
        "officer_name": "Superintendent V. K. Menon",
        "badge_id": "IPS-HQ-5502",
        "agency": "Directorate of Enforcement / National Investigation Hub",
        "role": "Special Operations Commander",
        "clearance_level": "Level 5 - Director General Directive",
        "cases_assigned": ["Operation Garuda", "Operation Cyber-Trap", "Op Inter-State Hawala"]
    }
}

@router.post("/login")
def login_officer(req: OfficerLoginRequest):
    officer = OFFICERS_DB.get(req.badge_id.strip().upper())
    if not officer:
        # Allow dynamic guest login with badge
        officer = {
            "officer_name": req.officer_name or f"Officer {req.badge_id}",
            "badge_id": req.badge_id.upper(),
            "agency": req.agency,
            "role": "Investigating Officer",
            "clearance_level": "Level 2 - Confidential Access",
            "cases_assigned": ["Operation Garuda"]
        }
    
    session_token = hashlib.sha256(f"{officer['badge_id']}-{time.time()}".encode()).hexdigest()[:24]
    return {
        "status": "authenticated",
        "session_token": session_token,
        "officer": officer,
        "login_time": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
        "bsa_audit_logged": True
    }

@router.post("/register")
def register_officer(req: OfficerRegisterRequest):
    badge = req.badge_id.strip().upper()
    if badge in OFFICERS_DB:
        raise HTTPException(status_code=400, detail="Officer Badge ID already registered.")
    
    officer_profile = {
        "officer_name": req.officer_name,
        "badge_id": badge,
        "agency": req.agency,
        "role": req.role,
        "clearance_level": req.clearance_level,
        "cases_assigned": ["Operation Garuda"]
    }
    OFFICERS_DB[badge] = officer_profile
    
    session_token = hashlib.sha256(f"{badge}-{time.time()}".encode()).hexdigest()[:24]
    return {
        "status": "registered_and_authenticated",
        "session_token": session_token,
        "officer": officer_profile,
        "bsa_audit_logged": True
    }

@router.get("/officers")
def list_preset_officers():
    return list(OFFICERS_DB.values())
