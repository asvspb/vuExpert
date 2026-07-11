import { http } from './http'

export const api = {
  async getHealth() {
    try {
      return await http('/health')
    } catch (error) {
      return { status: 'error', error: error.message }
    }
  },
  
  async getCounter() {
    try {
      return await http('/counter')
    } catch {
      return null
    }
  },
  
  async incrementCounter() {
    try {
      return await http('/counter', { method: 'POST' })
    } catch {
      return null
    }
  },

  async resetCounter() {
    try {
      return await http('/counter', { method: 'DELETE' })
    } catch {
      return null
    }
  },
  
  async postLog(event) {
    try {
      return await http('/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      })
    } catch {
      return null
    }
  }
}
