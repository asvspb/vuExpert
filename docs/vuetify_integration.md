# Интеграция Vuetify в проект

## Обзор

Vuetify - это компонентная библиотека для Vue.js, реализующая Material Design. В этом документе описывается процесс интеграции Vuetify в проект.

## Установка

Vuetify был установлен с помощью npm:

```bash
npm install vuetify @mdi/font
```

## Конфигурация

### Файл vuetify.js

Создан файл `src/vuetify.js` для инициализации Vuetify:

```javascript
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
})
```

### Интеграция с main.js

Vuetify был интегрирован в основной файл приложения `src/main.js`:

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './vuetify'
import './styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
```

## Использование

### Обновление App.vue

Основной компонент `src/App.vue` был обновлен для использования компонентов Vuetify:

- Обернут в `<v-app>` и `<v-main>`
- Использует `<v-container>`, `<v-btn>` и другие компоненты Vuetify

### Тестовый компонент

Создан тестовый компонент `src/components/VuetifyTestComponent.vue` для демонстрации использования Vuetify:

- Содержит примеры использования `<v-card>`, `<v-text-field>`, `<v-select>`, `<v-btn>` и других компонентов
- Демонстрирует работу с состояниями и событиями

## Совместимость со стилями

В файле `src/styles/main.scss` добавлены стили для обеспечения совместимости с Vuetify:

```scss
// Совместимость с Vuetify
.v-application {
  .container {
    @include container();
  }
  
  .btn {
    @include button-style($button-bg-color);
  }
}
```

## Использование

Для использования компонентов Vuetify в проекте:

1. Импортируйте нужные компоненты из 'vuetify/components'
2. Используйте компоненты с префиксом 'v-', например `<v-btn>`, `<v-card>`
3. Следуйте документации Vuetify для настройки свойств и событий

## Ресурсы

- [Официальная документация Vuetify](https://vuetifyjs.com/)
- [Руководство по началу работы](https://vuetifyjs.com/en/getting-started/installation/)