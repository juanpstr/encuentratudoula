import type { Booking, TimeSlot } from '../types'

// Datos locales para desarrollo (sin Supabase)
let localBookings: Booking[] = []

// Horarios disponibles por defecto (9:00 - 18:00)
const DEFAULT_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00'
]

// Tipos de servicio disponibles
export const SERVICE_TYPES = [
  { value: 'consulta-inicial', label: 'Consulta Inicial', duration: 60 },
  { value: 'sanacion-memorias-uterinas', label: 'Sanación de Memorias Uterinas', duration: 90 },
  { value: 'preconcepcion-fertilidad', label: 'Preconcepción y Fertilidad', duration: 60 },
  { value: 'acompanamiento-gestacion', label: 'Acompañamiento en Gestación', duration: 60 },
  { value: 'preparacion-parto', label: 'Preparación al Parto', duration: 90 },
  { value: 'acompanamiento-postparto', label: 'Acompañamiento Postparto', duration: 60 },
  { value: 'ciclicidad', label: 'Ciclicidad', duration: 60 },
  { value: 'duelos', label: 'Acompañamiento en Duelos', duration: 90 },
  { value: 'plenipausia', label: 'Plenipausia', duration: 60 },
  { value: 'otro', label: 'Otro', duration: 60 },
]

// Obtener horarios disponibles para una doula en una fecha
export const getAvailableSlots = async (
  doulaId: string, 
  date: string
): Promise<TimeSlot[]> => {
  console.log(`📅 getAvailableSlots for doula ${doulaId} on ${date}`)
  
  // Obtener reservas existentes para esa fecha
  const existingBookings = localBookings.filter(
    b => b.doula_id === doulaId && 
    b.booking_date === date && 
    b.status !== 'cancelled'
  )
  
  const bookedTimes = existingBookings.map(b => b.start_time)
  
  // Verificar día de la semana
  const dayOfWeek = new Date(date).getDay()
  
  // Por defecto, no disponible sábado (6) y domingo (0)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return DEFAULT_SLOTS.map(time => ({ time, available: false }))
  }
  
  // Retornar slots con disponibilidad
  return DEFAULT_SLOTS.map(time => ({
    time,
    available: !bookedTimes.includes(time)
  }))
}

// Crear una nueva reserva
export const createBooking = async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'confirmed_by_doula'>): Promise<Booking> => {
  console.log('📝 createBooking:', booking)
  
  const newBooking: Booking = {
    ...booking,
    id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    confirmed_by_doula: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  localBookings.push(newBooking)
  console.log('✅ Booking created:', newBooking.id)
  
  return newBooking
}

// Obtener reservas de una doula
export const getBookingsByDoula = async (doulaId: string): Promise<Booking[]> => {
  console.log(`📋 getBookingsByDoula: ${doulaId}`)
  return localBookings.filter(b => b.doula_id === doulaId)
}

// Obtener todas las reservas (para admin)
export const getAllBookings = async (): Promise<Booking[]> => {
  console.log('📋 getAllBookings')
  
  // Ordenar por fecha más reciente primero
  return [...localBookings].sort((a, b) => {
    const dateA = new Date(`${a.booking_date}T${a.start_time}`)
    const dateB = new Date(`${b.booking_date}T${b.start_time}`)
    return dateB.getTime() - dateA.getTime()
  })
}

// Obtener reservas pendientes
export const getPendingBookings = async (): Promise<Booking[]> => {
  return localBookings.filter(b => b.status === 'pending')
}

// Obtener reservas de hoy
export const getTodayBookings = async (): Promise<Booking[]> => {
  const today = new Date().toISOString().split('T')[0]
  return localBookings.filter(b => b.booking_date === today && b.status !== 'cancelled')
}

// Actualizar estado de reserva
export const updateBookingStatus = async (
  bookingId: string, 
  status: Booking['status'],
  notes?: string
): Promise<Booking | null> => {
  console.log(`🔄 updateBookingStatus: ${bookingId} -> ${status}`)
  
  const index = localBookings.findIndex(b => b.id === bookingId)
  if (index === -1) return null
  
  localBookings[index] = {
    ...localBookings[index],
    status,
    admin_notes: notes || localBookings[index].admin_notes,
    confirmed_by_doula: status === 'confirmed',
    confirmed_at: status === 'confirmed' ? new Date().toISOString() : localBookings[index].confirmed_at,
    cancelled_at: status === 'cancelled' ? new Date().toISOString() : undefined,
    updated_at: new Date().toISOString()
  }
  
  return localBookings[index]
}

// Confirmar reserva
export const confirmBooking = async (bookingId: string): Promise<Booking | null> => {
  return updateBookingStatus(bookingId, 'confirmed')
}

// Cancelar reserva
export const cancelBooking = async (bookingId: string, reason?: string): Promise<Booking | null> => {
  const index = localBookings.findIndex(b => b.id === bookingId)
  if (index === -1) return null
  
  localBookings[index] = {
    ...localBookings[index],
    status: 'cancelled',
    cancelled_at: new Date().toISOString(),
    cancellation_reason: reason,
    updated_at: new Date().toISOString()
  }
  
  return localBookings[index]
}

// Obtener reserva por ID
export const getBookingById = async (bookingId: string): Promise<Booking | null> => {
  return localBookings.find(b => b.id === bookingId) || null
}

// Obtener estadísticas de reservas
export const getBookingStats = async () => {
  const today = new Date().toISOString().split('T')[0]
  const thisMonth = today.substring(0, 7) // YYYY-MM
  
  const pending = localBookings.filter(b => b.status === 'pending').length
  const confirmed = localBookings.filter(b => b.status === 'confirmed').length
  const todayCount = localBookings.filter(b => b.booking_date === today && b.status !== 'cancelled').length
  const thisMonthCount = localBookings.filter(b => b.booking_date.startsWith(thisMonth) && b.status !== 'cancelled').length
  
  return {
    pending,
    confirmed,
    today: todayCount,
    thisMonth: thisMonthCount,
    total: localBookings.length
  }
}

// Agregar algunas reservas de ejemplo para desarrollo
const addSampleBookings = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const sampleBookings: Booking[] = [
    {
      id: 'sample-1',
      doula_id: '1',
      doula_name: 'Liliana Perrone Spera',
      client_name: 'María García',
      client_email: 'maria@ejemplo.com',
      client_phone: '+34 612345678',
      service_type: 'consulta-inicial',
      booking_date: tomorrow.toISOString().split('T')[0],
      start_time: '10:00',
      end_time: '11:00',
      duration_minutes: 60,
      modality: 'online',
      status: 'pending',
      client_notes: 'Estoy en mi semana 20 de embarazo y me gustaría conocer más sobre el acompañamiento.',
      confirmed_by_doula: false,
      created_at: new Date().toISOString()
    },
    {
      id: 'sample-2',
      doula_id: '2',
      doula_name: 'Paula Loboguerrero Rivera',
      client_name: 'Ana Martínez',
      client_email: 'ana@ejemplo.com',
      client_phone: '+34 698765432',
      service_type: 'sanacion-memorias-uterinas',
      booking_date: tomorrow.toISOString().split('T')[0],
      start_time: '15:00',
      end_time: '16:30',
      duration_minutes: 90,
      modality: 'presencial',
      status: 'confirmed',
      confirmed_by_doula: true,
      confirmed_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    }
  ]
  
  localBookings = sampleBookings
}

// Inicializar datos de ejemplo
addSampleBookings()
