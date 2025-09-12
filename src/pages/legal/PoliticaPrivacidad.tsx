import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const PoliticaPrivacidad = () => {
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
            Política de Privacidad de Datos
          </h1>

          <div className="prose prose-earth max-w-none">
            <p className="text-lg text-earth-700 mb-6">
              En ENCUENTRATUDOULA.COM, respetamos y protegemos la privacidad de nuestros usuarios. 
              Esta política describe cómo recopilamos, utilizamos y protegemos su información personal.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              1. Información que Recopilamos
            </h2>
            <p className="text-earth-700 mb-4">
              Recopilamos información cuando usted navega por nuestro sitio web, se registra para recibir 
              información sobre nuestras doulas, o se comunica con nosotros. Esta información puede incluir:
            </p>
            <ul className="list-disc pl-6 text-earth-700 mb-6">
              <li>Nombre y información de contacto</li>
              <li>Ubicación geográfica</li>
              <li>Preferencias de servicios de doula</li>
              <li>Información sobre su proceso de maternidad</li>
              <li>Datos de navegación y cookies técnicas</li>
            </ul>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              2. Cómo Utilizamos su Información
            </h2>
            <p className="text-earth-700 mb-4">
              Utilizamos su información personal para:
            </p>
            <ul className="list-disc pl-6 text-earth-700 mb-6">
              <li>Conectarle con doulas certificadas de la Escuela Mística de Saberes</li>
              <li>Proporcionar información sobre servicios de acompañamiento ancestral</li>
              <li>Mejorar nuestros servicios y experiencia de usuario</li>
              <li>Enviar comunicaciones relacionadas con nuestros servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              3. Protección de Datos
            </h2>
            <p className="text-earth-700 mb-6">
              Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos 
              personales contra el acceso no autorizado, la alteración, divulgación o destrucción. 
              Nuestros sistemas utilizan encriptación SSL y cumplimos con el RGPD.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              4. Compartir Información
            </h2>
            <p className="text-earth-700 mb-6">
              Solo compartimos su información con doulas certificadas para facilitar el proceso de 
              acompañamiento. No vendemos, alquilamos o intercambiamos su información personal con 
              terceros para fines comerciales sin su consentimiento expreso.
            </p>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              5. Sus Derechos
            </h2>
            <p className="text-earth-700 mb-4">
              Bajo el RGPD, usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 text-earth-700 mb-6">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Suprimir sus datos</li>
              <li>Limitar el procesamiento</li>
              <li>Portabilidad de datos</li>
              <li>Oponerse al procesamiento</li>
            </ul>

            <h2 className="text-2xl font-semibold text-earth-900 mt-8 mb-4">
              6. Contacto
            </h2>
            <p className="text-earth-700 mb-4">
              Para ejercer sus derechos o resolver dudas sobre esta política, contacte con nosotros:
            </p>
            <div className="bg-earth-50 p-4 rounded-lg">
              <p className="text-earth-700">
                <strong>Email:</strong> info@encuentratudoula.com<br />
                <strong>Teléfono:</strong> +34 900 123 456<br />
                <strong>Dirección:</strong> Málaga, España
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

export default PoliticaPrivacidad

