# План добавления Poetry в проект (Backend / Python)

Цель: постепенно перевести backend на Poetry для управления зависимостями и сборкой, сохранив работоспособность Docker и CI на каждом этапе.

Подходит для Python 3.12 (см. текущий стек проекта) и существующих инструментов: FastAPI, SQLAlchemy[asyncio], pytest, ruff, testcontainers.

---

## Обзор стратегии (2 фазы)

- Фаза 1 (совместимость): добавляем `pyproject.toml` и используем Poetry локально. В CI и Docker продолжаем работать через `pip -r requirements.txt`, автоматически экспортируя совместимый `requirements.txt` из Poetry. Это снижает риск.
- Фаза 2 (полный переход): CI/Docker устанавливают зависимости через Poetry, кэшируют виртуальные окружения/артефакты и не используют `requirements.txt`.

Роллбэк: на любой фазе можно вернуться к установке через `requirements.txt` — достаточно остановиться на Фазе 1 и не переключать CI/Docker на Poetry.

---

## Предварительные требования

- Python 3.12 локально.
- Установленный Poetry (1.6+):
  - macOS/Linux: `curl -sSL https://install.python-poetry.org | python3 -`
  - Windows (PowerShell): `(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -`
- Проверьте: `poetry --version`

Рекомендуемые локальные настройки:

```bash
# хранить venv рядом с проектом (проще подключать в IDE)
poetry config virtualenvs.in-project true
```

---

## Фаза 1. Добавляем Poetry, не ломая CI/Docker

1) Инициализация Poetry в backend/

```bash
cd backend
poetry init --name "vueexpert-backend" --dependency fastapi --dependency "uvicorn[standard]" \
  --dependency redis --dependency aiosqlite --dependency "sqlalchemy" --dependency "sqlalchemy[asyncio]" \
  --dependency python-dotenv --dependency httpx --dependency testcontainers \
  --dev-dependency pytest --dev-dependency pytest-asyncio --dev-dependency pytest-cov --dev-dependency ruff
```

Альтернатива: создать `pyproject.toml` вручную (см. пример ниже).

2) Синхронизировать версии с текущим `backend/requirements.txt`

- В большинстве случаев достаточно незапиненных версий (совместимо с учебным проектом). При желании можно зафиксировать версии позже через `poetry lock`.

3) Установить зависимости и сгенерировать lock-файл

```bash
poetry install
```

4) Экспортировать requirements.txt для обратной совместимости

```bash
poetry export -f requirements.txt --output requirements.txt --without-hashes
```

Совет: добавьте команду экспорта в Makefile/скрипт, чтобы не забыть обновлять файл перед коммитом.

5) Локальный запуск тестов через Poetry

```bash
poetry run pytest -q --cov=app --cov-report=term-missing --cov-fail-under=50
poetry run ruff backend
```

6) Не меняем Docker и CI на этом шаге

- Dockerfile по-прежнему делает `pip install -r requirements.txt`.
- GitHub Actions CI по-прежнему делает `pip install -r backend/requirements.txt`.

7) .gitignore

Убедитесь, что добавлены:

```
backend/.venv/
```

Если у вас глобальный `.venv` (не в проекте) — этот шаг не обязателен.

---

## Фаза 2. Перевод Docker и CI на Poetry

Есть два паттерна — выберите один.

### Вариант A: Poetry внутри контейнера (нативная установка)

Плюсы: один источник истины (`pyproject.toml` + `poetry.lock`). Минус: чуть тяжелее слой установки.

Пример Dockerfile (backend/Dockerfile):

```dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=1.8.3 \
    POETRY_HOME=/opt/poetry

# Системные пакеты (при необходимости для сборки зависимостей)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl && rm -rf /var/lib/apt/lists/*

# Установка Poetry
RUN curl -sSL https://install.python-poetry.org | python3 - \
    && ln -s $POETRY_HOME/bin/poetry /usr/local/bin/poetry

WORKDIR /app

# Копируем только файлы декларации зависимостей для кеша
COPY pyproject.toml poetry.lock* ./

# В контейнере удобно ставить в системное окружение (без виртуального env)
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --only main

# Затем копируем остальной код
COPY .env .env
COPY app ./app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Для окружений с тестами можно добавить `--with dev` или отдельный слой с `poetry install --with dev` в CI-образе.

### Вариант B: Экспорт в requirements.txt на лету

Плюсы: минимальные изменения Dockerfile, быстрый билдинг. Минус: два артефакта (pyproject и exported requirements).

Dockerfile (минимальная правка):

```dockerfile
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Копируем декларацию зависимостей и экспортируем в reqs
COPY pyproject.toml poetry.lock* ./
RUN pip install --no-cache-dir --upgrade pip \ 
    && pip install --no-cache-dir poetry \ 
    && poetry export -f requirements.txt --output requirements.txt --without-hashes

