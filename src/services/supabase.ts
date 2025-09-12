import { createClient } from '@supabase/supabase-js'
import type { Doula } from '../types'
import { transformDoulaFromDB, transformDoulaForDB } from '../utils/adapters.simple'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Si no hay variables de entorno, usar un cliente dummy
let supabase: any

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('No Supabase configuration found, using local data only')
  // Cliente dummy que simula errores para forzar el uso de datos locales
  supabase = {
    from: () => ({
      select: () => ({ error: 'No Supabase config', data: null }),
      insert: () => ({ error: 'No Supabase config', data: null }),
      update: () => ({ error: 'No Supabase config', data: null }),
      delete: () => ({ error: 'No Supabase config', data: null }),
      eq: () => ({ error: 'No Supabase config', data: null }),
      single: () => ({ error: 'No Supabase config', data: null })
    }),
    auth: {
      signInWithPassword: () => ({ error: 'No Supabase config', data: null }),
      signOut: () => ({ error: 'No Supabase config' }),
      getUser: () => ({ error: 'No Supabase config', data: { user: null } })
    }
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

// Auth helpers
export const signIn = async (email: string, password: string) => {
  console.log('🔑 Intento de login:', { email, password: '*'.repeat(password.length) })
  
  // Credenciales temporales para desarrollo (sin Supabase)
  if (email === 'admin@encuentratudoula.com' && password === 'admin123') {
    console.log('✅ Login exitoso con credenciales de desarrollo')
    const mockUser = {
      id: 'admin-dev-001',
      email: 'admin@encuentratudoula.com',
      user_metadata: { name: 'Administrador' },
      created_at: new Date().toISOString()
    }
    return { 
      data: { user: mockUser }, 
      error: null 
    }
  }

  // Si las credenciales no coinciden
  console.log('❌ Credenciales incorrectas')
  return { 
    data: null, 
    error: { message: 'Credenciales inválidas' } 
  }

  /* TODO: Reactivar cuando Supabase esté configurado
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
  */
}

export const signOut = async () => {
  console.log('🚪 Logout (modo desarrollo)')
  // Simular logout exitoso
  return { error: null }
  
  /* TODO: Reactivar cuando Supabase esté configurado
  const { error } = await supabase.auth.signOut()
  return { error }
  */
}

export const getCurrentUser = async () => {
  // En modo desarrollo, siempre retornar null (no hay persistencia de sesión)
  return { user: null, error: null }
  
  /* TODO: Reactivar cuando Supabase esté configurado
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
  */
}

// Database helpers
export const getDoulas = async () => {
  console.log('🔍 getDoulas called')
  
  // Forzar uso de datos locales por ahora
  const { sampleDoulas } = await import('../data/sampleData')
  console.log(`📊 Using local data: ${sampleDoulas.length} doulas found`)
  console.log('🏷️ Doula names:', sampleDoulas.map(d => d.name))
  return sampleDoulas

  /* TODO: Reactivar cuando Supabase esté configurado
  try {
    const { data, error } = await supabase
      .from('doulas')
      .select('*')
      .eq('is_active', true)

    if (error) {
      console.error('Error fetching doulas from Supabase:', error)
      // Fallback a datos locales si hay error
      const { sampleDoulas } = await import('../data/sampleData')
      console.log('Using local data as fallback')
      return sampleDoulas
    }

    const transformedDoulas = (data || []).map(transformDoulaFromDB)
    
    // Si no hay doulas en la base de datos, usar datos locales
    if (transformedDoulas.length === 0) {
      const { sampleDoulas } = await import('../data/sampleData')
      console.log('No doulas found in database, using local data')
      return sampleDoulas
    }

    return transformedDoulas
  } catch (error) {
    console.error('Error connecting to Supabase:', error)
    // Fallback completo a datos locales
    const { sampleDoulas } = await import('../data/sampleData')
    console.log('Using local data due to connection error')
    return sampleDoulas
  }
  */
}

export async function createDoula(doula: Partial<Doula>): Promise<Doula> {
  const dbDoula = transformDoulaForDB(doula)
  
  const { data, error } = await supabase
    .from('doulas')
    .insert(dbDoula)
    .select()
    .single()

  if (error) {
    console.error('Error creating doula:', error)
    throw error
  }

  return transformDoulaFromDB(data)
}

export async function updateDoula(id: string, doula: Partial<Doula>): Promise<Doula> {
  const dbDoula = transformDoulaForDB(doula)
  
  const { data, error } = await supabase
    .from('doulas')
    .update({ ...dbDoula, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating doula:', error)
    throw error
  }

  return transformDoulaFromDB(data)
}

export async function deleteDoula(id: string): Promise<void> {
  const { error } = await supabase
    .from('doulas')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting doula:', error)
    throw error
  }
}

export const getDoulaById = async (id: string) => {
  console.log(`🔍 getDoulaById called for ID: ${id}`)
  
  // Forzar uso de datos locales por ahora
  const { sampleDoulas } = await import('../data/sampleData')
  const localDoula = sampleDoulas.find(d => d.id === id)
  console.log(`👤 Found doula: ${localDoula ? localDoula.name : 'Not found'}`)
  return localDoula || null

  /* TODO: Reactivar cuando Supabase esté configurado
  try {
    const { data, error } = await supabase
      .from('doulas')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()
    
    if (error || !data) {
      console.log('Doula not found in Supabase, checking local data')
      // Fallback a datos locales
      const { sampleDoulas } = await import('../data/sampleData')
      const localDoula = sampleDoulas.find(d => d.id === id)
      return localDoula || null
    }

    return transformDoulaFromDB(data)
  } catch (error) {
    console.error('Error fetching doula:', error)
    // Fallback a datos locales
    const { sampleDoulas } = await import('../data/sampleData')
    const localDoula = sampleDoulas.find(d => d.id === id)
    return localDoula || null
  }
  */
}

export const searchDoulas = async (filters: {
  location?: string
  specialties?: string[]
  languages?: string
  maxPrice?: number
}) => {
  let query = supabase
    .from('doulas')
    .select('*')
    .eq('is_active', true)

  if (filters.location) {
    query = query.or(`location_city.ilike.%${filters.location}%,location_country.ilike.%${filters.location}%`)
  }

  if (filters.specialties && filters.specialties.length > 0) {
    query = query.overlaps('specialties', filters.specialties)
  }

  if (filters.languages) {
    query = query.contains('languages', [filters.languages])
  }

  if (filters.maxPrice) {
    query = query.lte('hourly_rate', filters.maxPrice)
  }

  const { data, error } = await query
  
  if (error) {
    console.error('Error searching doulas:', error)
    throw error
  }

  return (data || []).map(transformDoulaFromDB)
}