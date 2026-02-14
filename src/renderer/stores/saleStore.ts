import { create } from 'zustand'

interface CartItem {
  productId: string
  name: string
  quantity: number
  unitPrice: number
  total: number
}

interface SaleState {
  items: CartItem[]
  total: number
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  calculateTotal: () => number
}

export const useSaleStore = create<SaleState>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find(i => i.productId === item.productId)
      let newItems
      
      if (existing) {
        newItems = state.items.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity, total: (i.quantity + item.quantity) * i.unitPrice }
            : i
        )
      } else {
        newItems = [...state.items, item]
      }
      
      const newTotal = newItems.reduce((sum, i) => sum + i.total, 0)
      return { items: newItems, total: newTotal }
    })
  },

  removeItem: (productId) => {
    set((state) => {
      const newItems = state.items.filter(i => i.productId !== productId)
      const newTotal = newItems.reduce((sum, i) => sum + i.total, 0)
      return { items: newItems, total: newTotal }
    })
  },

  clearCart: () => set({ items: [], total: 0 }),

  calculateTotal: () => get().total,
}))
