import { computed } from 'vue'
import { useCounterStore } from '@/stores/counter'

export function useCounter() {
  const counterStore = useCounterStore()

  const count = computed(() => counterStore.count)
  const title = computed(() => counterStore.title)
  const doubleCount = computed(() => counterStore.doubleCount)
  const tripleCount = computed(() => counterStore.tripleCount)

  const increment = () => counterStore.increment()
  const decrement = () => counterStore.decrement()
  const reset = () => counterStore.reset()
  const setCount = (value: number) => counterStore.setCount(value)
  const setTitle = (title: string) => counterStore.setTitle(title)

  return {
    count,
    title,
    doubleCount,
    tripleCount,
    increment,
    decrement,
    reset,
    setCount,
    setTitle
  }
}