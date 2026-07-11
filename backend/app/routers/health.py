from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from ..redis_client import redis_client
from ..settings import settings

router = APIRouter()

@router.get("/health")
async def health(db: AsyncSession = Depends(get_db)) -> dict:
    try:
        pong = await redis_client.ping()
        redis_status = "ok" if pong else "unreachable"
    except Exception as exc:
        redis_status = f"error: {exc}"

    try:
        await db.execute(text("SELECT 1"))
        db_status = "ok"
    except Exception as exc:
        db_status = f"error: {exc}"

    return {"status": "ok", "redis": redis_status, "database": db_status, "version": settings.app_version}
