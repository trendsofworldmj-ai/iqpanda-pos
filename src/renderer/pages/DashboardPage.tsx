export function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-4">
        <KPICard title="Ventas Hoy" value="$0.00" />
        <KPICard title="Transacciones" value="0" />
        <KPICard title="Ticket Promedio" value="$0.00" />
        <KPICard title="Productos Vendidos" value="0" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Top Productos</h2>
          <p className="text-neutral-500">No hay datos</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Ventas por Hora</h2>
          <p className="text-neutral-500">No hay datos</p>
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-neutral-600 mb-2">{title}</p>
      <h3 className="text-2xl font-bold text-neutral-900">{value}</h3>
    </div>
  )
}
