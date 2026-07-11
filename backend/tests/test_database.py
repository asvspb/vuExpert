import pytest
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
import httpx

@pytest.mark.asyncio
async def test_database_connection(test_session: AsyncSession):
    result = await test_session.execute(text("SELECT 1"))
    assert result.scalar() == 1

@pytest.mark.asyncio
async def test_health_endpoint(client: httpx.AsyncClient):
    resp = await client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
    assert data["database"] == "ok"
