import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useMigration } from './hooks/useMigration'
import Home from './pages/Home'
import Doulas from './pages/Doulas'
import DoulaProfile from './pages/DoulaProfile'
import DoulaQR from './pages/DoulaQR'
import DejarTestimonio from './pages/DejarTestimonio'
import BookingPage from './pages/BookingPage'
import SobreNosotros from './pages/SobreNosotros'
import PoliticaPrivacidad from './pages/legal/PoliticaPrivacidad'
import TerminosCondiciones from './pages/legal/TerminosCondiciones'
import PoliticaCookies from './pages/legal/PoliticaCookies'
import AvisoLegal from './pages/legal/AvisoLegal'
import CodigoEtico from './pages/legal/CodigoEtico'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDoulas from './pages/admin/AdminDoulas'
import AdminDoulaForm from './pages/admin/AdminDoulaForm'
import AdminBookings from './pages/admin/AdminBookings'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const migrationStatus = useMigration()

  // Mostrar pantalla de carga mientras migra
  if (migrationStatus === 'pending' || migrationStatus === 'running') {
    return (
      <div className="min-h-screen bg-earth-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-600 mx-auto mb-4"></div>
          <p className="text-earth-600">
            {migrationStatus === 'pending' ? 'Preparando aplicación...' : 'Actualizando base de datos...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-earth-50">
      <Navbar />
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/doulas" element={<Doulas />} />
          <Route path="/doula/:id" element={<DoulaProfile />} />
          <Route path="/doula/:id/qr" element={<DoulaQR />} />
          <Route path="/doula/:id/testimonio" element={<DejarTestimonio />} />
          <Route path="/doula/:slug/reservar" element={<BookingPage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/codigo-etico" element={<CodigoEtico />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/doulas" 
            element={
              <ProtectedRoute>
                <AdminDoulas />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/doulas/new" 
            element={
              <ProtectedRoute>
                <AdminDoulaForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/doulas/edit/:id" 
            element={
              <ProtectedRoute>
                <AdminDoulaForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reservas" 
            element={
              <ProtectedRoute>
                <AdminBookings />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default App