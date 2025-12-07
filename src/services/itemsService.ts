import api from './api'

interface Item {
  id: number
  name: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
}

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
}

export const ItemsService = {
  async getAllItems(): Promise<Item[]> {
    try {
      const response = await api.get<ApiResponse<Item[]>>('/items')
      return response.data.data
    } catch (error) {
      console.error('Error fetching items:', error)
      throw error
    }
  },

  async getItemById(id: number): Promise<Item> {
    try {
      const response = await api.get<ApiResponse<Item>>(`/items/${id}`)
      return response.data.data
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error)
      throw error
    }
  },

  async createItem(itemData: Omit<Item, 'id'>): Promise<Item> {
    try {
      const response = await api.post<ApiResponse<Item>>('/items', itemData)
      return response.data.data
    } catch (error) {
      console.error('Error creating item:', error)
      throw error
    }
  },

  async updateItem(id: number, itemData: Partial<Omit<Item, 'id'>>): Promise<Item> {
    try {
      const response = await api.put<ApiResponse<Item>>(`/items/${id}`, itemData)
      return response.data.data
    } catch (error) {
      console.error(`Error updating item ${id}:`, error)
      throw error
    }
  },

  async deleteItem(id: number): Promise<void> {
    try {
      await api.delete(`/items/${id}`)
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error)
      throw error
    }
  },

  async getItemsPaginated(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Item>> {
    try {
      const response = await api.get<ApiResponse<PaginatedResponse<Item>>>(`/items?page=${page}&limit=${limit}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching paginated items:', error)
      throw error
    }
  }
}