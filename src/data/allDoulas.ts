import type { Doula } from '../types'

export const allDoulas: Doula[] = [
  // Solo las 6 doulas proporcionadas por el usuario
  {
    id: '1',
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
    location: {
      address: 'Calle Hacienda de Pavones 117 2B CP 28030',
      city: 'Madrid',
      country: 'España',
      latitude: 40.4168,
      longitude: -3.7038
    },
    contact: {
      phone: '+34 653030589',
      email: 'liliana.perronespera@encuentratudoula.com'
    },
    services: {
      prenatal_support: true,
      birth_support: true,
      postpartum_support: true,
      lactation_support: false,
      childbirth_education: true
    },
    accompaniment_types: ['presencial', 'online'],
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
    profile_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wise%20venezuelan%20doula%20woman%20portrait%20liliana%20warm%20golden%20light%20mystical%20serene%20expression%20earth%20tones%20natural%20beauty%20maternal%20energy&image_size=square',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-01-30T10:00:00Z',
    updated_at: '2024-01-30T10:00:00Z'
  },
  {
    id: '2',
    name: 'Paula Loboguerrero Rivera',
    email: 'paula.loboguerrero@encuentratudoula.com',
    phone: '+49 1622173524',
    nationality: 'Colombiana',
    identification_number: '41589838L',
    bio: 'Doula dedicada al acompañamiento integral de la mujer en todos sus ciclos. Mi enfoque se centra en la conexión con la ciclicidad femenina y la sabiduría ancestral. Especializada en procesos de fertilidad y sanación uterina.',
    experience_years: 6,
    rating: 4.8,
    reviews_count: 28,
    certifications: ['Doula Certificada', 'Ciclicidad Femenina', 'Fertilidad Consciente', 'Sanación Uterina'],
    specialties: ['Ciclicidad', 'Pre Concepción y Fertilidad', 'Sanación de Memorias Uterinas', 'Gestación', 'Parto', 'Postparto', 'Plenipausia', 'Duelos'],
    languages: ['Español', 'Alemán', 'Inglés'],
    location: {
      address: 'Kochhann Strasse 11 CP 10249',
      city: 'Berlín',
      country: 'Alemania',
      latitude: 52.5200,
      longitude: 13.4050
    },
    contact: {
      phone: '+49 1622173524',
      email: 'paula.loboguerrero@encuentratudoula.com'
    },
    services: {
      prenatal_support: true,
      birth_support: true,
      postpartum_support: true,
      lactation_support: false,
      childbirth_education: true
    },
    accompaniment_types: ['presencial', 'online'],
    pricing: {
      consultation_fee: 'A consultar',
      birth_package: 'A consultar',
      hourly_rate: 'A consultar',
      currency: 'EUR'
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    profile_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wise%20colombian%20doula%20woman%20portrait%20paula%20warm%20golden%20light%20mystical%20serene%20expression%20earth%20tones%20natural%20beauty%20maternal%20energy&image_size=square',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Arantxa Pons Palomino',
    email: 'arantxa.pons@encuentratudoula.com',
    phone: '+34 616790680',
    nationality: 'Española',
    identification_number: '20480315B',
    bio: 'Doula española especializada en acompañamiento integral desde la pre-concepción hasta el postparto. Mi pasión es crear espacios seguros donde las familias puedan vivir su experiencia de maternidad con plenitud y confianza.',
    experience_years: 4,
    rating: 4.7,
    reviews_count: 19,
    certifications: ['Doula Certificada', 'Preparación al Parto', 'Cuidado Postparto', 'Fertilidad Natural'],
    specialties: ['Ciclicidad', 'Pre Concepción y Fertilidad', 'Sanación de Memorias Uterinas', 'Gestación', 'Parto', 'Postparto'],
    languages: ['Español', 'Catalán', 'Inglés'],
    location: {
      address: 'Calle Virgen de Gracia 116 4°F Almazora CP 12550',
      city: 'Castellón',
      country: 'España',
      latitude: 39.9642,
      longitude: -0.0370
    },
    contact: {
      phone: '+34 616790680',
      email: 'arantxa.pons@encuentratudoula.com'
    },
    services: {
      prenatal_support: true,
      birth_support: true,
      postpartum_support: true,
      lactation_support: true,
      childbirth_education: true
    },
    accompaniment_types: ['presencial', 'online'],
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
      thursday: false,
      friday: true,
      saturday: true,
      sunday: false
    },
    profile_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wise%20spanish%20doula%20woman%20portrait%20arantxa%20warm%20golden%20light%20mystical%20serene%20expression%20earth%20tones%20natural%20beauty%20maternal%20energy&image_size=square',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-03T10:00:00Z',
    updated_at: '2024-02-03T10:00:00Z'
  },
  {
    id: '4',
    name: 'Ivana Molčanová',
    email: 'ivana.molcanova@encuentratudoula.com',
    phone: '+421 905123456',
    nationality: 'Eslovaca',
    identification_number: '20480315B',
    bio: 'Doula eslovaca especializada en sanación ancestral y acompañamiento durante el embarazo, parto y postparto. Mi enfoque se basa en la conexión profunda con la sabiduría femenina y los rituales de sanación.',
    experience_years: 3,
    rating: 4.6,
    reviews_count: 15,
    certifications: ['Doula Certificada', 'Sanación Ancestral', 'Medicina Herbal', 'Rituales de Parto'],
    specialties: ['Sanación de Memorias Uterinas', 'Gestación', 'Parto', 'Postparto'],
    languages: ['Eslovaco', 'Español', 'Inglés'],
    location: {
      address: 'Matice Slovenskej 24 CP 08301',
      city: 'Sabinov',
      country: 'Eslovaquia',
      latitude: 49.1063,
      longitude: 21.0984
    },
    contact: {
      phone: '+421 905123456',
      email: 'ivana.molcanova@encuentratudoula.com'
    },
    services: {
      prenatal_support: true,
      birth_support: true,
      postpartum_support: true,
      lactation_support: false,
      childbirth_education: false
    },
    accompaniment_types: ['presencial', 'online'],
    pricing: {
      consultation_fee: 'A consultar',
      birth_package: 'A consultar',
      hourly_rate: 'A consultar',
      currency: 'EUR'
    },
    availability: {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    profile_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wise%20slovak%20doula%20woman%20portrait%20ivana%20warm%20golden%20light%20mystical%20serene%20expression%20earth%20tones%20natural%20beauty%20maternal%20energy&image_size=square',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-05T10:00:00Z',
    updated_at: '2024-02-05T10:00:00Z'
  },
  {
    id: '5',
    name: 'Jennifer García',
    email: 'jennifer.garcia@encuentratudoula.com',
    phone: '+33 669955499',
    nationality: 'Colombiana',
    identification_number: '1143827944',
    bio: 'Doula colombiana radicada en Francia, especializada en acompañamiento durante gestación, parto y postparto. Mi enfoque es crear un espacio de amor y confianza donde las familias puedan vivir su experiencia de maternidad con serenidad.',
    experience_years: 2,
    rating: 4.5,
    reviews_count: 8,
    certifications: ['Doula Certificada', 'Preparación al Parto Natural', 'Cuidado Postparto'],
    specialties: ['Gestación', 'Parto', 'Postparto'],
    languages: ['Español', 'Francés', 'Inglés'],
    location: {
      address: 'La Choulaie 6 56140',
      city: 'Tréal',
      country: 'Francia',
      latitude: 47.7167,
      longitude: -2.3167
    },
    contact: {
      phone: '+33 669955499',
      email: 'jennifer.garcia@encuentratudoula.com'
    },
    services: {
      prenatal_support: true,
      birth_support: true,
      postpartum_support: true,
      lactation_support: false,
      childbirth_education: false
    },
    accompaniment_types: ['presencial', 'online'],
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
      thursday: false,
      friday: true,
      saturday: false,
      sunday: false
    },
    profile_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wise%20colombian%20doula%20woman%20portrait%20jennifer%20warm%20golden%20light%20mystical%20serene%20expression%20earth%20tones%20natural%20beauty%20maternal%20energy&image_size=square',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-07T10:00:00Z',
    updated_at: '2024-02-07T10:00:00Z'
  },
  {
    id: '6',
    name: 'Nathaly Gattas Bultaif',
    email: 'nathaly.gattas@encuentratudoula.com',
    phone: '+351 965730239',
    nationality: 'Colombiana',
    identification_number: '1107057031',
    bio: 'Doula especializada en acompañamiento durante la preconcepción. Mi misión es guiar a las mujeres en su camino hacia la maternidad consciente, preparando el cuerpo, la mente y el espíritu para recibir nueva vida.',
    experience_years: 2,
    rating: 4.8,
    reviews_count: 12,
    certifications: ['Doula Certificada', 'Fertilidad Consciente', 'Nutrición Pre-concepcional'],
    specialties: ['Preconcepción'],
    languages: ['Español', 'Portugués', 'Inglés'],
    location: {
      address: 'Lisboa',
      city: 'Lisboa',
      country: 'Portugal',
      latitude: 38.7223,
      longitude: -9.1393
    },
    contact: {
      phone: '+351 965730239',
      email: 'nathaly.gattas@encuentratudoula.com'
    },
    services: {
      prenatal_support: true,
      birth_support: false,
      postpartum_support: false,
      lactation_support: false,
      childbirth_education: true
    },
    accompaniment_types: ['presencial', 'online'],
    pricing: {
      consultation_fee: 'A consultar',
      birth_package: 'A consultar',
      hourly_rate: 'A consultar',
      currency: 'EUR'
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    profile_image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=wise%20colombian%20doula%20woman%20portrait%20nathaly%20warm%20golden%20light%20mystical%20serene%20expression%20earth%20tones%20natural%20beauty%20maternal%20energy&image_size=square',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-09T10:00:00Z',
    updated_at: '2024-02-09T10:00:00Z'
  }
]

export const sampleReviews = [
  {
    id: '1',
    doula_id: '1',
    client_name: 'Laura P.',
    rating: 5,
    comment: 'María fue increíble durante todo el proceso. Su apoyo emocional y conocimiento técnico nos dieron mucha tranquilidad.',
    date: '2024-01-10'
  },
  {
    id: '2',
    doula_id: '1',
    client_name: 'Carlos y Elena',
    rating: 5,
    comment: 'No podríamos haber pedido mejor acompañamiento. María estuvo presente en cada momento que la necesitamos.',
    date: '2024-01-05'
  },
  {
    id: '3',
    doula_id: '2',
    client_name: 'Marta S.',
    rating: 5,
    comment: 'Carmen me ayudó a tener el parto en agua que siempre soñé. Su experiencia y calma fueron fundamentales.',
    date: '2024-01-12'
  },
  {
    id: '4',
    doula_id: '6',
    client_name: 'Patricia M.',
    rating: 5,
    comment: 'Liliana me acompañó en mi proceso de sanación uterina. Su sabiduría ancestral fue transformadora.',
    date: '2024-01-20'
  },
  {
    id: '5',
    doula_id: '7',
    client_name: 'Andrea K.',
    rating: 5,
    comment: 'Paula me guió hermosamente en mi proceso de fertilidad. Su conocimiento sobre ciclicidad femenina es excepcional.',
    date: '2024-01-25'
  }
]

export const sampleStats = {
  totalDoulas: 6,
  activeDoulas: 6,
  averageRating: 4.7,
  totalReviews: 95,
  newDoulasThisMonth: 6,
  citiesCovered: 6,
  languagesSupported: 8,
  specialtiesOffered: 15
}
