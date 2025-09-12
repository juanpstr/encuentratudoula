import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Star, Users, Award, Heart } from 'lucide-react'
import { useStore } from '../store/useStore'
import { getDoulas } from '../services/supabase'
import { toast } from 'sonner'

const Home = () => {
  const { 
    doulas, 
    setDoulas,
    setLoading,
    setFilteredDoulas,
    setSearchQuery,
    filterDoulas
  } = useStore()
  
  const [searchInput, setSearchInput] = useState('')

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

  useEffect(() => {
    if (doulas.length > 0) {
      setFilteredDoulas(doulas)
    }
  }, [doulas, setFilteredDoulas])

  const handleSearch = useCallback(() => {
    setSearchQuery(searchInput)
    filterDoulas()
  }, [searchInput, setSearchQuery, filterDoulas])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }, [handleSearch])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-earth-100 via-sage-50 to-warm-50 py-20 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=mystical%20ancestral%20doula%20ceremony%20with%20pregnant%20woman%20in%20golden%20earth%20tones%20sacred%20ritual%20candles%20flowers%20peaceful%20spiritual%20atmosphere&image_size=landscape_16_9" 
            alt="Ceremonia ancestral de doula" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-8">
              <img 
                src="/logo.png" 
                alt="Encuentra tu Doula" 
                className="h-32 w-auto mx-auto mb-4"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-earth-900 mb-6">
              Encuentra tu <span className="text-earth-600">Doula</span> perfecta
            </h1>
            <p className="text-xl text-earth-700 mb-8 max-w-3xl mx-auto">
              Conecta con doulas formadas en Escuela Mística de Saberes. Acompañamiento profesional y amoroso para tu embarazo, parto, postparto y procesos de vida.
              <br />
              <span className="text-sm text-earth-600 mt-2 block">
                ✨ Deploy automático configurado y funcionando
              </span>
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-earth-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar por ciudad, especialidad o nombre…"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent outline-none text-lg"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors font-medium text-lg"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Users className="h-12 w-12 text-earth-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-earth-900 mb-2">6</h3>
                <p className="text-earth-600">Doulas certificadas</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <MapPin className="h-12 w-12 text-sage-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-earth-900 mb-2">6</h3>
                <p className="text-earth-600">Ciudades Cubiertas</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Star className="h-12 w-12 text-warm-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-earth-900 mb-2">4.9</h3>
                <p className="text-earth-600">Calificación Promedio</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Tres pasos sencillos para encontrar tu acompañamiento ideal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-earth-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-earth-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-earth-900 mb-3">Busca</h3>
              <p className="text-earth-600">
                Filtra por ciudad, idioma o especialidad.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-sage-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-earth-900 mb-3">Conecta</h3>
              <p className="text-earth-600">
                Agenda una entrevista y conversa con tu doula.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-warm-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-warm-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-earth-900 mb-3">Elige</h3>
              <p className="text-earth-600">
                Elige a tu doula y empieza el camino.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es una Doula Ancestral Section */}
      <section className="py-16 bg-gradient-to-br from-earth-50 to-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-earth-900 mb-6">
                ¿Qué es una Doula Ancestral?
              </h2>
              <div className="space-y-4 text-lg text-earth-700">
                <p>
                  Una <strong>Doula Ancestral</strong> es una guardiana de la sabiduría milenaria que honra los rituales sagrados del nacimiento. 
                  Conecta con las tradiciones de nuestras abuelas, creando un puente entre la medicina moderna y los saberes ancestrales.
                </p>
                <p>
                  En la <strong>Escuela Mística de Saberes</strong>, cada doula es iniciada en prácticas ceremoniales que incluyen:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-earth-600 mr-2">•</span>
                    <span>Rituales de bendición y protección energética</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth-600 mr-2">•</span>
                    <span>Medicina herbal y aromaterapia sagrada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth-600 mr-2">•</span>
                    <span>Técnicas de respiración y meditación ancestral</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth-600 mr-2">•</span>
                    <span>Ceremonias de cierre y sanación postparto</span>
                  </li>
                </ul>
                <p className="text-earth-800 font-medium">
                  "Cada nacimiento es un portal sagrado. Nosotras somos las guardianas de ese umbral."
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ancestral%20doula%20ceremony%20sacred%20birth%20ritual%20candles%20herbs%20golden%20light%20mystical%20atmosphere%20maternal%20wisdom%20earth%20tones%20spiritual%20healing%20ancient%20traditions&image_size=portrait_4_3"
                alt="Ceremonia ancestral de doula"
                className="rounded-xl shadow-lg w-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-900 mb-4">
              ¿Por qué elegir una Doula?
            </h2>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Las doulas brindan apoyo emocional, físico e informativo durante el embarazo, parto y postparto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Heart className="h-12 w-12 text-earth-600 mb-4" />
              <h3 className="text-xl font-semibold text-earth-900 mb-3">Apoyo Emocional</h3>
              <p className="text-earth-600">
                Acompañamiento continuo, escucha y contención en cada etapa.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Award className="h-12 w-12 text-sage-600 mb-4" />
              <h3 className="text-xl font-semibold text-earth-900 mb-3">Experiencia Certificada</h3>
              <p className="text-earth-600">
                Doulas formadas con enfoque integral y ancestral.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Users className="h-12 w-12 text-warm-600 mb-4" />
              <h3 className="text-xl font-semibold text-earth-900 mb-3">Apoyo Personalizado</h3>
              <p className="text-earth-600">
                Tu historia es única; el cuidado también.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-earth-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Lista para encontrar tu Doula ideal?
          </h2>
          <p className="text-xl text-earth-100 mb-8">
            Explora el directorio completo y elige con confianza.
          </p>
          <Link
            to="/doulas"
            className="inline-block bg-white text-earth-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-earth-50 transition-colors"
          >
            Ver Directorio Completo
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home