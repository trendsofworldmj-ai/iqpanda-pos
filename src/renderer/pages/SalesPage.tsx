import { useState } from 'react'
import { ProductCatalog } from '../components/ProductCatalog'
import { SaleTicket } from '../components/SaleTicket'

export function SalesPage() {
  const [cart, setCart] = useState<any[]>([])

  const handleAddProduct = (product: any) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveProduct = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  return (
    <div className="h-full flex gap-4 p-4">
      <div className="flex-1 bg-white rounded-lg shadow">
        <ProductCatalog onAddProduct={handleAddProduct} />
      </div>
      <div className="w-96">
        <SaleTicket items={cart} onRemoveItem={handleRemoveProduct} />
      </div>
    </div>
  )
}
