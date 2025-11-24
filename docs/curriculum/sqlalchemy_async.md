# ⚙️ SQLAlchemy 2.0 Async: Engine/Session/Transactions (Урок в формате MASTER_PROMPT)

### Контекст (Сюжет)
Тебе нужно перевести проект на async ORM: безопасные транзакции, DI сессии и подготовка к Postgres.

### 1. Техническое Задание (ТЗ)
- Basic: engine+session, DI get_db, init схемы
- Advanced: шаблоны транзакций, прод-настройки соединений
- Файлы: `backend/app/database.py`, `backend/app/models.py`
- Задача: настроить `create_async_engine`, `async_sessionmaker`, DI `get_db` и инициализацию схемы.
- Условия: один Session на запрос; явные транзакции при изменениях.

### 2. Референс (Visual/Logic Target)
- Basic: engine+session, DI, init схемы
- Advanced: конфиг пулов, retry‑политика, транзакционные шаблоны
- Подключение к `sqlite+aiosqlite:///...`
- DI: `Depends(get_db)` в роутере
- Логика транзакции с `async with session.begin()`

### 3. Теория (Just-in-Time)
- Basic: async API различия
- Advanced: expire_on_commit=False, управление жизненным циклом соединений
- Разница sync/async в SQLAlchemy 2.0; зачем `expire_on_commit=False`
- Почему `engine.begin()` безопаснее для DDL

### 4. Практика (Interactive Steps)
- Basic: настроить engine/session/DI
- Advanced: добавить init/migrate шагообразно, транзакции на запись
Вставь заготовку и дополни пропуски:
```py
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
engine = create_async_engine('sqlite+aiosqlite:///./app.db', echo=True)
SessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
async def get_db():
    async with SessionLocal() as session:
        yield session
# ___FILL_DDL_CREATE___: Base.metadata.create_all via engine.begin()
```

### 5. Чек-лист Самопроверки (Verification)
- Basic:
  - [ ] async engine/session работают
- Advanced:
  - [ ] пулы/ретраи настроены
- [ ] async engine + async_sessionmaker
- [ ] DI: один Session на запрос
- [ ] Явные транзакции при изменениях

### 6. Возможные ошибки (Troubleshooting)
- Смешал sync/async API — упадёшь на RuntimeError
- Забыл `await` — ничего не выполнится
- Закрывай соединения через контекстные менеджеры

### 7. Решение (Spoiler)
<details>
<summary>Показать эталон</summary>

```py
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text

class Base(DeclarativeBase):
    pass

engine = create_async_engine('sqlite+aiosqlite:///./app.db', echo=False)
SessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db():
    async with SessionLocal() as session:
        yield session
```
</details>

---

# ⚙️ SQLAlchemy 2.0 Async: двигатель и топливо
> См. правила оценки: [MODULE_ASSESSMENT.md](./MODULE_ASSESSMENT.md)


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


## Оценка и проверка

- Квиз (теория)
  - Формат: 10-20 вопросов (JSON/YAML/Markdown‑банк).
  - Порог прохождения: ≥ 80% правильных ответов.
- Практика (код/задачи)
  - Репо‑ориентированные задания (вносятся в текущий проект).
  - Проверка: unit/integration/e2e тестами.
- Автопроверка (CI)
  - Фронт: Vitest (+ покрытие), линтеры (ESLint/Prettier).
  - Бэк: Pytest (httpx.AsyncClient), линтеры (ruff/flake8), покрытие.
  - E2E: Playwright (PW_BASE_URL).
- Рубрика
  - S (90–100): тесты зелёные, покрытие на уровне, стиль чистый, без smell‑ов.
  - A (80–89), B (70–79), C (<70) — по убыванию: недочёты/покрытие/падающие проверки.
- Remediation
  - Список провалов (из отчёта CI) → ссылки на соответствующие разделы учебника.
