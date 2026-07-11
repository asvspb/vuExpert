const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const api = {
  async getHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching backend health:", error);
      return { status: 'error', error: error.message };
    }
  },
  
  async getCounter() {
    try {
      const response = await fetch(`${API_BASE_URL}/counter`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching counter:", error);
      return null;
    }
  },
  
  async incrementCounter() {
    try {
      const response = await fetch(`${API_BASE_URL}/counter`, { method: 'POST' });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error incrementing counter:", error);
      return null;
    }
  },

  async resetCounter() {
    try {
      const response = await fetch(`${API_BASE_URL}/counter`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error resetting counter:", error);
      return null;
    }
  },
  
  async postLog(event) {
    try {
      const response = await fetch(`${API_BASE_URL}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      // Игнорируем в консоли, чтобы избежать зацикливания логов
      return null;
    }
  }
};
