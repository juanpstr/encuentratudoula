import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  UserPlus, 
  Star, 
  MapPin, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Settings,
  BarChart3,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import { getDoulas } from '../../services/supabase'
import { toast } from 'sonner'
// Doula type import removed as it's not used in this component

const AdminDashboard = () => {
  const { doulas, setDoulas, user, isLoading, setLoading } = useStore()
  const [stats, setStats] = useState({
    totalDoulas: 0,
    activeDoulas: 0,
    averageRating: 0,
    totalReviews: 0,
    newThisMonth: 0
  })

  const loadDashboardData = useCallback(async () => {
    setLoading(true)
    try {
      const doulas = await getDoulas()
      setDoulas(doulas)
    } catch (error) {
      toast.error('Error al cargar los datos del dashboard')
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [setLoading, setDoulas])

  const calculateStats = useCallback(() => {
    const totalDoulas = doulas.length
    const activeDoulas = doulas.filter(d => d.is_active).length
    const totalReviews = doulas.reduce((sum, d) => sum + d.reviews_count, 0)
    const averageRating = doulas.reduce((sum, d) => sum + d.rating, 0) / totalDoulas
    
    // Calculate new doulas this month (mock calculation)
    const currentMonth = new Date().getMonth()
    const newThisMonth = doulas.filter(d => {
      const createdMonth = new Date(d.created_at).getMonth()
      return createdMonth === currentMonth
    }).length

    setStats({
      totalDoulas,
      activeDoulas,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      newThisMonth
    })
  }, [doulas, setStats])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  useEffect(() => {
    if (doulas.length > 0) {
      calculateStats()
    }
  }, [doulas, calculateStats])

  const recentDoulas = doulas
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-earth-900">
                Panel de Administración
              </h1>
              <p className="text-earth-600 mt-1">
                Bienvenido, {user?.name || 'Administrador'}
              </p>
            </div>
            <Link
              to="/admin/doulas/new"
              className="inline-flex items-center gap-2 bg-earth-600 text-white px-4 py-2 rounded-lg hover:bg-earth-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              Agregar Doula
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-earth-100 rounded-lg">
                <Users className="h-6 w-6 text-earth-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-earth-600">Total Doulas</p>
                <p className="text-2xl font-bold text-earth-900">{stats.totalDoulas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-earth-600">Activas</p>
                <p className="text-2xl font-bold text-earth-900">{stats.activeDoulas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-earth-600">Rating Promedio</p>
                <p className="text-2xl font-bold text-earth-900">{stats.averageRating}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-earth-600">Total Reseñas</p>
                <p className="text-2xl font-bold text-earth-900">{stats.totalReviews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-earth-600">Nuevas este mes</p>
                <p className="text-2xl font-bold text-earth-900">{stats.newThisMonth}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Doulas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-earth-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-earth-900">
                    Doulas Recientes
                  </h2>
                  <Link
                    to="/admin/doulas"
                    className="text-earth-600 hover:text-earth-700 text-sm font-medium"
                  >
                    Ver todas
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse flex items-center space-x-4">
                        <div className="w-12 h-12 bg-earth-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-earth-200 rounded w-3/4"></div>
                          <div className="h-3 bg-earth-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentDoulas.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-earth-300 mx-auto mb-4" />
                    <p className="text-earth-600">No hay doulas registradas</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentDoulas.map((doula) => (
                      <div key={doula.id} className="flex items-center justify-between p-4 border border-earth-200 rounded-lg hover:bg-earth-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-earth-200 to-sage-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-earth-700">
                              {doula.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-earth-900">{doula.name}</h3>
                            <div className="flex items-center text-sm text-earth-600">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{doula.location.city}, {doula.location.country}</span>
                              <span className="mx-2">•</span>
                              <Star className="h-3 w-3 mr-1 text-yellow-400" />
                              <span>{doula.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/doula/${doula.id}`}
                            className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-100 rounded-lg transition-colors"
                            title="Ver perfil"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            to={`/admin/doulas/${doula.id}/edit`}
                            className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-100 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-earth-900 mb-4">
                Acciones Rápidas
              </h2>
              <div className="space-y-3">
                <Link
                  to="/admin/doulas/new"
                  className="flex items-center gap-3 p-3 text-earth-700 hover:bg-earth-50 rounded-lg transition-colors"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Agregar Nueva Doula</span>
                </Link>
                <Link
                  to="/admin/doulas"
                  className="flex items-center gap-3 p-3 text-earth-700 hover:bg-earth-50 rounded-lg transition-colors"
                >
                  <Users className="h-5 w-5" />
                  <span>Gestionar Doulas</span>
                </Link>
                <Link
                  to="/admin/reservas"
                  className="flex items-center gap-3 p-3 text-earth-700 hover:bg-earth-50 rounded-lg transition-colors bg-yellow-50 border border-yellow-200"
                >
                  <Calendar className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium">Gestionar Reservas</span>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="flex items-center gap-3 p-3 text-earth-700 hover:bg-earth-50 rounded-lg transition-colors"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Ver Analíticas</span>
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center gap-3 p-3 text-earth-700 hover:bg-earth-50 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Configuración</span>
                </Link>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-earth-900 mb-4">
                Estado del Sistema
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-earth-700">Base de datos</span>
                  <span className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Activa
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-earth-700">Servidor</span>
                  <span className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Operativo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-earth-700">Última actualización</span>
                  <span className="text-earth-600 text-sm">
                    {new Date().toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard