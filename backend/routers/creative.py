from fastapi import APIRouter
from pydantic import BaseModel
import random
from mock_data import CREATIVE_TEMPLATES

router = APIRouter()

class CreativeRequest(BaseModel):
    tag: str = "default"
    spot: str = "成都"

@router.post("/creative")
def generate_creative(req: CreativeRequest):
    templates = CREATIVE_TEMPLATES.get(req.tag, CREATIVE_TEMPLATES["default"])
    text = random.choice(templates).format(spot=req.spot)
    return {"text": text}
