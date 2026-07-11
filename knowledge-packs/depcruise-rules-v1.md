# depcruise-rules-v1

> Пак best practices по защите слоёв архитектуры через dependency-cruiser. Версия v1.

## Зачем

ИИ-агенты часто нарушают слоистую архитектуру: кладут бизнес-логику в маршруты, импортят React в сервисах, создают циклы. dependency-cruiser ловит это **детерминированно** — до коммита.

## Базовые правила (для любого стека)

```js
// .dependency-cruiser.cjs
{
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true }
    },
    {
      name: 'not-to-unresolvable',
      severity: 'error',
      from: {},
      to: { couldNotResolve: true }
    },
    {
      name: 'no-orphans',
      severity: 'warn',
      from: { orphan: true },
      to: {}
    }
  ]
}
```

## Защита слоёв (fullstack)

**Принцип:** доменные/нижние слои не зависят от UI-слоёв.

```js
// Frontend: доменные слои изолированы от UI
{
  name: 'no-utils-to-components',
  severity: 'error',
  from: { path: '^src/(utils|lib|services)' },
  to: { path: '^src/components' }
},
{
  name: 'no-services-to-react',
  severity: 'error',
  from: { path: '^src/(services|store|utils)' },
  to: { path: '(react|react-dom|lucide-react|motion)' }
},
// Backend: репозитории не зависят от маршрутов
{
  name: 'no-repo-to-routes',
  severity: 'error',
  from: { path: '^server/repositories' },
  to: { path: '^server/routes' }
}
```

## Интеграция

- **pre-commit hook:** `.husky/pre-commit` вызывает `npm run depcruise` (или `lint:deps`).
- **CI:** `ci.yml` запускает depcruise на каждый PR.
- **Скрипт:** `depcruise:graph` генерирует SVG-визуализацию зависимостей (требует graphviz).

## Когда добавлять новые правила

При появлении нового архитектурного домена (новая фича, новый слой) — добавь правило, защищающее его границы. Правило = страховка от дрейфа архитектуры под руками ИИ-агента.
