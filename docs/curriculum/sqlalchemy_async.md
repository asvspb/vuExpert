# ⚙️ SQLAlchemy 2.0 Async: двигатель и топливо

Метафора: движок — ваш корабль, сессия — топливо, транзакции — курс. Летим быстро и безопасно.

---

## 🟢 ЧАСТЬ 1. BASIC: Стартуем на SQLite

### 🚀 Модуль SA1. Движок и сессия
```python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
engine = create_async_engine("sqlite+aiosqlite:///./app.db", future=True)
SessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
async def get_db():
    async with SessionLocal() as session:
        yield session
```

### 🧭 Модуль SA2. Транзакции и создание схемы
```python
async with engine.begin() as conn:
    await conn.run_sync(Base.metadata.create_all)

async with SessionLocal() as session:
    async with session.begin():
        session.add(obj)
```

### 🔎 Модуль SA3. Запросы
```python
from sqlalchemy import select
res = await session.execute(select(User).where(User.id == 1))
user = res.scalar_one_or_none()
```

### 🕹 Практика (BASIC)
- Создайте модель Item и сохраните её в транзакции, затем прочитайте.

### ✅ Чек‑лист (BASIC)
- [ ] Async engine + async_sessionmaker
- [ ] Один Session на запрос (DI)
- [ ] Явные транзакции при изменениях

---

## 🔵 ЧАСТЬ 2. ADVANCED: Под парусами Postgres

### ⛵️ Модуль SA4. Переход на Postgres
- DATABASE_URL с приоритетом (postgresql+asyncpg://…)
- Установить asyncpg
- Миграции через Alembic (см. Alembic Cookbook)

### 🧰 Модуль SA5. Паттерны
- expire_on_commit=False для удобства
- Не смешивать sync/async API
- N+1: используйте selectinload/joinedload при необходимости

### 🧨 Модуль SA6. Отладка
- echo=True для логов SQL
- Логи соединений/пулов

### 🕹 Практика (ADVANCED)
- Переключите проект на Postgres, прогоните миграции, убедитесь, что тесты проходят

### ✅ Чек‑лист (ADVANCED)
- [ ] DATABASE_URL (asyncpg)
- [ ] Alembic ревизии применены
- [ ] Тесты зелёные
