# 🌐 httpx essentials: быстрые и безопасные HTTP

Метафора: ваш клиент — разведчик. Он должен быть быстрым, тихим и уметь отступать при опасности (таймауты/ретраи).

---

## 🟢 ЧАСТЬ 1. BASIC: Разведка

### 🚶 Модуль HX1. Первая вылазка
```python
import httpx
async with httpx.AsyncClient(base_url="http://localhost:8000", timeout=10.0) as client:
    r = await client.get("/health")
    r.raise_for_status()
```

### ⏱ Модуль HX2. Таймауты
```python
import httpx
async with httpx.AsyncClient(timeout=httpx.Timeout(5.0)) as client:
    r = await client.get("/counter")
```

### 🕹 Практика (BASIC)
- Получите /health, проверьте статус 200 и поля JSON

### ✅ Чек‑лист (BASIC)
- [ ] AsyncClient
- [ ] Явный timeout

---

## 🔵 ЧАСТЬ 2. ADVANCED: Выживание

### 🔁 Модуль HX3. Ретраи (ручной)
```python
for _ in range(3):
  try:
    return await client.get("/counter")
  except httpx.HTTPError:
    await asyncio.sleep(0.2)
```

### 🧪 Модуль HX4. Тестирование без сервера
```python
async with httpx.AsyncClient(app=app, base_url="http://test") as client:
    r = await client.get("/items")
```

### 🕹 Практика (ADVANCED)
- Напишите helper с ретраями и тест на него

### ✅ Чек‑лист (ADVANCED)
- [ ] Обрабатываем временные ошибки
- [ ] In‑process тесты быстрые и стабильные
