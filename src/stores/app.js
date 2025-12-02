import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    message: 'Привет из Pinia!',
    counter: 0,
    darkMode: false,
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++
    },
    reset() {
      this.counter = 0
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
    setMessage(msg) {
      this.message = msg
    }
  }
})
