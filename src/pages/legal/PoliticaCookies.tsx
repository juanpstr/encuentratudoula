import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const PoliticaCookies = () => {
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
            Política de Cookies
          </h1>

          <div className="prose prose-earth max-w-none">
            <p className="text-lg text-earth-700 mb-6">
              En ENCUENTRATUDOULA.COM utilizamos cookies para mejorar su experiencia de navegación 
              y proporcionar funcionalidades personalizadas.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              ¿Qué son las Cookies?
            </h2>
            <p className="text-earth-700 mb-6">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando 
              visita nuestro sitio web. Nos ayudan a recordar sus preferencias y mejorar su experiencia.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Tipos de Cookies que Utilizamos
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-earth-500 pl-4">
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Cookies Estrictamente Necesarias
                </h3>
                <p className="text-earth-700">
                  Estas cookies son esenciales para el funcionamiento del sitio web. Incluyen 
                  cookies de sesión, seguridad y accesibilidad. No se pueden desactivar.
                </p>
              </div>

              <div className="border-l-4 border-sage-500 pl-4">
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Cookies de Preferencias
                </h3>
                <p className="text-earth-700">
                  Nos permiten recordar sus preferencias como idioma, región, y configuraciones 
                  de búsqueda de doulas. Mejoran su experiencia personalizada.
                </p>
              </div>

              <div className="border-l-4 border-warm-500 pl-4">
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Cookies Estadísticas
                </h3>
                <p className="text-earth-700">
                  Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio web, 
                  qué páginas son más visitadas y cómo podemos mejorar nuestros servicios.
                </p>
              </div>

              <div className="border-l-4 border-earth-300 pl-4">
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Cookies de Marketing
                </h3>
                <p className="text-earth-700">
                  Utilizadas para mostrar contenido relevante sobre servicios de doulas y 
                  acompañamiento ancestral que puedan interesarle.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Cookies de Terceros
            </h2>
            <p className="text-earth-700 mb-4">
              También utilizamos servicios de terceros que pueden establecer cookies:
            </p>
            <ul className="list-disc pl-6 text-earth-700 mb-6">
              <li><strong>Google Analytics:</strong> Para análisis de tráfico web</li>
              <li><strong>Calendly:</strong> Para la gestión de citas con doulas</li>
              <li><strong>Supabase:</strong> Para el funcionamiento de la base de datos</li>
              <li><strong>OpenStreetMap:</strong> Para mostrar ubicaciones de doulas</li>
            </ul>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Gestión de Cookies
            </h2>
            <p className="text-earth-700 mb-4">
              Puede gestionar sus preferencias de cookies de las siguientes maneras:
            </p>
            <ul className="list-disc pl-6 text-earth-700 mb-6">
              <li>Utilizando el banner de cookies que aparece en su primera visita</li>
              <li>Modificando la configuración de su navegador</li>
              <li>Utilizando herramientas de gestión de privacidad</li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6">
              <p className="text-amber-800">
                <strong>Nota:</strong> Desactivar ciertas cookies puede afectar la funcionalidad 
                del sitio web y su capacidad para conectar con doulas certificadas.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Duración de las Cookies
            </h2>
            <p className="text-earth-700 mb-6">
              Las cookies pueden ser temporales (sesión) o permanentes. Las cookies de sesión 
              se eliminan cuando cierra su navegador. Las cookies permanentes permanecen hasta 
              su fecha de expiración o hasta que las elimine manualmente.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              Actualización de esta Política
            </h2>
            <p className="text-earth-700 mb-6">
              Esta política de cookies puede actualizarse ocasionalmente. Le recomendamos 
              revisarla periódicamente para estar informado sobre cómo utilizamos las cookies.
            </p>

            <div className="bg-earth-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-earth-900 mb-3">
                Contacto
              </h3>
              <p className="text-earth-700">
                Para dudas sobre nuestra política de cookies:<br />
                <strong>Email:</strong> info@encuentratudoula.com<br />
                <strong>Teléfono:</strong> +34 900 123 456
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

export default PoliticaCookies

