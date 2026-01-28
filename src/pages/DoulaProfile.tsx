import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Award, 
  Heart, 
  Users, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  MessageCircle,
  CheckCircle,
  Share2,
  Copy,
  ExternalLink
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { getDoulaById, getReviewsByDoulaId } from '../services/supabase'
import { toast } from 'sonner'
import type { Doula, Review } from '../types'
import QRGenerator from '../components/QRGenerator'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers in react-leaflet
interface LeafletIconDefault extends L.Icon.Default {
  _getIconUrl?: () => string;
}
delete (L.Icon.Default.prototype as LeafletIconDefault)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const DoulaProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, setLoading } = useStore()
  const [doula, setDoula] = useState<Doula | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [activeTab, setActiveTab] = useState('about')

  const loadDoula = useCallback(async (doulaId: string) => {
    setLoading(true)
    try {
      const [doulaData, reviewsData] = await Promise.all([
        getDoulaById(doulaId),
        getReviewsByDoulaId(doulaId)
      ])
      setDoula(doulaData)
      setReviews(reviewsData)
    } catch (error) {
      toast.error('Error al cargar el perfil de la doula')
      console.error('Error loading doula:', error)
    } finally {
      setLoading(false)
    }
  }, [setLoading])

  useEffect(() => {
    if (id) {
      loadDoula(id)
    }
  }, [id, loadDoula])

  const copyTestimonioLink = () => {
    const link = `${window.location.origin}/doula/${id}/testimonio`
    navigator.clipboard.writeText(link)
    toast.success('¡Enlace copiado! Compártelo con tus clientes')
  }

  const handleCalendlyClick = () => {
    if (doula?.calendly_link) {
      window.open(doula.calendly_link, '_blank')
    } else {
      // Enlace genérico de la escuela o abrir WhatsApp
      const phone = doula?.contact.phone.replace(/\s+/g, '').replace(/-/g, '')
      const message = encodeURIComponent(`Hola ${doula?.name}, me gustaría agendar una consulta contigo.`)
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
    }
  }

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case 'parto':
      case 'birth':
        return <Heart className="h-4 w-4" />
      case 'postparto':
      case 'postpartum':
        return <Users className="h-4 w-4" />
      case 'lactancia':
      case 'breastfeeding':
        return <Award className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-600 mx-auto mb-4"></div>
          <p className="text-earth-600">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (!doula) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="h-16 w-16 text-earth-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-earth-900 mb-2">
            Doula no encontrada
          </h2>
          <p className="text-earth-600 mb-4">
            La doula que buscas no existe o ha sido eliminada.
          </p>
          <Link
            to="/doulas"
            className="inline-flex items-center gap-2 px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Directorio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/doulas"
            className="inline-flex items-center gap-2 text-earth-600 hover:text-earth-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al directorio
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-earth-200 to-sage-200 rounded-full flex items-center justify-center overflow-hidden">
                    {doula.profile_image ? (
                      <img 
                        src={doula.profile_image}
                        alt={`Foto de ${doula.name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const sibling = target.nextElementSibling;
                          if (sibling) sibling.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <span className={`text-4xl font-bold text-earth-700 ${doula.profile_image ? 'hidden' : ''}`}>
                      {doula.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-earth-900 mb-2">
                    {doula.name}
                  </h1>
                  <div className="flex items-center text-earth-600 mb-3">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{doula.location.city}, {doula.location.country}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      {renderStars(doula.rating)}
                      <span className="ml-2 text-earth-700 font-medium">
                        {doula.rating} ({doula.reviews_count} reseñas)
                      </span>
                    </div>
                    <div className="flex items-center text-earth-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{doula.experience_years} años de experiencia</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doula.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-earth-100 text-earth-700 rounded-full text-sm"
                      >
                        {getSpecialtyIcon(specialty)}
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  {/* Accompaniment Types */}
                  <div className="flex flex-wrap gap-2">
                    {doula.accompaniment_types.map((type, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          type === 'presencial'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {type === 'presencial' ? '🏠 Presencial' : '💻 Online'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b border-earth-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'about', label: 'Sabiduría Ancestral', icon: Users },
                  { id: 'services', label: 'Dones Sagrados', icon: Heart },
                  { id: 'reviews', label: 'Testimonios del Círculo', icon: Star },
                  { id: 'location', label: 'Territorio Sagrado', icon: MapPin }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === id
                          ? 'border-earth-500 text-earth-600'
                          : 'border-transparent text-earth-500 hover:text-earth-700 hover:border-earth-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-earth-900 mb-3">
                        Camino de la Guardiana
                      </h3>
                      <p className="text-earth-700 leading-relaxed">
                        {doula.bio}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-earth-900 mb-3">
                        Iniciaciones y Linajes
                      </h3>
                      <div className="space-y-2">
                        {doula.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-earth-700">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-earth-900 mb-3">
                        Lenguas Sagradas
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {doula.languages.map((language, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-earth-900 mb-3">
                        Origen Ancestral
                      </h3>
                      <p className="text-earth-700">
                        <span className="font-medium">Nacionalidad:</span> {doula.nationality}
                      </p>
                      <p className="text-earth-700 mt-1">
                        <span className="font-medium">Identificación:</span> {doula.identification_number}
                      </p>
                    </div>
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-earth-900 mb-4">
                        Dones Sagrados Ofrecidos
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {doula.services.prenatal_support && (
                          <div className="border border-earth-200 rounded-lg p-4">
                            <h4 className="font-medium text-earth-900 mb-2">Acompañamiento en la Gestación Sagrada</h4>
                            <p className="text-earth-600 text-sm mb-3">Guía ancestral durante el florecimiento de la vida</p>
                          </div>
                        )}
                        {doula.services.birth_support && (
                          <div className="border border-earth-200 rounded-lg p-4">
                            <h4 className="font-medium text-earth-900 mb-2">Guardiana del Nacimiento</h4>
                            <p className="text-earth-600 text-sm mb-3">Protección y sabiduría durante el sagrado pasaje</p>
                          </div>
                        )}
                        {doula.services.postpartum_support && (
                          <div className="border border-earth-200 rounded-lg p-4">
                            <h4 className="font-medium text-earth-900 mb-2">Cuidado en el Puerperio Sagrado</h4>
                            <p className="text-earth-600 text-sm mb-3">Sanación y fortalecimiento en la nueva maternidad</p>
                          </div>
                        )}
                        {doula.services.lactation_support && (
                          <div className="border border-earth-200 rounded-lg p-4">
                            <h4 className="font-medium text-earth-900 mb-2">Ritual del Primer Alimento</h4>
                            <p className="text-earth-600 text-sm mb-3">Sabiduría ancestral en la alimentación sagrada</p>
                          </div>
                        )}
                        {doula.services.childbirth_education && (
                          <div className="border border-earth-200 rounded-lg p-4">
                            <h4 className="font-medium text-earth-900 mb-2">Enseñanzas del Círculo Sagrado</h4>
                            <p className="text-earth-600 text-sm mb-3">Transmisión de saberes ancestrales para el nacimiento</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-earth-900 mb-3">
                        Intercambio Energético
                      </h3>
                      <div className="bg-earth-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-earth-700">Primer encuentro sagrado:</span>
                          <span className="font-semibold text-earth-900">
                            {typeof doula.pricing.consultation_fee === 'string' ? 
                              doula.pricing.consultation_fee : 
                              `$${doula.pricing.consultation_fee}`
                            }
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-earth-700">Acompañamiento completo:</span>
                          <span className="font-semibold text-earth-900">
                            {typeof doula.pricing.birth_package === 'string' ? 
                              doula.pricing.birth_package : 
                              `$${doula.pricing.birth_package}`
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-earth-900 mb-2">
                        {doula.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(doula.rating)}
                      </div>
                      <p className="text-earth-600">
                        Basado en {doula.reviews_count} testimonios del círculo
                      </p>
                    </div>

                    {/* Botón para dejar testimonio */}
                    <div className="bg-sage-50 rounded-lg p-4 text-center">
                      <p className="text-earth-700 mb-3">
                        ¿Has sido acompañada por {doula.name.split(' ')[0]}?
                      </p>
                      <Link
                        to={`/doula/${id}/testimonio`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
                      >
                        <Star className="h-4 w-4" />
                        Dejar mi testimonio
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <div key={review.id} className="border border-earth-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium text-earth-900">{review.client_name}</h4>
                                <div className="flex items-center gap-2">
                                  {renderStars(review.rating)}
                                  {review.service_type && (
                                    <span className="text-xs bg-earth-100 text-earth-600 px-2 py-0.5 rounded-full">
                                      {review.service_type}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-sm text-earth-500">
                                {new Date(review.created_at).toLocaleDateString('es-ES')}
                              </span>
                            </div>
                            <p className="text-earth-700">{review.comment}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <MessageCircle className="h-12 w-12 text-earth-300 mx-auto mb-3" />
                          <p className="text-earth-600">
                            Aún no hay testimonios publicados.
                          </p>
                          <p className="text-earth-500 text-sm mt-1">
                            ¡Sé la primera en compartir tu experiencia!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === 'location' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-earth-900 mb-3">
                        Territorio Sagrado
                      </h3>
                      <p className="text-earth-700 mb-4">
                        {doula.location.address}, {doula.location.city}, {doula.location.country}
                      </p>
                    </div>
                    <div className="h-64 rounded-lg overflow-hidden">
                      <MapContainer
                        center={[doula.location.latitude, doula.location.longitude]}
                        zoom={13}
                        className="h-full w-full"
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[doula.location.latitude, doula.location.longitude]} />
                      </MapContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-earth-900 mb-4">
                Conexión Sagrada
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-earth-600" />
                  <span className="text-earth-700">{doula.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-earth-600" />
                  <span className="text-earth-700">{doula.contact.email}</span>
                </div>
                {doula.contact.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-earth-600" />
                    <a
                      href={doula.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-earth-600 hover:text-earth-700 underline"
                    >
                      Sitio web
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-earth-900 mb-4">
                ¿Lista para tu Camino Sagrado?
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={handleCalendlyClick}
                  className="w-full flex items-center justify-center gap-2 bg-earth-600 text-white py-3 px-4 rounded-lg hover:bg-earth-700 transition-colors"
                >
                  <Calendar className="h-5 w-5" />
                  {doula.calendly_link ? 'Agendar Encuentro' : 'Solicitar Encuentro Sagrado'}
                  {doula.calendly_link && <ExternalLink className="h-4 w-4" />}
                </button>
                <a 
                  href={`https://wa.me/${doula.contact.phone.replace(/\s+/g, '').replace(/-/g, '')}?text=${encodeURIComponent(`Hola ${doula.name}, me gustaría conocer más sobre tus servicios de acompañamiento.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-earth-300 text-earth-700 py-3 px-4 rounded-lg hover:bg-earth-50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  Conectar por WhatsApp
                </a>
              </div>
            </div>

            {/* Compartir enlace de testimonios */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-earth-900 mb-4">
                Enlace para Testimonios
              </h3>
              <p className="text-sm text-earth-600 mb-3">
                Comparte este enlace con tus clientes para que dejen sus testimonios:
              </p>
              <div className="flex gap-2">
                <button
                  onClick={copyTestimonioLink}
                  className="flex-1 flex items-center justify-center gap-2 bg-sage-100 text-earth-700 py-2 px-3 rounded-lg hover:bg-sage-200 transition-colors text-sm"
                >
                  <Copy className="h-4 w-4" />
                  Copiar enlace
                </button>
                <Link
                  to={`/doula/${id}/testimonio`}
                  className="flex items-center justify-center gap-2 bg-earth-100 text-earth-700 py-2 px-3 rounded-lg hover:bg-earth-200 transition-colors text-sm"
                >
                  <Share2 className="h-4 w-4" />
                  Ver
                </Link>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-earth-900 mb-4">
                Ciclos de Disponibilidad
              </h3>
              <div className="space-y-2">
                {Object.entries(doula.availability).map(([day, available]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-earth-100 last:border-b-0">
                    <span className="text-earth-700 capitalize">
                      {day === 'monday' ? 'Lunes' :
                       day === 'tuesday' ? 'Martes' :
                       day === 'wednesday' ? 'Miércoles' :
                       day === 'thursday' ? 'Jueves' :
                       day === 'friday' ? 'Viernes' :
                       day === 'saturday' ? 'Sábado' :
                       day === 'sunday' ? 'Domingo' : day}
                    </span>
                    <span className={`text-sm ${
                      available ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {available ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code Generator */}
            <QRGenerator doulaSlug={doula.slug} doulaName={doula.name} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoulaProfile