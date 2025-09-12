import { Link } from 'react-router-dom'
import { ArrowLeft, Heart, Users, Star, Globe } from 'lucide-react'

const SobreNosotros = () => {
  return (
    <div className="min-h-screen bg-sage-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-earth-600 hover:text-earth-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <img 
            src="/logo.png" 
            alt="Encuentra tu Doula" 
            className="h-24 w-auto mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-earth-900 mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-earth-700 max-w-3xl mx-auto">
            Somos un puente sagrado entre familias y doulas certificadas en saberes místicos 
            y ancestrales, honrando la sabiduría de nuestras abuelas en el acompañamiento maternal.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-semibold text-earth-900 mb-6 text-center">
            Nuestra Misión Sagrada
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-earth-700 mb-4">
                ENCUENTRATUDOULA.COM nace del profundo llamado a honrar y preservar los 
                saberes ancestrales en el acompañamiento de la maternidad. Creemos que 
                cada nacimiento es un portal sagrado que merece ser honrado con la 
                sabiduría de nuestras ancestras.
              </p>
              <p className="text-earth-700 mb-4">
                Facilitamos la conexión entre familias que buscan un acompañamiento 
                consciente y doulas formadas en la tradición ancestral, creando una 
                red de apoyo basada en el amor, la sororidad y el respeto por los 
                ciclos naturales de la vida.
              </p>
            </div>
            <div className="bg-gradient-to-br from-earth-100 to-sage-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-earth-900 mb-4">
                Nuestros Valores
              </h3>
              <ul className="space-y-2 text-earth-700">
                <li className="flex items-center">
                  <Heart className="h-4 w-4 text-earth-600 mr-2" />
                  <span>Amor incondicional</span>
                </li>
                <li className="flex items-center">
                  <Users className="h-4 w-4 text-sage-600 mr-2" />
                  <span>Sororidad sagrada</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-warm-600 mr-2" />
                  <span>Sabiduría ancestral</span>
                </li>
                <li className="flex items-center">
                  <Globe className="h-4 w-4 text-earth-500 mr-2" />
                  <span>Conexión global</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Connection with Escuela Mística */}
        <div className="bg-gradient-to-r from-sage-50 to-earth-50 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-semibold text-earth-900 mb-6 text-center">
            Nuestra Conexión con la Escuela Mística de Saberes
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-earth-700 mb-6 text-center">
              Trabajamos en estrecha colaboración con la prestigiosa Escuela Mística de Saberes, 
              dirigida por Lina María Tabares Vélez, reconocida maestra en saberes ancestrales 
              y acompañamiento maternal.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-earth-900 mb-2">Formación Certificada</h4>
                  <p className="text-earth-700 text-sm">
                    Todas nuestras doulas han completado su formación en la Escuela Mística de Saberes
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-earth-900 mb-2">Saberes Ancestrales</h4>
                  <p className="text-earth-700 text-sm">
                    Preservamos y transmitimos la sabiduría de las tradiciones indígenas y africanas
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-earth-900 mb-2">Acompañamiento Holístico</h4>
                  <p className="text-earth-700 text-sm">
                    Integramos rituales sagrados, medicina placentaria y sanación de memorias uterinas
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg mt-6">
              <h3 className="text-lg font-semibold text-earth-900 mb-3">
                Acerca de Lina María Tabares Vélez
              </h3>
              <p className="text-earth-700">
                Mujer Mística, Bruja, Maga Blanca, Guardiana de Nacimiento, de Útero y Placenta, 
                Doula Ancestral, Maestra y Hermana de Ceremonias. Especialista en Talasoterapia, 
                sanación de memorias uterinas y líneas ancestrales, Educadora Waldorf de primera 
                infancia y en formación como Partera Ancestral y Comunitaria.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-semibold text-earth-900 mb-6 text-center">
            Nuestros Servicios
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-earth-200 rounded-lg p-4">
              <h4 className="font-semibold text-earth-900 mb-2">Directorio Especializado</h4>
              <p className="text-earth-700 text-sm">
                Acceso a doulas certificadas especializadas en diferentes aspectos del 
                acompañamiento maternal ancestral.
              </p>
            </div>
            <div className="border border-earth-200 rounded-lg p-4">
              <h4 className="font-semibold text-earth-900 mb-2">Búsqueda Inteligente</h4>
              <p className="text-earth-700 text-sm">
                Sistema de filtros para encontrar la doula perfecta según ubicación, 
                especialidades y modalidad de acompañamiento.
              </p>
            </div>
            <div className="border border-earth-200 rounded-lg p-4">
              <h4 className="font-semibold text-earth-900 mb-2">Códigos QR</h4>
              <p className="text-earth-700 text-sm">
                Generación de códigos QR únicos para cada doula, facilitando el 
                compartir y acceso a su información.
              </p>
            </div>
            <div className="border border-earth-200 rounded-lg p-4">
              <h4 className="font-semibold text-earth-900 mb-2">Modalidades Flexibles</h4>
              <p className="text-earth-700 text-sm">
                Acompañamiento presencial y online, adaptándose a las necesidades 
                de cada familia sin importar la distancia.
              </p>
            </div>
            <div className="border border-earth-200 rounded-lg p-4">
              <h4 className="font-semibold text-earth-900 mb-2">Red Internacional</h4>
              <p className="text-earth-700 text-sm">
                Conectamos familias con doulas en España, Alemania, Francia, 
                Portugal, Eslovaquia y otros países.
              </p>
            </div>
            <div className="border border-earth-200 rounded-lg p-4">
              <h4 className="font-semibold text-earth-900 mb-2">Apoyo Continuo</h4>
              <p className="text-earth-700 text-sm">
                Facilitamos la comunicación inicial y proporcionamos recursos 
                sobre acompañamiento ancestral.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-br from-earth-900 to-sage-800 text-white rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Nuestra Visión
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-earth-100 mb-6 text-lg">
              Soñamos con un mundo donde cada familia tenga acceso a un acompañamiento 
              maternal consciente, donde los saberes ancestrales sean honrados y 
              preservados, y donde cada nacimiento sea celebrado como el milagro 
              sagrado que representa.
            </p>
            <p className="text-earth-200">
              Creemos en la fuerza transformadora de la sororidad, en el poder sanador 
              de los rituales ancestrales, y en la importancia de honrar los ciclos 
              naturales de la vida femenina.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-earth-900 mb-4">
            ¿Lista para Conectar con tu Doula Ancestral?
          </h2>
          <p className="text-earth-700 mb-6">
            Descubre nuestro directorio de guardianas certificadas y encuentra 
            el acompañamiento sagrado que tu proceso maternal merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/doulas"
              className="bg-earth-600 text-white px-8 py-3 rounded-lg hover:bg-earth-700 transition-colors font-medium"
            >
              Explorar Doulas
            </Link>
            <a
              href="mailto:info@encuentratudoula.com"
              className="border border-earth-300 text-earth-700 px-8 py-3 rounded-lg hover:bg-earth-50 transition-colors font-medium"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SobreNosotros

