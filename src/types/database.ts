export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      doulas: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          bio: string | null
          specialties: string[] | null
          languages: string[] | null
          experience_years: number | null
          certifications: string[] | null
          location_address: string | null
          location_city: string | null
          location_country: string | null
          location_coordinates: { lat: number; lng: number } | null
          profile_image_url: string | null
          gallery_images: string[] | null
          hourly_rate: number | null
          currency: string | null
          availability_schedule: Json | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          bio?: string | null
          specialties?: string[] | null
          languages?: string[] | null
          experience_years?: number | null
          certifications?: string[] | null
          location_address?: string | null
          location_city?: string | null
          location_country?: string | null
          location_coordinates?: { lat: number; lng: number } | null
          profile_image_url?: string | null
          gallery_images?: string[] | null
          hourly_rate?: number | null
          currency?: string | null
          availability_schedule?: Json | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          bio?: string | null
          specialties?: string[] | null
          languages?: string[] | null
          experience_years?: number | null
          certifications?: string[] | null
          location_address?: string | null
          location_city?: string | null
          location_country?: string | null
          location_coordinates?: { lat: number; lng: number } | null
          profile_image_url?: string | null
          gallery_images?: string[] | null
          hourly_rate?: number | null
          currency?: string | null
          availability_schedule?: Json | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          email: string
          password_hash: string
          name: string
          role: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          name: string
          role?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          name?: string
          role?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}