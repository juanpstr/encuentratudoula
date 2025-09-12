import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const TerminosCondiciones = () => {
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
            Términos y Condiciones
          </h1>

          <div className="prose prose-earth max-w-none">
            <p className="text-lg text-earth-700 mb-6">
              Bienvenido a ENCUENTRATUDOULA.COM. Al acceder y utilizar este sitio web, 
              usted acepta cumplir con estos términos y condiciones de uso.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              1. Naturaleza del Servicio
            </h2>
            <p className="text-earth-700 mb-6">
              ENCUENTRATUDOULA.COM es una plataforma que conecta familias con doulas certificadas 
              por la Escuela Mística de Saberes. Actuamos como intermediarios facilitando el 
              contacto inicial, pero no somos responsables de los servicios prestados por las doulas.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              2. Servicios de las Doulas Ancestrales
            </h2>
            <p className="text-earth-700 mb-4">
              Las doulas listadas en nuestra plataforma ofrecen acompañamiento basado en saberes 
              místicos y ancestrales, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-earth-700 mb-6">
              <li>Acompañamiento emocional y espiritual durante la gestación</li>
              <li>Rituales ancestrales de preconcepción y fertilidad</li>
              <li>Sanación de memorias uterinas</li>
              <li>Medicina placentaria y rituales de nacimiento</li>
              <li>Cuidado del puerperio sagrado</li>
              <li>Acompañamiento en duelos perinatales</li>
            </ul>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              3. Responsabilidades de los Usuarios
            </h2>
            <p className="text-earth-700 mb-4">
              Los usuarios se comprometen a:
            </p>
            <ul className="list-disc pl-6 text-earth-700 mb-6">
              <li>Proporcionar información veraz y actualizada</li>
              <li>Respetar la confidencialidad de las doulas y otros usuarios</li>
              <li>Utilizar el servicio de manera responsable y ética</li>
              <li>No utilizar la plataforma para fines comerciales no autorizados</li>
              <li>Respetar los saberes ancestrales y la espiritualidad de las prácticas</li>
            </ul>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              4. Certificación y Formación
            </h2>
            <p className="text-earth-700 mb-6">
              Todas las doulas en nuestra plataforma han completado su formación en la Escuela 
              Mística de Saberes dirigida por Lina María Tabares Vélez. Esta formación incluye 
              saberes ancestrales, rituales sagrados y acompañamiento holístico de la maternidad.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              5. Limitaciones de Responsabilidad
            </h2>
            <p className="text-earth-700 mb-6">
              ENCUENTRATUDOULA.COM no se hace responsable de las decisiones, acciones o servicios 
              proporcionados por las doulas independientes. La relación contractual se establece 
              directamente entre el usuario y la doula seleccionada.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              6. Propiedad Intelectual
            </h2>
            <p className="text-earth-700 mb-6">
              Todo el contenido de este sitio web, incluyendo diseño, textos, imágenes y código, 
              está protegido por derechos de propiedad intelectual. Los saberes ancestrales 
              compartidos pertenecen a la sabiduría colectiva de nuestras tradiciones.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              7. Modificaciones
            </h2>
            <p className="text-earth-700 mb-6">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Los cambios serán notificados a través del sitio web y entrarán en vigor 
              inmediatamente después de su publicación.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              8. Ley Aplicable
            </h2>
            <p className="text-earth-700 mb-6">
              Estos términos se rigen por la legislación española. Cualquier disputa será 
              resuelta por los tribunales competentes de Málaga, España.
            </p>

            <div className="bg-earth-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-earth-900 mb-3">
                Contacto
              </h3>
              <p className="text-earth-700">
                Para dudas sobre estos términos:<br />
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

export default TerminosCondiciones

