import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-earth-900 text-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Encuentra tu Doula" 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-white">
                ENCUENTRATUDOULA.COM
              </span>
            </Link>
            <p className="text-earth-300 mb-4 max-w-md">
              Conectamos familias con doulas certificadas de la Escuela Mística de Saberes. 
              Acompañamiento profesional y amoroso en todos los procesos de la vida.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-earth-400" />
                <span className="text-earth-300">info@encuentratudoula.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-earth-400" />
                <span className="text-earth-300">+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-earth-400" />
                <span className="text-earth-300">España - Internacional</span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-earth-300 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/doulas" 
                  className="text-earth-300 hover:text-white transition-colors"
                >
                  Directorio de Doulas
                </Link>
              </li>
              <li>
                <Link 
                  to="/sobre-nosotros" 
                  className="text-earth-300 hover:text-white transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:info@encuentratudoula.com" 
                  className="text-earth-300 hover:text-white transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Políticas */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Políticas</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/politica-privacidad" 
                  className="text-earth-300 hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  to="/terminos-condiciones" 
                  className="text-earth-300 hover:text-white transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link 
                  to="/politica-cookies" 
                  className="text-earth-300 hover:text-white transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link 
                  to="/aviso-legal" 
                  className="text-earth-300 hover:text-white transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link 
                  to="/codigo-etico" 
                  className="text-earth-300 hover:text-white transition-colors"
                >
                  Código Ético
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-earth-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-earth-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Encuentra tu Doula. Todos los derechos reservados.
            </div>
            <div className="text-earth-400 text-sm">
              Desarrollado con ❤️ para conectar familias y doulas ancestrales
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
