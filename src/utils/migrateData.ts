import { supabase } from '../services/supabase'
import { allDoulas } from '../data/allDoulas'
import { transformDoulaForDB } from './adapters'

export async function migrateDoulas() {
  try {
    console.log('Iniciando migración de doulas...')
    
    // Primero verificar si las doulas ya existen
    const { data: existingDoulas, error: fetchError } = await supabase
      .from('doulas')
      .select('name')
      .limit(1)
    
    if (fetchError) {
      console.error('Error al verificar doulas existentes:', fetchError)
      return false
    }

    // Si hay doulas y alguna coincide con nuestras doulas, no migrar
    if (existingDoulas && existingDoulas.length > 0) {
      const { data: specificDoulas } = await supabase
        .from('doulas')
        .select('name')
        .in('name', allDoulas.map(d => d.name))
      
      if (specificDoulas && specificDoulas.length > 0) {
        console.log('Las doulas ya están migradas')
        return true
      }
    }

    // Eliminar doulas existentes
    const { error: deleteError } = await supabase
      .from('doulas')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Eliminar todo

    if (deleteError) {
      console.error('Error al eliminar doulas existentes:', deleteError)
      // Continuar con la inserción aunque haya error
    }

    // Insertar las nuevas doulas
    const doulasToInsert = allDoulas.map(doula => {
      const dbDoula = transformDoulaForDB(doula)
      // Remover campos que pueden causar conflictos
      const { id, created_at, updated_at, ...cleanDoula } = dbDoula as any
      return cleanDoula
    })

    const { data, error: insertError } = await supabase
      .from('doulas')
      .insert(doulasToInsert)
      .select()

    if (insertError) {
      console.error('Error al insertar doulas:', insertError)
      return false
    }

    console.log(`Migración exitosa: ${data?.length || 0} doulas insertadas`)
    return true

  } catch (error) {
    console.error('Error general en migración:', error)
    return false
  }
}

// Función para verificar si es necesario migrar
export async function checkMigrationNeeded() {
  // Por ahora deshabilitar la migración automática hasta configurar Supabase correctamente
  console.log('Migration disabled - using local data only')
  return false
}
