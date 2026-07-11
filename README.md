# vuExpert

Full-stack проект на Vue 3 и FastAPI с использованием современных архитектурных подходов, PostgreSQL, Redis и Docker.

## Стек технологий

*   **Frontend**: Vue 3 (Composition API), Vite, Tailwind CSS v4, Vue Router, Pinia, Vitest, Playwright
*   **Backend**: FastAPI, Poetry, SQLAlchemy 2.0 (Async), PostgreSQL, Redis, Pytest
*   **Инфраструктура**: Docker & docker-compose, система версионирования сборок (Vite inject & FastAPI env)

## Архитектура и Лучшие практики

В проекте используется директория `knowledge-packs/`, содержащая набор стандартов и лучших практик (Guardrails) для разработчиков и ИИ-агентов:
*   `git-discipline-v1.md` - Дисциплина Git и Conventional Commits
*   `depcruise-rules-v1.md` - Защита слоёв архитектуры через dependency-cruiser
*   `security-guardrails-v1/` - Скрипты для проверки безопасности
*   `tdd-loop-v1.md` - Руководство по TDD
*   `plan-then-execute-v1/` - Шаблоны для планирования задач

Для фронтенда настроен `dependency-cruiser`. Вы можете проверить архитектуру командой `npm run lint:deps` или сгенерировать визуальный граф зависимостей командой `npm run depcruise:graph` (необходим Graphviz).

## Запуск проекта

### С помощью Docker (рекомендуется)
Используйте Docker Compose для локального запуска всех сервисов (Frontend, Backend, PostgreSQL, Redis):
```bash
docker-compose up -d --build
```
Для прогона тестов бэкенда предусмотрен отдельный контейнер базы данных `postgres_test` (порт 5433, БД `vuexpert_test`). 
Основная база `postgres` пробрасывается на порт `5434` хост-машины во избежание конфликтов.

### Локальный запуск для разработки
1. Скопируйте `.env.example` в `.env` (в корне и в папке `backend`).
2. Запустите инфраструктуру (Redis, PostgreSQL): `docker-compose up -d redis postgres`
3. Бэкенд: 
   ```bash
   cd backend
   poetry install
   poetry run uvicorn app.main:app --reload
   ```
4. Фронтенд:
   ```bash
   npm install
   npm run dev
   ```

## Версионирование
В проекте настроен сквозной контроль версий сборок:
- **Фронтенд**: Во время сборки в `vite.config.js` подтягивается версия из `package.json` и метка времени. Они внедряются в глобальные переменные (`__APP_VERSION__`, `__BUILD_TIME__`) и выводятся в футере (App.vue).
- **Бэкенд**: FastAPI инстанцируется с версией из конфигурации (переменная `APP_VERSION`), которая отдается на эндпоинте `/health`. Фронтенд обращается к нему на дашборде.
