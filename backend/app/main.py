import os
import logging
from typing import List

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import redis.asyncio as redis
from sqlalchemy.ext.asyncio import AsyncSession

# Загружаем переменные окружения из файла .env
from dotenv import load_dotenv
load_dotenv()

from .database import get_db, engine
from .models import Base
from . import crud, schemas

# Настройки Redis
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))

# Настройка логирования
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("frontend_logger")

APP_VERSION = os.getenv("APP_VERSION", "0.1.0")
# Приложение FastAPI должно быть создано ДО регистрации обработчиков событий
app = FastAPI(title="VueExpert Backend", version=APP_VERSION)

# Получаем разрешенные источники из переменной окружения
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:4173,http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Клиент Redis
redis_client = redis.from_url(
    f"redis://{REDIS_HOST}:{REDIS_PORT}",
    encoding="utf-8",
    decode_responses=True,
)

# Создание таблиц при запуске приложения
@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.get("/health")
async def health() -> dict:
    """Простая проверка работы backend и подключения к Redis и Базе Данных."""
    try:
        pong = await redis_client.ping()
        redis_status = "ok" if pong else "unreachable"
    except Exception as exc:  # noqa: BLE001
        redis_status = f"error: {exc}"

    try:
        # Проверим возможность подключения к БД (PostgreSQL/SQLite)
        async with engine.begin():
            db_status = "ok"
    except Exception as exc:  # noqa: BLE001
        db_status = f"error: {exc}"

    return {"status": "ok", "redis": redis_status, "database": db_status, "version": app.version}


@app.get("/counter")
async def get_counter() -> dict:
    """Получение текущего значения счётчика из Redis."""
    value = await redis_client.get("counter")
    return {"counter": int(value) if value else 0}


@app.post("/counter")
async def increment_counter() -> dict:
    """Увеличение счётчика в Redis."""
    value = await redis_client.incr("counter")
    return {"counter": value}


@app.delete("/counter")
async def reset_counter() -> dict:
    """Сброс счётчика в Redis."""
    await redis_client.set("counter", 0)
    return {"counter": 0}


@app.post("/logs")
async def collect_logs(event: schemas.LogEvent, request: Request):
    """Эндпоинт для сбора логов с фронтенда"""
    client_ip = request.client.host if request.client else "unknown"
    log_msg = f"ClientIP: {client_ip} | URL: {event.url} | {event.message} | Context: {event.context}"
    
    if event.level.lower() == "error":
        logger.error(log_msg)
    elif event.level.lower() == "warn":
        logger.warning(log_msg)
    elif event.level.lower() == "debug":
        logger.debug(log_msg)
    else:
        logger.info(log_msg)
        
    return {"status": "logged"}


# Эндпоинты для работы с базой данных (PostgreSQL/SQLite)
@app.post("/items/", response_model=schemas.Item)
async def create_item(item: schemas.ItemCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_item(db=db, item=item)


@app.get("/items/", response_model=List[schemas.Item])
async def read_items(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    items = await crud.get_items(db, skip=skip, limit=limit)
    return items


@app.get("/items/{item_id}", response_model=schemas.Item)
async def read_item(item_id: int, db: AsyncSession = Depends(get_db)):
    item = await crud.get_item(db, item_id=item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.post("/users/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_user(db=db, user=user)


@app.get("/users/", response_model=List[schemas.User])
async def read_users(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    users = await crud.get_users(db, skip=skip, limit=limit)
    return users
