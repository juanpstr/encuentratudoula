import { Link } from 'react-router-dom'
import { ArrowLeft, Heart, Users, Shield, Star } from 'lucide-react'

const CodigoEtico = () => {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-earth-900 mb-8">
            Código Ético de las Doulas Ancestrales
          </h1>

          <div className="prose prose-earth max-w-none">
            <p className="text-lg text-earth-700 mb-8">
              Como guardianas de saberes ancestrales y acompañantes en el sagrado proceso 
              de dar vida, las doulas certificadas por la Escuela Mística de Saberes 
              nos comprometemos a honrar este código ético basado en la sabiduría ancestral 
              y el respeto profundo por la vida.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-earth-50 p-6 rounded-lg">
                <Heart className="h-12 w-12 text-earth-600 mb-4" />
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Amor Incondicional
                </h3>
                <p className="text-earth-700">
                  Acompañamos desde el amor puro, sin juicio, honrando cada proceso único.
                </p>
              </div>
              <div className="bg-sage-50 p-6 rounded-lg">
                <Users className="h-12 w-12 text-sage-600 mb-4" />
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Sororidad Sagrada
                </h3>
                <p className="text-earth-700">
                  Creamos círculos de hermandad entre mujeres, fortaleciendo la red ancestral.
                </p>
              </div>
              <div className="bg-warm-50 p-6 rounded-lg">
                <Shield className="h-12 w-12 text-warm-600 mb-4" />
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Protección Energética
                </h3>
                <p className="text-earth-700">
                  Mantenemos espacios sagrados y seguros para cada familia que acompañamos.
                </p>
              </div>
              <div className="bg-earth-100 p-6 rounded-lg">
                <Star className="h-12 w-12 text-earth-700 mb-4" />
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Sabiduría Ancestral
                </h3>
                <p className="text-earth-700">
                  Honramos y transmitimos los saberes de nuestras abuelas y ancestras.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Principios Fundamentales
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-earth-500 pl-6">
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  1. Respeto por la Sacralidad del Nacimiento
                </h3>
                <p className="text-earth-700">
                  Reconocemos cada nacimiento como un portal sagrado entre mundos. Honramos 
                  el misterio de la vida y acompañamos con reverencia este proceso divino.
                </p>
              </div>

              <div className="border-l-4 border-sage-500 pl-6">
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  2. Autonomía y Empoderamiento
                </h3>
                <p className="text-earth-700">
                  Respetamos las decisiones de cada familia, proporcionando información 
                  y apoyo sin imponer nuestras creencias. Empoderamos a las mujeres 
                  para que confíen en su sabiduría innata.
                </p>
              </div>

              <div className="border-l-4 border-warm-500 pl-6">
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  3. Confidencialidad Sagrada
                </h3>
                <p className="text-earth-700">
                  Mantenemos la confidencialidad absoluta sobre toda información compartida 
                  en nuestro acompañamiento. Los secretos del corazón se guardan con 
                  la misma sacralidad que los rituales ancestrales.
                </p>
              </div>

              <div className="border-l-4 border-earth-300 pl-6">
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  4. Competencia y Formación Continua
                </h3>
                <p className="text-earth-700">
                  Nos comprometemos a mantener nuestra formación actualizada, reconociendo 
                  los límites de nuestro rol y derivando a profesionales médicos cuando 
                  sea necesario.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Acompañamiento por Etapas Sagradas
            </h2>

            <div className="space-y-4">
              <div className="bg-sage-50 p-4 rounded-lg">
                <h4 className="font-semibold text-earth-900 mb-2">Preconcepción y Fertilidad</h4>
                <p className="text-earth-700">
                  Acompañamos la preparación del templo sagrado (útero) mediante rituales 
                  de limpieza energética, sanación de memorias ancestrales y llamado del alma del bebé.
                </p>
              </div>

              <div className="bg-earth-50 p-4 rounded-lg">
                <h4 className="font-semibold text-earth-900 mb-2">Gestación Sagrada</h4>
                <p className="text-earth-700">
                  Honramos cada trimestre con rituales específicos, acompañamos la conexión 
                  madre-bebé y preparamos el nacimiento con amor y sabiduría ancestral.
                </p>
              </div>

              <div className="bg-warm-50 p-4 rounded-lg">
                <h4 className="font-semibold text-earth-900 mb-2">Parto Consciente</h4>
                <p className="text-earth-700">
                  Protegemos el espacio sagrado del nacimiento, facilitamos la conexión 
                  con la fuerza ancestral y honramos el poder de la mujer que da a luz.
                </p>
              </div>

              <div className="bg-sage-100 p-4 rounded-lg">
                <h4 className="font-semibold text-earth-900 mb-2">Puerperio y Medicina Placentaria</h4>
                <p className="text-earth-700">
                  Acompañamos la transición hacia la maternidad, honramos la placenta como 
                  medicina sagrada y apoyamos la recuperación integral de la nueva madre.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Compromisos Éticos Específicos
            </h2>

            <ul className="space-y-3 text-earth-700">
              <li className="flex items-start">
                <span className="text-earth-600 mr-2">•</span>
                <span>No diagnosticar, prescribir medicamentos o realizar prácticas médicas</span>
              </li>
              <li className="flex items-start">
                <span className="text-earth-600 mr-2">•</span>
                <span>Colaborar respetuosamente con el equipo médico cuando sea necesario</span>
              </li>
              <li className="flex items-start">
                <span className="text-earth-600 mr-2">•</span>
                <span>Mantener límites profesionales claros y apropiados</span>
              </li>
              <li className="flex items-start">
                <span className="text-earth-600 mr-2">•</span>
                <span>Honrar la diversidad cultural y espiritual de cada familia</span>
              </li>
              <li className="flex items-start">
                <span className="text-earth-600 mr-2">•</span>
                <span>Proporcionar servicios sin discriminación por raza, religión, orientación sexual o situación económica</span>
              </li>
              <li className="flex items-start">
                <span className="text-earth-600 mr-2">•</span>
                <span>Mantener espacios libres de sustancias nocivas durante los acompañamientos</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Sanación y Rituales Ancestrales
            </h2>
            <p className="text-earth-700 mb-6">
              Como guardianas de la medicina ancestral, nos comprometemos a utilizar los 
              rituales sagrados con profundo respeto, siempre con el consentimiento informado 
              de las familias y en honor a las tradiciones que los originaron.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Resolución de Conflictos
            </h2>
            <p className="text-earth-700 mb-6">
              Cuando surjan conflictos éticos, nos comprometemos a abordarlos con diálogo 
              abierto, mediación respetuosa y, si es necesario, la intervención de nuestros 
              mentores de la Escuela Mística de Saberes.
            </p>

            <div className="bg-gradient-to-r from-earth-50 to-sage-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-earth-900 mb-3">
                Juramento de la Doula Ancestral
              </h3>
              <p className="text-earth-700 italic">
                "Juro por la Madre Tierra y las abuelas ancestrales que me guían, 
                honrar este código ético en cada acompañamiento. Prometo ser guardiana 
                de los nacimientos sagrados, protectora de las memorias uterinas y 
                hermana en el camino de la maternidad consciente. Que mi trabajo sea 
                medicina para las familias y honor para los saberes ancestrales."
              </p>
            </div>

            <p className="text-sm text-earth-600 mt-8">
              Este código ético se basa en la sabiduría de la Escuela Mística de Saberes 
              y los principios universales del acompañamiento maternal ancestral.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodigoEtico

