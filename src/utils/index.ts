// Utility functions for the application
import type { Doula, SearchFilters } from '../types'

/**
 * Format currency to EUR
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

/**
 * Format date to Spanish locale
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj)
}

/**
 * Format time to Spanish locale
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  return `${hours}:${minutes}`
}

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Generate a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone format (Spanish)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substr(0, 2)
}

/**
 * Generate star rating display
 */
export const generateStarRating = (rating: number): string => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars)
}

/**
 * Convert coordinates to address (mock function)
 */
export const coordinatesToAddress = async (
  lat: number,
  lng: number
): Promise<string> => {
  // In a real app, this would use a geocoding service
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
}

/**
 * Get country flag emoji
 */
export const getCountryFlag = (country: string): string => {
  const flags: Record<string, string> = {
    'España': '🇪🇸',
    'France': '🇫🇷',
    'Portugal': '🇵🇹',
    'Italy': '🇮🇹',
    'Germany': '🇩🇪',
    'United Kingdom': '🇬🇧',
    'Netherlands': '🇳🇱',
    'Belgium': '🇧🇪',
    'Switzerland': '🇨🇭',
    'Austria': '🇦🇹'
  }
  return flags[country] || '🌍'
}

/**
 * Sort doulas by various criteria
 */
export const sortDoulas = (doulas: Doula[], sortBy: string) => {
  switch (sortBy) {
    case 'name':
      return [...doulas].sort((a, b) => a.name.localeCompare(b.name))
    case 'rating':
      return [...doulas].sort((a, b) => b.rating - a.rating)
    case 'experience':
      return [...doulas].sort((a, b) => b.experience_years - a.experience_years)
    case 'price':
      return [...doulas].sort((a, b) => {
        const priceA = typeof a.pricing.consultation_fee === 'number' ? a.pricing.consultation_fee : 0
        const priceB = typeof b.pricing.consultation_fee === 'number' ? b.pricing.consultation_fee : 0
        return priceA - priceB
      })
    default:
      return doulas
  }
}

/**
 * Filter doulas by search criteria
 */
export const filterDoulas = (doulas: Doula[], filters: SearchFilters) => {
  return doulas.filter(doula => {
    // Location filter
    if (filters.location && 
        !doula.location.city.toLowerCase().includes(filters.location.toLowerCase()) &&
        !doula.location.country.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    
    // Specialties filter
    if (filters.specialties && typeof filters.specialties === 'string') {
      const hasSpecialty = doula.specialties.includes(filters.specialties)
      if (!hasSpecialty) return false
    }
    
    // Languages filter
    if (filters.languages && typeof filters.languages === 'string') {
      const hasLanguage = doula.languages.includes(filters.languages)
      if (!hasLanguage) return false
    }
    
    // Price range filter
    if (filters.priceRange) {
      const price = typeof doula.pricing.consultation_fee === 'number' ? doula.pricing.consultation_fee : 0
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false
      }
    }
    
    // Experience filter
    if (filters.experience_years && doula.experience_years < filters.experience_years) {
      return false
    }
    
    // Rating filter
    if (filters.rating && doula.rating < filters.rating) {
      return false
    }
    
    return true
  })
}

/**
 * Generate QR code data URL (mock function)
 */
export const generateQRCode = async (data: string): Promise<string> => {
  // In a real app, this would use a QR code library
  return `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="white"/><text x="50" y="50" text-anchor="middle" dy=".3em" font-family="monospace" font-size="8">${data}</text></svg>`)}`
}

/**
 * Local storage helpers
 */
export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle storage errors silently
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Handle storage errors silently
    }
  }
}

/**
 * Session storage helpers
 */
export const sessionStorage = {
  get: (key: string) => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key: string, value: unknown) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle storage errors silently
    }
  },
  remove: (key: string) => {
    try {
      window.sessionStorage.removeItem(key)
    } catch {
      // Handle storage errors silently
    }
  }
}