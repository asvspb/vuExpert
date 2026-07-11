import redis.asyncio as redis
from .settings import settings

redis_client = redis.from_url(
    f"redis://{settings.redis_host}:{settings.redis_port}",
    encoding="utf-8",
    decode_responses=True,
)
