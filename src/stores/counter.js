import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    message: 'Привет, Vue 3!'
  }),
  
  getters: {
    doubleCount: (state) => state.count * 2
  },
  
 actions: {
    increment() {
      this.count++
    },
    reset() {
      this.count = 0
    },
    toggleMessage() {
      this.message = this.message === 'Привет, Vue 3!' ? 'Собщение изменено!' : 'Привет, Vue 3!'
    }
  }
})