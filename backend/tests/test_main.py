import pytest
import httpx
from unittest.mock import patch

@pytest.mark.asyncio
async def test_health_endpoint(client: httpx.AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"

@pytest.mark.asyncio
async def test_create_user_endpoint(client: httpx.AsyncClient):
    response = await client.post("/users/", json={"username": "testuser", "email": "test@example.com", "full_name": "Test User"})
    assert response.status_code == 200
    assert "id" in response.json()

@pytest.mark.asyncio
async def test_get_users_endpoint(client: httpx.AsyncClient):
    await client.post("/users/", json={"username": "u1", "email": "u1@x.com"})
    await client.post("/users/", json={"username": "u2", "email": "u2@x.com"})
    
    response = await client.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) >= 2