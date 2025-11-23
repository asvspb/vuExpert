import os
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

# Путь к файлу SQLite базы данных
SQLITE_PATH = os.getenv("SQLITE_PATH", "/app/data/db.sqlite")
# Для асинхронной работы с SQLite используем aiosqlite
if SQLITE_PATH.startswith("sqlite:///"):
    # Если путь уже содержит префикс, удаляем его для корректного формирования URL
    clean_path = SQLITE_PATH.replace("sqlite:///", "")
    DATABASE_URL = f"sqlite+aiosqlite:///{clean_path}"
else:
    DATABASE_URL = f"sqlite+aiosqlite:///{SQLITE_PATH}"

# Асинхронный движок и сессия
engine = create_async_engine(
    DATABASE_URL,
    echo=True,  # Установите в False в продакшене
    pool_pre_ping=True,
)


AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Синхронный движок и сессия (для миграций и других синхронных операций)
sync_engine = create_engine(
    f"sqlite:///{SQLITE_PATH}",
    connect_args={"check_same_thread": False}
)
SyncSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)

Base = declarative_base()

# Зависимость для получения сессии базы данных
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session