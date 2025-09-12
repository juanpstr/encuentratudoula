import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  Star, 
  Users,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import { getDoulas } from '../../services/supabase'
import { toast } from 'sonner'
// Doula type import removed as it's not used in this component

const ManageDoulas = () => {
  const { doulas, setDoulas, isLoading, setLoading } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDoulas, setSelectedDoulas] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  
  const itemsPerPage = 10

  const loadDoulas = useCallback(async () => {
    setLoading(true)
    try {
      const doulas = await getDoulas()
      setDoulas(doulas)
    } catch (error) {
      toast.error('Error al cargar las doulas')
      console.error('Error loading doulas:', error)
    } finally {
      setLoading(false)
    }
  }, [setLoading, setDoulas])

  useEffect(() => {
    loadDoulas()
  }, [loadDoulas])

  const filteredDoulas = doulas.filter(doula => {
    const matchesSearch = doula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doula.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doula.location.country.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && doula.is_active) ||
                         (statusFilter === 'inactive' && !doula.is_active)
    
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredDoulas.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDoulas = filteredDoulas.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectAll = () => {
    if (selectedDoulas.length === paginatedDoulas.length) {
      setSelectedDoulas([])
    } else {
      setSelectedDoulas(paginatedDoulas.map(d => d.id))
    }
  }

  const handleSelectDoula = (doulaId: string) => {
    setSelectedDoulas(prev => 
      prev.includes(doulaId) 
        ? prev.filter(id => id !== doulaId)
        : [...prev, doulaId]
    )
  }

  const handleDeleteSelected = () => {
    if (selectedDoulas.length === 0) return
    
    if (confirm(`¿Estás seguro de que quieres eliminar ${selectedDoulas.length} doula(s)?`)) {
      // TODO: Implement bulk delete
      toast.success(`${selectedDoulas.length} doula(s) eliminada(s)`)
      setSelectedDoulas([])
    }
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    toast.success('Exportando datos...')
  }

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-earth-900">
                Gestionar Doulas
              </h1>
              <p className="text-earth-600 mt-1">
                {filteredDoulas.length} doula(s) encontrada(s)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 px-4 py-2 border border-earth-300 text-earth-700 rounded-lg hover:bg-earth-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                Exportar
              </button>
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-earth-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, ciudad o país..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activas</option>
                <option value="inactive">Inactivas</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-3 py-2 border border-earth-300 text-earth-700 rounded-lg hover:bg-earth-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filtros
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedDoulas.length > 0 && (
            <div className="mt-4 p-4 bg-earth-50 rounded-lg border border-earth-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-earth-700">
                  {selectedDoulas.length} doula(s) seleccionada(s)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDeleteSelected}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-earth-200 rounded"></div>
                    <div className="w-12 h-12 bg-earth-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-earth-200 rounded w-3/4"></div>
                      <div className="h-3 bg-earth-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : paginatedDoulas.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-earth-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-earth-900 mb-2">
                No se encontraron doulas
              </h3>
              <p className="text-earth-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Comienza agregando tu primera doula'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link
                  to="/admin/doulas/new"
                  className="inline-flex items-center gap-2 bg-earth-600 text-white px-4 py-2 rounded-lg hover:bg-earth-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  Agregar Primera Doula
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-earth-50 border-b border-earth-200">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedDoulas.length === paginatedDoulas.length && paginatedDoulas.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-earth-300 text-earth-600 focus:ring-earth-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                        Doula
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                        Ubicación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                        Fecha de registro
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-earth-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-earth-200">
                    {paginatedDoulas.map((doula) => (
                      <tr key={doula.id} className="hover:bg-earth-50 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedDoulas.includes(doula.id)}
                            onChange={() => handleSelectDoula(doula.id)}
                            className="rounded border-earth-300 text-earth-600 focus:ring-earth-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-earth-200 to-sage-200 rounded-full flex items-center justify-center mr-4">
                              <span className="text-sm font-bold text-earth-700">
                                {doula.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-earth-900">
                                {doula.name}
                              </div>
                              <div className="text-sm text-earth-500">
                                {doula.specialties.slice(0, 2).join(', ')}
                                {doula.specialties.length > 2 && '...'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-earth-900">
                            <MapPin className="h-4 w-4 text-earth-400 mr-1" />
                            <span>{doula.location.city}, {doula.location.country}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-earth-900">
                              {doula.rating} ({doula.reviews_count})
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            doula.is_active 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {doula.is_active ? 'Activa' : 'Inactiva'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-earth-900">
                          {new Date(doula.created_at).toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
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
                              onClick={() => {
                                if (confirm('¿Estás seguro de que quieres eliminar esta doula?')) {
                                  toast.success('Doula eliminada')
                                }
                              }}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-earth-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-earth-700">
                      Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredDoulas.length)} de {filteredDoulas.length} resultados
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                currentPage === page
                                  ? 'bg-earth-600 text-white'
                                  : 'text-earth-600 hover:bg-earth-100'
                              }`}
                            >
                              {page}
                            </button>
                          )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="text-earth-400">...</span>
                        }
                        return null
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageDoulas