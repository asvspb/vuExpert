import { ref } from 'vue'
import { api } from '../services/api'

export function useCounterApi() {
  const redisCounter = ref(null)

  const loadCounter = async () => {
    const data = await api.getCounter()
    if (data && data.counter !== undefined) {
      redisCounter.value = data.counter
    }
  }

  const incrementRedis = async () => {
    const data = await api.incrementCounter()
    if (data && data.counter !== undefined) {
      redisCounter.value = data.counter
    }
  }

  const resetRedis = async () => {
    const data = await api.resetCounter()
    if (data && data.counter !== undefined) {
      redisCounter.value = data.counter
    }
  }

  return {
    redisCounter,
    loadCounter,
    incrementRedis,
    resetRedis
  }
}
