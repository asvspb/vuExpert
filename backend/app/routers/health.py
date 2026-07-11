from fastapi import APIRouter
from sqlalchemy import text
from ..database import engine
from ..redis_client import redis_client
from ..settings import settings

router = APIRouter()

@router.get("/health")
async def health() -> dict:
    try:
        pong = await redis_client.ping()
        redis_status = "ok" if pong else "unreachable"
    except Exception as exc:
        redis_status = f"error: {exc}"

    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        db_status = "ok"
    except Exception as exc:
        db_status = f"error: {exc}"

    return {"status": "ok", "redis": redis_status, "database": db_status, "version": settings.app_version}
