# Промт для репликации архитектуры проекта vuExpert

## Общее описание

Этот промт предназначен для создания точной копии архитектуры учебной платформы vuExpert. Проект представляет собой полноценную учебную платформу с фронтендом на Vue 3 и бэкендом на FastAPI, интегрированными через Docker Compose.

## Технические требования

### Фронтенд

1. **Технологии:**
   - Vue 3 (Composition API)
   - TypeScript
   - Vuetify 3
   - Pinia (управление состоянием)
   - Vue Router
   - Axios
   - VueUse
   - Vite (сборка)
   - Vitest (тестирование)

2. **Структура проекта:**
```
src/
├── main.ts                      # Точка входа
├── env.d.ts                     # Типы TypeScript
├── router/
│   └── index.ts                 # Маршруты
├── stores/
│   ├── index.ts                 # Экспорт всех stores
│   ├── counter.ts               # Store счётчика
│   └── app.ts                   # Глобальный store
├── views/                       # Страницы
├── components/                  # Компоненты
├── composables/                 # Композиционные функции
├── services/                    # API сервисы
├── types/                       # Типы TypeScript
└── styles/                      # SCSS стили
```

3. **Основные зависимости:**
```json
{
  "dependencies": {
    "@mdi/font": "^7.4.47",
    "@vueuse/core": "^14.1.0",
    "axios": "^1.13.2",
    "pinia": "^3.0.4",
    "vue": "^3.4.21",
    "vue-router": "^4.6.3",
    "vuetify": "^3.11.2"
  }
}
```

### Бэкенд

1. **Технологии:**
   - FastAPI
   - SQLAlchemy (async)
   - Redis
   - SQLite
   - Uvicorn
   - Poetry (управление зависимостями)

2. **Структура проекта:**
```
backend/
├── app/
│   ├── __init__.py
│   ├── crud.py                  # Операции с БД
│   ├── database.py             # Настройка БД
│   ├── main.py                 # Основное приложение
│   ├── models.py               # Модели БД
│   └── schemas.py              # Pydantic схемы
├── tests/                      # Тесты
├── Dockerfile
├── pyproject.toml              # Зависимости
└── README.md
```

3. **Основные зависимости:**
```toml
[tool.poetry.dependencies]
python = "^3.12"
fastapi = "*"
uvicorn = {version = "*", extras = ["standard"]}
redis = "*"
aiosqlite = "*"
python-dotenv = "*"
httpx = "*"
sqlalchemy = {extras = ["asyncio"], version = "^2.0.44"}
```

### Инфраструктура

1. **Docker Compose:**
```yaml
version: "3.9"

services:
  frontend:
    build: .
    ports:
      - "7845:7845"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "9532:9532"
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    ports:
      - "8721:8721"
```

2. **Переменные окружения:**
```
# Фронтенд
VITE_API_BASE_URL=http://backend:9532

# Бэкенд
REDIS_HOST=redis
REDIS_PORT=8721
SQLITE_PATH=/app/data/db.sqlite
CORS_ORIGINS=http://localhost:7845,http://localhost:5173
```

## Архитектурные компоненты

### Фронтенд

1. **Основные компоненты:**
   - `App.vue` - корневой компонент
   - `router/index.ts` - маршрутизация
   - `stores/` - управление состоянием (Pinia)
   - `composables/` - бизнес-логика
   - `services/` - API сервисы

2. **Пример маршрутизации:**
```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/vuetify-demo',
    name: 'VuetifyDemo',
    component: () => import('../views/VuetifyDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### Бэкенд

1. **Основные эндпоинты:**
   - `GET /health` - проверка состояния
   - `GET /counter` - пример счётчика
   - `POST /items/` - создание элемента
   - `GET /items/` - получение элементов
   - `GET /users/` - получение пользователей

2. **Пример FastAPI приложения:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="VueExpert Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
```

## Инструкции по развертыванию

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd vuExpert
```

### 2. Настройка фронтенда

```bash
cd frontend
npm install
npm run dev
```

### 3. Настройка бэкенда

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```

### 4. Запуск через Docker Compose

```bash
docker-compose up --build
```

### 5. Проверка работоспособности

- Фронтенд: http://localhost:7845
- Бэкенд: http://localhost:9532
- Health check: http://localhost:9532/health

## Ключевые особенности

1. **Интеграция Redis:** Используется для кэширования и счётчиков
2. **SQLite:** Легковесная база данных для разработки
3. **CORS:** Настроен для взаимодействия между фронтендом и бэкендом
4. **TypeScript:** Полная типизация на фронтенде
5. **Pinia:** Современное управление состоянием
6. **Vuetify:** UI компоненты с Material Design
7. **Docker:** Контейнеризация для удобного развертывания

## Дополнительные материалы

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

Этот промт содержит всю необходимую информацию для точной репликации архитектуры проекта vuExpert. Следуя этим инструкциям, любой ИИ сможет развернуть аналогичную систему.