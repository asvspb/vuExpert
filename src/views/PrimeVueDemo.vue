<template>
  <div class="primevue-demo">
    <div class="demo-header">
      <h1>Демонстрация компонентов PrimeVue</h1>
      <p>Эта страница показывает дополнительные компоненты PrimeVue, не представленные на главной странице</p>
    </div>

    <div class="demo-section">
      <h2>Уведомления (Toast)</h2>
      <div class="button-group">
        <Button label="Показать успех" @click="showSuccess" class="p-button-success" />
        <Button label="Показать ошибку" @click="showErrorToast" class="p-button-danger" />
        <Button label="Показать информацию" @click="showInfo" class="p-button-info" />
        <Button label="Показать предупреждение" @click="showWarn" class="p-button-warning" />
      </div>
      <Toast />
    </div>

    <div class="demo-section">
      <h2>Диалоговые окна (Dialog)</h2>
      <Button label="Открыть диалог" @click="visible = true" />
      <Dialog v-model:visible="visible" header="Заголовок диалога" :modal="true" :style="{ width: '50vw' }">
        <p>Это модальное диалоговое окно PrimeVue. Вы можете разместить здесь любой контент.</p>
        <template #footer>
          <Button label="Отмена" @click="visible = false" class="p-button-text" />
          <Button label="Сохранить" @click="visible = false" autofocus />
        </template>
      </Dialog>
    </div>

    <div class="demo-section">
      <h2>Прогресс бар (ProgressBar)</h2>
      <div class="progress-demo">
        <ProgressBar :value="progressValue" />
        <div class="progress-controls">
          <Button label="Увеличить" @click="increaseProgress" class="p-button-primary" />
          <Button label="Сбросить" @click="resetProgress" class="p-button-secondary" />
        </div>
        <p>Текущее значение: {{ progressValue }}%</p>
      </div>
    </div>

    <div class="demo-section">
      <h2>Календарь (Calendar)</h2>
      <div class="calendar-demo">
        <Calendar v-model="date" :showIcon="true" dateFormat="dd.mm.yy" />
        <p>Выбранная дата: {{ date ? date.toLocaleDateString('ru-RU') : 'Не выбрана' }}</p>
      </div>
    </div>

    <div class="demo-section">
      <h2>Слайдер (Slider)</h2>
      <div class="slider-demo">
        <Slider v-model="sliderValue" :min="0" :max="100" />
        <p>Значение слайдера: {{ sliderValue }}</p>
      </div>
    </div>

    <div class="demo-section">
      <h2>Вкладки (TabView)</h2>
      <TabView>
        <TabPanel header="Первая вкладка">
          <p>Содержимое первой вкладки. Здесь может быть любой контент.</p>
        </TabPanel>
        <TabPanel header="Вторая вкладка">
          <p>Содержимое второй вкладки. Компоненты PrimeVue очень гибкие.</p>
        </TabPanel>
        <TabPanel header="Третья вкладка">
          <p>Содержимое третьей вкладки. Вы можете добавлять сколько угодно вкладок.</p>
        </TabPanel>
      </TabView>
    </div>

    <div class="demo-section">
      <h2>Дерево (Tree)</h2>
      <Tree :value="treeNodes" :filter="true" filterMode="lenient" class="w-full md:w-30rem">
        <template #default="slotProps">
          <span>{{ slotProps.node.label }}</span>
        </template>
      </Tree>
    </div>

    <div class="demo-section">
      <h2>Панель сообщений (Message)</h2>
      <Message severity="success" :closable="false">Успешное сообщение</Message>
      <Message severity="info" :closable="true">Информационное сообщение</Message>
      <Message severity="warn" :closable="true">Предупреждающее сообщение</Message>
      <Message severity="error" :closable="true">Сообщение об ошибке</Message>
    </div>

    <div class="demo-section">
      <h2>Переключатель (ToggleSwitch)</h2>
      <div class="toggle-demo">
        <InputSwitch v-model="checked" />
        <span class="toggle-label">Переключатель: {{ checked ? 'Включено' : 'Выключено' }}</span>
      </div>
    </div>

    <div class="demo-section">
      <h2>Рейтинг (Rating)</h2>
      <Rating v-model="ratingValue" :cancel="false" />
      <p>Оценка: {{ ratingValue }} звезд(ы)</p>
    </div>

    <div class="navigation">
      <Button label="Вернуться на главную" @click="goHome" class="p-button-secondary" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import ProgressBar from 'primevue/progressbar'
import Calendar from 'primevue/calendar'
import Slider from 'primevue/slider'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Tree from 'primevue/tree'
import Message from 'primevue/message'
import InputSwitch from 'primevue/inputswitch'
import Rating from 'primevue/rating'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const visible = ref(false)
const progressValue = ref(50)
const date = ref()
const sliderValue = ref(30)
const checked = ref(true)
const ratingValue = ref(3)

const treeNodes = ref([
  {
    key: '0',
    label: 'Документы',
    children: [
      { key: '0-0', label: 'Рабочие файлы' },
      { key: '0-1', label: 'Отчеты' }
    ]
  },
  {
    key: '1',
    label: 'Изображения',
    children: [
      { key: '1-0', label: 'Фотографии' },
      { key: '1-1', label: 'Иконки' }
    ]
  },
  {
    key: '2',
    label: 'Музыка',
    children: [
      { key: '2-0', label: 'Альбомы' },
      { key: '2-1', label: 'Плейлисты' }
    ]
  }
])

const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Успех', detail: 'Операция выполнена успешно', life: 3000 })
}

const showErrorToast = () => {
  toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Произошла ошибка', life: 3000 })
}

const showInfo = () => {
  toast.add({ severity: 'info', summary: 'Информация', detail: 'Это информационное сообщение', life: 3000 })
}

const showWarn = () => {
  toast.add({ severity: 'warn', summary: 'Предупреждение', detail: 'Внимание! Это предупреждение', life: 3000 })
}

const increaseProgress = () => {
  progressValue.value = Math.min(100, progressValue.value + 10)
}

const resetProgress = () => {
  progressValue.value = 0
}

const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.primevue-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  .demo-header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    p {
      color: #7f8c8d;
      font-size: 1.1rem;
    }
  }

  .demo-section {
    margin-bottom: 3rem;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
      border-bottom: 2px solid #42b983;
      padding-bottom: 0.5rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
  }

  .progress-demo,
  .calendar-demo,
  .slider-demo,
  .toggle-demo {
    max-width: 500px;
    margin: 0 auto;

    .progress-controls {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      justify-content: center;
    }
  }

  .toggle-demo {
    display: flex;
    align-items: center;
    gap: 1rem;

    .toggle-label {
      font-weight: bold;
      color: #2c3e50;
    }
  }

  .navigation {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }
}
</style>