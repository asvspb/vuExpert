# vuExpert

Full-stack проект на Vue 3 и FastAPI с использованием современных архитектурных подходов, PostgreSQL, Redis и Docker.

## Стек технологий

*   **Frontend**: Vue 3 (Composition API), Vite, SCSS, Vitest, Playwright
*   **Backend**: FastAPI, Poetry, SQLAlchemy (Async), PostgreSQL, Redis, Pytest
*   **Инфраструктура**: Docker & docker-compose

## Архитектура и Лучшие практики

В проекте используется директория `knowledge-packs/`, содержащая набор стандартов и лучших практик (Guardrails) для разработчиков и ИИ-агентов:
*   `git-discipline-v1.md` - Дисциплина Git и Conventional Commits
*   `depcruise-rules-v1.md` - Защита слоёв архитектуры через dependency-cruiser
*   `security-guardrails-v1/` - Скрипты для проверки безопасности
*   `tdd-loop-v1.md` - Руководство по TDD
*   `plan-then-execute-v1/` - Шаблоны для планирования задач

## Запуск проекта

Используйте Docker Compose для локального запуска всех сервисов (Frontend, Backend, PostgreSQL, Redis):
```bash
docker-compose up -d --build
```

Для прогона тестов бэкенда предусмотрен отдельный контейнер базы данных `postgres_test` (порт 5433, БД `vuexpert_test`).