# Устанавливаем зависимости по экспортированному файлу
RUN pip install --no-cache-dir -r requirements.txt

COPY .env .env
COPY app ./app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Обновление GitHub Actions CI

Фаза 1 (без переключения): оставить как есть и добавить шаг проверки экспорта при изменениях зависимостей.

Фаза 2 (полный переход):

```yaml
- name: Setup Poetry
  run: |
    python -m pip install --upgrade pip
    pip install poetry

- name: Install deps (backend)
  working-directory: backend
  run: |
    poetry install --no-interaction --no-ansi --with dev

# Кэш Poetry (ускорение)
- name: Cache Poetry
  uses: actions/cache@v4
  with:
    path: |
      ~/.cache/pypoetry
      ~/.cache/pip
    key: ${{ runner.os }}-poetry-${{ hashFiles('backend/poetry.lock') }}
    restore-keys: |
      ${{ runner.os }}-poetry-

- name: Lint (ruff)
  working-directory: backend
  run: poetry run ruff backend || true

- name: Test (pytest)
  working-directory: backend
  run: poetry run pytest -q --cov=app --cov-report=term-missing --cov-fail-under=50
```

Важно: укажите `working-directory: backend`, т.к. `pyproject.toml` находится внутри `backend/`.

---

## Пример минимального pyproject.toml (backend/pyproject.toml)

```toml
[tool.poetry]
name = "vueexpert-backend"
version = "0.1.0"
description = "VueExpert Backend (FastAPI, SQLAlchemy async)"
authors = ["Your Name <you@example.com>"]
packages = [{ include = "app" }]

[tool.poetry.dependencies]
python = "^3.12"
fastapi = "*"
"uvicorn" = {version = "*", extras = ["standard"]}
redis = "*"
aiosqlite = "*"
sqlalchemy = "*"
python-dotenv = "*"
httpx = "*"
# testcontainers используется рантайм/интеграционно в тестах, можно оставить в dev

[tool.poetry.group.dev.dependencies]
pytest = "*"
pytest-asyncio = "*"
pytest-cov = "*"
ruff = "*"
testcontainers = "*"

[tool.pytest.ini_options]
testpaths = ["tests"]
asyncio_mode = "auto"

[tool.ruff]
line-length = 100

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

Примечания:
- Вы можете перенести содержимое `backend/pytest.ini` в `[tool.pytest.ini_options]` (как показано) либо оставить файл как есть — оба пути валидны.
- Если `testcontainers` используется только в тестах — держите его в dev-группе.

---

## Команды повседневной работы

- Установка зависимостей: `poetry install`
- Добавить прод-зависимость: `poetry add fastapi` (или `poetry add "uvicorn[standard]"`)
- Добавить dev-зависимость: `poetry add -G dev pytest`
- Удалить зависимость: `poetry remove httpx` (или `poetry remove -G dev pytest`)
- Обновить зависимости: `poetry update`
- Экспорт в requirements.txt: `poetry export -f requirements.txt --output requirements.txt --without-hashes`
- Запуск команд: `poetry run <cmd>` (например, `poetry run uvicorn app.main:app --reload`)

---

## Типичные подводные камни и решения

- Разные интерпретаторы Python: убедитесь, что локально активен Python 3.12. Проверяйте `poetry env use 3.12`.
- Конфликт виртуальных окружений в IDE: включите `virtualenvs.in-project true`, укажите путь к `backend/.venv` в настройках IDE.
- Хеши при экспорте: флаг `--without-hashes` упрощает совместимость с `pip` на CI/Docker.
- Размер образа: при варианте A можно использовать `--only main` и multi-stage сборку для slim-образа.
- Переменные окружения: поведение `.env` остаётся прежним (загрузка через `python-dotenv` уже реализована в `app/main.py`).

---

## Чек-лист готовности

- [ ] `backend/pyproject.toml` создан и закоммичен
- [ ] `backend/poetry.lock` создан
- [ ] Локально проходят тесты через `poetry run pytest`
- [ ] Экспортируется и поддерживается `backend/requirements.txt` (Фаза 1)
- [ ] Обновлён Docker/CI по одному из вариантов (Фаза 2), пайплайн зелёный
- [ ] Документация в `docs/` обновлена (эта страница)

---

## Роллбэк-план

- Если что-то пошло не так на Фазе 2 — вернитесь к Docker/CI через `pip -r requirements.txt`.
- Сохраните `pyproject.toml`/`poetry.lock` — это не мешает прежнему процессу.
- При необходимости зафиксируйте рабочие версии через `poetry lock` и повторите экспорт.
