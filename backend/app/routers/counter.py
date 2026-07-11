from fastapi import APIRouter, Request
from ..redis_client import redis_client
from ..limiter import limiter

router = APIRouter()

@router.get("/counter")
async def get_counter() -> dict:
    value = await redis_client.get("counter")
    return {"counter": int(value) if value else 0}

@router.post("/counter")
@limiter.limit("10/minute")
async def increment_counter(request: Request) -> dict:
    value = await redis_client.incr("counter")
    return {"counter": value}

@router.delete("/counter")
async def reset_counter() -> dict:
    await redis_client.set("counter", 0)
    return {"counter": 0}
