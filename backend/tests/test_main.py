import pytest
import httpx
from unittest.mock import patch, AsyncMock

@pytest.mark.asyncio
async def test_health_endpoint(client: httpx.AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"

@pytest.mark.asyncio
async def test_counter_endpoint(client: httpx.AsyncClient):
    with patch("app.routers.counter.redis_client.get", new=AsyncMock(return_value="5")):
        response = await client.get("/counter")
        assert response.status_code == 200
        assert response.json()["counter"] == 5
        
    with patch("app.routers.counter.redis_client.incr", new=AsyncMock(return_value=6)):
        response = await client.post("/counter")
        assert response.status_code == 200
        assert response.json()["counter"] == 6
        
    with patch("app.routers.counter.redis_client.set", new=AsyncMock(return_value=True)):
        response = await client.delete("/counter")
        assert response.status_code == 200
        assert response.json()["counter"] == 0

@pytest.mark.asyncio
async def test_create_item_endpoint(client: httpx.AsyncClient):
    response = await client.post("/items/", json={"name": "Тестовый предмет", "description": "Описание"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Тестовый предмет"
    assert "id" in data

@pytest.mark.asyncio
async def test_get_items_endpoint(client: httpx.AsyncClient):
    await client.post("/items/", json={"name": "Item 1"})
    await client.post("/items/", json={"name": "Item 2"})
    
    response = await client.get("/items/")
    assert response.status_code == 200
    assert len(response.json()) >= 2

@pytest.mark.asyncio
async def test_get_item_endpoint(client: httpx.AsyncClient):
    create_response = await client.post("/items/", json={"name": "Item 1"})
    item_id = create_response.json()["id"]
    
    response = await client.get(f"/items/{item_id}")
    assert response.status_code == 200
    assert response.json()["id"] == item_id

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