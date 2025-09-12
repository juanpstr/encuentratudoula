import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../store/useStore'
import { signOut } from '../services/supabase'
import { toast } from 'sonner'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, setUser } = useStore()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error('Error al cerrar sesión')
    } else {
      setUser(null)
      toast.success('Sesión cerrada exitosamente')
    }
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-sm border-b border-earth-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Encuentra tu Doula" 
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold text-earth-900 hidden sm:block">
              ENCUENTRATUDOULA.COM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-earth-700 bg-earth-100' 
                  : 'text-earth-600 hover:text-earth-700 hover:bg-earth-50'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/doulas"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/doulas') 
                  ? 'text-earth-700 bg-earth-100' 
                  : 'text-earth-600 hover:text-earth-700 hover:bg-earth-50'
              }`}
            >
              Directorio
            </Link>
            
            {/* Admin Section - Solo visible para administradores autenticados */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-sage-700 hover:text-sage-800 hover:bg-sage-50 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Panel Admin</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Salir</span>
                </button>
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-earth-600 hover:text-earth-700 hover:bg-earth-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-earth-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-earth-700 bg-earth-100' 
                    : 'text-earth-600 hover:text-earth-700 hover:bg-earth-50'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/doulas"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/doulas') 
                    ? 'text-earth-700 bg-earth-100' 
                    : 'text-earth-600 hover:text-earth-700 hover:bg-earth-50'
                }`}
              >
                Directorio
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-sage-700 hover:text-sage-800 hover:bg-sage-50 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Panel Admin</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Salir</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar