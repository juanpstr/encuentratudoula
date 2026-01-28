import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Heart, Send, CheckCircle, ArrowLeft, User } from 'lucide-react'
import { getDoulaById, createReview } from '../services/supabase'
import { toast } from 'sonner'
import type { Doula } from '../types'

const DejarTestimonio = () => {
  const { id } = useParams<{ id: string }>()
  const [doula, setDoula] = useState<Doula | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Formulario
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [serviceType, setServiceType] = useState('')

  const loadDoula = useCallback(async (doulaId: string) => {
    setIsLoading(true)
    try {
      const data = await getDoulaById(doulaId)
      setDoula(data)
    } catch (error) {
      toast.error('Error al cargar la información de la doula')
      console.error('Error loading doula:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (id) {
      loadDoula(id)
    }
  }, [id, loadDoula])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!id || !doula) return
    
    if (!clientName.trim()) {
      toast.error('Por favor ingresa tu nombre')
      return
    }
    
    if (!comment.trim()) {
      toast.error('Por favor escribe tu testimonio')
      return
    }
    
    if (comment.length < 20) {
      toast.error('Tu testimonio debe tener al menos 20 caracteres')
      return
    }

    setIsSubmitting(true)
    
    try {
      await createReview({
        doula_id: id,
        client_name: clientName.trim(),
        client_email: clientEmail.trim() || undefined,
        rating,
        comment: comment.trim(),
        service_type: serviceType || undefined
      })
      
      setIsSubmitted(true)
      toast.success('¡Testimonio enviado con éxito!')
    } catch (error) {
      toast.error('Error al enviar el testimonio. Por favor intenta de nuevo.')
      console.error('Error submitting review:', error)
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
          <Heart className="h-16 w-16 text-earth-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-earth-900 mb-2">
            Doula no encontrada
          </h2>
          <p className="text-earth-600 mb-6">
            La doula que buscas no existe o el enlace es incorrecto.
          </p>
          <Link
            to="/doulas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver Directorio de Doulas
          </Link>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-earth-50 to-sage-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-earth-900 mb-3">
            ¡Gracias por tu testimonio!
          </h2>
          <p className="text-earth-600 mb-6">
            Tu testimonio ha sido enviado a <strong>{doula.name}</strong> para su revisión. 
            Una vez aprobado, aparecerá en su perfil.
          </p>
          <div className="space-y-3">
            <Link
              to={`/doula/${id}`}
              className="block w-full px-6 py-3 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
            >
              Ver perfil de {doula.name}
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
        <div className="text-center mb-8">
          <Link
            to={`/doula/${id}`}
            className="inline-flex items-center gap-2 text-earth-600 hover:text-earth-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al perfil
          </Link>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-earth-200 to-sage-200 rounded-full flex items-center justify-center overflow-hidden">
                {doula.profile_image ? (
                  <img 
                    src={doula.profile_image} 
                    alt={doula.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <User className="h-8 w-8 text-earth-600" />
                )}
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold text-earth-900">{doula.name}</h1>
                <p className="text-earth-600">{doula.location.city}, {doula.location.country}</p>
              </div>
            </div>
            <p className="text-earth-700">
              Comparte tu experiencia de acompañamiento con {doula.name.split(' ')[0]}
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-earth-900 mb-6 text-center">
            Deja tu Testimonio
          </h2>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-earth-700 mb-3 text-center">
              ¿Cómo calificarías tu experiencia?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`h-10 w-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-earth-500 mt-2">
              {rating === 5 && '¡Excelente!'}
              {rating === 4 && 'Muy buena'}
              {rating === 3 && 'Buena'}
              {rating === 2 && 'Regular'}
              {rating === 1 && 'Necesita mejorar'}
            </p>
          </div>

          {/* Tipo de servicio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Tipo de acompañamiento recibido (opcional)
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 transition-colors bg-white"
            >
              <option value="">Selecciona un tipo...</option>
              <option value="Sanación de Memorias Uterinas">Sanación de Memorias Uterinas</option>
              <option value="Pre Concepción y Fertilidad">Pre Concepción y Fertilidad</option>
              <option value="Gestación">Gestación</option>
              <option value="Parto">Parto</option>
              <option value="Postparto">Postparto</option>
              <option value="Medicina Placentaria">Medicina Placentaria</option>
              <option value="Plenipausia">Plenipausia (perimenopausia/menopausia)</option>
              <option value="Duelos">Duelos</option>
              <option value="Ciclicidad">Ciclicidad</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Nombre */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Tu nombre *
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ej: María G."
              className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 transition-colors"
              required
            />
            <p className="text-xs text-earth-500 mt-1">
              Puedes usar solo tu nombre o iniciales si prefieres más privacidad
            </p>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Tu email (opcional)
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 transition-colors"
            />
            <p className="text-xs text-earth-500 mt-1">
              No será publicado, solo para verificación si es necesario
            </p>
          </div>

          {/* Comentario */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Tu testimonio *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos sobre tu experiencia de acompañamiento. ¿Cómo te ayudó? ¿Qué fue lo más valioso para ti?"
              rows={5}
              className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 transition-colors resize-none"
              required
              minLength={20}
            />
            <p className="text-xs text-earth-500 mt-1">
              Mínimo 20 caracteres. Tu testimonio ayudará a otras mujeres a conocer mejor a {doula.name.split(' ')[0]}.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-earth-600 text-white py-4 px-6 rounded-lg hover:bg-earth-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Enviar Testimonio
              </>
            )}
          </button>

          <p className="text-xs text-earth-500 text-center mt-4">
            Al enviar, aceptas que tu testimonio sea publicado en el perfil de {doula.name.split(' ')[0]} 
            una vez aprobado.
          </p>
        </form>
      </div>
    </div>
  )
}

export default DejarTestimonio
