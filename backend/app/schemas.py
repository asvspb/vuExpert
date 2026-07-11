from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any, Dict

class LogEvent(BaseModel):
    level: str
    message: str
    context: Optional[Dict[str, Any]] = None
    timestamp: str
    url: Optional[str] = None
    user_agent: Optional[str] = None

# Схемы для Item
class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Схемы для User
class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True