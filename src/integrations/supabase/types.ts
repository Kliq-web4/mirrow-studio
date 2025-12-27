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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ad_metrics: {
        Row: {
          ad_id: string | null
          clicks: number | null
          conversions: number | null
          created_at: string
          date: string
          id: string
          impressions: number | null
          org_id: string
          revenue: number | null
          spend: number | null
        }
        Insert: {
          ad_id?: string | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string
          date: string
          id?: string
          impressions?: number | null
          org_id: string
          revenue?: number | null
          spend?: number | null
        }
        Update: {
          ad_id?: string | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string
          date?: string
          id?: string
          impressions?: number | null
          org_id?: string
          revenue?: number | null
          spend?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_metrics_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_metrics_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          ad_id: string | null
          created_at: string
          creative_id: string | null
          id: string
          name: string | null
          org_id: string
          platform: string
          product_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          ad_id?: string | null
          created_at?: string
          creative_id?: string | null
          id?: string
          name?: string | null
          org_id: string
          platform: string
          product_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          ad_id?: string | null
          created_at?: string
          creative_id?: string | null
          id?: string
          name?: string | null
          org_id?: string
          platform?: string
          product_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ads_creative_id_fkey"
            columns: ["creative_id"]
            isOneToOne: false
            referencedRelation: "creatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ads_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ads_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_bookings: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          preferred_date_time: string | null
          project_description: string
          service_name: string
          status: string | null
          timeline: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          preferred_date_time?: string | null
          project_description: string
          service_name: string
          status?: string | null
          timeline?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          preferred_date_time?: string | null
          project_description?: string
          service_name?: string
          status?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          service_type: string | null
          status: string | null
          subject: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          service_type?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          service_type?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          called: boolean | null
          created_at: string
          email: string | null
          emailed: boolean | null
          id: string
          name: string
          phone: string | null
          social_links: Json | null
        }
        Insert: {
          called?: boolean | null
          created_at?: string
          email?: string | null
          emailed?: boolean | null
          id?: string
          name: string
          phone?: string | null
          social_links?: Json | null
        }
        Update: {
          called?: boolean | null
          created_at?: string
          email?: string | null
          emailed?: boolean | null
          id?: string
          name?: string
          phone?: string | null
          social_links?: Json | null
        }
        Relationships: []
      }
      creatives: {
        Row: {
          asset_url: string | null
          created_at: string
          hook: string | null
          id: string
          org_id: string
          product_id: string | null
          script: string | null
          status: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          asset_url?: string | null
          created_at?: string
          hook?: string | null
          id?: string
          org_id: string
          product_id?: string | null
          script?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          asset_url?: string | null
          created_at?: string
          hook?: string | null
          id?: string
          org_id?: string
          product_id?: string | null
          script?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "creatives_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creatives_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: Json | null
          created_at: string
          email: string
          id: string
          name: string | null
          org_id: string
          phone: string | null
          total_orders: number | null
          total_spent: number | null
          updated_at: string
        }
        Insert: {
          address?: Json | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
          org_id: string
          phone?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
        }
        Update: {
          address?: Json | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          org_id?: string
          phone?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          actual_close_date: string | null
          agreed_price: number | null
          asking_price: number | null
          commission_amount: number | null
          commission_rate: number | null
          created_at: string
          deal_type: string | null
          expected_close_date: string | null
          id: string
          lead_id: string | null
          notes: string | null
          property_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          actual_close_date?: string | null
          agreed_price?: number | null
          asking_price?: number | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string
          deal_type?: string | null
          expected_close_date?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          actual_close_date?: string | null
          agreed_price?: number | null
          asking_price?: number | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string
          deal_type?: string | null
          expected_close_date?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      experiments: {
        Row: {
          conversions: number | null
          created_at: string
          headline: string | null
          hero_image_url: string | null
          id: string
          impressions: number | null
          metadata: Json | null
          org_id: string
          page_url: string | null
          product_id: string | null
          status: string | null
          updated_at: string
          variant_label: string | null
        }
        Insert: {
          conversions?: number | null
          created_at?: string
          headline?: string | null
          hero_image_url?: string | null
          id?: string
          impressions?: number | null
          metadata?: Json | null
          org_id: string
          page_url?: string | null
          product_id?: string | null
          status?: string | null
          updated_at?: string
          variant_label?: string | null
        }
        Update: {
          conversions?: number | null
          created_at?: string
          headline?: string | null
          hero_image_url?: string | null
          id?: string
          impressions?: number | null
          metadata?: Json | null
          org_id?: string
          page_url?: string | null
          product_id?: string | null
          status?: string | null
          updated_at?: string
          variant_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiments_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          bedrooms_max: number | null
          bedrooms_min: number | null
          budget_max: number | null
          budget_min: number | null
          created_at: string
          email: string | null
          id: string
          last_contacted_at: string | null
          name: string
          notes: string | null
          phone: string | null
          preferred_areas: Json | null
          property_interest: string | null
          source: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          bedrooms_max?: number | null
          bedrooms_min?: number | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          email?: string | null
          id?: string
          last_contacted_at?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          preferred_areas?: Json | null
          property_interest?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          bedrooms_max?: number | null
          bedrooms_min?: number | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          email?: string | null
          id?: string
          last_contacted_at?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          preferred_areas?: Json | null
          property_interest?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer_id: string | null
          id: string
          order_number: string
          org_id: string
          product_id: string | null
          profit: number | null
          revenue: number | null
          status: string | null
          total: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          id?: string
          order_number: string
          org_id: string
          product_id?: string | null
          profit?: number | null
          revenue?: number | null
          status?: string | null
          total?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          id?: string
          order_number?: string
          org_id?: string
          product_id?: string | null
          profit?: number | null
          revenue?: number | null
          status?: string | null
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orgs: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      partnership_inquiries: {
        Row: {
          budget_range: string | null
          company_name: string
          company_size: string | null
          contact_name: string
          created_at: string
          email: string
          id: string
          industry: string | null
          message: string
          partnership_type: string
          phone: string | null
          status: string | null
          timeline: string | null
          website: string | null
        }
        Insert: {
          budget_range?: string | null
          company_name: string
          company_size?: string | null
          contact_name: string
          created_at?: string
          email: string
          id?: string
          industry?: string | null
          message: string
          partnership_type: string
          phone?: string | null
          status?: string | null
          timeline?: string | null
          website?: string | null
        }
        Update: {
          budget_range?: string | null
          company_name?: string
          company_size?: string | null
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          industry?: string | null
          message?: string
          partnership_type?: string
          phone?: string | null
          status?: string | null
          timeline?: string | null
          website?: string | null
        }
        Relationships: []
      }
      product_sources: {
        Row: {
          created_at: string
          id: string
          org_id: string
          platform: string
          product_id: string
          query: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          org_id: string
          platform: string
          product_id: string
          query?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          org_id?: string
          platform?: string
          product_id?: string
          query?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_sources_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_sources_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          notes: string | null
          org_id: string
          price_cost: number | null
          price_sale: number | null
          shipping_cost_guess: number | null
          shipping_days: number | null
          source_url: string | null
          status: string | null
          supplier_url: string | null
          title: string
          updated_at: string
          viral_score: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          notes?: string | null
          org_id: string
          price_cost?: number | null
          price_sale?: number | null
          shipping_cost_guess?: number | null
          shipping_days?: number | null
          source_url?: string | null
          status?: string | null
          supplier_url?: string | null
          title: string
          updated_at?: string
          viral_score?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          notes?: string | null
          org_id?: string
          price_cost?: number | null
          price_sale?: number | null
          shipping_cost_guess?: number | null
          shipping_days?: number | null
          source_url?: string | null
          status?: string | null
          supplier_url?: string | null
          title?: string
          updated_at?: string
          viral_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          agency_name: string | null
          agent_email: string | null
          agent_name: string | null
          agent_phone: string | null
          amenities: Json | null
          area: string | null
          bathrooms: number | null
          bedrooms: number | null
          building_name: string | null
          completion_status: string | null
          created_at: string
          currency: string | null
          description: string | null
          developer: string | null
          external_id: string | null
          furnished: string | null
          handover_date: string | null
          id: string
          images: Json | null
          location: string | null
          metadata: Json | null
          permit_number: string | null
          price: number | null
          price_period: string | null
          property_type: string | null
          purpose: string | null
          rera_number: string | null
          scraped_at: string | null
          size_sqft: number | null
          source: string
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          agency_name?: string | null
          agent_email?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          amenities?: Json | null
          area?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_name?: string | null
          completion_status?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          developer?: string | null
          external_id?: string | null
          furnished?: string | null
          handover_date?: string | null
          id?: string
          images?: Json | null
          location?: string | null
          metadata?: Json | null
          permit_number?: string | null
          price?: number | null
          price_period?: string | null
          property_type?: string | null
          purpose?: string | null
          rera_number?: string | null
          scraped_at?: string | null
          size_sqft?: number | null
          source: string
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          agency_name?: string | null
          agent_email?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          amenities?: Json | null
          area?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_name?: string | null
          completion_status?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          developer?: string | null
          external_id?: string | null
          furnished?: string | null
          handover_date?: string | null
          id?: string
          images?: Json | null
          location?: string | null
          metadata?: Json | null
          permit_number?: string | null
          price?: number | null
          price_period?: string | null
          property_type?: string | null
          purpose?: string | null
          rera_number?: string | null
          scraped_at?: string | null
          size_sqft?: number | null
          source?: string
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          created_at: string
          filters: Json | null
          id: string
          is_active: boolean | null
          last_run_at: string | null
          name: string
          query: string
          source: string | null
        }
        Insert: {
          created_at?: string
          filters?: Json | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name: string
          query: string
          source?: string | null
        }
        Update: {
          created_at?: string
          filters?: Json | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name?: string
          query?: string
          source?: string | null
        }
        Relationships: []
      }
      scrape_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          query: string | null
          results_count: number | null
          source: string
          started_at: string | null
          status: string | null
          url: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          query?: string | null
          results_count?: number | null
          source: string
          started_at?: string | null
          status?: string | null
          url?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          query?: string | null
          results_count?: number | null
          source?: string
          started_at?: string | null
          status?: string | null
          url?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          ads_metrics_sync_url: string | null
          created_at: string
          id: string
          kliq_video_hook_url: string | null
          org_id: string
          render_creative_url: string | null
          scout_scan_url: string | null
          updated_at: string
          worker_base_url: string | null
        }
        Insert: {
          ads_metrics_sync_url?: string | null
          created_at?: string
          id?: string
          kliq_video_hook_url?: string | null
          org_id: string
          render_creative_url?: string | null
          scout_scan_url?: string | null
          updated_at?: string
          worker_base_url?: string | null
        }
        Update: {
          ads_metrics_sync_url?: string | null
          created_at?: string
          id?: string
          kliq_video_hook_url?: string | null
          org_id?: string
          render_creative_url?: string | null
          scout_scan_url?: string | null
          updated_at?: string
          worker_base_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: true
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          config: Json | null
          created_at: string
          description: string | null
          id: string
          last_run_at: string | null
          name: string
          org_id: string
          status: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          last_run_at?: string | null
          name: string
          org_id: string
          status?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          last_run_at?: string | null
          name?: string
          org_id?: string
          status?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      org_id_for_user: { Args: never; Returns: string }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
