from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    app_version: str = "0.1.0"
    database_url: str = "sqlite+aiosqlite:////app/data/db.sqlite"
    redis_host: str = "redis"
    redis_port: int = 6379
    cors_origins: List[str] = ["http://localhost:4173", "http://localhost:5173"]
    db_echo: bool = False
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
