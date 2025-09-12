import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Save, 
  ArrowLeft, 
  X, 
  Plus, 
  MapPin,
  Star,
  Calendar,
  Globe,
  DollarSign,
  Award,
  Heart
} from 'lucide-react'
import { toast } from 'sonner'
import { getDoulaById, createDoula, updateDoula } from '../../services/supabase'
import type { Doula } from '../../types'

interface DoulaFormData {
  name: string
  email: string
  phone: string
  bio: string
  experience_years: number
  certifications: string[]
  specialties: string[]
  languages: string[]
  location: {
    city: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  pricing: {
    consultation: number
    birth_support: number
    postpartum_support: number
    packages: {
      name: string
      price: number
      description: string
    }[]
  }
  availability: {
    days: string[]
    hours: {
      start: string
      end: string
    }
  }
  is_active: boolean
}

const initialFormData: DoulaFormData = {
  name: '',
  email: '',
  phone: '',
  bio: '',
  experience_years: 0,
  certifications: [],
  specialties: [],
  languages: [],
  location: {
    city: '',
    country: '',
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  pricing: {
    consultation: 0,
    birth_support: 0,
    postpartum_support: 0,
    packages: []
  },
  availability: {
    days: [],
    hours: {
      start: '09:00',
      end: '17:00'
    }
  },
  is_active: true
}

const specialtyOptions = [
  'Parto Natural', 'Cesárea', 'Parto en Agua', 'Parto en Casa',
  'Cuidado Postparto', 'Lactancia', 'Embarazo Múltiple', 'Pérdida Perinatal',
  'Embarazo de Alto Riesgo', 'VBAC', 'Hipnoparto', 'Masaje Prenatal'
]

const certificationOptions = [
  'DONA International', 'CAPPA', 'Childbirth International', 'ICEA',
  'Birth Boot Camp', 'Lamaze International', 'Bradley Method', 'HypnoBirthing',
  'Spinning Babies', 'Rebozo Technique', 'Lactancia Materna', 'Primeros Auxilios'
]

const languageOptions = [
  'Español', 'Inglés', 'Francés', 'Portugués', 'Italiano', 'Alemán',
  'Catalán', 'Euskera', 'Gallego', 'Árabe', 'Chino', 'Japonés'
]

const daysOfWeek = [
  { value: 'monday', label: 'Lunes' },
  { value: 'tuesday', label: 'Martes' },
  { value: 'wednesday', label: 'Miércoles' },
  { value: 'thursday', label: 'Jueves' },
  { value: 'friday', label: 'Viernes' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' }
]

const DoulaForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)
  
  const [formData, setFormData] = useState<DoulaFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [newSpecialty, setNewSpecialty] = useState('')
  const [newCertification, setNewCertification] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [newPackage, setNewPackage] = useState({ name: '', price: 0, description: '' })

  const loadDoula = useCallback(async (doulaId: string) => {
    setIsLoading(true)
    try {
      const doula = await getDoulaById(doulaId)
      
      if (doula) {
        setFormData({
          name: doula.name,
          email: doula.email,
          phone: doula.phone,
          bio: doula.bio,
          experience_years: doula.experience_years,
          certifications: doula.certifications,
          specialties: doula.specialties,
          languages: doula.languages,
          location: {
            city: doula.location.city,
            country: doula.location.country,
            coordinates: {
              lat: doula.location.latitude,
              lng: doula.location.longitude
            }
          },
          pricing: {
            consultation: typeof doula.pricing.consultation_fee === 'number' ? doula.pricing.consultation_fee : 0,
            birth_support: typeof doula.pricing.birth_package === 'number' ? doula.pricing.birth_package : 0,
            postpartum_support: typeof doula.pricing.hourly_rate === 'number' ? doula.pricing.hourly_rate : 0,
            packages: []
          },
          availability: {
            days: Object.entries(doula.availability)
              .filter(([, available]) => available)
              .map(([day]) => day),
            hours: {
              start: '09:00',
              end: '17:00'
            }
          },
          is_active: doula.is_active
        })
      } else {
        toast.error('Doula no encontrada')
        navigate('/admin/doulas')
      }
    } catch (error) {
      toast.error('Error al cargar los datos de la doula')
      navigate('/admin/doulas')
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    if (isEditing && id) {
      loadDoula(id)
    }
  }, [id, isEditing, loadDoula])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim()) {
      toast.error('El nombre es requerido')
      return
    }
    
    if (!formData.email.trim()) {
      toast.error('El email es requerido')
      return
    }
    
    if (!formData.location.city.trim() || !formData.location.country.trim()) {
      toast.error('La ubicación es requerida')
      return
    }

    setIsLoading(true)
    
    try {
      // Transform form data to Doula format
      const doulaData: Partial<Doula> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        experience_years: formData.experience_years,
        certifications: formData.certifications,
        specialties: formData.specialties,
        languages: formData.languages,
        location: {
          address: '',
          city: formData.location.city,
          country: formData.location.country,
          latitude: formData.location.coordinates.lat,
          longitude: formData.location.coordinates.lng
        },
        pricing: {
          consultation_fee: formData.pricing.consultation,
          birth_package: formData.pricing.birth_support,
          hourly_rate: formData.pricing.postpartum_support,
          currency: 'USD'
        },
        availability: {
          monday: formData.availability.days.includes('monday'),
          tuesday: formData.availability.days.includes('tuesday'),
          wednesday: formData.availability.days.includes('wednesday'),
          thursday: formData.availability.days.includes('thursday'),
          friday: formData.availability.days.includes('friday'),
          saturday: formData.availability.days.includes('saturday'),
          sunday: formData.availability.days.includes('sunday')
        },
        is_active: formData.is_active,
        gallery_images: [],
        contact: {
          phone: formData.phone,
          email: formData.email
        },
        services: {
          prenatal_support: true,
          birth_support: true,
          postpartum_support: true,
          lactation_support: false,
          childbirth_education: false
        }
      }

      if (isEditing && id) {
        await updateDoula(id, doulaData)
      } else {
        await createDoula(doulaData)
      }
      
      toast.success(isEditing ? 'Doula actualizada exitosamente' : 'Doula creada exitosamente')
      navigate('/admin/doulas')
    } catch (error) {
      toast.error('Error al guardar la doula')
      console.error('Error saving doula:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }))
      setNewSpecialty('')
    }
  }

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }))
  }

  const addCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }))
      setNewCertification('')
    }
  }

  const removeCertification = (certification: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== certification)
    }))
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }))
      setNewLanguage('')
    }
  }

  const removeLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }))
  }

  const addPackage = () => {
    if (newPackage.name.trim() && newPackage.price > 0) {
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          packages: [...prev.pricing.packages, { ...newPackage }]
        }
      }))
      setNewPackage({ name: '', price: 0, description: '' })
    }
  }

  const removePackage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        packages: prev.pricing.packages.filter((_, i) => i !== index)
      }
    }))
  }

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter(d => d !== day)
          : [...prev.availability.days, day]
      }
    }))
  }

  if (isLoading && isEditing) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-600 mx-auto mb-4"></div>
          <p className="text-earth-600">Cargando datos de la doula...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-earth-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/doulas')}
                className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-earth-900">
                  {isEditing ? 'Editar Doula' : 'Agregar Nueva Doula'}
                </h1>
                <p className="text-earth-600 mt-1">
                  {isEditing ? 'Actualiza la información de la doula' : 'Completa todos los campos requeridos'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-5 w-5 text-earth-600" />
              <h2 className="text-lg font-semibold text-earth-900">Información Básica</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Años de Experiencia
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.experience_years}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience_years: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Biografía
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                placeholder="Describe tu experiencia, filosofía y enfoque como doula..."
              />
            </div>
            
            <div className="mt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="rounded border-earth-300 text-earth-600 focus:ring-earth-500"
                />
                <span className="text-sm font-medium text-earth-700">Perfil activo</span>
              </label>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-earth-600" />
              <h2 className="text-lg font-semibold text-earth-900">Ubicación</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Ciudad *
                </label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, city: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  País *
                </label>
                <input
                  type="text"
                  value={formData.location.country}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, country: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Latitud
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.location.coordinates.lat}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      coordinates: {
                        ...prev.location.coordinates,
                        lat: parseFloat(e.target.value) || 0
                      }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Longitud
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.location.coordinates.lng}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      coordinates: {
                        ...prev.location.coordinates,
                        lng: parseFloat(e.target.value) || 0
                      }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-earth-600" />
              <h2 className="text-lg font-semibold text-earth-900">Especialidades</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="flex-1 px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                >
                  <option value="">Seleccionar especialidad...</option>
                  {specialtyOptions.filter(s => !formData.specialties.includes(s)).map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map(specialty => (
                  <span
                    key={specialty}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-earth-100 text-earth-700 rounded-full text-sm"
                  >
                    {specialty}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(specialty)}
                      className="text-earth-500 hover:text-earth-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-5 w-5 text-earth-600" />
              <h2 className="text-lg font-semibold text-earth-900">Certificaciones</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  className="flex-1 px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                >
                  <option value="">Seleccionar certificación...</option>
                  {certificationOptions.filter(c => !formData.certifications.includes(c)).map(cert => (
                    <option key={cert} value={cert}>{cert}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addCertification}
                  className="px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map(cert => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm"
                  >
                    {cert}
                    <button
                      type="button"
                      onClick={() => removeCertification(cert)}
                      className="text-sage-500 hover:text-sage-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="h-5 w-5 text-earth-600" />
              <h2 className="text-lg font-semibold text-earth-900">Idiomas</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="flex-1 px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                >
                  <option value="">Seleccionar idioma...</option>
                  {languageOptions.filter(l => !formData.languages.includes(l)).map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.languages.map(lang => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-warm-100 text-warm-700 rounded-full text-sm"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => removeLanguage(lang)}
                      className="text-warm-500 hover:text-warm-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="h-5 w-5 text-earth-600" />
              <h2 className="text-lg font-semibold text-earth-900">Precios</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Consulta (€)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.pricing.consultation}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: {
                      ...prev.pricing,
                      consultation: parseFloat(e.target.value) || 0
                    }
                  }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Apoyo en el Parto (€)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.pricing.birth_support}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: {
                      ...prev.pricing,
                      birth_support: parseFloat(e.target.value) || 0
                    }
                  }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Apoyo Postparto (€)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.pricing.postpartum_support}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: {
                      ...prev.pricing,
                      postpartum_support: parseFloat(e.target.value) || 0
                    }
                  }))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
              </div>
            </div>
            
            {/* Packages */}
            <div>
              <h3 className="text-md font-medium text-earth-900 mb-4">Paquetes</h3>
              
              <div className="space-y-4 mb-4">
                {formData.pricing.packages.map((pkg, index) => (
                  <div key={index} className="p-4 border border-earth-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-earth-900">{pkg.name}</h4>
                        <p className="text-sm text-earth-600">{pkg.description}</p>
                        <p className="text-lg font-bold text-earth-900 mt-1">€{pkg.price}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePackage(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Nombre del paquete"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  min="0"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  className="px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={newPackage.description}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                  />
                  <button
                    type="button"
                    onClick={addPackage}
                    className="px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-earth-600" />
              <h2 className="text-lg font-semibold text-earth-900">Disponibilidad</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-3">
                  Días disponibles
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {daysOfWeek.map(day => (
                    <label key={day.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.availability.days.includes(day.value)}
                        onChange={() => toggleDay(day.value)}
                        className="rounded border-earth-300 text-earth-600 focus:ring-earth-500"
                      />
                      <span className="text-sm text-earth-700">{day.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Hora de inicio
                  </label>
                  <input
                    type="time"
                    value={formData.availability.hours.start}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      availability: {
                        ...prev.availability,
                        hours: {
                          ...prev.availability.hours,
                          start: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Hora de fin
                  </label>
                  <input
                    type="time"
                    value={formData.availability.hours.end}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      availability: {
                        ...prev.availability,
                        hours: {
                          ...prev.availability.hours,
                          end: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/doulas')}
              className="px-6 py-2 border border-earth-300 text-earth-700 rounded-lg hover:bg-earth-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar Doula' : 'Crear Doula')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DoulaForm