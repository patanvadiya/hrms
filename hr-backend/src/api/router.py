from fastapi import APIRouter

from src.user.routes import router as user_router

router = APIRouter(prefix="/api/v1")
router.include_router(user_router)
