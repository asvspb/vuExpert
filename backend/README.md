# Директория backend

Эта директория содержит серверную часть приложения на FastAPI. База данных — PostgreSQL, кеширование — Redis.

## Структура

- `app/` - Основной код приложения
  - `main.py` - Входная точка приложения
  - `routers/` - Эндпоинты приложения (health, users, logs)
  - `models.py` - Модели базы данных (SQLAlchemy 2.0 DeclarativeBase)
  - `schemas.py` - Pydantic схемы для валидации данных
  - `crud.py` - Операции CRUD
  - `database.py` - Асинхронная конфигурация базы данных
  - `settings.py` - Управление конфигурацией (pydantic-settings)
  - `redis_client.py` и `limiter.py` - Настройки Redis и rate-limiting (slowapi)
- `tests/` - Асинхронные тесты (Pytest)
- `Dockerfile` - Инструкции сборки Docker-образа бэкенда
- `poetry.lock` и `pyproject.toml` - Зависимости (Poetry)
- `.env.example` - Шаблон переменных окружения