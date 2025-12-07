import { defineStore } from 'pinia'

interface CounterState {
  count: number
  title: string
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    count: 0,
    title: 'Counter Store'
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    tripleCount: (state) => state.count * 3
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    },
    setCount(value: number) {
      this.count = value
    },
    setTitle(title: string) {
      this.title = title
    }
  }
})