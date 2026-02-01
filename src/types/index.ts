export interface Doula {
  id: string;
  slug: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  experience_years: number;
  languages: string[];
  nationality: string;
  identification_number: string;
  location: {
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  services: {
    prenatal_support: boolean;
    birth_support: boolean;
    postpartum_support: boolean;
    lactation_support: boolean;
    childbirth_education: boolean;
  };
  accompaniment_types: string[]; // ["presencial", "online"]
  pricing: {
    consultation_fee: number | string;
    birth_package: number | string;
    hourly_rate: number | string;
    currency: string;
  };
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  calendly_link?: string;
  profile_image?: string;
  gallery_images: string[];
  rating: number;
  reviews_count: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  doula_id: string;
  client_name: string;
  client_email?: string;
  rating: number;
  comment: string;
  service_type?: string;
  is_approved: boolean;
  is_public: boolean;
  created_at: string;
  updated_at?: string;
}

export interface SearchFilters {
  location?: string;
  services?: string[];
  languages?: string;
  maxDistance?: number;
  minRating?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  price_range?: string;
  specialties?: string;
  experience_years?: number;
  rating?: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Sistema de Reservas
export interface Booking {
  id: string;
  doula_id: string;
  doula_name?: string; // Para mostrar en admin
  
  // Cliente
  client_name: string;
  client_email: string;
  client_phone?: string;
  
  // Detalles
  service_type: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  
  // Modalidad
  modality: 'presencial' | 'online';
  meeting_link?: string;
  location_notes?: string;
  
  // Estado
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  
  // Notas
  client_notes?: string;
  doula_notes?: string;
  admin_notes?: string;
  
  // Confirmaciones
  confirmed_by_doula: boolean;
  confirmed_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  
  created_at: string;
  updated_at?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DoulaAvailability {
  id: string;
  doula_id: string;
  day_of_week: number; // 0-6
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface ScheduleBlock {
  id: string;
  doula_id: string;
  start_date: string;
  end_date: string;
  reason?: string;
}