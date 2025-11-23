import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import redis.asyncio as redis

REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))

app = FastAPI(title="VueExpert Backend", version="0.1.0")

# Разрешим запросы с фронта на Vite (по умолчанию localhost:4173)
origins = [
    "http://localhost:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

redis_client = redis.from_url(
    f"redis://{REDIS_HOST}:{REDIS_PORT}",
    encoding="utf-8",
    decode_responses=True,
)


@app.get("/health")
async def health() -> dict:
    """Простая проверка работы backend и подключения к Redis."""
    try:
        pong = await redis_client.ping()
        redis_status = "ok" if pong else "unreachable"
    except Exception as exc:  # noqa: BLE001
        redis_status = f"error: {exc}"
    return {"status": "ok", "redis": redis_status}


@app.get("/counter")
async def counter() -> dict:
    """Пример эндпоинта, который использует Redis для счётчика."""
    value = await redis_client.incr("counter")
    return {"counter": value}

