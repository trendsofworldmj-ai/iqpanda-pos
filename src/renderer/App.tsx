import { useState, useEffect } from 'react'
import { LoginPage } from './pages/LoginPage'
import { SalesPage } from './pages/SalesPage'
import { DashboardPage } from './pages/DashboardPage'

export function App() {
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('login')

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
      setCurrentPage('sales')
    }
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    setCurrentPage('sales')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setCurrentPage('login')
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-primary-600 mb-8">🍎 IQpanda</h1>
        
        <nav className="space-y-2 mb-8">
          <NavButton 
            label="🛒 Ventas" 
            active={currentPage === 'sales'}
            onClick={() => setCurrentPage('sales')}
          />
          <NavButton 
            label="📊 Dashboard" 
            active={currentPage === 'dashboard'}
            onClick={() => setCurrentPage('dashboard')}
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-neutral-200">
          <p className="text-sm text-neutral-700 mb-4">
            {user?.fullName}
          </p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-danger-DEFAULT text-white rounded-lg hover:bg-danger-dark transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {currentPage === 'sales' && <SalesPage />}
        {currentPage === 'dashboard' && <DashboardPage />}
      </main>
    </div>
  )
}

function NavButton({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-primary-600 text-white'
          : 'text-neutral-700 hover:bg-neutral-100'
      }`}
    >
      {label}
    </button>
  )
}
