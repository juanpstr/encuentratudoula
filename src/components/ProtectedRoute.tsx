import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { getCurrentUser } from '../services/supabase'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, setUser, setLoading } = useStore()

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)
      const { user } = await getCurrentUser()
      
      if (user) {
        // Check if user is admin in the admins table
        // For now, we'll just check if user exists
        setUser({
          id: (user as any).id,
          email: (user as any).email || '',
          name: (user as any).user_metadata?.name || (user as any).email || '',
          role: 'admin',
          created_at: (user as any).created_at || new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      }
      setLoading(false)
    }

    if (!isAuthenticated) {
      checkAuth()
    }
  }, [isAuthenticated, setUser, setLoading])

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute