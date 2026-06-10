from fastapi import APIRouter
from mock_data import GAMES

router = APIRouter()

@router.get("/games")
def get_games():
    return GAMES
