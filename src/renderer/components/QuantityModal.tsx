import { useState } from 'react'
import { X } from 'lucide-react'

interface QuantityModalProps {
  product: any
  requiresWeight: boolean
  onConfirm: (quantity: number) => void
  onCancel: () => void
}

export function QuantityModal({
  product,
  requiresWeight,
  onConfirm,
  onCancel,
}: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [input, setInput] = useState('')

  const handleConfirm = () => {
    const qty = input ? parseFloat(input) : quantity
    if (qty > 0) {
      onConfirm(qty)
      setInput('')
      setQuantity(1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button
            onClick={onCancel}
            className="text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-3xl text-primary-600 font-bold">${product.price}</p>
          {requiresWeight && (
            <p className="text-sm text-neutral-600">Producto por {product.unitType}</p>
          )}
        </div>

        <div className="space-y-4">
          {requiresWeight ? (
            <>
              <label className="block text-sm font-medium text-neutral-700">
                Ingresa el peso en {product.unitType}
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Ej: 2.5"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="input-field w-full text-lg"
                autoFocus
              />
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-neutral-700">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn-secondary px-4 py-3"
                >
                  −
                </button>
                <input
                  type="number"
                  value={input || quantity}
                  onChange={(e) => setInput(e.target.value)}
                  className="input-field flex-1 text-center text-lg"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="btn-secondary px-4 py-3"
                >
                  +
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="btn-secondary flex-1">
            Cancelar
          </button>
          <button onClick={handleConfirm} className="btn-primary flex-1">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
