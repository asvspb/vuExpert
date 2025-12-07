export interface Item {
  id: number
  name: string
  description?: string
  createdAt?: string
  updatedAt?: string
  isActive?: boolean
  category?: string
}

export interface User {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  role?: 'admin' | 'user' | 'guest'
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  token: string
  user: User
  expiresIn: number
}

export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface ApiPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiErrorResponse {
  error: {
    message: string
    code: string
    details?: any
  }
  status: number
  timestamp: string
}