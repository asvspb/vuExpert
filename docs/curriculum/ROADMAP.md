# Учебный план (Roadmap): от новичка к мидлу

Этот план отражает естественное продвижение «от простого к сложному» и связывает темы так, как они используются в реальном проекте. Каждый раздел ссылается на соответствующие материалы в папке `docs/curriculum`.

> См. также общий словарь терминов: [GLOSSARY.md](./GLOSSARY.md)

Совет по темпу: завершайте практику и чек‑лист в конце каждого блока. Итоговые контрольные точки (Capstone) отмечены отдельно.

---

## Уровень 0. Ориентация и базовая среда
- Linux (essentials): навигация, процессы, сети, curl — [linux.md](./linux.md)
- Git: ветки, коммиты, PR, code review — [git.md](./git.md)
- HTML + CSS: семантика, блочная модель, сетки — [html.md](./html.md), [css.md](./css.md)
- JS: основы, модули, async/await — [js.md](./js.md)
- Инструменты: Vite (dev server), .env концепция — [vite.md](./vite.md), [python-dotenv.md](./python-dotenv.md)

## Уровень 1. Vue SPA (базовый фронтенд)
- Vue 3 + Composition API, `<script setup>` — [vue.md](./vue.md)
- SCSS и методология BEM — [css.md](./css.md), [bem.md](./bem.md)
- Vite: Dev (5173), Preview (4173), VITE_API_BASE_URL, PW_BASE_URL — [vite.md](./vite.md)
- Практика: каркас SPA, базовые компоненты и стили

## Уровень 2. Бэкенд FastAPI + SQLite (учебный режим)
- Python (essentials) — [py.md](./py.md)
- FastAPI: эндпоинты, схемы, ошибки — [fastapi.md](./fastapi.md)
- SQLAlchemy 2.0 Async (базово) — [sqlalchemy_async.md](./sqlalchemy_async.md)
- SQLite: особенности, конфиг по умолчанию — [sqlite.md](./sqlite.md)
- Redis (базово): счётчик, ping — [redis.md](./redis.md)
- Практика: `/health` (Redis + SQLite), CRUD, интеграция фронта и бэка

## Уровень 3. Тестирование (unit → integration → e2e)
- Vitest (фронт), Pytest + pytest-asyncio (бэк) — [tests.md](./tests.md)
- httpx essentials: AsyncClient, таймауты, in‑process — [httpx_essentials.md](./httpx_essentials.md)
- Playwright: baseURL и PW_BASE_URL — [tests.md](./tests.md)
- Практика: покрыть CRUD и `/health`, 1–2 e2e сценария

## Уровень 4. Инфраструктура и Docker (базовый)
- Docker/Compose: сервисы frontend/backend/redis — [docker.md](./docker.md)
- Healthcheck в Compose/Dockerfile — [docker_healthcheck.md](./docker_healthcheck.md)
- CORS в практике: 5173/4173, PW_BASE_URL — [fastapi.md](./fastapi.md), [security.md](./security.md)
- Практика: запуск всего стека через compose, e2e для preview

## Уровень 5. Продвинутый бэкенд и данные
- Pydantic: модели Create/Update/Read, строгие типы — [fastapi.md](./fastapi.md)
- SQLAlchemy 2.0 Async (advanced): загрузки, отладка — [sqlalchemy_async.md](./sqlalchemy_async.md)
- Архитектура FastAPI: APIRouter, слои, DI — [fastapi.md](./fastapi.md)
- Redis (advanced): пайплайны, транзакции, TTL — [redis.md](./redis.md)
- Практика: рефакторинг на роутеры, оптимизация запросов, кэширование

## Уровень 6. PostgreSQL и миграции
- PostgreSQL: сервис в compose, типы, роли — [postgres.md](./postgres.md)
- Переключение на asyncpg через DATABASE_URL — [sqlalchemy_async.md](./sqlalchemy_async.md)
- Alembic Cookbook: init, ревизии, upgrade/downgrade — [alembic_cookbook.md](./alembic_cookbook.md)
- Testcontainers (advanced): реальные Postgres/Redis — [testcontainers_advanced.md](./testcontainers_advanced.md)
- Практика: миграция проекта на PostgreSQL, адаптация тестов

## Уровень 7. Безопасность и прод‑практики
- CORS и базовая CSP — [security.md](./security.md)
- Документация и DevEx: README/Confluence, .env.example — [ai_developer_guide.md](../ai_developer_guide.md)
- CI/CD (обзор): прогон тестов и миграций — [tests.md](./tests.md), [docker.md](./docker.md)
- Практика: healthcheck, CSP, чек‑лист прод‑готовности


---

## Контрольные точки (Capstone)
- Capstone A (после Уровня 3–4): SPA + FastAPI + SQLite + Redis + тесты + docker-compose + e2e
- Capstone B (после Уровня 6): миграция на PostgreSQL, Alembic, интеграционные тесты с Testcontainers
- Capstone C (после Уровня 7): базовые настройки безопасности, healthcheck, документация

---

## Как работать с планом
- Закрывайте Практику и Чек‑лист в конце каждой темы
- Двигайтесь последовательно, но возвращайтесь к предыдущим уровням для укрепления базовых навыков
- Используйте репозиторий как «игровое поле»: каждая правка — шаг к Capstone
