import type { Database } from '../types/database'
import type { Doula } from '../types/index'

type DoulaRow = Database['public']['Tables']['doulas']['Row']

// Transform database row to UI Doula interface
export function transformDoulaFromDB(dbDoula: DoulaRow): Doula {
  // Parse JSON fields safely
  const parseJSON = (field: any, defaultValue: any) => {
    if (!field) return defaultValue;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch {
        return defaultValue;
      }
    }
    return field;
  };

  const services = parseJSON((dbDoula as any).services, {
    prenatal_support: true,
    birth_support: true,
    postpartum_support: true,
    lactation_support: false,
    childbirth_education: false
  });

  const pricing = parseJSON((dbDoula as any).pricing, {
    consultation_fee: 0,
    birth_package: 0,
    hourly_rate: dbDoula.hourly_rate || 0,
    currency: dbDoula.currency || 'EUR'
  });

  const availability = parseJSON(dbDoula.availability_schedule, {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  });

  const coordinates = parseJSON(dbDoula.location_coordinates, { lat: 0, lng: 0 });

  return {
    id: dbDoula.id,
    name: dbDoula.name || '',
    email: dbDoula.email || '',
    phone: dbDoula.phone || '',
    nationality: (dbDoula as any).nationality || 'No especificada',
    identification_number: (dbDoula as any).identification_number || 'No especificado',
    bio: dbDoula.bio || '',
    specialties: dbDoula.specialties || [],
    certifications: dbDoula.certifications || [],
    experience_years: dbDoula.experience_years || 0,
    languages: dbDoula.languages || [],
    location: {
      address: dbDoula.location_address || '',
      city: dbDoula.location_city || '',
      country: dbDoula.location_country || '',
      latitude: coordinates.lat || 0,
      longitude: coordinates.lng || 0
    },
    contact: {
      phone: (dbDoula as any).contact_phone || dbDoula.phone || '',
      email: (dbDoula as any).contact_email || dbDoula.email || '',
      website: (dbDoula as any).contact_website || undefined
    },
    services,
    accompaniment_types: (dbDoula as any).accompaniment_types || ['presencial'],
    pricing,
    availability,
    calendly_link: (dbDoula as any).calendly_link || undefined,
    profile_image: dbDoula.profile_image_url || undefined,
    gallery_images: dbDoula.gallery_images || [],
    rating: (dbDoula as any).rating || 4.5,
    reviews_count: (dbDoula as any).reviews_count || 0,
    is_verified: (dbDoula as any).is_verified ?? true,
    is_active: dbDoula.is_active ?? false,
    created_at: dbDoula.created_at || '',
    updated_at: dbDoula.updated_at || ''
  }
}

// Transform UI Doula to database insert format
export function transformDoulaForDB(doula: Partial<Doula>): Database['public']['Tables']['doulas']['Insert'] {
  return {
    name: doula.name || '',
    email: doula.email || '',
    phone: doula.phone,
    // nationality: doula.nationality, // Comentado temporalmente para build
    // identification_number: doula.identification_number, // Comentado temporalmente para build
    bio: doula.bio,
    specialties: doula.specialties,
    certifications: doula.certifications,
    experience_years: doula.experience_years,
    languages: doula.languages,
    location_address: doula.location?.address,
    location_city: doula.location?.city,
    location_country: doula.location?.country,
    location_coordinates: doula.location ? { lat: doula.location.latitude, lng: doula.location.longitude } : null,
    contact_phone: doula.contact?.phone,
    contact_email: doula.contact?.email,
    contact_website: doula.contact?.website,
    services: doula.services ? JSON.stringify(doula.services) : null,
    accompaniment_types: doula.accompaniment_types,
    pricing: doula.pricing ? JSON.stringify(doula.pricing) : null,
    availability_schedule: doula.availability ? JSON.stringify(doula.availability) : null,
    calendly_link: doula.calendly_link,
    profile_image_url: doula.profile_image,
    gallery_images: doula.gallery_images,
    rating: doula.rating,
    reviews_count: doula.reviews_count,
    is_verified: doula.is_verified,
    is_active: doula.is_active,
    hourly_rate: typeof doula.pricing?.hourly_rate === 'number' ? doula.pricing.hourly_rate : null,
    currency: doula.pricing?.currency
  }
}