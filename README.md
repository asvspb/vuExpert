# VueExpert

Проект VueExpert - это современное веб-приложение, разработанное с использованием фреймворка Vue.js. Проект включает в себя примеры работы с базами данных (SQLite, Redis), компоненты для документации и стилизацию с использованием SCSS.

## Переменные окружения

- Для фронтенда используем `VITE_API_BASE_URL` (см. docs/environment_variables.md)
- Для e2e тестов можно указать `PW_BASE_URL` (5173 для dev, 4173 для docker preview)


Для конфигурации приложения используйте .env файлы:

- `backend/.env` - конфигурация для бэкенда
- `.env` - конфигурация для фронтенда

Смотрите `docs/environment_variables.md` для подробной информации о доступных переменных.

## Структура проекта

- `.gitignore` - файл настроек игнорирования файлов для Git
- `index.html` - основной HTML-файл приложения
- `package.json` - файл зависимостей и настроек проекта
- `package-lock.json` - файл блокировки версий зависимостей
- `vite.config.js` - конфигурационный файл Vite
- `.qodo/` - директория для служебных файлов
  - [README.md](.qodo/README.md) - описание назначения директории
- `src/` - исходный код приложения
  - `App.vue` - главный компонент приложения
  - `main.js` - точка входа в приложение
  - [README.md](src/README.md) - описание директории src
  - `components/` - компоненты Vue
    - [README.md](src/components/README.md) - описание компонентов
  - `styles/` - файлы стилей
    - [README.md](src/styles/README.md) - описание стилевых файлов

## Запуск проекта

1. Установите зависимости: `npm ci`
2. Dev-сервер: `npm run dev` (по умолчанию порт 5173)
3. Сборка: `npm run build`
4. Preview (локально): `npm run preview` (порт 4173)

Дополнительно:
- Линтинг кода и стилей: `npm run lint`
- Только стили: `npm run lint:css`, автоисправление: `npm run lint:css:fix`
- Unit-тесты: `npm run test` / покрытие: `npm run test:coverage`
- E2E: `npm run e2e` (PW_BASE_URL берётся из окружения)

## Стек и линтеры
- Frontend: Vue 3 (Composition API + `<script setup>`), Vite, SCSS
- Backend: FastAPI, SQLAlchemy Async, SQLite/Redis (старт), PostgreSQL (прод)
- Линтеры:
  - ESLint (flat config `eslint.config.js`) + плагины: `eslint-plugin-vue`, `eslint-plugin-vuejs-accessibility`
  - Stylelint (`.stylelintrc.cjs`) с правилами BEM + поддержкой Vue SFC
- Конвенции стилей: BEM (`block__element--modifier`), допускаются `u-*` (утилиты) и `is-*` (состояния)

## Прокси и порты
- Dev: фронт 5173, бэкенд 8000; preview: 4173
- В dev рекомендуем proxy `/api` и `/ws` в `vite.config.js`

## Зависимости

Проект использует Vue.js, Vite и другие библиотеки, перечисленные в package.json.