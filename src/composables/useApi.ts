import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import api from '@/services/api'
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

export function useApi() {
  const appStore = useAppStore()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const wrapApiCall = async <T>(apiCall: Promise<AxiosResponse<T>>): Promise<T> => {
    try {
      isLoading.value = true
      error.value = null
      appStore.setLoading(true)

      const response = await apiCall
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      appStore.setError(error.value)
      throw err
    } finally {
      isLoading.value = false
      appStore.setLoading(false)
    }
  }

  const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return wrapApiCall(api.get<T>(url, config))
  }

  const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return wrapApiCall(api.post<T>(url, data, config))
  }

  const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return wrapApiCall(api.put<T>(url, data, config))
  }

  const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return wrapApiCall(api.delete<T>(url, config))
  }

  return {
    isLoading,
    error,
    get,
    post,
    put,
    del,
    wrapApiCall
  }
}