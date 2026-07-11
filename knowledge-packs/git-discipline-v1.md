# git-discipline-v1

> Пак best practices по Git-дисциплине при разработке через ИИ-агентов. Версия v1.

## Ветвление

**Branch per task:** одна задача — одна ветка. Формат имён:
- `feat/<NNN>-slug` — новая фича (номер опционален)
- `fix/<NNN>-slug` — багфикс
- `refactor/<slug>` — рефакторинг
- `docs/...` — документация
- `chore/...` — chores

```
main (стабильный)
├── feat/012-user-auth
├── fix/015-login-redirect
└── chore/update-deps
```

## Коммиты

**Small atomic commits.** Одно логическое изменение — один коммит. Это позволяет pinpoint-откатить ошибку ИИ-агента.

**Conventional Commits** (есть commitlint):
```
<type>(<scope>): <описание>

<опциональное тело>

<опциональные trailers>
```

Типы: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`, `perf`, `ci`.

**Примеры:**
```
feat(auth): добавить регистрацию по email
fix(transactions): корректный расчёт суммы при возврате
docs(api): обновить контракты в design.md
```

## AI-атрибуция (Co-Authored-By)

ИИ-сгенерированные коммиты помечай trailer для видимости доли ИИ-кода:

```
feat(auth): реализовать JWT-авторизацию

Co-Authored-By: Claude <noreply@anthropic.com>
```

Провайдеры:
- Claude: `Co-Authored-By: Claude <noreply@anthropic.com>`
- Gemini: `Co-Authored-By: Gemini <noreply@google.com>`
- Copilot: `Co-Authored-By: Copilot <noreply@github.com>`
- Cursor: `Co-Authored-By: Cursor <noreply@cursor.sh>`
- ZCode/GLM: `Co-Authored-By: GLM <noreply@z.ai>`

Hook `commit-msg` напоминает о trailer (см. `security-guardrails-v1/ai-trailer-check.sh`).

## Золотое правило

> **Никогда не коммить код, который ты не можешь объяснить.**

Если ИИ-агент сгенерировал код, который ты не понимаешь — разберись перед коммитом. Непонятный код = будущий баг.

## Workflow слияния

1. PR создан из ветки задачи.
2. **Ревью** (другой моделью или человеком) — см. `cross-model-review-v1.md`.
3. **CI зелёный** — lint/test/depcruise прошли.
4. **Squash-merge** в main (один чистый коммит на задачу).
5. Удалить ветку задачи.

## Антипаттерны

- ❌ Гигантские монолитные коммиты «AI changes» — невозможно откатить точечно.
- ❌ Коммит напрямую в main без PR.
- ❌ `git push --force` в общие ветки.
- ❌ Коммит с секретами (проверяй через `check-secrets.sh`).
- ❌ Сообщения без типа/области («fixed stuff», «update»).
