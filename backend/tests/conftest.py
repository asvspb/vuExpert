import os
import tempfile
from typing import AsyncGenerator
import pytest_asyncio
import httpx
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy import text

from app.main import app
from app.database import Base, get_db

@pytest_asyncio.fixture(scope="session")
async def test_engine():
    fd, path = tempfile.mkstemp(prefix="tmp_vuExpert_test_", suffix=".sqlite")
    os.close(fd)
    
    db_url = f"sqlite+aiosqlite:///{path}"
    engine = create_async_engine(db_url, pool_pre_ping=True)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    yield engine
    
    await engine.dispose()
    try:
        os.remove(path)
    except FileNotFoundError:
        pass

@pytest_asyncio.fixture()
async def test_session(test_engine) -> AsyncGenerator[AsyncSession, None]:
    SessionLocal = async_sessionmaker(test_engine, class_=AsyncSession, expire_on_commit=False)
    async with SessionLocal() as session:
        yield session
        # Очищаем таблицы после каждого теста
        for table in reversed(Base.metadata.sorted_tables):
            await session.execute(text(f"DELETE FROM {table.name}"))
        await session.commit()

@pytest_asyncio.fixture()
async def client(test_session: AsyncSession) -> AsyncGenerator[httpx.AsyncClient, None]:
    async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
        yield test_session

    app.dependency_overrides[get_db] = override_get_db

    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as c:
        yield c

    app.dependency_overrides.clear()
