# AGENTS.md — контекст проекта для ИИ-агента

> **Прочитай этот файл целиком перед началом работы.** Здесь — что это за проект, как он устроен, какие команды запускать и где что искать. Это статический контекст; живой список изменений ведётся в `INDEX.md` (если есть) — обновляй его после правок.

<!--
  ШАБЛОН для fullstack-проектов (React + TypeScript + Vite / Express + Prisma + PostgreSQL + AI-прокси).
  Заполни все {{ПЛЕЙСХОЛДЕРЫ}} под свой проект, удали секции, которых нет, и этот комментарий.
  Целевой размер: 80–120 строк. Не раздувиай — агент должен реально читать файл целиком.
-->

## 1. О проекте

**{{PROJECT_NAME}}** — {{ОДНО ПРЕДЛОЖЕНИЕ: что делает приложение и для кого}}.

- **Домен:** {{напр. медиа/финтех/утилиты}}
- **Текущая версия:** {{X.Y}} (из `package.json`)
- **Статус:** {{прототип / в разработке / production}}

## 2. Стек технологий

| Слой | Технология | Версия |
|---|---|---|
| Frontend | React + TypeScript | {{React 18, TS 5.x}} |
| Сборщик frontend | Vite | {{6.x}} |
| Стили | Tailwind CSS | {{3.x}} |
| Состояние | Zustand / Context | {{...}} |
| Backend | Express | {{5.x}} |
| ORM | Prisma | {{5.x}} |
| БД | PostgreSQL | {{16}} |
| AI | {{Gemini/Mistral/OpenAI}} через серверный прокси | — |
| Тесты | Vitest (unit) + Playwright (e2e) | {{...}} |
| Линт | ESLint + Prettier | {{...}} |
| Деплой | Docker + {{deploy-скрипт}} | — |

## 3. Структура проекта

```
{{PROJECT_NAME}}/
├── src/                      # FRONTEND (React + TS)
│   ├── components/           # Переиспользуемые UI-компоненты (по доменам: auth/, layout/, ui/...)
│   ├── features/             # Крупные фичи (каждая = папка с компонентами/хуками/типами)
│   ├── hooks/                # Кастомные хуки (use*.ts)
│   ├── services/             # Сервисный слой: API-клиенты, интеграции
│   ├── store/                # Глобальное состояние (Zustand slices / Context)
│   ├── types/                # Общие TS-типы frontend
│   ├── utils/                # Чистые функции (форматирование, расчёты, логгинг)
│   └── App.tsx               # Корневой компонент + роутинг
├── server/                   # BACKEND (Express + Prisma)
│   ├── routes/               # HTTP-обработчики (по домену: auth.js, video.js, ai.js...)
│   ├── services/             # Бизнес-логика (вызывается из routes)
│   ├── repositories/         # Доступ к данным (Prisma queries изолированы здесь)
│   ├── middleware/           # Express middleware (auth, rate-limit, error-handler)
│   ├── schemas/              # Zod-схемы валидации запросов
│   ├── pipeline/             # Фоновые процессы / обработка очередей
│   ├── config/               # Конфигурация (env, порты, константы)
│   ├── index.js              # Точка входа Express-сервера
│   └── worker.js             # Фоновый воркер (крон-задачи, синхронизация)
├── shared/                   # Типы/утилиты, общие для frontend и backend
├── tests/                    # Unit-тесты (Vitest)
├── e2e/                      # E2E-тесты (Playwright)
├── prisma/                   # Схема БД + миграции (schema.prisma, migrations/)
├── scripts/                  # Bash/Node скрипты (deploy, миграции, утилиты)
├── public/                   # Статика
├── docs/                     # Документация (ARCHITECTURE.md, LOGGING.md...)
└── INDEX.md                  # Живой индекс изменений (обновляй после правок!)
```

## 4. Команды

