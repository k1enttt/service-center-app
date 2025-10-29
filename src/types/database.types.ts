export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string
          id: string
          ip_address: unknown
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          reason: string | null
          resource_id: string
          resource_type: string
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          user_role: string
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          reason?: string | null
          resource_id: string
          resource_type: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role: string
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          reason?: string | null
          resource_id?: string
          resource_type?: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brands_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "brands_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          is_active: boolean
          name: string
          notes: string | null
          phone: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          name: string
          notes?: string | null
          phone: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          name?: string
          notes?: string | null
          phone?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      email_notifications: {
        Row: {
          body_html: string | null
          body_text: string | null
          bounce_reason: string | null
          bounced_at: string | null
          clicked_at: string | null
          created_at: string
          delivered_at: string | null
          error_message: string | null
          id: string
          last_retry_at: string | null
          notification_type: string
          opened_at: string | null
          recipient_email: string
          recipient_name: string | null
          related_entity_id: string | null
          related_entity_type: string | null
          retry_count: number
          sent_at: string | null
          status: string
          subject: string
          template_name: string | null
          updated_at: string
        }
        Insert: {
          body_html?: string | null
          body_text?: string | null
          bounce_reason?: string | null
          bounced_at?: string | null
          clicked_at?: string | null
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          last_retry_at?: string | null
          notification_type: string
          opened_at?: string | null
          recipient_email: string
          recipient_name?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          retry_count?: number
          sent_at?: string | null
          status?: string
          subject: string
          template_name?: string | null
          updated_at?: string
        }
        Update: {
          body_html?: string | null
          body_text?: string | null
          bounce_reason?: string | null
          bounced_at?: string | null
          clicked_at?: string | null
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          last_retry_at?: string | null
          notification_type?: string
          opened_at?: string | null
          recipient_email?: string
          recipient_name?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          retry_count?: number
          sent_at?: string | null
          status?: string
          subject?: string
          template_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      parts: {
        Row: {
          category: string | null
          cost_price: number | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          min_stock_level: number | null
          name: string
          part_number: string | null
          price: number
          sku: string | null
          stock_quantity: number
          supplier: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          cost_price?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          min_stock_level?: number | null
          name: string
          part_number?: string | null
          price: number
          sku?: string | null
          stock_quantity?: number
          supplier?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          cost_price?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          min_stock_level?: number | null
          name?: string
          part_number?: string | null
          price?: number
          sku?: string | null
          stock_quantity?: number
          supplier?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "parts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      physical_products: {
        Row: {
          condition: Database["public"]["Enums"]["product_condition"]
          created_at: string
          current_ticket_id: string | null
          end_user_warranty_end: string | null
          end_user_warranty_months: number | null
          end_user_warranty_start: string | null
          id: string
          manufacturer_warranty_end_date: string | null
          notes: string | null
          physical_warehouse_id: string | null
          previous_virtual_warehouse_id: string | null
          product_id: string
          purchase_date: string | null
          purchase_price: number | null
          rma_batch_id: string | null
          rma_date: string | null
          rma_reason: string | null
          serial_number: string
          supplier_id: string | null
          updated_at: string
          user_warranty_end_date: string | null
          virtual_warehouse_id: string
        }
        Insert: {
          condition?: Database["public"]["Enums"]["product_condition"]
          created_at?: string
          current_ticket_id?: string | null
          end_user_warranty_end?: string | null
          end_user_warranty_months?: number | null
          end_user_warranty_start?: string | null
          id?: string
          manufacturer_warranty_end_date?: string | null
          notes?: string | null
          physical_warehouse_id?: string | null
          previous_virtual_warehouse_id?: string | null
          product_id: string
          purchase_date?: string | null
          purchase_price?: number | null
          rma_batch_id?: string | null
          rma_date?: string | null
          rma_reason?: string | null
          serial_number: string
          supplier_id?: string | null
          updated_at?: string
          user_warranty_end_date?: string | null
          virtual_warehouse_id: string
        }
        Update: {
          condition?: Database["public"]["Enums"]["product_condition"]
          created_at?: string
          current_ticket_id?: string | null
          end_user_warranty_end?: string | null
          end_user_warranty_months?: number | null
          end_user_warranty_start?: string | null
          id?: string
          manufacturer_warranty_end_date?: string | null
          notes?: string | null
          physical_warehouse_id?: string | null
          previous_virtual_warehouse_id?: string | null
          product_id?: string
          purchase_date?: string | null
          purchase_price?: number | null
          rma_batch_id?: string | null
          rma_date?: string | null
          rma_reason?: string | null
          serial_number?: string
          supplier_id?: string | null
          updated_at?: string
          user_warranty_end_date?: string | null
          virtual_warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "physical_products_current_ticket_id_fkey"
            columns: ["current_ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "physical_products_current_ticket_id_fkey"
            columns: ["current_ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "physical_products_physical_warehouse_id_fkey"
            columns: ["physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "physical_warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "physical_products_physical_warehouse_id_fkey"
            columns: ["physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["physical_warehouse_id"]
          },
          {
            foreignKeyName: "physical_products_previous_virtual_warehouse_id_fkey"
            columns: ["previous_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "physical_products_previous_virtual_warehouse_id_fkey"
            columns: ["previous_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "physical_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "physical_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "physical_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "physical_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "physical_products_rma_batch_id_fkey"
            columns: ["rma_batch_id"]
            isOneToOne: false
            referencedRelation: "rma_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "physical_products_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "physical_products_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      physical_warehouses: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          location: string | null
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_parts: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_required: boolean
          notes: string | null
          part_id: string
          product_id: string
          quantity_per_unit: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_required?: boolean
          notes?: string | null
          part_id: string
          product_id: string
          quantity_per_unit?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_required?: boolean
          notes?: string | null
          part_id?: string
          product_id?: string
          quantity_per_unit?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_parts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "product_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_parts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_parts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_parts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_parts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_parts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      product_stock_thresholds: {
        Row: {
          alert_enabled: boolean
          created_at: string
          id: string
          last_alert_sent_at: string | null
          maximum_quantity: number | null
          minimum_quantity: number
          product_id: string
          reorder_quantity: number | null
          updated_at: string
          warehouse_type: Database["public"]["Enums"]["warehouse_type"]
        }
        Insert: {
          alert_enabled?: boolean
          created_at?: string
          id?: string
          last_alert_sent_at?: string | null
          maximum_quantity?: number | null
          minimum_quantity: number
          product_id: string
          reorder_quantity?: number | null
          updated_at?: string
          warehouse_type: Database["public"]["Enums"]["warehouse_type"]
        }
        Update: {
          alert_enabled?: boolean
          created_at?: string
          id?: string
          last_alert_sent_at?: string | null
          maximum_quantity?: number | null
          minimum_quantity?: number
          product_id?: string
          reorder_quantity?: number | null
          updated_at?: string
          warehouse_type?: Database["public"]["Enums"]["warehouse_type"]
        }
        Relationships: [
          {
            foreignKeyName: "product_stock_thresholds_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_stock_thresholds_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_stock_thresholds_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_stock_thresholds_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_warehouse_stock: {
        Row: {
          created_at: string
          declared_quantity: number
          id: string
          initial_stock_entry: number
          product_id: string
          updated_at: string
          virtual_warehouse_id: string
        }
        Insert: {
          created_at?: string
          declared_quantity?: number
          id?: string
          initial_stock_entry?: number
          product_id: string
          updated_at?: string
          virtual_warehouse_id: string
        }
        Update: {
          created_at?: string
          declared_quantity?: number
          id?: string
          initial_stock_entry?: number
          product_id?: string
          updated_at?: string
          virtual_warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_warehouse_stock_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_warehouse_stock_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_warehouse_stock_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_warehouse_stock_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_warehouse_stock_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "product_warehouse_stock_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: string | null
          created_at: string
          created_by: string | null
          default_warranty_months: number | null
          end_user_warranty_months: number | null
          id: string
          is_active: boolean
          model: string | null
          name: string
          primary_image: string | null
          short_description: string | null
          sku: string | null
          type: string
          updated_at: string
          updated_by: string | null
          warranty_period_months: number | null
        }
        Insert: {
          brand_id?: string | null
          created_at?: string
          created_by?: string | null
          default_warranty_months?: number | null
          end_user_warranty_months?: number | null
          id?: string
          is_active?: boolean
          model?: string | null
          name: string
          primary_image?: string | null
          short_description?: string | null
          sku?: string | null
          type: string
          updated_at?: string
          updated_by?: string | null
          warranty_period_months?: number | null
        }
        Update: {
          brand_id?: string | null
          created_at?: string
          created_by?: string | null
          default_warranty_months?: number | null
          end_user_warranty_months?: number | null
          id?: string
          is_active?: boolean
          model?: string | null
          name?: string
          primary_image?: string | null
          short_description?: string | null
          sku?: string | null
          type?: string
          updated_at?: string
          updated_by?: string | null
          warranty_period_months?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "products_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          created_by: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          email: string
          full_name: string
          id?: string
          is_active?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profiles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      rma_batches: {
        Row: {
          batch_number: string
          created_at: string
          created_by_id: string
          id: string
          notes: string | null
          shipping_date: string | null
          status: string
          supplier_id: string | null
          supplier_name: string | null
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          batch_number: string
          created_at?: string
          created_by_id: string
          id?: string
          notes?: string | null
          shipping_date?: string | null
          status?: string
          supplier_id?: string | null
          supplier_name?: string | null
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          batch_number?: string
          created_at?: string
          created_by_id?: string
          id?: string
          notes?: string | null
          shipping_date?: string | null
          status?: string
          supplier_id?: string | null
          supplier_name?: string | null
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rma_batches_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          converted_at: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          delivery_address: string | null
          delivery_method: Database["public"]["Enums"]["delivery_method"]
          id: string
          issue_description: string
          issue_photos: Json | null
          product_brand: string
          product_model: string
          purchase_date: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by_id: string | null
          serial_number: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["request_status"]
          submitted_ip: string | null
          ticket_id: string | null
          tracking_token: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          converted_at?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          delivery_address?: string | null
          delivery_method?: Database["public"]["Enums"]["delivery_method"]
          id?: string
          issue_description: string
          issue_photos?: Json | null
          product_brand: string
          product_model: string
          purchase_date?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by_id?: string | null
          serial_number?: string | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["request_status"]
          submitted_ip?: string | null
          ticket_id?: string | null
          tracking_token: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          converted_at?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          delivery_address?: string | null
          delivery_method?: Database["public"]["Enums"]["delivery_method"]
          id?: string
          issue_description?: string
          issue_photos?: Json | null
          product_brand?: string
          product_model?: string
          purchase_date?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by_id?: string | null
          serial_number?: string | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["request_status"]
          submitted_ip?: string | null
          ticket_id?: string | null
          tracking_token?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_reviewed_by_id_fkey"
            columns: ["reviewed_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      service_ticket_attachments: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          ticket_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          ticket_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_ticket_attachments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "service_ticket_attachments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ticket_attachments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      service_ticket_comments: {
        Row: {
          comment: string
          comment_type: Database["public"]["Enums"]["comment_type"]
          created_at: string
          created_by: string
          id: string
          is_internal: boolean
          ticket_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          comment: string
          comment_type?: Database["public"]["Enums"]["comment_type"]
          created_at?: string
          created_by: string
          id?: string
          is_internal?: boolean
          ticket_id: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          comment?: string
          comment_type?: Database["public"]["Enums"]["comment_type"]
          created_at?: string
          created_by?: string
          id?: string
          is_internal?: boolean
          ticket_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_ticket_comments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "service_ticket_comments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ticket_comments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "service_ticket_comments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      service_ticket_parts: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          part_id: string
          quantity: number
          ticket_id: string
          total_price: number | null
          unit_price: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          part_id: string
          quantity: number
          ticket_id: string
          total_price?: number | null
          unit_price: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          part_id?: string
          quantity?: number
          ticket_id?: string
          total_price?: number | null
          unit_price?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_ticket_parts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "service_ticket_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ticket_parts_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ticket_parts_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "service_ticket_parts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      service_ticket_tasks: {
        Row: {
          assigned_to_id: string | null
          blocked_reason: string | null
          completed_at: string | null
          completion_notes: string | null
          created_at: string
          description: string | null
          id: string
          is_required: boolean
          name: string
          sequence_order: number
          started_at: string | null
          status: Database["public"]["Enums"]["task_status"]
          task_type_id: string
          template_task_id: string | null
          ticket_id: string
          updated_at: string
        }
        Insert: {
          assigned_to_id?: string | null
          blocked_reason?: string | null
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_required?: boolean
          name: string
          sequence_order: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          task_type_id: string
          template_task_id?: string | null
          ticket_id: string
          updated_at?: string
        }
        Update: {
          assigned_to_id?: string | null
          blocked_reason?: string | null
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_required?: boolean
          name?: string
          sequence_order?: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          task_type_id?: string
          template_task_id?: string | null
          ticket_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_ticket_tasks_assigned_to_id_fkey"
            columns: ["assigned_to_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ticket_tasks_task_type_id_fkey"
            columns: ["task_type_id"]
            isOneToOne: false
            referencedRelation: "task_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ticket_tasks_template_task_id_fkey"
            columns: ["template_task_id"]
            isOneToOne: false
            referencedRelation: "task_templates_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ticket_tasks_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ticket_tasks_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      service_tickets: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          customer_id: string
          delivery_address: string | null
          delivery_method: Database["public"]["Enums"]["delivery_method"] | null
          diagnosis_fee: number
          discount_amount: number
          id: string
          issue_description: string
          notes: string | null
          parts_total: number
          priority_level: Database["public"]["Enums"]["priority_level"]
          product_id: string
          request_id: string | null
          service_fee: number
          started_at: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          template_id: string | null
          ticket_number: string
          total_cost: number | null
          updated_at: string
          updated_by: string | null
          warranty_type: Database["public"]["Enums"]["warranty_type"] | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          customer_id: string
          delivery_address?: string | null
          delivery_method?:
            | Database["public"]["Enums"]["delivery_method"]
            | null
          diagnosis_fee?: number
          discount_amount?: number
          id?: string
          issue_description: string
          notes?: string | null
          parts_total?: number
          priority_level?: Database["public"]["Enums"]["priority_level"]
          product_id: string
          request_id?: string | null
          service_fee?: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          template_id?: string | null
          ticket_number: string
          total_cost?: number | null
          updated_at?: string
          updated_by?: string | null
          warranty_type?: Database["public"]["Enums"]["warranty_type"] | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string
          delivery_address?: string | null
          delivery_method?:
            | Database["public"]["Enums"]["delivery_method"]
            | null
          diagnosis_fee?: number
          discount_amount?: number
          id?: string
          issue_description?: string
          notes?: string | null
          parts_total?: number
          priority_level?: Database["public"]["Enums"]["priority_level"]
          product_id?: string
          request_id?: string | null
          service_fee?: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          template_id?: string | null
          ticket_number?: string
          total_cost?: number | null
          updated_at?: string
          updated_by?: string | null
          warranty_type?: Database["public"]["Enums"]["warranty_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "service_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "service_tickets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "service_tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "service_tickets_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "service_tickets_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "service_tickets_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "v_service_request_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "task_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "service_tickets_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      stock_document_attachments: {
        Row: {
          created_at: string
          document_id: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          uploaded_by_id: string
        }
        Insert: {
          created_at?: string
          document_id: string
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_document_attachments_uploaded_by_id_fkey"
            columns: ["uploaded_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_issue_items: {
        Row: {
          created_at: string
          id: string
          issue_id: string
          notes: string | null
          product_id: string
          quantity: number
          total_price: number | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          issue_id: string
          notes?: string | null
          product_id: string
          quantity: number
          total_price?: number | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          issue_id?: string
          notes?: string | null
          product_id?: string
          quantity?: number
          total_price?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_issue_items_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "stock_issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_issue_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_issue_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stock_issue_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stock_issue_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
        ]
      }
      stock_issue_serials: {
        Row: {
          created_at: string
          id: string
          issue_item_id: string
          physical_product_id: string
          serial_number: string
        }
        Insert: {
          created_at?: string
          id?: string
          issue_item_id: string
          physical_product_id: string
          serial_number: string
        }
        Update: {
          created_at?: string
          id?: string
          issue_item_id?: string
          physical_product_id?: string
          serial_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_issue_serials_issue_item_id_fkey"
            columns: ["issue_item_id"]
            isOneToOne: false
            referencedRelation: "stock_issue_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_issue_serials_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "physical_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_issue_serials_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_movement_history"
            referencedColumns: ["physical_product_id"]
          },
          {
            foreignKeyName: "stock_issue_serials_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "v_warranty_expiring_soon"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_issues: {
        Row: {
          approved_at: string | null
          approved_by_id: string | null
          auto_approve_threshold: number | null
          auto_generated: boolean
          completed_at: string | null
          completed_by_id: string | null
          created_at: string
          created_by_id: string
          id: string
          issue_date: string
          issue_number: string
          issue_type: Database["public"]["Enums"]["stock_issue_type"]
          notes: string | null
          reference_document_number: string | null
          rejection_reason: string | null
          rma_batch_id: string | null
          status: Database["public"]["Enums"]["stock_document_status"]
          ticket_id: string | null
          updated_at: string
          virtual_warehouse_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by_id?: string | null
          auto_approve_threshold?: number | null
          auto_generated?: boolean
          completed_at?: string | null
          completed_by_id?: string | null
          created_at?: string
          created_by_id: string
          id?: string
          issue_date?: string
          issue_number: string
          issue_type?: Database["public"]["Enums"]["stock_issue_type"]
          notes?: string | null
          reference_document_number?: string | null
          rejection_reason?: string | null
          rma_batch_id?: string | null
          status?: Database["public"]["Enums"]["stock_document_status"]
          ticket_id?: string | null
          updated_at?: string
          virtual_warehouse_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by_id?: string | null
          auto_approve_threshold?: number | null
          auto_generated?: boolean
          completed_at?: string | null
          completed_by_id?: string | null
          created_at?: string
          created_by_id?: string
          id?: string
          issue_date?: string
          issue_number?: string
          issue_type?: Database["public"]["Enums"]["stock_issue_type"]
          notes?: string | null
          reference_document_number?: string | null
          rejection_reason?: string | null
          rma_batch_id?: string | null
          status?: Database["public"]["Enums"]["stock_document_status"]
          ticket_id?: string | null
          updated_at?: string
          virtual_warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_issues_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_issues_completed_by_id_fkey"
            columns: ["completed_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_issues_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_issues_rma_batch_id_fkey"
            columns: ["rma_batch_id"]
            isOneToOne: false
            referencedRelation: "rma_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_issues_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_issues_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "stock_issues_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "stock_issues_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_movements: {
        Row: {
          created_at: string
          from_physical_warehouse_id: string | null
          from_virtual_warehouse_id: string | null
          id: string
          moved_by_id: string
          movement_type: Database["public"]["Enums"]["movement_type"]
          notes: string | null
          physical_product_id: string
          reason: string | null
          ticket_id: string | null
          to_physical_warehouse_id: string | null
          to_virtual_warehouse_id: string | null
        }
        Insert: {
          created_at?: string
          from_physical_warehouse_id?: string | null
          from_virtual_warehouse_id?: string | null
          id?: string
          moved_by_id: string
          movement_type: Database["public"]["Enums"]["movement_type"]
          notes?: string | null
          physical_product_id: string
          reason?: string | null
          ticket_id?: string | null
          to_physical_warehouse_id?: string | null
          to_virtual_warehouse_id?: string | null
        }
        Update: {
          created_at?: string
          from_physical_warehouse_id?: string | null
          from_virtual_warehouse_id?: string | null
          id?: string
          moved_by_id?: string
          movement_type?: Database["public"]["Enums"]["movement_type"]
          notes?: string | null
          physical_product_id?: string
          reason?: string | null
          ticket_id?: string | null
          to_physical_warehouse_id?: string | null
          to_virtual_warehouse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_from_physical_warehouse_id_fkey"
            columns: ["from_physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "physical_warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_from_physical_warehouse_id_fkey"
            columns: ["from_physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["physical_warehouse_id"]
          },
          {
            foreignKeyName: "stock_movements_from_virtual_warehouse_id_fkey"
            columns: ["from_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "stock_movements_from_virtual_warehouse_id_fkey"
            columns: ["from_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_moved_by_id_fkey"
            columns: ["moved_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "physical_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_movement_history"
            referencedColumns: ["physical_product_id"]
          },
          {
            foreignKeyName: "stock_movements_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "v_warranty_expiring_soon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "stock_movements_to_physical_warehouse_id_fkey"
            columns: ["to_physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "physical_warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_to_physical_warehouse_id_fkey"
            columns: ["to_physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["physical_warehouse_id"]
          },
          {
            foreignKeyName: "stock_movements_to_virtual_warehouse_id_fkey"
            columns: ["to_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "stock_movements_to_virtual_warehouse_id_fkey"
            columns: ["to_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_receipt_items: {
        Row: {
          created_at: string
          declared_quantity: number
          id: string
          notes: string | null
          product_id: string
          receipt_id: string
          serial_count: number
          total_price: number | null
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          declared_quantity: number
          id?: string
          notes?: string | null
          product_id: string
          receipt_id: string
          serial_count?: number
          total_price?: number | null
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          declared_quantity?: number
          id?: string
          notes?: string | null
          product_id?: string
          receipt_id?: string
          serial_count?: number
          total_price?: number | null
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_receipt_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_receipt_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stock_receipt_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stock_receipt_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stock_receipt_items_receipt_id_fkey"
            columns: ["receipt_id"]
            isOneToOne: false
            referencedRelation: "stock_receipts"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_receipt_serials: {
        Row: {
          created_at: string
          id: string
          manufacturer_warranty_end_date: string | null
          physical_product_id: string | null
          receipt_item_id: string
          serial_number: string
          user_warranty_end_date: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          manufacturer_warranty_end_date?: string | null
          physical_product_id?: string | null
          receipt_item_id: string
          serial_number: string
          user_warranty_end_date?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          manufacturer_warranty_end_date?: string | null
          physical_product_id?: string | null
          receipt_item_id?: string
          serial_number?: string
          user_warranty_end_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_receipt_serials_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "physical_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_receipt_serials_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_movement_history"
            referencedColumns: ["physical_product_id"]
          },
          {
            foreignKeyName: "stock_receipt_serials_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "v_warranty_expiring_soon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_receipt_serials_receipt_item_id_fkey"
            columns: ["receipt_item_id"]
            isOneToOne: false
            referencedRelation: "stock_receipt_items"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_receipts: {
        Row: {
          approved_at: string | null
          approved_by_id: string | null
          completed_at: string | null
          completed_by_id: string | null
          created_at: string
          created_by_id: string
          expected_date: string | null
          id: string
          notes: string | null
          receipt_date: string
          receipt_number: string
          receipt_type: Database["public"]["Enums"]["stock_receipt_type"]
          reference_document_number: string | null
          rejection_reason: string | null
          rma_batch_id: string | null
          status: Database["public"]["Enums"]["stock_document_status"]
          supplier_id: string | null
          updated_at: string
          virtual_warehouse_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by_id?: string | null
          completed_at?: string | null
          completed_by_id?: string | null
          created_at?: string
          created_by_id: string
          expected_date?: string | null
          id?: string
          notes?: string | null
          receipt_date?: string
          receipt_number: string
          receipt_type?: Database["public"]["Enums"]["stock_receipt_type"]
          reference_document_number?: string | null
          rejection_reason?: string | null
          rma_batch_id?: string | null
          status?: Database["public"]["Enums"]["stock_document_status"]
          supplier_id?: string | null
          updated_at?: string
          virtual_warehouse_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by_id?: string | null
          completed_at?: string | null
          completed_by_id?: string | null
          created_at?: string
          created_by_id?: string
          expected_date?: string | null
          id?: string
          notes?: string | null
          receipt_date?: string
          receipt_number?: string
          receipt_type?: Database["public"]["Enums"]["stock_receipt_type"]
          reference_document_number?: string | null
          rejection_reason?: string | null
          rma_batch_id?: string | null
          status?: Database["public"]["Enums"]["stock_document_status"]
          supplier_id?: string | null
          updated_at?: string
          virtual_warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_receipts_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_receipts_completed_by_id_fkey"
            columns: ["completed_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_receipts_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_receipts_rma_batch_id_fkey"
            columns: ["rma_batch_id"]
            isOneToOne: false
            referencedRelation: "rma_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_receipts_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "stock_receipts_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_transfer_items: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          product_id: string
          quantity: number
          transfer_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          product_id: string
          quantity: number
          transfer_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          product_id?: string
          quantity?: number
          transfer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_transfer_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfer_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stock_transfer_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stock_transfer_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "stock_transfer_items_transfer_id_fkey"
            columns: ["transfer_id"]
            isOneToOne: false
            referencedRelation: "stock_transfers"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_transfer_serials: {
        Row: {
          created_at: string
          id: string
          physical_product_id: string
          serial_number: string
          transfer_item_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          physical_product_id: string
          serial_number: string
          transfer_item_id: string
        }
        Update: {
          created_at?: string
          id?: string
          physical_product_id?: string
          serial_number?: string
          transfer_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_transfer_serials_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "physical_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfer_serials_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_movement_history"
            referencedColumns: ["physical_product_id"]
          },
          {
            foreignKeyName: "stock_transfer_serials_physical_product_id_fkey"
            columns: ["physical_product_id"]
            isOneToOne: false
            referencedRelation: "v_warranty_expiring_soon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfer_serials_transfer_item_id_fkey"
            columns: ["transfer_item_id"]
            isOneToOne: false
            referencedRelation: "stock_transfer_items"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_transfers: {
        Row: {
          approved_at: string | null
          approved_by_id: string | null
          completed_at: string | null
          created_at: string
          created_by_id: string
          expected_delivery_date: string | null
          from_virtual_warehouse_id: string
          generated_issue_id: string | null
          generated_receipt_id: string | null
          id: string
          notes: string | null
          received_by_id: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["transfer_status"]
          to_virtual_warehouse_id: string
          transfer_date: string
          transfer_number: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by_id: string
          expected_delivery_date?: string | null
          from_virtual_warehouse_id: string
          generated_issue_id?: string | null
          generated_receipt_id?: string | null
          id?: string
          notes?: string | null
          received_by_id?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["transfer_status"]
          to_virtual_warehouse_id: string
          transfer_date?: string
          transfer_number: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by_id?: string
          expected_delivery_date?: string | null
          from_virtual_warehouse_id?: string
          generated_issue_id?: string | null
          generated_receipt_id?: string | null
          id?: string
          notes?: string | null
          received_by_id?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["transfer_status"]
          to_virtual_warehouse_id?: string
          transfer_date?: string
          transfer_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_transfers_approved_by_id_fkey"
            columns: ["approved_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_from_virtual_warehouse_id_fkey"
            columns: ["from_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "stock_transfers_from_virtual_warehouse_id_fkey"
            columns: ["from_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_generated_issue_id_fkey"
            columns: ["generated_issue_id"]
            isOneToOne: false
            referencedRelation: "stock_issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_generated_receipt_id_fkey"
            columns: ["generated_receipt_id"]
            isOneToOne: false
            referencedRelation: "stock_receipts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_received_by_id_fkey"
            columns: ["received_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_transfers_to_virtual_warehouse_id_fkey"
            columns: ["to_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "stock_transfers_to_virtual_warehouse_id_fkey"
            columns: ["to_virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          created_at?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      task_history: {
        Row: {
          changed_by_id: string | null
          created_at: string
          id: string
          new_status: Database["public"]["Enums"]["task_status"]
          notes: string | null
          old_status: Database["public"]["Enums"]["task_status"] | null
          task_id: string
          ticket_id: string
        }
        Insert: {
          changed_by_id?: string | null
          created_at?: string
          id?: string
          new_status: Database["public"]["Enums"]["task_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["task_status"] | null
          task_id: string
          ticket_id: string
        }
        Update: {
          changed_by_id?: string | null
          created_at?: string
          id?: string
          new_status?: Database["public"]["Enums"]["task_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["task_status"] | null
          task_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_history_changed_by_id_fkey"
            columns: ["changed_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_history_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "service_ticket_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_history_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_history_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      task_templates: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          product_type: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          strict_sequence: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_id: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          product_type?: string | null
          service_type?: Database["public"]["Enums"]["service_type"]
          strict_sequence?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          product_type?: string | null
          service_type?: Database["public"]["Enums"]["service_type"]
          strict_sequence?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_templates_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_templates_product_type_fkey"
            columns: ["product_type"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_templates_product_type_fkey"
            columns: ["product_type"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "task_templates_product_type_fkey"
            columns: ["product_type"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "task_templates_product_type_fkey"
            columns: ["product_type"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
        ]
      }
      task_templates_tasks: {
        Row: {
          created_at: string
          custom_instructions: string | null
          id: string
          is_required: boolean
          sequence_order: number
          task_type_id: string
          template_id: string
        }
        Insert: {
          created_at?: string
          custom_instructions?: string | null
          id?: string
          is_required?: boolean
          sequence_order: number
          task_type_id: string
          template_id: string
        }
        Update: {
          created_at?: string
          custom_instructions?: string | null
          id?: string
          is_required?: boolean
          sequence_order?: number
          task_type_id?: string
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_templates_tasks_task_type_id_fkey"
            columns: ["task_type_id"]
            isOneToOne: false
            referencedRelation: "task_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_templates_tasks_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "task_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_templates_tasks_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["template_id"]
          },
        ]
      }
      task_types: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          estimated_duration_minutes: number | null
          id: string
          is_active: boolean
          name: string
          requires_notes: boolean
          requires_photo: boolean
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          is_active?: boolean
          name: string
          requires_notes?: boolean
          requires_photo?: boolean
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          is_active?: boolean
          name?: string
          requires_notes?: boolean
          requires_photo?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      ticket_template_changes: {
        Row: {
          changed_by_id: string
          created_at: string
          id: string
          new_template_id: string | null
          old_template_id: string | null
          reason: string
          ticket_id: string
        }
        Insert: {
          changed_by_id: string
          created_at?: string
          id?: string
          new_template_id?: string | null
          old_template_id?: string | null
          reason: string
          ticket_id: string
        }
        Update: {
          changed_by_id?: string
          created_at?: string
          id?: string
          new_template_id?: string | null
          old_template_id?: string | null
          reason?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_template_changes_changed_by_id_fkey"
            columns: ["changed_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_template_changes_new_template_id_fkey"
            columns: ["new_template_id"]
            isOneToOne: false
            referencedRelation: "task_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_template_changes_new_template_id_fkey"
            columns: ["new_template_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "ticket_template_changes_old_template_id_fkey"
            columns: ["old_template_id"]
            isOneToOne: false
            referencedRelation: "task_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_template_changes_old_template_id_fkey"
            columns: ["old_template_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "ticket_template_changes_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_template_changes_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      virtual_warehouses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          physical_warehouse_id: string
          updated_at: string
          warehouse_type: Database["public"]["Enums"]["warehouse_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          physical_warehouse_id: string
          updated_at?: string
          warehouse_type: Database["public"]["Enums"]["warehouse_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          physical_warehouse_id?: string
          updated_at?: string
          warehouse_type?: Database["public"]["Enums"]["warehouse_type"]
        }
        Relationships: [
          {
            foreignKeyName: "virtual_warehouses_physical_warehouse_id_fkey"
            columns: ["physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "physical_warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "virtual_warehouses_physical_warehouse_id_fkey"
            columns: ["physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["physical_warehouse_id"]
          },
        ]
      }
    }
    Views: {
      service_ticket_comments_with_author: {
        Row: {
          author_avatar: string | null
          author_email: string | null
          author_name: string | null
          comment: string | null
          comment_type: Database["public"]["Enums"]["comment_type"] | null
          created_at: string | null
          created_by: string | null
          id: string | null
          is_internal: boolean | null
          ticket_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_ticket_comments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "service_ticket_comments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ticket_comments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
          {
            foreignKeyName: "service_ticket_comments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_low_stock_alerts: {
        Row: {
          alert_enabled: boolean | null
          brand_name: string | null
          current_quantity: number | null
          last_alert_sent_at: string | null
          maximum_quantity: number | null
          minimum_quantity: number | null
          product_id: string | null
          product_name: string | null
          product_sku: string | null
          quantity_below_minimum: number | null
          reorder_quantity: number | null
          threshold_created_at: string | null
          threshold_updated_at: string | null
          warehouse_type: Database["public"]["Enums"]["warehouse_type"] | null
        }
        Relationships: []
      }
      v_pending_approvals: {
        Row: {
          created_at: string | null
          created_by_id: string | null
          created_by_name: string | null
          document_date: string | null
          document_number: string | null
          document_type: string | null
          id: string | null
          status: string | null
          sub_type: string | null
          total_quantity: number | null
          total_value: number | null
        }
        Relationships: []
      }
      v_service_request_summary: {
        Row: {
          converted_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          delivery_address: string | null
          delivery_method: Database["public"]["Enums"]["delivery_method"] | null
          hours_to_conversion: number | null
          hours_to_review: number | null
          id: string | null
          issue_description: string | null
          photo_count: number | null
          product_brand: string | null
          product_model: string | null
          purchase_date: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by_id: string | null
          reviewed_by_name: string | null
          serial_number: string | null
          service_type: Database["public"]["Enums"]["service_type"] | null
          status: Database["public"]["Enums"]["request_status"] | null
          submitted_at: string | null
          submitted_ip: string | null
          ticket_id: string | null
          ticket_number: string | null
          ticket_status: Database["public"]["Enums"]["ticket_status"] | null
          tracking_token: string | null
          updated_at: string | null
          user_agent: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_reviewed_by_id_fkey"
            columns: ["reviewed_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      v_stock_movement_history: {
        Row: {
          brand_name: string | null
          condition: Database["public"]["Enums"]["product_condition"] | null
          from_physical_warehouse_code: string | null
          from_physical_warehouse_name: string | null
          from_virtual_warehouse:
            | Database["public"]["Enums"]["warehouse_type"]
            | null
          moved_at: string | null
          moved_by_id: string | null
          moved_by_name: string | null
          moved_by_role: Database["public"]["Enums"]["user_role"] | null
          movement_id: string | null
          movement_type: Database["public"]["Enums"]["movement_type"] | null
          notes: string | null
          physical_product_id: string | null
          product_name: string | null
          product_sku: string | null
          reason: string | null
          serial_number: string | null
          ticket_id: string | null
          ticket_number: string | null
          ticket_status: Database["public"]["Enums"]["ticket_status"] | null
          to_physical_warehouse_code: string | null
          to_physical_warehouse_name: string | null
          to_virtual_warehouse:
            | Database["public"]["Enums"]["warehouse_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_moved_by_id_fkey"
            columns: ["moved_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "service_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "v_task_progress_summary"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      v_stock_summary: {
        Row: {
          actual_serial_count: number | null
          created_at: string | null
          declared_quantity: number | null
          initial_stock_entry: number | null
          minimum_quantity: number | null
          physical_warehouse_id: string | null
          physical_warehouse_name: string | null
          product_id: string | null
          product_name: string | null
          reorder_quantity: number | null
          serial_gap: number | null
          sku: string | null
          stock_status: string | null
          updated_at: string | null
          virtual_warehouse_id: string | null
          virtual_warehouse_name: string | null
          warehouse_type: Database["public"]["Enums"]["warehouse_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "product_warehouse_stock_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["virtual_warehouse_id"]
          },
          {
            foreignKeyName: "product_warehouse_stock_virtual_warehouse_id_fkey"
            columns: ["virtual_warehouse_id"]
            isOneToOne: false
            referencedRelation: "virtual_warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "virtual_warehouses_physical_warehouse_id_fkey"
            columns: ["physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "physical_warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "virtual_warehouses_physical_warehouse_id_fkey"
            columns: ["physical_warehouse_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["physical_warehouse_id"]
          },
        ]
      }
      v_task_progress_summary: {
        Row: {
          blocked_tasks: number | null
          blocked_tasks_detail: Json | null
          completed_tasks: number | null
          completion_percentage: number | null
          first_task_started_at: string | null
          in_progress_tasks: number | null
          last_task_completed_at: string | null
          next_pending_task: Json | null
          pending_tasks: number | null
          required_completed: number | null
          required_completion_percentage: number | null
          required_tasks: number | null
          skipped_tasks: number | null
          strict_sequence: boolean | null
          template_id: string | null
          template_name: string | null
          ticket_created_at: string | null
          ticket_id: string | null
          ticket_number: string | null
          ticket_status: Database["public"]["Enums"]["ticket_status"] | null
          ticket_updated_at: string | null
          total_minutes_spent: number | null
          total_tasks: number | null
        }
        Relationships: []
      }
      v_warehouse_stock_levels: {
        Row: {
          actual_quantity: number | null
          declared_quantity: number | null
          physical_warehouse_id: string | null
          physical_warehouse_name: string | null
          product_id: string | null
          product_name: string | null
          sku: string | null
          variance: number | null
          virtual_warehouse_id: string | null
          virtual_warehouse_name: string | null
          warehouse_type: Database["public"]["Enums"]["warehouse_type"] | null
        }
        Relationships: []
      }
      v_warranty_expiring_soon: {
        Row: {
          days_remaining: number | null
          id: string | null
          manufacturer_warranty_end_date: string | null
          product_id: string | null
          product_name: string | null
          serial_number: string | null
          user_warranty_end_date: string | null
          warehouse_type: Database["public"]["Enums"]["warehouse_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "physical_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "physical_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_low_stock_alerts"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "physical_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_stock_summary"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "physical_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_warehouse_stock_levels"
            referencedColumns: ["product_id"]
          },
        ]
      }
    }
    Functions: {
      calculate_warranty_end_date: {
        Args: { p_start_date: string; p_warranty_months: number }
        Returns: string
      }
      decrease_part_stock: {
        Args: { p_part_id: string; p_quantity_to_decrease: number }
        Returns: boolean
      }
      generate_ticket_number: { Args: never; Returns: string }
      get_aggregated_stock: {
        Args: { search_term?: string }
        Returns: {
          product_id: string
          product_name: string
          serial_gap: number
          sku: string
          stock_status: string
          total_actual: number
          total_declared: number
        }[]
      }
      get_inventory_stats: {
        Args: never
        Returns: {
          critical_count: number
          total_actual: number
          total_declared: number
          total_skus: number
          warning_count: number
        }[]
      }
      get_my_role: { Args: never; Returns: string }
      get_warranty_status: {
        Args: { p_warranty_end_date: string }
        Returns: string
      }
      has_any_role: { Args: { required_roles: string[] }; Returns: boolean }
      has_role: { Args: { required_role: string }; Returns: boolean }
      increase_part_stock: {
        Args: { p_part_id: string; p_quantity_to_increase: number }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_admin_or_manager: { Args: never; Returns: boolean }
      is_manager_or_above: { Args: never; Returns: boolean }
      is_reception: { Args: never; Returns: boolean }
      is_technician: { Args: never; Returns: boolean }
      log_audit: {
        Args: {
          p_action: string
          p_metadata?: Json
          p_new_values?: Json
          p_old_values?: Json
          p_reason?: string
          p_resource_id: string
          p_resource_type: string
        }
        Returns: string
      }
      log_template_switch: {
        Args: {
          p_new_template_id: string
          p_old_template_id: string
          p_reason: string
          p_ticket_id: string
        }
        Returns: string
      }
    }
    Enums: {
      comment_type: "note" | "status_change" | "assignment" | "system"
      delivery_method: "pickup" | "delivery"
      movement_type:
        | "receipt"
        | "transfer"
        | "assignment"
        | "return"
        | "disposal"
      priority_level: "low" | "normal" | "high" | "urgent"
      product_condition: "new" | "refurbished" | "used" | "faulty" | "for_parts"
      request_status:
        | "submitted"
        | "received"
        | "processing"
        | "completed"
        | "cancelled"
      service_type: "warranty" | "paid" | "replacement"
      stock_document_status:
        | "draft"
        | "pending_approval"
        | "approved"
        | "completed"
        | "cancelled"
      stock_issue_type: "normal" | "adjustment"
      stock_receipt_type: "normal" | "adjustment"
      task_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "blocked"
        | "skipped"
      ticket_status: "pending" | "in_progress" | "completed" | "cancelled"
      transfer_status:
        | "draft"
        | "pending_approval"
        | "approved"
        | "in_transit"
        | "completed"
        | "cancelled"
      user_role: "admin" | "manager" | "technician" | "reception"
      warehouse_type:
        | "warranty_stock"
        | "rma_staging"
        | "dead_stock"
        | "in_service"
        | "parts"
        | "main"
      warranty_type: "warranty" | "paid" | "goodwill"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      comment_type: ["note", "status_change", "assignment", "system"],
      delivery_method: ["pickup", "delivery"],
      movement_type: [
        "receipt",
        "transfer",
        "assignment",
        "return",
        "disposal",
      ],
      priority_level: ["low", "normal", "high", "urgent"],
      product_condition: ["new", "refurbished", "used", "faulty", "for_parts"],
      request_status: [
        "submitted",
        "received",
        "processing",
        "completed",
        "cancelled",
      ],
      service_type: ["warranty", "paid", "replacement"],
      stock_document_status: [
        "draft",
        "pending_approval",
        "approved",
        "completed",
        "cancelled",
      ],
      stock_issue_type: ["normal", "adjustment"],
      stock_receipt_type: ["normal", "adjustment"],
      task_status: [
        "pending",
        "in_progress",
        "completed",
        "blocked",
        "skipped",
      ],
      ticket_status: ["pending", "in_progress", "completed", "cancelled"],
      transfer_status: [
        "draft",
        "pending_approval",
        "approved",
        "in_transit",
        "completed",
        "cancelled",
      ],
      user_role: ["admin", "manager", "technician", "reception"],
      warehouse_type: [
        "warranty_stock",
        "rma_staging",
        "dead_stock",
        "in_service",
        "parts",
        "main",
      ],
      warranty_type: ["warranty", "paid", "goodwill"],
    },
  },
} as const

