import { http } from './http'

export const api = {
  async getHealth() {
    try {
      return await http('/health')
    } catch (error) {
      return { status: 'error', error: error.message }
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
