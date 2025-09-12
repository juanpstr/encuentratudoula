// Script para ejecutar migración manual de doulas
import { createClient } from '@supabase/supabase-js'

// Configurar Supabase (reemplazar con las credenciales reales)
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'TU_SUPABASE_URL'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'TU_SUPABASE_ANON_KEY'

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'TU_SUPABASE_URL') {
  console.error('Por favor configura las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const doulas = [
  {
    name: 'Liliana Perrone Spera',
    email: 'liliana.perronespera@encuentratudoula.com',
    phone: '+34 653030589',
    nationality: 'Venezolana',
    identification_number: 'Y5772680Q',
    bio: 'Doula especializada en sanación ancestral y medicina placentaria. Mi misión es acompañar a las familias en sus procesos de transformación desde el amor y la sabiduría ancestral. Experta en sanación de memorias uterinas y medicina sagrada.',
    experience_years: 5,
    rating: 4.9,
    reviews_count: 32,
    certifications: ['Doula Certificada', 'Medicina Placentaria', 'Sanación de Memorias Uterinas', 'Especialista en Duelos'],
    specialties: ['Sanación de Memorias Uterinas', 'Pre Concepción y Fertilidad', 'Gestación', 'Parto', 'Postparto', 'Medicina Placentaria', 'Plenipausia', 'Duelos'],
    languages: ['Español', 'Inglés'],
    location_address: 'Calle Hacienda de Pavones 117 2B CP 28030',
    location_city: 'Madrid',
    location_country: 'España',
    location_coordinates: { lat: 40.4168, lng: -3.7038 },
    contact_phone: '+34 653030589',
    contact_email: 'liliana.perronespera@encuentratudoula.com',
    services: { prenatal_support: true, birth_support: true, postpartum_support: true, lactation_support: false, childbirth_education: true },
    accompaniment_types: ['presencial', 'online'],
    pricing: { consultation_fee: 80, birth_package: 850, hourly_rate: 65, currency: 'EUR' },
    availability_schedule: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: false, sunday: false },
    is_verified: true,
    is_active: true,
    hourly_rate: 65,
    currency: 'EUR'
  },
  // ... resto de doulas (las otras 5)
]

async function migrate() {
  try {
    console.log('🚀 Iniciando migración de doulas...')
    
    // Eliminar doulas existentes
    const { error: deleteError } = await supabase
      .from('doulas')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
    
    if (deleteError) {
      console.warn('⚠️ Error al eliminar doulas existentes:', deleteError)
    }
    
    // Insertar nuevas doulas
    const { data, error } = await supabase
      .from('doulas')
      .insert(doulas.map(doula => ({
        ...doula,
        services: JSON.stringify(doula.services),
        pricing: JSON.stringify(doula.pricing),
        availability_schedule: JSON.stringify(doula.availability_schedule)
      })))
      .select()
    
    if (error) {
      console.error('❌ Error al insertar doulas:', error)
      throw error
    }
    
    console.log(`✅ Migración exitosa: ${data?.length || 0} doulas insertadas`)
    
  } catch (error) {
    console.error('💥 Error en migración:', error)
    process.exit(1)
  }
}

migrate()

