import { useAppStore } from '@/stores/app'

export function useNotify() {
  const appStore = useAppStore()

  const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', timeout: number = 5000) => {
    appStore.addNotification({
      message,
      type,
      timeout
    })
  }

  const success = (message: string, timeout: number = 5000) => {
    notify(message, 'success', timeout)
  }

  const error = (message: string, timeout: number = 5000) => {
    notify(message, 'error', timeout)
  }

  const warning = (message: string, timeout: number = 5000) => {
    notify(message, 'warning', timeout)
  }

  const info = (message: string, timeout: number = 5000) => {
    notify(message, 'info', timeout)
  }

  return {
    notify,
    success,
    error,
    warning,
    info
  }
}