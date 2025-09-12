import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react'
import { signIn } from '../../services/supabase'
import { useStore } from '../../store/useStore'
import { toast } from 'sonner'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { setUser, setLoading } = useStore()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error('Por favor completa todos los campos')
      return
    }

    setIsSubmitting(true)
    setLoading(true)

    try {
      const { data, error } = await signIn(formData.email, formData.password)
      
      if (error) {
        toast.error('Credenciales inválidas')
        console.error('Login error:', error)
      } else if (data?.user) {
        // Set user in store
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || data.user.email || '',
          role: 'admin',
          created_at: data.user.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        
        toast.success('¡Bienvenido al panel de administración!')
        navigate('/admin/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Error al iniciar sesión')
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-100 via-sage-50 to-warm-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-earth-600 hover:text-earth-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-earth-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-earth-900">
            Panel de Administración
          </h2>
          <p className="mt-2 text-earth-600">
            Inicia sesión para acceder al panel de control
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-earth-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-earth-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none transition-colors"
                  placeholder="admin@encuentratudoula.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-earth-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-earth-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-earth-400 hover:text-earth-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-earth-400 hover:text-earth-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-earth-600 focus:ring-earth-500 border-earth-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-earth-700">
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-earth-600 hover:text-earth-700">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-earth-600 hover:bg-earth-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-earth-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="bg-warm-50 border border-warm-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-warm-800 mb-2">
            Credenciales de demostración:
          </h3>
          <div className="text-sm text-warm-700 space-y-1">
            <p><strong>Email:</strong> admin@encuentratudoula.com</p>
            <p><strong>Contraseña:</strong> admin123</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-earth-600">
            © 2024 Encuentra tu Doula. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin