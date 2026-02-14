import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { QuantityModal } from './QuantityModal'

const PRODUCTS = [
  { id: '1', name: 'Manzana', category: 'FRUTAS', price: 35, emoji: '🍎', requiresWeight: true, unitType: 'KG' },
  { id: '2', name: 'Plátano', category: 'FRUTAS', price: 18, emoji: '🍌', requiresWeight: true, unitType: 'KG' },
  { id: '3', name: 'Naranja', category: 'FRUTAS', price: 20, emoji: '🍊', requiresWeight: true, unitType: 'KG' },
  { id: '4', name: 'Papa', category: 'VERDURAS', price: 22, emoji: '🥔', requiresWeight: true, unitType: 'KG' },
  { id: '5', name: 'Cebolla', category: 'VERDURAS', price: 28, emoji: '🧅', requiresWeight: true, unitType: 'KG' },
  { id: '6', name: 'Tomate', category: 'VERDURAS', price: 30, emoji: '🍅', requiresWeight: true, unitType: 'KG' },
]

export function ProductCatalog({ onAddProduct }: { onAddProduct: (product: any) => void }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [filtered, setFiltered] = useState(PRODUCTS)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  useEffect(() => {
    let result = PRODUCTS
    
    if (category) {
      result = result.filter(p => p.category === category)
    }
    
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    setFiltered(result)
  }, [search, category])

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
  }

  const handleConfirmQuantity = (quantity: number) => {
    if (selectedProduct) {
      onAddProduct({
        ...selectedProduct,
        quantity,
        total: selectedProduct.price * quantity,
      })
      setSelectedProduct(null)
    }
  }

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Catálogo</h2>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setCategory('')}
              className={`px-3 py-1 rounded text-sm whitespace-nowrap transition-colors ${
                category === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setCategory('FRUTAS')}
              className={`px-3 py-1 rounded text-sm whitespace-nowrap transition-colors ${
                category === 'FRUTAS'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Frutas
            </button>
            <button
              onClick={() => setCategory('VERDURAS')}
              className={`px-3 py-1 rounded text-sm whitespace-nowrap transition-colors ${
                category === 'VERDURAS'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Verduras
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-4">
            {filtered.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow text-left"
              >
                <div className="text-4xl mb-2">{product.emoji}</div>
                <h3 className="font-semibold text-neutral-900">{product.name}</h3>
                <p className="text-primary-600 font-bold">${product.price}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <QuantityModal
          product={selectedProduct}
          requiresWeight={selectedProduct.requiresWeight}
          onConfirm={handleConfirmQuantity}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
