import { defineStore } from 'pinia'

interface AppState {
  isLoading: boolean
  error: string | null
  theme: 'light' | 'dark'
  notifications: Array<{
    id: number
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    timeout: number
  }>
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isLoading: false,
    error: null,
    theme: 'light',
    notifications: []
  }),
  getters: {
    hasError: (state) => state.error !== null,
    notificationCount: (state) => state.notifications.length
  },
  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading
    },
    setError(error: string | null) {
      this.error = error
    },
    clearError() {
      this.error = null
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    addNotification(notification: {
      message: string
      type: 'success' | 'error' | 'warning' | 'info'
      timeout?: number
    }) {
      const id = Date.now()
      const timeout = notification.timeout || 5000
      this.notifications.push({ ...notification, id, timeout })

      // Auto-remove after timeout
      setTimeout(() => {
        this.removeNotification(id)
      }, timeout)
    },
    removeNotification(id: number) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    },
    clearNotifications() {
      this.notifications = []
    }
  }
})