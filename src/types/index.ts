export interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
  headers?: Record<string, string>
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface ApiError {
  message: string
  code?: string
  details?: any
  status?: number
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: number
  message: string
  type: NotificationType
  timeout: number
}

export interface AppConfig {
  apiBaseUrl: string
  appTitle: string
  debugMode: boolean
  theme: 'light' | 'dark'
}