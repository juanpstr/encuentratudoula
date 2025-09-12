import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { ArrowLeft, Download, Share2, Copy } from 'lucide-react'
import { useStore } from '../store/useStore'
import { getDoulaById } from '../services/supabase'
import { toast } from 'sonner'
import QRCode from 'qrcode'
import type { Doula } from '../types'

const DoulaQR = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, setLoading } = useStore()
  const [doula, setDoula] = useState<Doula | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')

  const doulaUrl = doula ? `${window.location.origin}/doula/${doula.id}` : ''

  const loadDoula = useCallback(async (doulaId: string) => {
    setLoading(true)
    try {
      const doula = await getDoulaById(doulaId)
      setDoula(doula)
    } catch (error) {
      toast.error('Error al cargar el perfil de la doula')
      console.error('Error loading doula:', error)
    } finally {
      setLoading(false)
    }
  }, [setLoading])

  useEffect(() => {
    if (id) {
      loadDoula(id)
    }
  }, [id, loadDoula])

  useEffect(() => {
    const generateQR = async () => {
      if (doulaUrl) {
        try {
          const qrCodeDataUrl = await QRCode.toDataURL(doulaUrl, {
            width: 400,
            margin: 2,
            color: {
              dark: '#3F2F2F', // earth-900
              light: '#FFFFFF'
            }
          })
          setQrDataUrl(qrCodeDataUrl)
        } catch (error) {
          console.error('Error generating QR code:', error)
        }
      }
    }

    generateQR()
  }, [doulaUrl])

  const downloadQR = () => {
    if (qrDataUrl && doula) {
      const link = document.createElement('a')
      link.download = `qr-${doula.name.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = qrDataUrl
      link.click()
    }
  }

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(doulaUrl)
      toast.success('URL copiada al portapapeles')
    } catch (error) {
      toast.error('Error al copiar la URL')
    }
  }

  const shareUrl = async () => {
    if (navigator.share && doula) {
      try {
        await navigator.share({
          title: `Perfil de ${doula.name} - Doula Ancestral`,
          text: `Conoce a ${doula.name}, doula certificada especializada en ${doula.specialties.slice(0, 2).join(' y ')}.`,
          url: doulaUrl
        })
      } catch (error) {
        // Si Web Share API no está disponible, copiamos al portapapeles
        copyUrl()
      }
    } else {
      copyUrl()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-600 mx-auto mb-4"></div>
          <p className="text-earth-600">Generando código QR...</p>
        </div>
      </div>
    )
  }

  if (!doula) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-earth-900 mb-2">
            Doula no encontrada
          </h2>
          <p className="text-earth-600 mb-4">
            La doula que buscas no existe o ha sido eliminada.
          </p>
          <Link
            to="/doulas"
            className="inline-flex items-center gap-2 px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Directorio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to={`/doula/${doula.id}`}
            className="inline-flex items-center gap-2 text-earth-600 hover:text-earth-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al perfil
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-earth-600 to-sage-600 px-8 py-12 text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <img 
                src={doula.profile_image || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wise%20ancestral%20doula%20woman%20portrait%20${doula.name.toLowerCase().replace(' ', '%20')}%20warm%20golden%20light%20mystical%20serene%20expression%20earth%20tones%20natural%20beauty%20maternal%20energy&image_size=square`}
                alt={`Retrato de ${doula.name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="text-2xl font-bold text-earth-700 hidden">
                {doula.name.charAt(0)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{doula.name}</h1>
            <p className="text-earth-100">Doula Ancestral</p>
            <p className="text-earth-200 text-sm">{doula.location.city}, {doula.location.country}</p>
          </div>

          {/* QR Section */}
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-earth-900 mb-4">
              Código QR del Perfil
            </h2>
            <p className="text-earth-600 mb-8">
              Escanea este código para acceder directamente al perfil completo de {doula.name}
            </p>

            {qrDataUrl && (
              <div className="mb-8">
                <div className="bg-white p-8 rounded-lg border-2 border-earth-200 inline-block shadow-sm">
                  <img 
                    src={qrDataUrl} 
                    alt={`Código QR para ${doula.name}`}
                    className="w-64 h-64 mx-auto"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={downloadQR}
                disabled={!qrDataUrl}
                className="flex items-center justify-center gap-2 bg-earth-600 text-white py-3 px-6 rounded-lg hover:bg-earth-700 transition-colors disabled:opacity-50"
              >
                <Download className="h-5 w-5" />
                Descargar QR
              </button>
              
              <button
                onClick={shareUrl}
                className="flex items-center justify-center gap-2 bg-sage-600 text-white py-3 px-6 rounded-lg hover:bg-sage-700 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                Compartir Perfil
              </button>
              
              <button
                onClick={copyUrl}
                className="flex items-center justify-center gap-2 border border-earth-300 text-earth-700 py-3 px-6 rounded-lg hover:bg-earth-50 transition-colors"
              >
                <Copy className="h-5 w-5" />
                Copiar URL
              </button>
            </div>

            {/* URL Display */}
            <div className="bg-earth-50 rounded-lg p-4">
              <p className="text-sm text-earth-600 mb-2">
                <strong>URL del perfil:</strong>
              </p>
              <p className="text-sm text-earth-800 break-all font-mono">
                {doulaUrl}
              </p>
            </div>

            {/* Specialties */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-earth-900 mb-4">Especialidades</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {doula.specialties.slice(0, 5).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-earth-100 text-earth-700 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Accompaniment Types */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-earth-900 mb-4">Modalidad de Acompañamiento</h3>
              <div className="flex gap-3 justify-center">
                {doula.accompaniment_types.map((type, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoulaQR

