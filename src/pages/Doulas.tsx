import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, MapPin, Star, Clock, Award, Heart, Users } from 'lucide-react'
import { useStore } from '../store/useStore'
import { getDoulas, searchDoulas } from '../services/supabase'
import { toast } from 'sonner'
import type { SearchFilters } from '../types/index'

const Doulas = () => {
  const {
    doulas,
    setDoulas,
    filteredDoulas,
    setFilteredDoulas,
    searchQuery,
    setSearchQuery,
    searchFilters,
    setSearchFilters,
    isLoading,
    setLoading
  } = useStore()

  const [searchInput, setSearchInput] = useState(searchQuery)
  const [showFilters, setShowFilters] = useState(false)
  const [localFilters, setLocalFilters] = useState<SearchFilters>(searchFilters)

  const loadDoulas = useCallback(async () => {
    console.log('🚀 Loading doulas...')
    setLoading(true)
    try {
      const doulas = await getDoulas()
      console.log(`✅ Loaded ${doulas.length} doulas:`, doulas.map(d => `${d.id}: ${d.name}`))
      setDoulas(doulas)
    } catch (error) {
      toast.error('Error al cargar las doulas')
      console.error('❌ Error loading doulas:', error)
    } finally {
      setLoading(false)
    }
  }, [setLoading, setDoulas])

  const applyFilters = useCallback(async () => {
    if (searchQuery || Object.values(searchFilters).some(v => v !== '' && v !== 0)) {
      setLoading(true)
      try {
        const filters = {
          location: searchFilters.location || searchQuery,
          specialties: searchFilters.services,
          languages: searchFilters.languages,
          maxPrice: searchFilters.priceRange?.max
        }
        const results = await searchDoulas(filters)
        setFilteredDoulas(results)
      } catch (error) {
        toast.error('Error en la búsqueda')
        console.error('Search error:', error)
        setFilteredDoulas(doulas)
      } finally {
        setLoading(false)
      }
    } else {
      setFilteredDoulas(doulas)
    }
  }, [searchQuery, searchFilters, setLoading, setFilteredDoulas, doulas])

  useEffect(() => {
    loadDoulas()
  }, [loadDoulas])

  useEffect(() => {
    if (doulas.length > 0) {
      applyFilters()
    }
  }, [doulas, searchQuery, searchFilters, applyFilters])

  const handleSearch = () => {
    setSearchQuery(searchInput)
    setSearchFilters(localFilters)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearFilters = () => {
    setSearchInput('')
    setSearchQuery('')
    const emptyFilters: SearchFilters = {
      location: '',
      specialties: '',
      languages: '',
      experience_years: 0,
      rating: 0,
      price_range: ''
    }
    setLocalFilters(emptyFilters)
    setSearchFilters(emptyFilters)
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

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-earth-900 mb-4">
            Directorio de Doulas Ancestrales
          </h1>
          <p className="text-lg text-earth-600 mb-6">
            Encuentra a tu Doula Ancestral certificada por la Escuela Ancestral de Doulas para acompañarte en tu proceso
          </p>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-earth-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, ciudad, país o especialidad..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 border border-earth-300 rounded-lg hover:bg-earth-50 transition-colors"
                >
                  <Filter className="h-5 w-5" />
                  Filtros
                </button>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
                >
                  Buscar
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="bg-earth-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      placeholder="Ciudad o país"
                      value={localFilters.location}
                      onChange={(e) => setLocalFilters({...localFilters, location: e.target.value})}
                      className="w-full px-3 py-2 border border-earth-300 rounded-md focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Especialidad
                    </label>
                    <select
                      value={localFilters.specialties}
                      onChange={(e) => setLocalFilters({...localFilters, specialties: e.target.value})}
                      className="w-full px-3 py-2 border border-earth-300 rounded-md focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none"
                    >
                      <option value="">Todas las especialidades</option>
                      <option value="Ciclicidad">Ciclicidad</option>
                      <option value="Sanación de Memorias Uterinas">Sanación de Memorias Uterinas</option>
                      <option value="Pre Concepción y Fertilidad">Preconcepción y Fertilidad</option>
                      <option value="Gestación">Gestación</option>
                      <option value="Parto">Parto</option>
                      <option value="Postparto">Postparto</option>
                      <option value="Medicina Placentaria">Medicina Placentaria</option>
                      <option value="Plenipausia">Plenipausia</option>
                      <option value="Duelos">Duelos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Idiomas
                    </label>
                    <select
                      value={localFilters.languages}
                      onChange={(e) => setLocalFilters({...localFilters, languages: e.target.value})}
                      className="w-full px-3 py-2 border border-earth-300 rounded-md focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none"
                    >
                      <option value="">Todas las lenguas</option>
                      <option value="español">Español</option>
                      <option value="inglés">Inglés</option>
                      <option value="portugués">Portugués</option>
                      <option value="francés">Francés</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Años de Experiencia
                    </label>
                    <select
                      value={localFilters.experience_years}
                      onChange={(e) => setLocalFilters({...localFilters, experience_years: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-earth-300 rounded-md focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none"
                    >
                      <option value={0}>Cualquier experiencia</option>
                      <option value={1}>1+ años</option>
                      <option value={3}>3+ años</option>
                      <option value={5}>5+ años</option>
                      <option value={10}>10+ años</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Calificación mínima
                    </label>
                    <select
                      value={localFilters.rating}
                      onChange={(e) => setLocalFilters({...localFilters, rating: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-earth-300 rounded-md focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none"
                    >
                      <option value={0}>Cualquier calificación</option>
                      <option value={3}>3+ estrellas</option>
                      <option value={4}>4+ estrellas</option>
                      <option value={4.5}>4.5+ estrellas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Rango de precios
                    </label>
                    <select
                      value={localFilters.price_range}
                      onChange={(e) => setLocalFilters({...localFilters, price_range: e.target.value})}
                      className="w-full px-3 py-2 border border-earth-300 rounded-md focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none"
                    >
                      <option value="">Cualquier precio</option>
                      <option value="0-500">$0 - $500</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2000">$1,000 - $2,000</option>
                      <option value="2000+">$2,000+</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-earth-600 text-white rounded-md hover:bg-earth-700 transition-colors"
                  >
                    Aplicar Filtros
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 border border-earth-300 text-earth-700 rounded-md hover:bg-earth-50 transition-colors"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-earth-600">
            {isLoading ? 'Cargando doulas...' : `${filteredDoulas.length} Doulas Ancestrales disponibles`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="w-24 h-24 bg-earth-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-earth-200 rounded mb-2"></div>
                <div className="h-3 bg-earth-200 rounded mb-4"></div>
                <div className="h-3 bg-earth-200 rounded mb-2"></div>
                <div className="h-3 bg-earth-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredDoulas.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-earth-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-earth-900 mb-2">
              No se encontraron doulas
            </h3>
            <p className="text-earth-600 mb-4">
              Ajusta tu búsqueda para encontrar a tu Doula Ancestral ideal
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoulas.map((doula) => (
              <div key={doula.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Profile Image */}
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-earth-200 to-sage-200 rounded-full mx-auto flex items-center justify-center overflow-hidden">
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
                      <span className={`text-2xl font-bold text-earth-700 ${doula.profile_image ? 'hidden' : ''}`}>
                        {doula.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-earth-900 mb-1">
                      {doula.name}
                    </h3>
                    <div className="flex items-center justify-center text-earth-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{doula.location.city}, {doula.location.country}</span>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-earth-700">
                        {doula.rating} ({doula.reviews_count} reseñas)
                      </span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {doula.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-earth-100 text-earth-700 rounded-full text-xs"
                        >
                          {getSpecialtyIcon(specialty)}
                          {specialty}
                        </span>
                      ))}
                      {doula.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-earth-100 text-earth-700 rounded-full text-xs">
                          +{doula.specialties.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Experience and Languages */}
                  <div className="space-y-2 mb-4 text-sm text-earth-600">
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{doula.experience_years} años de experiencia</span>
                    </div>
                    <div className="text-center">
                      <span className="font-medium">Idiomas:</span> {doula.languages.join(', ')}
                    </div>
                  </div>

                  {/* Accompaniment Types */}
                  <div className="mb-4">
                    <div className="flex justify-center gap-2">
                      {doula.accompaniment_types.map((type, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                  {/* Price */}
                  <div className="text-center mb-4">
                    <span className="text-lg font-semibold text-earth-900">
                      {typeof doula.pricing.consultation_fee === 'string' ? 
                        doula.pricing.consultation_fee : 
                        `$${doula.pricing.consultation_fee}`
                      }
                    </span>
                    <span className="text-sm text-earth-600 ml-1">
                      {typeof doula.pricing.consultation_fee === 'string' ? '' : 'consulta'}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/doula/${doula.id}`}
                    className="block w-full bg-earth-600 text-white text-center py-3 rounded-lg hover:bg-earth-700 transition-colors font-medium"
                  >
                    Ver Perfil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Doulas