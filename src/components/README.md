# Директория src/components

Эта директория содержит компоненты Vue.js для клиентской части приложения.

## Структура

- `DatabaseConnectionExample.vue` - Пример компонента для подключения к базе данных
- `DatabaseExample.vue` - Пример компонента для работы с базой данных
- `Documentation.vue` - Компонент для отображения документации
- `HelloWorld.vue` - Простой пример компонента
- `__tests__/` - Тесты для компонентов

## Добавление компонентов вручную

Для добавления нового компонента в проект следуйте этим шагам:

### 1. Создание файла компонента

Создайте `.vue` файл в директории `src/components/` с именем компонента в PascalCase. Структура компонента должна включать:

```vue
<template>
  <div class="component-name">
    <!-- Ваш HTML код -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Определите здесь ваши props, emit и логику компонента
defineProps({
  // props
})

defineEmits(['event'])

const state = ref('default value')
</script>

<style scoped>
.component-name {
  /* Стили компонента */
}
</style>
```

### 2. Использование компонента

#### В роутерах (для страниц):

1. Добавьте компонент в `src/router/index.js`:
```javascript
// Добавьте импорт с lazy loading
const YourComponent = () => import('../components/YourComponent.vue')

// Добавьте маршрут в массив routes
{
  path: '/your-route',
  name: 'your-route',
  component: YourComponent,
  meta: { title: 'Название страницы' }
}
```

#### В других компонентах:

1. Импортируйте в компоненте, где хотите использовать:
```javascript
import YourComponent from './components/YourComponent.vue'
```

2. Используйте в шаблоне:
```vue
<template>
  <YourComponent prop-value="some value" @event="handleEvent" />
</template>
```

### 3. Обновление документации

После добавления компонента обновите этот файл, добавив описание нового компонента в раздел "Структура".

## Для ИИ агентов

При внесении изменений в файлы проекта, пожалуйста, обновляйте этот README.md файл, чтобы отразить новые изменения в структуре или содержимом директории. Укажите, какие файлы были добавлены, изменены или удалены, и кратко опишите назначение этих изменений.
