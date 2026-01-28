import type { Doula } from '../types'

export const allDoulas: Doula[] = [
  // Solo las 6 doulas proporcionadas por el usuario
  {
    id: '1',
    slug: 'liliana-perrone-spera',
    name: 'Liliana Perrone Spera',
    email: 'liliana.perronespera@encuentratudoula.com',
    phone: '+34 653030589',
    nationality: 'Venezolana',
    identification_number: 'Y5772680Q',
    bio: 'Doula especializada en sanación ancestral y medicina placentaria. Mi misión es acompañar a las familias en sus procesos de transformación desde el amor y la sabiduría ancestral. Experta en sanación de memorias uterinas y medicina sagrada.',
    experience_years: 5,
    rating: 5.0,
    reviews_count: 0,
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
    profile_image: '/doulas/Liliana.jpg',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-01-30T10:00:00Z',
    updated_at: '2024-01-30T10:00:00Z'
  },
  {
    id: '2',
    slug: 'paula-loboguerrero-rivera',
    name: 'Paula Loboguerrero Rivera',
    email: 'paula.loboguerrero@encuentratudoula.com',
    phone: '+49 1622173524',
    nationality: 'Colombiana',
    identification_number: '41589838L',
    bio: 'Doula dedicada al acompañamiento integral de la mujer en todos sus ciclos. Mi enfoque se centra en la conexión con la ciclicidad femenina y la sabiduría ancestral. Especializada en procesos de fertilidad y sanación uterina.',
    experience_years: 6,
    rating: 5.0,
    reviews_count: 0,
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
    profile_image: '/doulas/Paula.jpg',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z'
  },
  {
    id: '3',
    slug: 'arantxa-pons-palomino',
    name: 'Arantxa Pons Palomino',
    email: 'arantxa.pons@encuentratudoula.com',
    phone: '+34 616790680',
    nationality: 'Española',
    identification_number: '20480315B',
    bio: 'Doula española especializada en acompañamiento integral desde la pre-concepción hasta el postparto. Mi pasión es crear espacios seguros donde las familias puedan vivir su experiencia de maternidad con plenitud y confianza.',
    experience_years: 4,
    rating: 5.0,
    reviews_count: 0,
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
    profile_image: '/doulas/Arantxa.jpg',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-03T10:00:00Z',
    updated_at: '2024-02-03T10:00:00Z'
  },
  {
    id: '4',
    slug: 'ivana-molcanova',
    name: 'Ivana Molčanová',
    email: 'ivana.molcanova@encuentratudoula.com',
    phone: '+421 905123456',
    nationality: 'Eslovaca',
    identification_number: '20480315B',
    bio: 'Doula eslovaca especializada en sanación ancestral y acompañamiento durante el embarazo, parto y postparto. Mi enfoque se basa en la conexión profunda con la sabiduría femenina y los rituales de sanación.',
    experience_years: 3,
    rating: 5.0,
    reviews_count: 0,
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
    profile_image: '/doulas/Ivana.jpg',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-05T10:00:00Z',
    updated_at: '2024-02-05T10:00:00Z'
  },
  {
    id: '5',
    slug: 'jennifer-garcia',
    name: 'Jennifer García',
    email: 'jennifer.garcia@encuentratudoula.com',
    phone: '+33 669955499',
    nationality: 'Colombiana',
    identification_number: '1143827944',
    bio: 'Doula colombiana radicada en Francia, especializada en acompañamiento durante gestación, parto y postparto. Mi enfoque es crear un espacio de amor y confianza donde las familias puedan vivir su experiencia de maternidad con serenidad.',
    experience_years: 2,
    rating: 5.0,
    reviews_count: 0,
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
    profile_image: '/doulas/Jennifer.jpg',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-07T10:00:00Z',
    updated_at: '2024-02-07T10:00:00Z'
  },
  {
    id: '6',
    slug: 'nathaly-gattas-bultaif',
    name: 'Nathaly Gattas Bultaif',
    email: 'nathaly.gattas@encuentratudoula.com',
    phone: '+351 965730239',
    nationality: 'Colombiana',
    identification_number: '1107057031',
    bio: 'Doula especializada en acompañamiento durante la preconcepción. Mi misión es guiar a las mujeres en su camino hacia la maternidad consciente, preparando el cuerpo, la mente y el espíritu para recibir nueva vida.',
    experience_years: 2,
    rating: 5.0,
    reviews_count: 0,
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
    profile_image: '/doulas/Nathaly.jpg',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-09T10:00:00Z',
    updated_at: '2024-02-09T10:00:00Z'
  },
  // Nuevas doulas agregadas
  {
    id: '7',
    slug: 'alexandra-raposo',
    name: 'Alexandra Raposo',
    email: 'alexandra.raposo@encuentratudoula.com',
    phone: '+1 917 968-7695',
    nationality: 'Dominicana',
    identification_number: '',
    bio: 'Doula dominicana radicada en Florida, EEUU. Especializada en Sanación de Memorias Uterinas, Pre Concepción y Fertilidad. Mi misión es acompañar a las mujeres en su camino hacia la sanación y la maternidad consciente, honrando la sabiduría ancestral caribeña.',
    experience_years: 2,
    rating: 5.0,
    reviews_count: 0,
    certifications: ['Doula Certificada', 'Sanación de Memorias Uterinas', 'Fertilidad Consciente'],
    specialties: ['Sanación de Memorias Uterinas', 'Pre Concepción y Fertilidad'],
    languages: ['Español', 'Inglés'],
    location: {
      address: '2057 Jimmy Lane Saint Johns FL 32259',
      city: 'Florida',
      country: 'Estados Unidos',
      latitude: 30.0813,
      longitude: -81.5473
    },
    contact: {
      phone: '+1 917 968-7695',
      email: 'alexandra.raposo@encuentratudoula.com'
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
      currency: 'USD'
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
    profile_image: '',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-10T10:00:00Z'
  },
  {
    id: '8',
    slug: 'eugenia-estefania-tovar-guzman',
    name: 'Eugenia Estefanía Tovar Guzmán',
    email: 'eugenia.tovar@encuentratudoula.com',
    phone: '+506 6027 1612',
    nationality: 'Venezolana',
    identification_number: 'Y6289030Q',
    bio: 'Doula venezolana radicada en Costa Rica, con formación integral en todos los ciclos de la mujer. Acompaño procesos de sanación de memorias uterinas, fertilidad, gestación, parto, postparto, medicina placentaria, plenipausia y duelos. Mi enfoque honra la conexión con la tierra y la sabiduría ancestral.',
    experience_years: 3,
    rating: 5.0,
    reviews_count: 0,
    certifications: ['Doula Certificada', 'Medicina Placentaria', 'Sanación de Memorias Uterinas', 'Especialista en Duelos', 'Plenipausia'],
    specialties: ['Sanación de Memorias Uterinas', 'Pre Concepción y Fertilidad', 'Gestación', 'Parto', 'Postparto', 'Medicina Placentaria', 'Plenipausia', 'Duelos'],
    languages: ['Español'],
    location: {
      address: 'Cabanga, Pueblo Nuevo, Provincia de Alajuela',
      city: 'Cabanga',
      country: 'Costa Rica',
      latitude: 10.0167,
      longitude: -84.2167
    },
    contact: {
      phone: '+506 6027 1612',
      email: 'eugenia.tovar@encuentratudoula.com'
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
      currency: 'USD'
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    profile_image: '/doulas/Eugenia.jpg',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-11T10:00:00Z',
    updated_at: '2024-02-11T10:00:00Z'
  },
  {
    id: '9',
    slug: 'laura-juliana-alcarcel-rodriguez',
    name: 'Laura Juliana Alcárcel Rodriguez',
    email: 'laura.alcarcel@encuentratudoula.com',
    phone: '+57 3137718569',
    nationality: 'Colombiana',
    identification_number: '1026562138',
    bio: 'Doula colombiana del corazón cafetero. Acompaño procesos de sanación de memorias uterinas, fertilidad, gestación, parto, postparto, medicina placentaria y duelos. Mi espacio sagrado está rodeado de montañas verdes donde la naturaleza nos abraza y sana.',
    experience_years: 2,
    rating: 5.0,
    reviews_count: 0,
    certifications: ['Doula Certificada', 'Medicina Placentaria', 'Sanación de Memorias Uterinas', 'Especialista en Duelos'],
    specialties: ['Sanación de Memorias Uterinas', 'Pre Concepción y Fertilidad', 'Gestación', 'Parto', 'Postparto', 'Medicina Placentaria', 'Duelos'],
    languages: ['Español'],
    location: {
      address: 'Finca la unión, Vereda La Albania',
      city: 'Quindío',
      country: 'Colombia',
      latitude: 4.5339,
      longitude: -75.6811
    },
    contact: {
      phone: '+57 3137718569',
      email: 'laura.alcarcel@encuentratudoula.com'
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
      currency: 'COP'
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    profile_image: '/doulas/Laura.jpg',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-12T10:00:00Z',
    updated_at: '2024-02-12T10:00:00Z'
  },
  {
    id: '10',
    slug: 'maria-camila-arias-carreno',
    name: 'María Camila Arias Carreño',
    email: 'mariacamila.arias@encuentratudoula.com',
    phone: '+57 3165288832',
    nationality: 'Colombiana',
    identification_number: '53.082.952',
    bio: 'Doula colombiana que habita en las montañas de La Calera. Acompaño todos los ciclos sagrados de la mujer: sanación de memorias uterinas, fertilidad, gestación, parto, postparto, medicina placentaria y duelos. Mi hogar, Casa Luna, es un espacio de sanación y conexión con la naturaleza.',
    experience_years: 3,
    rating: 5.0,
    reviews_count: 0,
    certifications: ['Doula Certificada', 'Medicina Placentaria', 'Sanación de Memorias Uterinas', 'Especialista en Duelos'],
    specialties: ['Sanación de Memorias Uterinas', 'Pre Concepción y Fertilidad', 'Gestación', 'Parto', 'Postparto', 'Medicina Placentaria', 'Duelos'],
    languages: ['Español'],
    location: {
      address: 'La Calera - Cundinamarca; Vereda El Salitre, Casa Luna',
      city: 'La Calera',
      country: 'Colombia',
      latitude: 4.7214,
      longitude: -73.9673
    },
    contact: {
      phone: '+57 3165288832',
      email: 'mariacamila.arias@encuentratudoula.com'
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
      currency: 'COP'
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    profile_image: '',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-13T10:00:00Z',
    updated_at: '2024-02-13T10:00:00Z'
  },
  {
    id: '11',
    slug: 'maialen-lopez-abrego',
    name: 'Maialen López Abrego',
    email: 'maialen.lopez@encuentratudoula.com',
    phone: '+34 696 88 80 10',
    nationality: 'Española',
    identification_number: '73453427Y',
    bio: 'Doula española de Navarra, especializada en sanación de memorias uterinas, ciclicidad, gestación, parto, postparto y duelos. Mi tierra vasca me conecta con las raíces ancestrales y la sabiduría de las mujeres que me precedieron.',
    experience_years: 2,
    rating: 5.0,
    reviews_count: 0,
    certifications: ['Doula Certificada', 'Ciclicidad Femenina', 'Sanación de Memorias Uterinas', 'Especialista en Duelos'],
    specialties: ['Sanación de Memorias Uterinas', 'Ciclicidad', 'Gestación', 'Parto', 'Postparto', 'Duelos'],
    languages: ['Español', 'Euskera'],
    location: {
      address: 'Calle Itxaradia nº8, 31177 Ibiriku Deierri',
      city: 'Navarra',
      country: 'España',
      latitude: 42.8125,
      longitude: -1.6458
    },
    contact: {
      phone: '+34 696 88 80 10',
      email: 'maialen.lopez@encuentratudoula.com'
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
    profile_image: '',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-14T10:00:00Z',
    updated_at: '2024-02-14T10:00:00Z'
  },
  {
    id: '12',
    slug: 'maya-y-diaz-lugo',
    name: 'Maya Y Diaz Lugo',
    email: 'maya.diaz@encuentratudoula.com',
    phone: '+1 (786) 395-4936',
    nationality: 'Venezolana',
    identification_number: 'D242-559-63-886-0',
    bio: 'Doula venezolana radicada en Minnesota, EEUU. Especializada en sanación de memorias uterinas, gestación, parto, postparto, medicina placentaria, plenipausia y duelos. Mi camino me ha llevado del Caribe a las tierras del norte, llevando conmigo la calidez de mi herencia.',
    experience_years: 3,
    rating: 5.0,
    reviews_count: 0,
    certifications: ['Doula Certificada', 'Medicina Placentaria', 'Sanación de Memorias Uterinas', 'Plenipausia', 'Especialista en Duelos'],
    specialties: ['Sanación de Memorias Uterinas', 'Gestación', 'Parto', 'Postparto', 'Medicina Placentaria', 'Plenipausia', 'Duelos'],
    languages: ['Español', 'Inglés'],
    location: {
      address: '230 Kentucky Av',
      city: 'Minnesota',
      country: 'Estados Unidos',
      latitude: 44.9778,
      longitude: -93.2650
    },
    contact: {
      phone: '+1 (786) 395-4936',
      email: 'maya.diaz@encuentratudoula.com'
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
      currency: 'USD'
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    profile_image: '',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-02-15T10:00:00Z'
  },
  {
    id: '13',
    slug: 'yaritza-m-santiago-figueroa',
    name: 'Yaritza M. Santiago Figueroa',
    email: 'yaritza.santiago@encuentratudoula.com',
    phone: '+1-787-677-4786',
    nationality: 'Estadounidense',
    identification_number: '4621185',
    bio: 'Doula puertorriqueña con profundo amor por el acompañamiento de la mujer. Especializada en pre concepción, fertilidad, gestación, parto, postparto, medicina placentaria, plenipausia y duelos. Mi isla me ha enseñado la fuerza y la ternura que toda mujer lleva dentro.',
    experience_years: 3,
    rating: 5.0,
    reviews_count: 0,
    certifications: ['Doula Certificada', 'Medicina Placentaria', 'Fertilidad Consciente', 'Plenipausia', 'Especialista en Duelos'],
    specialties: ['Pre Concepción y Fertilidad', 'Gestación', 'Parto', 'Postparto', 'Medicina Placentaria', 'Plenipausia', 'Duelos'],
    languages: ['Español', 'Inglés'],
    location: {
      address: '780 Calle Dr. López Sicardo, Urb. Dos Pinos',
      city: 'Puerto Rico',
      country: 'Estados Unidos',
      latitude: 18.4655,
      longitude: -66.1057
    },
    contact: {
      phone: '+1-787-677-4786',
      email: 'yaritza.santiago@encuentratudoula.com'
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
      currency: 'USD'
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    profile_image: '',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-16T10:00:00Z',
    updated_at: '2024-02-16T10:00:00Z'
  },
  {
    id: '14',
    slug: 'natalia-tomas-roncal',
    name: 'Natalia Tomás Roncal',
    email: 'natalia.tomas@encuentratudoula.com',
    phone: '+34 611884485',
    nationality: 'Española',
    identification_number: '17453115W',
    bio: 'Doula española de Zaragoza, especializada en pre concepción, fertilidad, gestación, parto, postparto y duelos. Mi tierra aragonesa me ha enseñado la fortaleza y la ternura que acompaño en cada mujer en su camino hacia la maternidad.',
    experience_years: 2,
    rating: 5.0,
    reviews_count: 0,
    certifications: ['Doula Certificada', 'Fertilidad Consciente', 'Preparación al Parto', 'Especialista en Duelos'],
    specialties: ['Pre Concepción y Fertilidad', 'Gestación', 'Parto', 'Postparto', 'Duelos'],
    languages: ['Español'],
    location: {
      address: 'Paseo Rafael Esteve Vilella 12 1c 50018',
      city: 'Zaragoza',
      country: 'España',
      latitude: 41.6488,
      longitude: -0.8891
    },
    contact: {
      phone: '+34 611884485',
      email: 'natalia.tomas@encuentratudoula.com'
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
    profile_image: '',
    gallery_images: [],
    is_verified: true,
    is_active: true,
    created_at: '2024-02-17T10:00:00Z',
    updated_at: '2024-02-17T10:00:00Z'
  }
]

export const sampleReviews: { id: string; doula_id: string; client_name: string; rating: number; comment: string; date: string }[] = []

export const sampleStats = {
  totalDoulas: 14,
  activeDoulas: 14,
  averageRating: 5.0,
  totalReviews: 0,
  newDoulasThisMonth: 8,
  citiesCovered: 13,
  languagesSupported: 10,
  specialtiesOffered: 15
}
