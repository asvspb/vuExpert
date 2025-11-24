# 🧾 Логирование во VueExpert: Структурированные логи и трассировка (Урок в формате MASTER_PROMPT)

### Контекст (Сюжет)
В проде тяжело разбирать инциденты: логи разрознены, нет request id, непонятно где тормозит.

### 1. Техническое Задание (ТЗ)
- Basic: JSON‑логи, reqId, время запроса; middleware access‑log
- Advanced: уровни/фильтры, структурирование payload, корреляция с trace/span id, вывод в файл/Stdout для Loki/ELK
- Файлы: `backend/app/logging.py`, `backend/app/main.py`
- Задача: включить структурированное логирование (JSON), добавить request id, время обработки запроса и middleware для логирования запросов/исключений.

### 2. Референс (Visual/Logic Target)
- Basic: строка лога с reqId/status/durMs
- Advanced: расширенное поле context, traceId/spanId
- Пример строки лога:
```
{"ts":"2025-01-01T12:00:00Z","level":"INFO","reqId":"...","path":"/api/orders","status":200,"durMs":42}
```

### 3. Теория (Just-in-Time)
- Basic: JSON‑логи, reqId, латентность
- Advanced: форматирование, уровни, ротация файлов, интеграция с Loki/ELK
- Структурированные логи проще парсить (ELK, Grafana Loki)
- Корреляция по reqId, метрики латентности

### 4. Практика (Interactive Steps)
- Basic: добавь middleware access‑log
- Advanced: добавь trace/span id, выведи в отдельный хендлер/файл; настрой парсинг в лог‑системе
Фрагмент для дополнения:
```py
import logging, json, time, uuid
logger = logging.getLogger('app')

@app.middleware('http')
async def access_log(request, call_next):
    req_id = request.headers.get('X-Request-Id') or str(uuid.uuid4())
    start = time.perf_counter()
    try:
        resp = await call_next(request)
    except Exception:
        logger.exception('unhandled', extra={'reqId': req_id})
        raise
    dur = int((time.perf_counter() - start) * 1000)
    logger.info(json.dumps({'reqId': req_id, 'path': request.url.path, 'status': resp.status_code, 'durMs': dur}))
    return resp
```

### 5. Чек-лист Самопроверки (Verification)
- Basic:
  - [ ] JSON‑формат, reqId, durMs
- Advanced:
  - [ ] traceId/spanId добавлены, уровни/фильтры настроены
- [ ] JSON‑формат
- [ ] reqId на каждый запрос
- [ ] Логируются ошибки с трассировкой

### 6. Возможные ошибки (Troubleshooting)
- Блокирующие хендлеры логгера → используйте неблокирующие/буферизированные
- Шум в логах → настройте уровни/фильтры

### 7. Решение (Spoiler)
<details>
<summary>Показать эталон</summary>

```py
import logging
logging.basicConfig(level=logging.INFO)
```
</details>

---
