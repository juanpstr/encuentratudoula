import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const AvisoLegal = () => {
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
            Aviso Legal
          </h1>

          <div className="prose prose-earth max-w-none">
            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Datos Identificativos
            </h2>
            <div className="bg-earth-50 p-6 rounded-lg mb-6">
              <p className="text-earth-700">
                <strong>Denominación:</strong> ENCUENTRATUDOULA.COM<br />
                <strong>Actividad:</strong> Plataforma de conexión con doulas ancestrales<br />
                <strong>Ubicación:</strong> Málaga, España<br />
                <strong>Email:</strong> info@encuentratudoula.com<br />
                <strong>Teléfono:</strong> +34 900 123 456<br />
                <strong>Sitio web:</strong> www.encuentratudoula.com
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Objeto y Actividad
            </h2>
            <p className="text-earth-700 mb-6">
              ENCUENTRATUDOULA.COM es una plataforma digital que facilita la conexión entre 
              familias y doulas certificadas en saberes místicos y ancestrales por la 
              Escuela Mística de Saberes dirigida por Lina María Tabares Vélez.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Servicios Ofrecidos
            </h2>
            <p className="text-earth-700 mb-4">
              A través de nuestra plataforma ofrecemos:
            </p>
            <ul className="list-disc pl-6 text-earth-700 mb-6">
              <li>Directorio de doulas certificadas en acompañamiento ancestral</li>
              <li>Sistema de búsqueda y filtrado por especialidades y ubicación</li>
              <li>Información detallada sobre servicios de cada doula</li>
              <li>Facilitación del contacto inicial entre familias y doulas</li>
              <li>Generación de códigos QR para compartir perfiles</li>
              <li>Recursos sobre acompañamiento durante la maternidad</li>
            </ul>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Filosofía y Enfoque
            </h2>
            <p className="text-earth-700 mb-6">
              Nuestro trabajo se basa en la sabiduría ancestral transmitida por la Escuela 
              Mística de Saberes. Honramos las tradiciones indígenas y africanas en el 
              acompañamiento de la maternidad, integrando rituales sagrados, medicina 
              placentaria y sanación de memorias uterinas.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Relación con Escuela Mística de Saberes
            </h2>
            <p className="text-earth-700 mb-6">
              Todas las doulas listadas en nuestra plataforma han completado su formación 
              en la Escuela Mística de Saberes, reconocida institución especializada en 
              saberes ancestrales de acompañamiento maternal dirigida por Lina María Tabares Vélez, 
              ubicada en Málaga, España.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Limitaciones de Responsabilidad
            </h2>
            <p className="text-earth-700 mb-6">
              ENCUENTRATUDOULA.COM actúa únicamente como intermediario para facilitar el 
              contacto entre usuarios y doulas. No somos responsables de los servicios 
              prestados por las doulas independientes, ni de las decisiones médicas o 
              de salud que puedan derivarse del acompañamiento.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Propiedad Intelectual
            </h2>
            <p className="text-earth-700 mb-6">
              El diseño, estructura, selección, ordenación y presentación de los contenidos 
              de este sitio web están protegidos por derechos de propiedad intelectual. 
              Los saberes ancestrales compartidos forman parte del patrimonio cultural 
              de nuestras comunidades originarias.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Uso del Sitio Web
            </h2>
            <p className="text-earth-700 mb-4">
              El usuario se compromete a utilizar el sitio web de conformidad con la ley y a:
            </p>
            <ul className="list-disc pl-6 text-earth-700 mb-6">
              <li>No realizar actividades ilícitas o contrarias a la moral</li>
              <li>Respetar los derechos de propiedad intelectual</li>
              <li>No dañar, inutilizar o sobrecargar el sitio web</li>
              <li>Honrar la sacralidad de los saberes ancestrales compartidos</li>
            </ul>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Modificaciones
            </h2>
            <p className="text-earth-700 mb-6">
              Nos reservamos el derecho de realizar cambios en el sitio web sin previo 
              aviso, así como de modificar este aviso legal cuando sea necesario.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Ley Aplicable y Jurisdicción
            </h2>
            <p className="text-earth-700 mb-6">
              Este aviso legal se rige por la legislación española. Para la resolución 
              de cualquier conflicto, las partes se someten a los Juzgados y Tribunales 
              de Málaga, España.
            </p>

            <div className="bg-sage-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-earth-900 mb-3">
                Reconocimiento Ancestral
              </h3>
              <p className="text-earth-700">
                Honramos y agradecemos a las abuelas, parteras y guardianas de sabiduría 
                ancestral que han preservado estos conocimientos sagrados para las 
                generaciones futuras. Este trabajo es en honor a su legado.
              </p>
            </div>

            <p className="text-sm text-earth-600 mt-8">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvisoLegal

