# Многоэтапная сборка Vite+Vue SPA

# Этап 1: сборка фронтенда
FROM node:18-alpine AS builder

WORKDIR /app

# Установим зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходники и собираем
COPY . .
RUN npm run build

# Этап 2: легкий образ для отдачи статики через vite preview
FROM node:18-alpine AS runner

WORKDIR /app

# Копируем только прод-артефакты и файлы, нужные для preview
COPY package*.json ./
COPY --from=builder /app/dist ./dist

# По умолчанию Vite preview слушает 4173 порт
ENV PORT=4173
EXPOSE 4173

# Устанавливаем только prod-зависимости (их у нас немного)
RUN npm ci --only=production || npm ci

# Команда запуска: preview production-сборки
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]

