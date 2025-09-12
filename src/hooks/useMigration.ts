import { useEffect, useState } from 'react'
import { checkMigrationNeeded, migrateDoulas } from '../utils/migrateData'

export function useMigration() {
  const [migrationStatus, setMigrationStatus] = useState<'pending' | 'running' | 'complete' | 'error'>('pending')

  useEffect(() => {
    const runMigration = async () => {
      try {
        const needsMigration = await checkMigrationNeeded()
        
        if (needsMigration) {
          console.log('Ejecutando migración de doulas...')
          setMigrationStatus('running')
          
          const success = await migrateDoulas()
          
          if (success) {
            setMigrationStatus('complete')
            console.log('Migración completada exitosamente')
          } else {
            setMigrationStatus('error')
            console.error('Error en la migración')
          }
        } else {
          setMigrationStatus('complete')
          console.log('No se necesita migración')
        }
      } catch (error) {
        setMigrationStatus('error')
        console.error('Error al verificar/ejecutar migración:', error)
      }
    }

    runMigration()
  }, [])

  return migrationStatus
}

