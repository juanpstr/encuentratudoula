import type { Doula } from '../types'
// import type { Database } from '../types/database' // No se usa

// Función simplificada para transformar doula desde DB
export function transformDoulaFromDB(dbDoula: any): Doula {
  return {
    id: dbDoula.id,
    name: dbDoula.name || '',
    email: dbDoula.email || '',
    phone: dbDoula.phone || '',
    bio: dbDoula.bio || '',
    specialties: dbDoula.specialties || [],
    certifications: dbDoula.certifications || [],
    experience_years: dbDoula.experience_years || 0,
    languages: dbDoula.languages || ['Español'],
    nationality: dbDoula.nationality || 'No especificada',
    identification_number: dbDoula.identification_number || 'No especificado',
    location: {
      address: dbDoula.location_address || '',
      city: dbDoula.location_city || '',
      country: dbDoula.location_country || '',
      latitude: dbDoula.location_coordinates?.lat || 0,
      longitude: dbDoula.location_coordinates?.lng || 0
    },
    contact: {
      phone: dbDoula.contact_phone || dbDoula.phone || '',
      email: dbDoula.contact_email || dbDoula.email || '',
      website: dbDoula.contact_website || undefined
    },
    services: {
      prenatal_support: true,
      birth_support: true,
      postpartum_support: true,
      lactation_support: false,
      childbirth_education: false
    },
    accompaniment_types: dbDoula.accompaniment_types || ['presencial'],
    pricing: {
      consultation_fee: 'A consultar',
      birth_package: 'A consultar',
      hourly_rate: 'A consultar',
      currency: 'EUR'
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    calendly_link: dbDoula.calendly_link || undefined,
    profile_image: dbDoula.profile_image_url || undefined,
    gallery_images: dbDoula.gallery_images || [],
    rating: dbDoula.rating || 4.5,
    reviews_count: dbDoula.reviews_count || 0,
    is_verified: dbDoula.is_verified ?? true,
    is_active: dbDoula.is_active ?? true,
    created_at: dbDoula.created_at || new Date().toISOString(),
    updated_at: dbDoula.updated_at || new Date().toISOString()
  }
}

// Función simplificada para transformar doula para DB
export function transformDoulaForDB(doula: Partial<Doula>): any {
  return {
    name: doula.name || '',
    email: doula.email || '',
    phone: doula.phone,
    bio: doula.bio,
    specialties: doula.specialties,
    certifications: doula.certifications,
    experience_years: doula.experience_years,
    languages: doula.languages,
    location_address: doula.location?.address,
    location_city: doula.location?.city,
    location_country: doula.location?.country,
    location_coordinates: doula.location ? {
      lat: doula.location.latitude,
      lng: doula.location.longitude
    } : null,
    profile_image_url: doula.profile_image,
    gallery_images: doula.gallery_images,
    rating: doula.rating,
    reviews_count: doula.reviews_count,
    is_verified: doula.is_verified,
    is_active: doula.is_active,
    created_at: doula.created_at,
    updated_at: new Date().toISOString()
  }
}
