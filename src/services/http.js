const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

export const http = async (endpoint, options = {}) => {
  const { timeout = 8000, ...fetchOptions } = options
  
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      signal: controller.signal
    })
    
    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  } finally {
    clearTimeout(id)
  }
}
