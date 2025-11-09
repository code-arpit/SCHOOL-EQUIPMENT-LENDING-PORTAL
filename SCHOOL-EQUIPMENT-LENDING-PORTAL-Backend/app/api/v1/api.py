from fastapi import APIRouter

from api.v1.endpoints import equipment, auth

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(equipment.router, prefix="/equipment", tags=["equipment"])
