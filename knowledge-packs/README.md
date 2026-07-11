# knowledge-packs — версионированные best practices

> Каждый пак — это самодостаточный набор правил/скриптов для одной практики. Версия в суффиксе (`-v1`). Паки подмешиваются в AGENTS.md сгенерированного проекта и работают как страховка от типичных ошибок ИИ-агентов.

## Индекс паков

| Пак | Что внутри | Тип |
|---|---|---|
| [`agents-context-v1.md`](./agents-context-v1.md) | Шаблон AGENTS.md (контекст для агента) | markdown |
| [`security-guardrails-v1/`](./security-guardrails-v1/) | `check-secrets.sh` (блок секретов) + `ai-trailer-check.sh` (атрибуция) | скрипты |
| [`git-discipline-v1.md`](./git-discipline-v1.md) | branch-per-task, conventional commits, AI-trailers | markdown |
| [`plan-then-execute-v1/`](./plan-then-execute-v1/) | Шаблон `plan.md` + правило «план для задач >3 файлов» | markdown+шаблон |
| [`depcruise-rules-v1.md`](./depcruise-rules-v1.md) | Защита слоёв архитектуры через dependency-cruiser | markdown |
| [`tdd-loop-v1.md`](./tdd-loop-v1.md) | Тесты как спецификация, generate-test-fix цикл | markdown |
| [`cross-model-review-v1.md`](./cross-model-review-v1.md) | Разделение generation и verification | markdown |

## Версионирование

- Суффикс `-vN` в имени пакa (v1, v2, ...).
- Мажорные изменения — новый пак (`-v2`), старый остаётся для обратной совместимости.
- При генерации проекта версия паков записывается в `.template-version` (см. `../updates/`).

## Как применяются паки

1. **Агент** при генерации проекта (HOW-IT-WORKS.md, Этап 4) читает нужные паки.
2. Скрипты (`security-guardrails-v1/`) копируются в `<проект>/scripts/`.
3. Правила (git/discipline/depcruise/tdd/review) встраиваются в `AGENTS.md` как разделы.
4. Шаблоны (`plan-template.md`) копируются в `<проект>/docs/_templates/`.

## Как добавить новый пак

1. Создай файл `<name>-v1.md` (или каталог `<name>-v1/` для многокомпонентных).
2. Добавь строку в таблицу выше.
3. Если пак копируется в проект — обнови HOW-IT-WORKS.md (Этап 4).
4. Упомяни пак в README.md корня фреймворка.
