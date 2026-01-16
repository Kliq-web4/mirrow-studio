export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action_details: Json | null
          action_type: string
          content_preview: string | null
          content_type: string | null
          device_info: Json | null
          error_message: string | null
          file_size: number | null
          geolocation: Json | null
          id: string
          ip_address: unknown
          session_id: string | null
          success: boolean
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          content_preview?: string | null
          content_type?: string | null
          device_info?: Json | null
          error_message?: string | null
          file_size?: number | null
          geolocation?: Json | null
          id?: string
          ip_address?: unknown
          session_id?: string | null
          success?: boolean
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          content_preview?: string | null
          content_type?: string | null
          device_info?: Json | null
          error_message?: string | null
          file_size?: number | null
          geolocation?: Json | null
          id?: string
          ip_address?: unknown
          session_id?: string | null
          success?: boolean
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_join_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_summary: {
        Row: {
          created_at: string
          date: string
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number
          profile_id: string
          unique_visitors: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value?: number
          profile_id: string
          unique_visitors?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          profile_id?: string
          unique_visitors?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_summary_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      anonymous_user_ips: {
        Row: {
          action_type: string | null
          captured_at: string
          id: string
          ip_address: unknown
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type?: string | null
          captured_at?: string
          id?: string
          ip_address: unknown
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string | null
          captured_at?: string
          id?: string
          ip_address?: unknown
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "anonymous_user_ips_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_join_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anonymous_user_ips_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          order_index: number
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          order_index?: number
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          order_index?: number
          user_id?: string
        }
        Relationships: []
      }
      clipboard_items: {
        Row: {
          content: string
          created_at: string
          device_name: string | null
          encrypted: boolean
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          session_id: string
          type: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          device_name?: string | null
          encrypted?: boolean
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          session_id: string
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          device_name?: string | null
          encrypted?: boolean
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          session_id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clipboard_items_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_join_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clipboard_items_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      content_blocks: {
        Row: {
          category_id: string | null
          content: Json
          created_at: string
          id: string
          is_visible: boolean
          order_index: number
          settings: Json
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id?: string | null
          content?: Json
          created_at?: string
          id?: string
          is_visible?: boolean
          order_index?: number
          settings?: Json
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: string | null
          content?: Json
          created_at?: string
          id?: string
          is_visible?: boolean
          order_index?: number
          settings?: Json
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_blocks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      content_interactions: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          id: string
          interaction_type: string
          ip_address: unknown
          metadata: Json | null
          profile_id: string
          referrer: string | null
          user_agent: string | null
          visitor_id: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          interaction_type: string
          ip_address?: unknown
          metadata?: Json | null
          profile_id: string
          referrer?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          interaction_type?: string
          ip_address?: unknown
          metadata?: Json | null
          profile_id?: string
          referrer?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_interactions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          description: string | null
          id: string
          request_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          description?: string | null
          id?: string
          request_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          description?: string | null
          id?: string
          request_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      event_rsvps: {
        Row: {
          created_at: string
          email: string
          event_id: string
          id: string
          name: string
          notes: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          event_id: string
          id?: string
          name: string
          notes?: string | null
          status: string
        }
        Update: {
          created_at?: string
          email?: string
          event_id?: string
          id?: string
          name?: string
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          event_url: string | null
          id: string
          is_visible: boolean
          location: string | null
          max_attendees: number | null
          settings: Json | null
          start_date: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_url?: string | null
          id?: string
          is_visible?: boolean
          location?: string | null
          max_attendees?: number | null
          settings?: Json | null
          start_date: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_url?: string | null
          id?: string
          is_visible?: boolean
          location?: string | null
          max_attendees?: number | null
          settings?: Json | null
          start_date?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          data: Json
          form_id: string
          id: string
          ip_address: unknown
          submitted_at: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          data: Json
          form_id: string
          id?: string
          ip_address?: unknown
          submitted_at?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          data?: Json
          form_id?: string
          id?: string
          ip_address?: unknown
          submitted_at?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          created_at: string
          description: string | null
          fields: Json
          id: string
          is_active: boolean
          settings: Json
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean
          settings?: Json
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean
          settings?: Json
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      link_clicks: {
        Row: {
          clicked_at: string | null
          id: string
          ip_address: unknown
          link_id: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          clicked_at?: string | null
          id?: string
          ip_address?: unknown
          link_id: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          clicked_at?: string | null
          id?: string
          ip_address?: unknown
          link_id?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "link_clicks_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_clicks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      links: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          gradient: string | null
          icon: string | null
          id: string
          is_visible: boolean | null
          order_index: number
          title: string
          updated_at: string | null
          url: string
          user_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          gradient?: string | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          order_index?: number
          title: string
          updated_at?: string | null
          url: string
          user_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          gradient?: string | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          order_index?: number
          title?: string
          updated_at?: string | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "links_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "links_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      loop_profiles: {
        Row: {
          availability: Json | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string
          id: string
          location: string | null
          skills: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          availability?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name: string
          id?: string
          location?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          availability?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          location?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      loop_services: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean
          provider_id: string
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean
          provider_id: string
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean
          provider_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loop_services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loop_services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "loop_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          metadata: Json | null
          tags: string[] | null
          thumbnail_url: string | null
          updated_at: string
          usage_count: number | null
          user_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          metadata?: Json | null
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string
          usage_count?: number | null
          user_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          metadata?: Json | null
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string
          usage_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profile_views: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          id: string
          ip_address: unknown
          profile_id: string
          referrer: string | null
          user_agent: string | null
          visited_at: string
          visitor_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown
          profile_id: string
          referrer?: string | null
          user_agent?: string | null
          visited_at?: string
          visitor_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown
          profile_id?: string
          referrer?: string | null
          user_agent?: string | null
          visited_at?: string
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_views_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          business_category:
            | Database["public"]["Enums"]["business_category"]
            | null
          business_keywords: string[] | null
          business_name: string | null
          created_at: string | null
          id: string
          is_public: boolean | null
          logo_url: string | null
          name: string
          onboarding_completed: boolean | null
          selected_template: string | null
          stripe_customer_id: string | null
          subscription_end_date: string | null
          subscription_id: string | null
          subscription_status: string
          subscription_tier: string
          theme_color: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          business_category?:
            | Database["public"]["Enums"]["business_category"]
            | null
          business_keywords?: string[] | null
          business_name?: string | null
          created_at?: string | null
          id: string
          is_public?: boolean | null
          logo_url?: string | null
          name: string
          onboarding_completed?: boolean | null
          selected_template?: string | null
          stripe_customer_id?: string | null
          subscription_end_date?: string | null
          subscription_id?: string | null
          subscription_status?: string
          subscription_tier?: string
          theme_color?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          business_category?:
            | Database["public"]["Enums"]["business_category"]
            | null
          business_keywords?: string[] | null
          business_name?: string | null
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          logo_url?: string | null
          name?: string
          onboarding_completed?: boolean | null
          selected_template?: string | null
          stripe_customer_id?: string | null
          subscription_end_date?: string | null
          subscription_id?: string | null
          subscription_status?: string
          subscription_tier?: string
          theme_color?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          completed_at: string | null
          created_at: string
          credits_amount: number
          id: string
          message: string | null
          proposed_date: string | null
          provider_id: string
          requested_at: string
          requester_id: string
          responded_at: string | null
          service_id: string
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          credits_amount: number
          id?: string
          message?: string | null
          proposed_date?: string | null
          provider_id: string
          requested_at?: string
          requester_id: string
          responded_at?: string | null
          service_id: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          credits_amount?: number
          id?: string
          message?: string | null
          proposed_date?: string | null
          provider_id?: string
          requested_at?: string
          requester_id?: string
          responded_at?: string | null
          service_id?: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "loop_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "loop_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "loop_services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          request_id: string
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          request_id: string
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          request_id?: string
          reviewee_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_reviews_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "loop_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "loop_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      session_devices: {
        Row: {
          created_at: string
          device_id: string
          device_name: string
          device_type: string
          id: string
          last_seen: string
          session_id: string
          status: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          device_id: string
          device_name: string
          device_type: string
          id?: string
          last_seen?: string
          session_id: string
          status?: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          device_id?: string
          device_name?: string
          device_type?: string
          id?: string
          last_seen?: string
          session_id?: string
          status?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_devices_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_join_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_devices_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          allowed_file_types: string[]
          created_at: string
          created_by: string | null
          expires_at: string
          id: string
          is_locked: boolean
          is_private: boolean
          max_file_size: number
          owner_id: string | null
          password_hash: string | null
          session_code: string
          session_name: string | null
          user_id: string | null
        }
        Insert: {
          allowed_file_types?: string[]
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          is_locked?: boolean
          is_private?: boolean
          max_file_size?: number
          owner_id?: string | null
          password_hash?: string | null
          session_code: string
          session_name?: string | null
          user_id?: string | null
        }
        Update: {
          allowed_file_types?: string[]
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          is_locked?: boolean
          is_private?: boolean
          max_file_size?: number
          owner_id?: string | null
          password_hash?: string | null
          session_code?: string
          session_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string | null
          id: string
          is_visible: boolean | null
          platform: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_visible?: boolean | null
          platform: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_visible?: boolean | null
          platform?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_links_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          layout_config: Json | null
          name: string
          preview_image_url: string | null
          theme_colors: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id: string
          is_premium?: boolean | null
          layout_config?: Json | null
          name: string
          preview_image_url?: string | null
          theme_colors?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          layout_config?: Json | null
          name?: string
          preview_image_url?: string | null
          theme_colors?: Json | null
        }
        Relationships: []
      }
      time_credits: {
        Row: {
          balance: number
          created_at: string
          id: string
          total_earned: number
          total_spent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_spent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_spent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          bandwidth_used: number
          created_at: string
          file_size_used: number
          files_uploaded: number
          id: string
          session_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bandwidth_used?: number
          created_at?: string
          file_size_used?: number
          files_uploaded?: number
          id?: string
          session_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bandwidth_used?: number
          created_at?: string
          file_size_used?: number
          files_uploaded?: number
          id?: string
          session_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_tracking_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_join_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_tracking_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      session_join_info: {
        Row: {
          allowed_file_types: string[] | null
          created_at: string | null
          expires_at: string | null
          has_password: boolean | null
          id: string | null
          is_locked: boolean | null
          is_private: boolean | null
          max_file_size: number | null
          session_code: string | null
          session_name: string | null
        }
        Insert: {
          allowed_file_types?: string[] | null
          created_at?: string | null
          expires_at?: string | null
          has_password?: never
          id?: string | null
          is_locked?: boolean | null
          is_private?: boolean | null
          max_file_size?: number | null
          session_code?: string | null
          session_name?: string | null
        }
        Update: {
          allowed_file_types?: string[] | null
          created_at?: string | null
          expires_at?: string | null
          has_password?: never
          id?: string | null
          is_locked?: boolean | null
          is_private?: boolean | null
          max_file_size?: number | null
          session_code?: string | null
          session_name?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_session_ownership: {
        Args: { session_uuid: string; user_uuid: string }
        Returns: boolean
      }
      check_username_availability: {
        Args: { username_to_check: string }
        Returns: boolean
      }
      cleanup_stale_devices: { Args: never; Returns: undefined }
      get_analytics_overview: {
        Args: { user_id: string }
        Returns: {
          daily_views: Json
          top_referrers: Json
          total_content_views: number
          total_link_clicks: number
          total_profile_views: number
          unique_visitors: number
        }[]
      }
      get_my_loop_profile_id: { Args: never; Returns: string }
      get_public_session_info: {
        Args: { session_code_param: string }
        Returns: {
          is_expired: boolean
          requires_password: boolean
          session_exists: boolean
          session_name: string
        }[]
      }
      get_storage_usage: {
        Args: { user_uuid?: string }
        Returns: {
          bucket_name: string
          total_files: number
          total_size: number
        }[]
      }
      get_user_by_username: {
        Args: { username_param: string }
        Returns: {
          avatar_url: string
          bio: string
          id: string
          is_public: boolean
          name: string
          theme_color: string
          username: string
        }[]
      }
      get_user_limits:
        | { Args: never; Returns: undefined }
        | {
            Args: { user_uuid: string }
            Returns: {
              allowed_file_types: string[]
              max_file_size: number
              max_session_duration: unknown
              max_sessions: number
              priority_sync: boolean
            }[]
          }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_request_involved: { Args: { _request_id: string }; Returns: boolean }
      is_service_owner: { Args: { _service_id: string }; Returns: boolean }
      log_user_activity: {
        Args: {
          p_action_details?: Json
          p_action_type: string
          p_content_preview?: string
          p_content_type?: string
          p_error_message?: string
          p_file_size?: number
          p_session_id?: string
          p_success?: boolean
        }
        Returns: string
      }
      mark_inactive_devices_offline: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "member"
      business_category:
        | "business"
        | "creator"
        | "artist"
        | "musician"
        | "photographer"
        | "blogger"
        | "entrepreneur"
        | "freelancer"
        | "nonprofit"
        | "restaurant"
        | "fitness"
        | "education"
        | "technology"
        | "fashion"
        | "travel"
        | "food"
        | "health"
        | "finance"
        | "real_estate"
        | "automotive"
        | "other"
      request_status:
        | "pending"
        | "accepted"
        | "declined"
        | "completed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "member"],
      business_category: [
        "business",
        "creator",
        "artist",
        "musician",
        "photographer",
        "blogger",
        "entrepreneur",
        "freelancer",
        "nonprofit",
        "restaurant",
        "fitness",
        "education",
        "technology",
        "fashion",
        "travel",
        "food",
        "health",
        "finance",
        "real_estate",
        "automotive",
        "other",
      ],
      request_status: [
        "pending",
        "accepted",
        "declined",
        "completed",
        "cancelled",
      ],
    },
  },
} as const