| Команда | Что делает |
|---|---|
| `npm run dev` | Dev-сервер (frontend + backend) |
| `npm run build` | Production-сборка в `dist/` (только анализ/деплой, не для локальной работы) |
| `npm test` | Unit-тесты (Vitest) |
| `npm run test:e2e` | E2E-тесты (Playwright) |
| `npm run lint` | TypeScript-проверка + ESLint |
| `npm run db:migrate:dev` | Применить миграции Prisma локально |
| `{{npm run deploy}}` | Сборка + деплой Docker-образов |

## 5. Порты и окружение

- **Frontend:** http://localhost:{{3993}}
- **Backend:** http://localhost:{{3994}}

### Переменные окружения (`.env`, **НЕ коммитить**)
```
DATABASE_URL=postgresql://...        # строка подключения к PostgreSQL
JWT_ACCESS_SECRET=...                # секрет access-токенов (≥32 символа)
JWT_REFRESH_SECRET=...               # секрет refresh-токенов
{{GEMINI_API_KEY}}=...               # ключи AI — ТОЛЬКО на сервере, не в клиентский бандл
{{MISTRAL_API_KEY}}=...
```
Эталон значений — `.env.example`. Секреты никогда не класть в код и не отправлять в git.

## 6. Архитектурные конвенции

**Frontend**
- **Feature-based** структура: крупная фича = папка в `src/features/<Name>/` со своими компонентами/хуками/типами.
- Глобальное состояние — в `src/store/` (Zustand). Локальное — в `useState`/`hooks/`.
- API-вызовы — через `src/services/` (не напрямую `fetch` из компонентов).

**Backend**
- Слои: `routes` (HTTP) → `services` (бизнес-логика) → `repositories` (Prisma).
- Валидация входа — Zod-схемы в `server/schemas/`, применяются в middleware.
- Prisma-запросы **только** в `repositories/` — не размазывать по routes/services.

**Cross-cutting**
- Общие типы для frontend+backend — в `shared/`.
- **AI-ключи живут только на сервере.** Клиент обращается к `/api/ai/...`, сервер проксирует. Никогда не импортируй ключи в `src/` — они попадут в бандл.

## 7. Правила работы агента

Перед правками:
- [ ] Остановлен dev-сервер (`Ctrl+C`) — иначе конфликты файловых наблюдателей
- [ ] Прочитан этот файл и `INDEX.md`

После ЛЮБЫХ изменений:
- [ ] `npm test` — тесты зелёные
- [ ] `npm run lint` — без ошибок типов/линта
- [ ] Обновлён `INDEX.md` (новые файлы, изменённые типы, зависимости, архитектура)
- [ ] Секреты остались в `.env` (не в коде, не в коммите)

**Не трогать** (генерируется/устанавливается, не под версионным контролем по смыслу):
`node_modules/`, `dist/`, `server/dist/`, `.vite/`, `dev-dist/`, `coverage/`, `playwright-report/`.

## 8. Где что искать (навигация)

| Хочу изменить... | Иду в... |
|---|---|
| HTTP-маршрут / endpoint | `server/routes/<domain>.js` |
| Бизнес-логику фичи | `server/services/<domain>.js` |
| Запрос к БД / схему | `server/repositories/` + `prisma/schema.prisma` |
| Экран / страницу frontend | `src/features/<Name>/` или `src/components/` |
| Глобальное состояние | `src/store/` |
| Валидацию запроса | `server/schemas/` (Zod) |
| Фоновую задачу/крон | `server/worker.js`, `server/pipeline/` |
| AI-интеграцию | `server/services/` (proxy), `src/services/` (клиент) |
| Тип, общий для фронта и бэка | `shared/` |
| Команду (скрипт деплоя и т.п.) | `scripts/` |

## 9. Известные ограничения и грабли

- {{напр.: "feature-based структура мигрирует со старой — в `src/components/` ещё есть legacy-код"}}
- {{напр.: "Prisma-клиент генерируется в `node_modules/.prisma` — после `git pull` нужен `npm run build`"}}
- {{напр.: "AI-провайдер переключается через `AI_PROVIDER` env (gemini|mistral)"}}

<!--
  Источник шаблона: ~/Dev/my-coding/AGENTS.template.md
  После адаптации скопируй как AGENTS.md в корень конкретного проекта.
-->
