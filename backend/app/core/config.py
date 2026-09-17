import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "KavachNet-AI - Criminal Network Analysis System"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    SIH_PROBLEM_ID: str = "SIH26189"
    MINISTRY: str = "Ministry of Home Affairs (MHA)"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

settings = Settings()
