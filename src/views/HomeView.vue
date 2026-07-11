<template>
  <main>
    <div class="max-w-3xl mx-auto p-4 mb-6 bg-white border border-gray-200 rounded shadow-sm text-center">
      <h2 class="text-2xl font-bold mb-4">System Health Dashboard</h2>
      
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
          <button class="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 rounded text-sm transition" @click="checkHealth">
            Обновить статус
          </button>
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
