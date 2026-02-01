import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  ChevronDown,
  Eye,
  Video,
  MapPin
} from 'lucide-react'
import { 
  getAllBookings, 
  updateBookingStatus, 
  getBookingStats,
  SERVICE_TYPES 
} from '../../services/bookingService'
import { toast } from 'sonner'
import type { Booking } from '../../types'

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ pending: 0, confirmed: 0, today: 0, thisMonth: 0, total: 0 })
  
  // Filtros
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const loadBookings = useCallback(async () => {
    setIsLoading(true)
    try {
      const [bookingsData, statsData] = await Promise.all([
        getAllBookings(),
        getBookingStats()
      ])
      setBookings(bookingsData)
      setFilteredBookings(bookingsData)
      setStats(statsData)
    } catch (error) {
      toast.error('Error al cargar las reservas')
      console.error('Error loading bookings:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBookings()
  }, [loadBookings])

  useEffect(() => {
    let filtered = bookings

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter)
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(b => 
        b.client_name.toLowerCase().includes(query) ||
        b.client_email.toLowerCase().includes(query) ||
        b.doula_name?.toLowerCase().includes(query)
      )
    }

    setFilteredBookings(filtered)
  }, [bookings, statusFilter, searchQuery])

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      await updateBookingStatus(bookingId, newStatus)
      toast.success(`Reserva ${newStatus === 'confirmed' ? 'confirmada' : newStatus === 'cancelled' ? 'cancelada' : 'actualizada'}`)
      loadBookings()
      setSelectedBooking(null)
    } catch (error) {
      toast.error('Error al actualizar la reserva')
      console.error('Error updating booking:', error)
    }
  }

  const getStatusBadge = (status: Booking['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      no_show: 'bg-gray-100 text-gray-800'
    }
    const labels = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      cancelled: 'Cancelada',
      completed: 'Completada',
      no_show: 'No asistió'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  const getServiceLabel = (value: string) => {
    return SERVICE_TYPES.find(s => s.value === value)?.label || value
  }

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-earth-900">Gestión de Reservas</h1>
              <p className="text-earth-600">Administra todas las citas de las doulas</p>
            </div>
            <Link
              to="/admin/dashboard"
              className="px-4 py-2 text-earth-600 hover:text-earth-700"
            >
              ← Volver al Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-600">Confirmadas</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-600">Hoy</p>
                <p className="text-2xl font-bold text-earth-900">{stats.today}</p>
              </div>
              <Calendar className="h-8 w-8 text-earth-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-600">Este mes</p>
                <p className="text-2xl font-bold text-earth-900">{stats.thisMonth}</p>
              </div>
              <Clock className="h-8 w-8 text-earth-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-earth-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o doula..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-earth-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 appearance-none bg-white"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="confirmed">Confirmadas</option>
                <option value="cancelled">Canceladas</option>
                <option value="completed">Completadas</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-earth-400" />
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-earth-600 mx-auto mb-4"></div>
            <p className="text-earth-600">Cargando reservas...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Calendar className="h-12 w-12 text-earth-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-earth-900 mb-2">No hay reservas</h3>
            <p className="text-earth-600">
              {statusFilter !== 'all' ? 'No hay reservas con este estado' : 'Aún no hay reservas registradas'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-earth-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-earth-500 uppercase">Cliente</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-earth-500 uppercase">Doula</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-earth-500 uppercase">Servicio</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-earth-500 uppercase">Fecha/Hora</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-earth-500 uppercase">Modalidad</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-earth-500 uppercase">Estado</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-earth-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-100">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-earth-50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-earth-900">{booking.client_name}</p>
                          <p className="text-sm text-earth-500">{booking.client_email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-earth-700">{booking.doula_name || 'N/A'}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-earth-700 text-sm">{getServiceLabel(booking.service_type)}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-earth-900">{formatDate(booking.booking_date)}</p>
                        <p className="text-sm text-earth-500">{booking.start_time} - {booking.end_time}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          booking.modality === 'online' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {booking.modality === 'online' ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                          {booking.modality === 'online' ? 'Online' : 'Presencial'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="p-1 text-earth-600 hover:text-earth-700"
                            title="Ver detalles"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                className="p-1 text-green-600 hover:text-green-700"
                                title="Confirmar"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                className="p-1 text-red-600 hover:text-red-700"
                                title="Cancelar"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal de Detalles */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-earth-900">Detalles de la Reserva</h3>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-earth-400 hover:text-earth-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-earth-600">Estado:</span>
                    {getStatusBadge(selectedBooking.status)}
                  </div>

                  <div className="border-t border-earth-100 pt-4">
                    <h4 className="font-semibold text-earth-900 mb-2">Información del Cliente</h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <User className="h-4 w-4 text-earth-400" />
                        {selectedBooking.client_name}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-earth-400" />
                        <a href={`mailto:${selectedBooking.client_email}`} className="text-earth-600 hover:underline">
                          {selectedBooking.client_email}
                        </a>
                      </p>
                      {selectedBooking.client_phone && (
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-earth-400" />
                          <a href={`tel:${selectedBooking.client_phone}`} className="text-earth-600 hover:underline">
                            {selectedBooking.client_phone}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-earth-100 pt-4">
                    <h4 className="font-semibold text-earth-900 mb-2">Detalles de la Cita</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Doula:</strong> {selectedBooking.doula_name}</p>
                      <p><strong>Servicio:</strong> {getServiceLabel(selectedBooking.service_type)}</p>
                      <p><strong>Fecha:</strong> {formatDate(selectedBooking.booking_date)}</p>
                      <p><strong>Hora:</strong> {selectedBooking.start_time} - {selectedBooking.end_time}</p>
                      <p><strong>Duración:</strong> {selectedBooking.duration_minutes} minutos</p>
                      <p><strong>Modalidad:</strong> {selectedBooking.modality === 'online' ? 'Online' : 'Presencial'}</p>
                    </div>
                  </div>

                  {selectedBooking.client_notes && (
                    <div className="border-t border-earth-100 pt-4">
                      <h4 className="font-semibold text-earth-900 mb-2">Notas del Cliente</h4>
                      <p className="text-sm text-earth-700 bg-earth-50 p-3 rounded-lg">
                        {selectedBooking.client_notes}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-earth-100 pt-4 text-xs text-earth-500">
                    <p>Creada: {new Date(selectedBooking.created_at).toLocaleString('es-ES')}</p>
                    {selectedBooking.confirmed_at && (
                      <p>Confirmada: {new Date(selectedBooking.confirmed_at).toLocaleString('es-ES')}</p>
                    )}
                  </div>
                </div>

                {selectedBooking.status === 'pending' && (
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                      className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminBookings
