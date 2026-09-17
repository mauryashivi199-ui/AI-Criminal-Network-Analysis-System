from fastapi import APIRouter
from app.data.schema import CopilotQueryRequest, CopilotQueryResponse
from app.services.copilot import copilot_service

router = APIRouter()

@router.post("/query", response_model=CopilotQueryResponse)
def query_copilot(req: CopilotQueryRequest):
    res = copilot_service.process_investigator_query(req.query, req.context_case_id)
    return CopilotQueryResponse(**res)
