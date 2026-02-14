import { useState } from 'react'

export function LoginPage({ onLogin }: { onLogin: (user: any) => void }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simular login (en producción sería una llamada API)
      if (username === 'admin' && password === 'admin123') {
        onLogin({ id: '1', username: 'admin', fullName: 'Administrador' })
      } else if (username === 'cajero1' && password === 'cajero123') {
        onLogin({ id: '2', username: 'cajero1', fullName: 'Juan Pérez' })
      } else {
        setError('Usuario o contraseña incorrectos')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-primary-600 text-center mb-2">
          🍎 IQpanda
        </h1>
        <p className="text-center text-neutral-600 mb-8">
          Sistema de Punto de Venta Inteligente
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field w-full"
              placeholder="admin o cajero1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-danger-light text-danger-DEFAULT text-sm rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 btn-primary disabled:opacity-50"
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-neutral-50 rounded-lg text-xs text-neutral-600">
          <p className="font-medium mb-2">📝 Demo:</p>
          <p><strong>Admin:</strong> admin / admin123</p>
          <p><strong>Cajero:</strong> cajero1 / cajero123</p>
        </div>
      </div>
    </div>
  )
}
