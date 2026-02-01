import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  CheckCircle,
  ArrowLeft,
  MapPin,
  Video
} from 'lucide-react'
import { getDoulaById } from '../services/supabase'
import { getAvailableSlots, createBooking, SERVICE_TYPES } from '../services/bookingService'
import { toast } from 'sonner'
import type { Doula, TimeSlot } from '../types'

const BookingPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [doula, setDoula] = useState<Doula | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // Paso del formulario
  const [step, setStep] = useState(1) // 1: Servicio, 2: Fecha/Hora, 3: Datos, 4: Confirmación
  
  // Datos del formulario
  const [serviceType, setServiceType] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [modality, setModality] = useState<'presencial' | 'online'>('online')
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  
  // Datos del cliente
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientNotes, setClientNotes] = useState('')

  const loadDoula = useCallback(async () => {
    if (!slug) return
    setIsLoading(true)
    try {
      const data = await getDoulaById(slug)
      setDoula(data)
    } catch (error) {
      toast.error('Error al cargar la información de la doula')
      console.error('Error loading doula:', error)
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  useEffect(() => {
    loadDoula()
  }, [loadDoula])

  const loadSlots = useCallback(async () => {
    if (!doula || !selectedDate) return
    try {
      const slots = await getAvailableSlots(doula.id, selectedDate)
      setAvailableSlots(slots)
    } catch (error) {
      console.error('Error loading slots:', error)
    }
  }, [doula, selectedDate])

  useEffect(() => {
    if (selectedDate) {
      loadSlots()
    }
  }, [selectedDate, loadSlots])

  // Generar fechas para los próximos 30 días
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayOfWeek = date.getDay()
      // Excluir sábados y domingos por defecto
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    return dates
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
  }

  const getServiceDuration = () => {
    const service = SERVICE_TYPES.find(s => s.value === serviceType)
    return service?.duration || 60
  }

  const handleSubmit = async () => {
    if (!doula || !serviceType || !selectedDate || !selectedTime || !clientName || !clientEmail) {
      toast.error('Por favor completa todos los campos requeridos')
      return
    }

    setIsSubmitting(true)
    try {
      const duration = getServiceDuration()
      const [hours, minutes] = selectedTime.split(':').map(Number)
      const endHours = hours + Math.floor(duration / 60)
      const endMinutes = minutes + (duration % 60)
      const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`

      await createBooking({
        doula_id: doula.id,
        doula_name: doula.name,
        client_name: clientName.trim(),
        client_email: clientEmail.trim(),
        client_phone: clientPhone.trim() || undefined,
        service_type: serviceType,
        booking_date: selectedDate,
        start_time: selectedTime,
        end_time: endTime,
        duration_minutes: duration,
        modality,
        client_notes: clientNotes.trim() || undefined,
        status: 'pending'
      })

      setIsSuccess(true)
      toast.success('¡Reserva enviada con éxito!')
    } catch (error) {
      toast.error('Error al crear la reserva. Por favor intenta de nuevo.')
      console.error('Error creating booking:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-earth-50 to-sage-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-600 mx-auto mb-4"></div>
          <p className="text-earth-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!doula) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-earth-50 to-sage-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <Calendar className="h-16 w-16 text-earth-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-earth-900 mb-2">Doula no encontrada</h2>
          <Link to="/doulas" className="inline-flex items-center gap-2 px-6 py-3 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Ver Directorio
          </Link>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-earth-50 to-sage-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-earth-900 mb-3">¡Reserva Enviada!</h2>
          <p className="text-earth-600 mb-6">
            Tu solicitud de cita con <strong>{doula.name}</strong> ha sido enviada correctamente.
            Recibirás un email de confirmación cuando la doula acepte tu reserva.
          </p>
          
          <div className="bg-earth-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-earth-900 mb-2">Resumen de tu cita:</h3>
            <div className="space-y-1 text-sm text-earth-700">
              <p><strong>Fecha:</strong> {formatDate(selectedDate)}</p>
              <p><strong>Hora:</strong> {selectedTime}</p>
              <p><strong>Servicio:</strong> {SERVICE_TYPES.find(s => s.value === serviceType)?.label}</p>
              <p><strong>Modalidad:</strong> {modality === 'online' ? 'Online' : 'Presencial'}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link
              to={`/doula/${slug}`}
              className="block w-full px-6 py-3 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
            >
              Volver al perfil de {doula.name.split(' ')[0]}
            </Link>
            <Link
              to="/doulas"
              className="block w-full px-6 py-3 border border-earth-300 text-earth-700 rounded-lg hover:bg-earth-50 transition-colors"
            >
              Explorar más doulas
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-earth-50 to-sage-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            to={`/doula/${slug}`}
            className="inline-flex items-center gap-2 text-earth-600 hover:text-earth-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al perfil
          </Link>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-earth-200 to-sage-200 rounded-full flex items-center justify-center overflow-hidden">
                {doula.profile_image ? (
                  <img src={doula.profile_image} alt={doula.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-earth-600" />
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-earth-900">Reservar cita con {doula.name}</h1>
                <p className="text-earth-600">{doula.location.city}, {doula.location.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s ? 'bg-earth-600 text-white' : 'bg-earth-200 text-earth-600'
              }`}>
                {s}
              </div>
              <span className={`ml-2 text-sm hidden sm:block ${step >= s ? 'text-earth-900' : 'text-earth-400'}`}>
                {s === 1 ? 'Servicio' : s === 2 ? 'Fecha y Hora' : 'Tus Datos'}
              </span>
              {s < 3 && <div className={`w-12 sm:w-24 h-1 mx-2 ${step > s ? 'bg-earth-600' : 'bg-earth-200'}`} />}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Step 1: Seleccionar Servicio */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-earth-900 mb-6">¿Qué tipo de acompañamiento necesitas?</h2>
              
              <div className="space-y-3 mb-6">
                {SERVICE_TYPES.map((service) => (
                  <button
                    key={service.value}
                    onClick={() => setServiceType(service.value)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      serviceType === service.value
                        ? 'border-earth-600 bg-earth-50'
                        : 'border-earth-200 hover:border-earth-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-earth-900">{service.label}</span>
                      <span className="text-sm text-earth-500">{service.duration} min</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-earth-700 mb-3">Modalidad</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setModality('online')}
                    className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      modality === 'online'
                        ? 'border-earth-600 bg-earth-50'
                        : 'border-earth-200 hover:border-earth-300'
                    }`}
                  >
                    <Video className="h-5 w-5" />
                    <span>Online</span>
                  </button>
                  <button
                    onClick={() => setModality('presencial')}
                    className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      modality === 'presencial'
                        ? 'border-earth-600 bg-earth-50'
                        : 'border-earth-200 hover:border-earth-300'
                    }`}
                  >
                    <MapPin className="h-5 w-5" />
                    <span>Presencial</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!serviceType}
                className="w-full py-3 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          )}

          {/* Step 2: Seleccionar Fecha y Hora */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-earth-900 mb-6">Selecciona fecha y hora</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-earth-700 mb-3">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Fecha
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {getAvailableDates().map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date)
                        setSelectedTime('')
                      }}
                      className={`p-3 text-sm rounded-lg border transition-all ${
                        selectedDate === date
                          ? 'border-earth-600 bg-earth-50 text-earth-900'
                          : 'border-earth-200 hover:border-earth-300 text-earth-700'
                      }`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-earth-700 mb-3">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Hora disponible
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-3 text-sm rounded-lg border transition-all ${
                          selectedTime === slot.time
                            ? 'border-earth-600 bg-earth-600 text-white'
                            : slot.available
                            ? 'border-earth-200 hover:border-earth-300 text-earth-700'
                            : 'border-earth-100 bg-earth-50 text-earth-300 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-earth-300 text-earth-700 rounded-lg hover:bg-earth-50 transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 py-3 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Datos del Cliente */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-earth-900 mb-6">Tus datos de contacto</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-2" />
                    Mensaje para la doula (opcional)
                  </label>
                  <textarea
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Cuéntale brevemente tu situación o qué necesitas..."
                    rows={3}
                    className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 resize-none"
                  />
                </div>
              </div>

              {/* Resumen */}
              <div className="bg-sage-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-earth-900 mb-2">Resumen de tu cita</h3>
                <div className="text-sm text-earth-700 space-y-1">
                  <p><strong>Servicio:</strong> {SERVICE_TYPES.find(s => s.value === serviceType)?.label}</p>
                  <p><strong>Fecha:</strong> {formatDate(selectedDate)}</p>
                  <p><strong>Hora:</strong> {selectedTime}</p>
                  <p><strong>Duración:</strong> {getServiceDuration()} minutos</p>
                  <p><strong>Modalidad:</strong> {modality === 'online' ? 'Online' : 'Presencial'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 border border-earth-300 text-earth-700 rounded-lg hover:bg-earth-50 transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !clientName || !clientEmail}
                  className="flex-1 py-3 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingPage
