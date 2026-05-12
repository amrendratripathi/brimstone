import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. " +
      "Worker referral features will not work until you configure these in .env"
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// ─── Database type shims ────────────────────────────────────────────────────

export type Worker = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  coupon_code: string;
  commission_rate: number; // e.g. 0.10 = 10%
  is_active: boolean;
  total_sales: number;
  total_orders: number;
  total_earnings: number;
  pending_payout: number;
  created_at: string;
};

export type WorkerPurchase = {
  id: string;
  worker_id: string;
  order_id: string;
  customer_name: string;
  customer_email?: string;
  order_total: number;
  commission_amount: number;
  created_at: string;
};

export type PayoutRecord = {
  id: string;
  worker_id: string;
  amount: number;
  status: "pending" | "processing" | "paid" | "rejected";
  requested_at: string;
  processed_at?: string;
  notes?: string;
};

export type CouponCode = {
  id: string;
  code: string;
  worker_id: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  is_active: boolean;
  usage_count: number;
  max_usage?: number;
  expires_at?: string;
  created_at: string;
};
