# 🔐 Авторизация во VueExpert: JWT (access + refresh) и сессии (Урок в формате MASTER_PROMPT)

### Контекст (Сюжет)
Пользователи должны входить в систему и оставаться авторизованными без «вылетов». Требуется безопасная схема: короткий access‑токен в памяти и длинный refresh‑токен в HttpOnly cookie с ротацией.

### 1. Техническое Задание (ТЗ)
- Basic: реализовать /auth/login, /auth/logout, /me; access в памяти, refresh в HttpOnly cookie (SameSite=Lax)
- Advanced: /auth/refresh с ротацией refresh и трекингом в БД/Redis; защита от повторного использования; ограничение по устройствам
- Фронт (Vue): страница входа, хранение access в памяти (Pinia/композабл), автоматическое обновление через refresh.
- Бэк (FastAPI): ручки `/auth/login`, `/auth/refresh`, `/auth/logout`, `/me`.
- Требования безопасности:
  - Refresh в HttpOnly + SameSite=Lax/Strict
  - Ротация refresh (новый на каждый refresh)
  - CORS: whitelist 5173/4173

### 2. Референс (Visual/Logic Target)
- Basic: логин/логаут, /me; refresh устанавливается/удаляется
- Advanced: refresh-rotation: Set-Cookie new refresh на /auth/refresh; отзыв старого токена
- POST `/auth/login` → Set‑Cookie: refresh=... (HttpOnly); body: { access: '...' }
- POST `/auth/refresh` → Set‑Cookie: refresh=...; body: { access: '...' }
- GET `/me` с заголовком `Authorization: Bearer <access>` → 200 и профиль
- POST `/auth/logout` → удаляет refresh cookie

### 3. Теория (Just-in-Time)
- Basic: access короткий; refresh в HttpOnly; SameSite
- Advanced: ротация refresh, трекинг, фиксация сессий по устройству/IP, защита от replay
- Access (короткий, 5–15 мин) в памяти → XSS не крадёт cookie
- Refresh (длинный, 7–30 дней) в HttpOnly cookie → защита от XSS; CSRF мерой — SameSite и double‑submit token при необходимости
- Ротация refresh + трекинг в БД/Redis → отзыв токенов

### 4. Практика (Interactive Steps)
- Basic: реализуй /auth/login,/logout,/me; фронт хранит access в памяти
- Advanced: добавь /auth/refresh с ротацией; храни идентификаторы refresh в Redis и инвалидируй старые
Фрагменты к доработке:
```py
# backend/app/routes/auth.py
@router.post('/auth/login')
async def login(creds: LoginSchema, response: Response):
    # ___FILL___: проверить пользователя, выдать access и refresh, записать refresh (идентификатор) в БД/Redis
    # response.set_cookie('refresh', refresh_jwt, httponly=True, samesite='lax', secure=False)
    return { 'access': issue_access(user_id) }

@router.post('/auth/refresh')
async def refresh(request: Request, response: Response):
    # ___FILL___: прочитать refresh cookie, валидировать/найти в хранилище, выдать новый access и переротировать refresh
    return { 'access': issue_access(user_id) }

@router.post('/auth/logout')
async def logout(request: Request, response: Response):
    # ___FILL___: инвалидировать refresh и очистить cookie
    return { 'ok': True }
```
```js
// src/stores/auth.js (или composables/useAuth.js)
import { ref } from 'vue'
const access = ref('')
export async function login(email, password) {
  const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
  const data = await r.json()
  access.value = data.access // хранить в памяти
}
export function authHeader() {
  return access.value ? { Authorization: `Bearer ${access.value}` } : {}
}
```

### 5. Чек-лист Самопроверки (Verification)
- Basic:
  - [ ] refresh в HttpOnly+SameSite
  - [ ] /login,/logout,/me работают
- Advanced:
  - [ ] /refresh ротирует токен
  - [ ] Инвалидируются украденные refresh
- [ ] Refresh хранится в HttpOnly cookie с SameSite
- [ ] Access хранится только в памяти
- [ ] Ротация refresh реализована; logout инвалидирует
- [ ] /me возвращает профиль при валидном access

### 6. Возможные ошибки (Troubleshooting)
- Basic: CORS+credentials, неправильный SameSite
- Advanced: гонки при ротации refresh, reuse detection
- Хранение токенов в localStorage → XSS‑риск
- Нет ротации refresh → повторное использование украденного cookie
- CORS/Credentials не настроены → куки не ходят в dev

### 7. Решение (Spoiler)
- Basic и Advanced решения раздели в коде/комментариях ниже
<details>
<summary>Показать эталон</summary>

```py
from datetime import timedelta
from fastapi import APIRouter, Response, Request, HTTPException, Depends
from jose import jwt

REFRESH_TTL = timedelta(days=14)
ACCESS_TTL = timedelta(minutes=10)

# issue_access/issue_refresh — функции генерации JWT c sub=user_id и exp
# store_refresh/validate_refresh/rotate_refresh — операции с хранилищем refresh (БД/Redis)

@router.post('/auth/login')
async def login(creds: LoginSchema, response: Response):
    user = await authenticate(creds)
    if not user:
        raise HTTPException(401, 'invalid creds')
    access = issue_access(user.id, ACCESS_TTL)
    refresh = issue_refresh(user.id, REFRESH_TTL)
    await store_refresh(user.id, refresh)
    response.set_cookie('refresh', refresh, httponly=True, samesite='lax')
    return { 'access': access }

@router.post('/auth/refresh')
async def refresh(request: Request, response: Response):
    token = request.cookies.get('refresh')
    user_id = await validate_refresh(token)
    new_refresh = await rotate_refresh(user_id, token)
    access = issue_access(user_id, ACCESS_TTL)
    response.set_cookie('refresh', new_refresh, httponly=True, samesite='lax')
    return { 'access': access }

@router.post('/auth/logout')
async def logout(request: Request, response: Response):
    token = request.cookies.get('refresh')
    if token:
        await invalidate_refresh(token)
    response.delete_cookie('refresh')
    return { 'ok': True }
```
</details>

## Связанные материалы
- Куки: [cookies.md](./cookies.md)
- Безопасность (CSP, CSRF, Rate limit): [security.md](./security.md)
- HTTP клиенты и ретраи: [httpx_essentials.md](./httpx_essentials.md)
- Redis (rate limiting/сессии): [redis.md](./redis.md)

---
