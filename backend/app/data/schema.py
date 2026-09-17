from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum

class NodeType(str, Enum):
    SUSPECT = "SUSPECT"
    GANG = "GANG"
    PHONE = "PHONE"
    ACCOUNT = "ACCOUNT"
    VEHICLE = "VEHICLE"
    LOCATION = "LOCATION"
    CRIME_CASE = "CRIME_CASE"

class EdgeType(str, Enum):
    CO_ACCUSED = "CO_ACCUSED"
    COMMUNICATED = "COMMUNICATED"
    TRANSFERRED_FUNDS = "TRANSFERRED_FUNDS"
    ASSOCIATED_WITH = "ASSOCIATED_WITH"
    OPERATES_IN = "OPERATES_IN"
    OWNS = "OWNS"
    LEADER_OF = "LEADER_OF"
    PREDICTED_LINK = "PREDICTED_LINK"

class NodeModel(BaseModel):
    id: str
    name: str
    type: NodeType
    role: Optional[str] = "Associate"  # Kingpin, Lieutenant, Mule, Enforcer, Broker, etc.
    threat_score: float = 0.0          # 0 to 100
    aliases: List[str] = []
    metadata: Dict[str, Any] = {}
    lat: Optional[float] = None
    lng: Optional[float] = None

class EdgeModel(BaseModel):
    source: str
    target: str
    type: EdgeType
    weight: float = 1.0
    evidence_count: int = 1
    description: Optional[str] = None
    timestamp: Optional[str] = None
    metadata: Dict[str, Any] = {}

class GraphData(BaseModel):
    nodes: List[NodeModel]
    edges: List[EdgeModel]

class FIRIngestRequest(BaseModel):
    fir_number: str
    police_station: str
    state: str
    date: str
    sections: List[str]
    raw_text: str

class CDRRecord(BaseModel):
    caller: str
    receiver: str
    duration_sec: int
    timestamp: str
    cell_tower: str
    imei: Optional[str] = None

class FinancialRecord(BaseModel):
    sender_acc: str
    receiver_acc: str
    amount_inr: float
    timestamp: str
    channel: str # UPI, RTGS, CRYPTO, HAWALA
    flagged_suspicious: bool = False

class CopilotQueryRequest(BaseModel):
    query: str
    context_case_id: Optional[str] = "DEFAULT_SYNDICATE"

class CopilotQueryResponse(BaseModel):
    answer: str
    highlighted_nodes: List[str] = []
    highlighted_edges: List[Dict[str, str]] = []
    confidence_score: float = 0.95
    suggested_actions: List[str] = []
