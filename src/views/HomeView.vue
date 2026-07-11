<template>
  <main>
    <div class="max-w-4xl mx-auto p-4 mb-6 bg-white border border-gray-200 rounded shadow-sm text-center">
      <h2 class="text-3xl font-bold mb-6 text-gray-800">Добро пожаловать в vuExpert Boilerplate</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Блок статуса сервисов -->
        <div class="p-5 bg-gray-50 rounded-lg border border-gray-200 text-left shadow-sm">
          <h3 class="font-bold text-lg mb-3 text-gray-700 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Статус инфраструктуры
          </h3>
          <ul class="text-sm space-y-3">
            <li class="flex justify-between items-center border-b border-gray-200 pb-2">
              <span class="text-gray-600">Backend API <span class="text-gray-400 text-xs ml-1">(v{{ backendStatus.version || '?' }})</span>:</span>
              <span :class="backendStatus.status === 'ok' ? 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-bold' : 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-bold'">
                {{ backendStatus.status || 'Загрузка...' }}
              </span>
            </li>
            <li class="flex justify-between items-center border-b border-gray-200 pb-2">
              <span class="text-gray-600">База данных (PostgreSQL):</span>
              <span :class="backendStatus.database === 'ok' ? 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-bold' : 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-bold'">
                {{ backendStatus.database || '...' }}
              </span>
            </li>
            <li class="flex justify-between items-center">
              <span class="text-gray-600">Кэш (Redis):</span>
              <span :class="backendStatus.redis === 'ok' ? 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-bold' : 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-bold'">
                {{ backendStatus.redis || '...' }}
              </span>
            </li>
          </ul>
          <button class="mt-5 w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded shadow-sm transition-colors duration-200" @click="checkHealth">
            Обновить статус
          </button>
        </div>

        <!-- Блок инструкций (заменяет старый счетчик) -->
        <div class="p-5 bg-blue-50 rounded-lg border border-blue-100 text-left shadow-sm flex flex-col">
          <h3 class="font-bold text-lg mb-3 text-blue-800 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Быстрый старт
          </h3>
          <p class="text-sm text-blue-900 mb-4 flex-grow">
            Инфраструктура успешно развернута и работает. Следуйте этим шагам, чтобы начать разработку вашего продукта:
          </p>
          <ol class="list-decimal pl-5 text-sm space-y-2 text-blue-800 font-medium">
            <li>Очистите <code class="bg-blue-100 px-1 rounded text-blue-900">HomeView.vue</code> от стартового контента.</li>
            <li>Добавьте модели в <code class="bg-blue-100 px-1 rounded text-blue-900">backend/app/models.py</code>.</li>
            <li>Создайте новые роуты FastAPI и подключите их в <code class="bg-blue-100 px-1 rounded text-blue-900">main.py</code>.</li>
            <li>Настройте маршрутизацию Vue в <code class="bg-blue-100 px-1 rounded text-blue-900">src/router/</code>.</li>
          </ol>
        </div>
      </div>
      
      <!-- Подробная инструкция (заменяет старый Example.vue) -->
      <div class="mt-8 p-6 bg-white border border-gray-200 rounded-lg text-left shadow-sm">
        <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Архитектура фреймворка</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h4 class="font-bold text-gray-800 mb-2 flex items-center">🎨 Frontend (Vue 3)</h4>
            <p>Используйте <code class="bg-gray-100 px-1 rounded text-pink-600">Tailwind CSS</code> для стилизации. Глобальные состояния храните в <code class="bg-gray-100 px-1 rounded text-pink-600">Pinia</code> (директория stores/). Запросы к API делайте через настроенный клиент в <code class="bg-gray-100 px-1 rounded text-pink-600">services/api.js</code>.</p>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-2 flex items-center">⚙️ Backend (FastAPI)</h4>
            <p>Бэкенд полностью асинхронный. База данных управляется через <code class="bg-gray-100 px-1 rounded text-blue-600">SQLAlchemy 2.0</code>. Схемы валидации строятся на <code class="bg-gray-100 px-1 rounded text-blue-600">Pydantic v2</code>.</p>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-2 flex items-center">🛠️ Инфраструктура</h4>
            <p>Всё упаковано в <code class="bg-gray-100 px-1 rounded text-gray-800">Docker Compose</code>. Встроенные проверки (Healthchecks) гарантируют правильную последовательность запуска. CI/CD скрипты настроены в <code class="bg-gray-100 px-1 rounded text-gray-800">.github/</code>.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../services/api'

const backendStatus = ref({})

const checkHealth = async () => {
  backendStatus.value = await api.getHealth()
}

onMounted(() => {
  checkHealth()
})
</script>
