# 🍪 Куки во VueExpert: HttpOnly, SameSite и безопасная аутентификация (Урок в формате MASTER_PROMPT)

### Контекст (Сюжет)
Нужно безопасно хранить refresh‑токен и обмениваться сессией между фронтом (5173/4173) и бэком (8000). Куки должны быть защищены от XSS и корректно работать с CORS.

### 1. Техническое Задание (ТЗ)
- Basic: /cookies set/get/clear; корректные флаги HttpOnly, SameSite, Secure(в проде)
- Advanced: домены/поддомены, Path‑scoping, cookie‑prefixes (__Host‑, __Secure‑), безопасное удаление
- Бэк (FastAPI): ручки, которые выставляют/читают/удаляют куки: `/cookies/set`, `/cookies/get`, `/cookies/clear`.
- Фронт (Vue): запросы с учётом CORS и `credentials` (fetch/axios).
- Требования:
  - Refresh хранить в HttpOnly cookie, задать `SameSite=Lax` (или `Strict`/`None` в зависимости от домена) и `Secure` в проде
  - Уметь удалять cookie (правильный `path`/`domain`)

### 2. Референс (Visual/Logic Target)
- Basic: куки ставятся/читаются/чистятся
- Advanced: __Host‑refresh при HTTPS, Secure+SameSite=None под кросс‑домен
- `POST /cookies/set` → Set‑Cookie: refresh=...; HttpOnly; SameSite=Lax; Path=/; (Secure в проде)
- `GET /cookies/get` → `{ "hasRefresh": true }`
- `POST /cookies/clear` → удаляет refresh (Set‑Cookie c max‑age=0)

### 3. Теория (Just-in-Time)
- Basic: HttpOnly, SameSite, Secure, CORS+credentials
- Advanced: cookie prefixes (__Host‑, __Secure‑), правила удаления (path/domain)
- HttpOnly: недоступно JS (защита от XSS)
- SameSite: Lax/Strict/None — влияет на кросс‑сайтовые запросы
- Secure: шлём только по HTTPS (обязательно при SameSite=None)
- Path/Domain: должны совпадать при удалении, иначе cookie останется
- CORS и `credentials`: чтобы куки ходили в dev, нужны заголовки CORS + fetch с credentials

### 4. Практика (Interactive Steps)
- Basic: реализуй set/get/clear + фронт с credentials
- Advanced: настроить __Host‑refresh на HTTPS‑демо домене; проверить удаление при разных path/domain
Фрагменты к доработке (FastAPI):
```py
from fastapi import APIRouter, Request, Response
router = APIRouter()

@router.post('/cookies/set')
async def set_cookie(response: Response):
    token = 'refresh.jwt.token'  # TODO: сгенерировать валидный refresh
    response.set_cookie(
        key='refresh', value=token,
        httponly=True, samesite='lax', secure=False,  # secure=True в проде
        path='/'
    )
    return { 'ok': True }

@router.get('/cookies/get')
async def get_cookie(request: Request):
    has_refresh = 'refresh' in request.cookies
    return { 'hasRefresh': has_refresh }

@router.post('/cookies/clear')
async def clear_cookie(response: Response):
    response.delete_cookie(key='refresh', path='/')  # domain укажи, если задавался
    return { 'ok': True }
```
Фронт (Vue):
```js
// dev: proxy /api → 8000; важно: credentials: 'include'
await fetch('/api/cookies/set', { method: 'POST', credentials: 'include' })
const r = await fetch('/api/cookies/get', { credentials: 'include' })
const data = await r.json()
```

### 5. Чек-лист Самопроверки (Verification)
- Basic:
  - [ ] HttpOnly+SameSite
  - [ ] credentials: 'include' работает
- Advanced:
  - [ ] __Host‑ или __Secure‑ префиксы в проде
  - [ ] Корректное удаление с учётом path/domain
- [ ] Refresh устанавливается HttpOnly + SameSite
- [ ] Куки удаляются корректно (проверено в DevTools → Application → Cookies)
- [ ] Фронт отправляет запросы с credentials: 'include'
- [ ] CORS на бэке допускает credentials и нужные origin

### 6. Возможные ошибки (Troubleshooting)
- Куки не приходят на фронт → проверь `credentials: 'include'` и заголовки CORS (`Access-Control-Allow-Credentials: true`, `Access-Control-Allow-Origin` — точный origin)
- Не удаляется cookie → несовпадает path/domain
- SameSite=None без Secure → браузер отбросит cookie
- Пытаешься читать HttpOnly из JS → так и должно быть (невидимо для JS)

### 7. Решение (Spoiler)
<details>
<summary>Показать эталон</summary>

```py
# Пример CORS и secure cookie в проде
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173','http://localhost:4173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
# set_cookie(..., samesite='lax', secure=True) — в проде под HTTPS
```
</details>

---
