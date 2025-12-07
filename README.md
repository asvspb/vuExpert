# vutrAIder - Vue 3 + TypeScript + Vuetify Project

## 📋 Технологии

- **Vue 3** (Composition API)
- **TypeScript** (полная типизация)
- **Vuetify 3** (UI компоненты)
- **Pinia** (управление состоянием)
- **Vue Router** (маршрутизация)
- **Axios** (HTTP клиент)
- **VueUse** (композиционные функции)
- **Vite** (сборка)
- **Vitest** (тестирование)

## 📁 Структура проекта

```
src/
├── main.ts                      # Entry point (TypeScript)
├── env.d.ts                     # Type declarations
├── router/
│   └── index.ts                 # Маршруты (TypeScript)
├── stores/
│   ├── index.ts                 # Экспорт всех stores
│   ├── counter.ts               # Store счётчика
│   └── app.ts                   # Глобальный store
├── views/
│   └── VuetifyDemo.vue          # Страницы (TypeScript)
├── components/
│   ├── HelloWorld.vue           # Компоненты (TypeScript)
│   └── ...
├── composables/
│   ├── useCounter.ts            # Бизнес-логика
│   ├── useNotify.ts             # Уведомления
│   └── useApi.ts                # API обертка
├── services/
│   ├── api.ts                   # Axios instance
│   └── itemsService.ts          # API сервисы
├── types/
│   ├── index.ts                 # Общие типы
│   └── api.ts                   # API типы
└── styles/
    ├── main.scss
    ├── variables.scss
    └── mixins.scss
```

## 🛠️ Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Собрать для продакшена
npm run build

# Запустить тесты
npm run test

# Проверка типов TypeScript
npm run type-check
```

## 🎯 Основные возможности

- Полная интеграция TypeScript
- Pinia для управления состоянием
- Axios с интерсепторами для API запросов
- Vuetify 3 для UI компонентов
- Vue Router для навигации
- ESLint и Stylelint для качества кода
- Vitest для тестирования

## 📝 Документация

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)

## 🔧 Разработка

Проект настроен для удобной разработки с:
- Горячей перезагрузкой (HMR)
- Проверкой типов в реальном времени
- ESLint интеграцией
- Поддержкой SCSS