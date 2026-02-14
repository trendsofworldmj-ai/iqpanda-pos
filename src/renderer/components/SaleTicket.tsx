import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export function SaleTicket({ items, onRemoveItem }: { items: any[]; onRemoveItem: (id: string) => void }) {
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.16
  const total = subtotal + tax

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('El carrito está vacío')
      return
    }

    setIsProcessing(true)

    try {
      // Simular guardado de venta
      const saleData = {
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          total: item.price * item.quantity,
        })),
        subtotal,
        tax,
        total,
        paymentMethod: 'CASH',
        date: new Date().toISOString(),
        ticketNumber: `TKT-${Date.now()}`,
      }

      console.log('💾 Venta guardada:', saleData)

      // Mostrar confirmación
      alert(
        `✅ VENTA COMPLETADA\n\n` +
        `Ticket: ${saleData.ticketNumber}\n` +
        `Total: $${total.toFixed(2)}\n\n` +
        `¡Gracias por su compra!`
      )

      // Limpiar carrito
      items.forEach(item => onRemoveItem(item.id))

    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="p-4 bg-primary-600 text-white rounded-t-lg">
        <h2 className="text-xl font-bold">Ticket de Venta</h2>
        <p className="text-sm opacity-90">
          {new Date().toLocaleDateString('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="text-neutral-400 text-center py-8">No hay productos</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">{item.name}</h4>
                  <p className="text-xs text-neutral-600">
                    {item.quantity} {item.unitType || 'un'} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-danger-DEFAULT hover:bg-red-50 p-2 rounded ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="border-t border-neutral-200 p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">IVA (16%):</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>TOTAL:</span>
            <span className="text-primary-600">${total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button 
              className="btn-secondary"
              disabled={isProcessing}
            >
              Cancelar
            </button>
            <button 
              onClick={handleCheckout} 
              className="btn-primary disabled:opacity-50"
              disabled={isProcessing}
            >
              {isProcessing ? 'Procesando...' : 'Cobrar'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
