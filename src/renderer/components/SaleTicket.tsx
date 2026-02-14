import { Trash2 } from 'lucide-react'

export function SaleTicket({ items, onRemoveItem }: { items: any[]; onRemoveItem: (id: string) => void }) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalWithTax = total * 1.16

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('El carrito está vacío')
      return
    }
    alert(`Total a pagar: $${totalWithTax.toFixed(2)}`)
  }

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="p-4 bg-primary-600 text-white rounded-t-lg">
        <h2 className="text-xl font-bold">Ticket de Venta</h2>
        <p className="text-sm opacity-90">
          {new Date().toLocaleDateString('es-MX')}
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
                <div>
                  <h4 className="font-medium text-neutral-900">{item.name}</h4>
                  <p className="text-xs text-neutral-600">
                    {item.quantity} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-danger-DEFAULT hover:bg-danger-light p-1 rounded"
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
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>IVA (16%):</span>
            <span>${(totalWithTax - total).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>TOTAL:</span>
            <span className="text-primary-600">${totalWithTax.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className="btn-secondary">Cancelar</button>
            <button onClick={handleCheckout} className="btn-primary">
              Cobrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
