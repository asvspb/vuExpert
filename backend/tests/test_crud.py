import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from app import crud, schemas

@pytest.mark.asyncio
async def test_create_item(test_session: AsyncSession):
    item_data = schemas.ItemCreate(name="Item", description="Desc")
    created_item = await crud.create_item(db=test_session, item=item_data)
    assert created_item.name == "Item"
    assert created_item.id is not None

@pytest.mark.asyncio
async def test_get_item(test_session: AsyncSession):
    item_data = schemas.ItemCreate(name="Item")
    created = await crud.create_item(db=test_session, item=item_data)
    retrieved = await crud.get_item(db=test_session, item_id=created.id)
    assert retrieved is not None
    assert retrieved.id == created.id

@pytest.mark.asyncio
async def test_get_items(test_session: AsyncSession):
    await crud.create_item(test_session, schemas.ItemCreate(name="I1"))
    await crud.create_item(test_session, schemas.ItemCreate(name="I2"))
    items = await crud.get_items(test_session)
    assert len(items) >= 2

@pytest.mark.asyncio
async def test_create_user(test_session: AsyncSession):
    user_data = schemas.UserCreate(username="u1", email="e1@m.com")
    created = await crud.create_user(test_session, user_data)
    assert created.id is not None

@pytest.mark.asyncio
async def test_get_user(test_session: AsyncSession):
    user_data = schemas.UserCreate(username="u2", email="e2@m.com")
    created = await crud.create_user(test_session, user_data)
    retrieved = await crud.get_user(test_session, user_id=created.id)
    assert retrieved.id == created.id

@pytest.mark.asyncio
async def test_get_users(test_session: AsyncSession):
    await crud.create_user(test_session, schemas.UserCreate(username="u3", email="e3@m.com"))
    await crud.create_user(test_session, schemas.UserCreate(username="u4", email="e4@m.com"))
    users = await crud.get_users(test_session)
    assert len(users) >= 2