import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'
import { Download, QrCode, ExternalLink } from 'lucide-react'

interface QRGeneratorProps {
  doulaSlug: string
  doulaName: string
}

const QRGenerator = ({ doulaSlug, doulaName }: QRGeneratorProps) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [showQR, setShowQR] = useState(false)

  const doulaUrl = `${window.location.origin}/doula/${doulaSlug}`

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrCodeDataUrl = await QRCode.toDataURL(doulaUrl, {
          width: 200,
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

    if (showQR) {
      generateQR()
    }
  }, [doulaUrl, showQR])

  const downloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement('a')
      link.download = `qr-${doulaName.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = qrDataUrl
      link.click()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-earth-900 mb-4">
        Código QR de la Guardiana
      </h3>
      
      {!showQR ? (
        <button
          onClick={() => setShowQR(true)}
          className="w-full flex items-center justify-center gap-2 bg-earth-600 text-white py-3 px-4 rounded-lg hover:bg-earth-700 transition-colors"
        >
          <QrCode className="h-5 w-5" />
          Generar Código QR
        </button>
      ) : (
        <div className="text-center space-y-4">
          {qrDataUrl && (
            <>
              <div className="bg-white p-4 rounded-lg border border-earth-200 inline-block">
                <img 
                  src={qrDataUrl} 
                  alt={`Código QR para ${doulaName}`}
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="text-sm text-earth-600 mb-4">
                Escanea este código para acceder directamente al perfil de {doulaName}
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <button
                  onClick={downloadQR}
                  className="flex items-center gap-2 bg-earth-600 text-white py-2 px-4 rounded-lg hover:bg-earth-700 transition-colors text-sm"
                >
                  <Download className="h-4 w-4" />
                  Descargar QR
                </button>
                <Link
                  to={`/doula/${doulaSlug}/qr`}
                  className="flex items-center gap-2 bg-sage-600 text-white py-2 px-4 rounded-lg hover:bg-sage-700 transition-colors text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Página QR
                </Link>
                <button
                  onClick={() => setShowQR(false)}
                  className="border border-earth-300 text-earth-700 py-2 px-4 rounded-lg hover:bg-earth-50 transition-colors text-sm"
                >
                  Cerrar
                </button>
              </div>
            </>
          )}
        </div>
      )}
      
      <div className="mt-4 p-3 bg-earth-50 rounded-lg">
        <p className="text-xs text-earth-600">
          <strong>URL del perfil:</strong><br />
          <span className="break-all">{doulaUrl}</span>
        </p>
      </div>
    </div>
  )
}

export default QRGenerator
