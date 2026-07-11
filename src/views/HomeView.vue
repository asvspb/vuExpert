<template>
  <main>
    <div class="max-w-3xl mx-auto p-4 mb-6 bg-white border border-gray-200 rounded shadow-sm text-center">
      <h2 class="text-2xl font-bold mb-4">Интеграция с FastAPI</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Блок статуса сервисов -->
        <div class="p-4 bg-gray-50 rounded border border-gray-100 text-left">
          <h3 class="font-bold mb-2">Статус инфраструктуры:</h3>
          <ul class="text-sm space-y-2">
            <li class="flex justify-between">
              <span>Backend API <span class="text-gray-400 text-xs ml-1">(v{{ backendStatus.version || '?' }})</span>:</span>
              <span :class="backendStatus.status === 'ok' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
                {{ backendStatus.status || 'Загрузка...' }}
              </span>
            </li>
            <li class="flex justify-between">
              <span>База данных (PostgreSQL):</span>
              <span :class="backendStatus.database === 'ok' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
                {{ backendStatus.database || '...' }}
              </span>
            </li>
            <li class="flex justify-between">
              <span>Кэш (Redis):</span>
              <span :class="backendStatus.redis === 'ok' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
                {{ backendStatus.redis || '...' }}
              </span>
            </li>
          </ul>
          <button @click="checkHealth" class="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 rounded text-sm transition">
            Обновить статус
          </button>
        </div>

        <!-- Блок счетчика Redis -->
        <div class="p-4 bg-blue-50 rounded border border-blue-100 flex flex-col justify-center items-center">
          <h3 class="font-bold mb-1">Счетчик в Redis:</h3>
          <p class="text-3xl font-black text-blue-600 my-2">{{ redisCounter !== null ? redisCounter : '...' }}</p>
          <div class="flex gap-2 w-full mt-2">
            <button @click="incrementRedis" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full shadow-sm">
              +1
            </button>
            <button @click="resetRedis" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full shadow-sm">
              Сброс
            </button>
          </div>
        </div>
      </div>
    </div>

    <Example />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Example from '../components/Example.vue'
import { api } from '../services/api'
import { useCounterApi } from '../composables/useCounterApi'

const backendStatus = ref({})
const { redisCounter, loadCounter, incrementRedis, resetRedis } = useCounterApi()

const checkHealth = async () => {
  backendStatus.value = await api.getHealth()
}

onMounted(() => {
  checkHealth()
  loadCounter()
})
</script>
