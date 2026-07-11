from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional, Any, Dict, Literal

class LogEvent(BaseModel):
    level: Literal["debug", "info", "warn", "error"]
    message: str = Field(..., max_length=1000)
    context: Optional[Dict[str, Any]] = None
    timestamp: str
    url: Optional[str] = Field(None, max_length=500)
    user_agent: Optional[str] = Field(None, max_length=500)

class ItemBase(BaseModel):
    name: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=500)

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str = Field(..., max_length=50)
    email: EmailStr
    full_name: Optional[str] = Field(None, max_length=100)

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True