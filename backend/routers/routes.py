from fastapi import APIRouter
from mock_data import ROUTES

router = APIRouter()

@router.get("/routes")
def get_routes(tag: str = None):
    if tag:
        return [r for r in ROUTES if tag in r["tags"]]
    return ROUTES
