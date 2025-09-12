import { create } from 'zustand'
import type { Doula, Admin, SearchFilters } from '../types'

interface AppState {
  // Auth state
  user: Admin | null
  isAuthenticated: boolean
  
  // Doulas state
  doulas: Doula[]
  selectedDoula: Doula | null
  filteredDoulas: Doula[]
  
  // Search state
  searchFilters: SearchFilters
  searchQuery: string
  
  // UI state
  isLoading: boolean
  error: string | null
  
  // Map state
  mapCenter: [number, number]
  mapZoom: number
  
  // Actions
  setUser: (user: Admin | null) => void
  setDoulas: (doulas: Doula[]) => void
  setSelectedDoula: (doula: Doula | null) => void
  setFilteredDoulas: (doulas: Doula[]) => void
  setSearchFilters: (filters: SearchFilters) => void
  setSearchQuery: (query: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setMapCenter: (center: [number, number]) => void
  setMapZoom: (zoom: number) => void
  
  // Filter doulas based on current filters
  filterDoulas: () => void
  
  // Reset filters
  resetFilters: () => void
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  doulas: [],
  selectedDoula: null,
  filteredDoulas: [],
  searchFilters: {},
  searchQuery: '',
  isLoading: false,
  error: null,
  mapCenter: [40.7128, -74.0060], // New York as default
  mapZoom: 10,
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setDoulas: (doulas) => {
    console.log(`🏪 Store setDoulas called with ${doulas.length} doulas`)
    set({ doulas })
  },
  setSelectedDoula: (selectedDoula) => set({ selectedDoula }),
  setFilteredDoulas: (filteredDoulas) => set({ filteredDoulas }),
  setSearchFilters: (searchFilters) => set({ searchFilters }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setMapCenter: (mapCenter) => set({ mapCenter }),
  setMapZoom: (mapZoom) => set({ mapZoom }),
  
  filterDoulas: () => {
    const { doulas, searchFilters, searchQuery } = get()
    let filtered = [...doulas]
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(doula => 
        doula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doula.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doula.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
    
    // Filter by location
    if (searchFilters.location) {
      filtered = filtered.filter(doula => 
        doula.location.city.toLowerCase().includes(searchFilters.location!.toLowerCase()) ||
        doula.location.country.toLowerCase().includes(searchFilters.location!.toLowerCase())
      )
    }
    
    // Filter by services
    if (searchFilters.services && searchFilters.services.length > 0) {
      filtered = filtered.filter(doula => 
        searchFilters.services!.some(service => {
          switch (service) {
            case 'prenatal_support':
              return doula.services.prenatal_support
            case 'birth_support':
              return doula.services.birth_support
            case 'postpartum_support':
              return doula.services.postpartum_support
            case 'lactation_support':
              return doula.services.lactation_support
            case 'childbirth_education':
              return doula.services.childbirth_education
            default:
              return false
          }
        })
      )
    }
    
    // Filter by languages
    if (searchFilters.languages) {
      filtered = filtered.filter(doula => 
        doula.languages.includes(searchFilters.languages!)
      )
    }
    
    // Filter by minimum rating
    if (searchFilters.minRating) {
      filtered = filtered.filter(doula => doula.rating >= searchFilters.minRating!)
    }
    
    // Filter by price range
    if (searchFilters.priceRange) {
      filtered = filtered.filter(doula => 
        (typeof doula.pricing.consultation_fee === 'number' ? doula.pricing.consultation_fee : 0) >= searchFilters.priceRange!.min &&
        (typeof doula.pricing.consultation_fee === 'number' ? doula.pricing.consultation_fee : 0) <= searchFilters.priceRange!.max
      )
    }
    
    set({ filteredDoulas: filtered })
  },
  
  resetFilters: () => {
    set({ 
      searchFilters: {},
      searchQuery: '',
      filteredDoulas: get().doulas
    })
  }
}))