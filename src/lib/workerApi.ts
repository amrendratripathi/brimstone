/**
 * Worker Referral API — calls the custom backend via apiRequest
 * Every function maintains its original signature for compatibility.
 */

import { apiRequest } from "./api";
import { type Worker, type WorkerPurchase, type PayoutRecord, type CouponCode } from "./supabase";

// ─── WORKER QUERIES ─────────────────────────────────────────────────────────

export async function getMyWorkerProfile() {
  const res = await apiRequest("/api/workers/me", { method: "GET" });
  if (res.ok && (res.data as any)?.success) {
    const w = (res.data as any).worker;
    const workerData = {
      ...w,
      name: w.users?.name || w.name,
      email: w.users?.email || w.email,
      phone: w.users?.mobileno || w.phone,
    };
    return { data: workerData as Worker, error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to fetch profile") };
}

export async function getAllWorkers(search = "") {
  const res = await apiRequest("/api/workers", { method: "GET" });
  if (res.ok && (res.data as any)?.success) {
    let workers = (res.data as any).workers as Worker[];
    if (search) {
      workers = workers.filter(w => w.name?.toLowerCase().includes(search.toLowerCase()) || w.users?.name?.toLowerCase().includes(search.toLowerCase()));
    }
    const mappedWorkers = workers.map((w: any) => ({
      ...w,
      name: w.users?.name || w.name,
      email: w.users?.email || w.email,
      phone: w.users?.mobileno || w.phone,
      is_active: w.status === "active"
    }));
    return { data: mappedWorkers, error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to fetch workers") };
}

export async function createWorker(payload: Partial<Worker> & { userId?: string, customCouponCode?: string }) {
  const res = await apiRequest("/api/workers", { method: "POST", json: payload });
  if (res.ok && (res.data as any)?.success) {
    return { data: (res.data as any).worker as Worker, error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to create worker") };
}

export async function updateWorker(id: string, payload: Partial<Worker>) {
  const res = await apiRequest(`/api/workers/${id}`, { method: "PATCH", json: payload });
  if (res.ok && (res.data as any)?.success) {
    return { data: (res.data as any).worker as Worker, error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to update worker") };
}

export async function deleteWorker(id: string) {
  const res = await apiRequest(`/api/workers/${id}`, { method: "DELETE" });
  if (res.ok && (res.data as any)?.success) return { error: null };
  return { error: new Error((res.data as any)?.message || "Failed to delete worker") };
}

export async function toggleWorkerStatus(id: string, is_active: boolean) {
  return updateWorker(id, { status: is_active ? "active" : "inactive" } as any);
}

// ─── PURCHASE QUERIES ────────────────────────────────────────────────────────

export async function getWorkerPurchases(workerId: string, limit = 20) {
  const res = await apiRequest(`/api/coupons/orders?workerId=${workerId}&limit=${limit}`, { method: "GET" });
  if (res.ok && (res.data as any)?.success) {
    return { data: (res.data as any).orders as WorkerPurchase[], error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to fetch purchases") };
}

export async function getAllPurchases(workerId?: string) {
  const url = workerId ? `/api/coupons/orders?workerId=${workerId}` : `/api/coupons/orders`;
  const res = await apiRequest(url, { method: "GET" });
  if (res.ok && (res.data as any)?.success) {
    return { data: (res.data as any).orders as WorkerPurchase[], error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to fetch purchases") };
}

// ─── PAYOUT QUERIES ──────────────────────────────────────────────────────────

export async function getWorkerPayouts(workerId: string) {
  const res = await apiRequest("/api/payouts", { method: "GET" });
  if (res.ok && (res.data as any)?.success) {
    return { data: (res.data as any).payouts as PayoutRecord[], error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to fetch payouts") };
}

export async function getAllPayouts(status?: PayoutRecord["status"]) {
  const url = status ? `/api/payouts?status=${status}` : `/api/payouts`;
  const res = await apiRequest(url, { method: "GET" });
  if (res.ok && (res.data as any)?.success) {
    return { data: (res.data as any).payouts as PayoutRecord[], error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to fetch payouts") };
}

export async function requestCashout(workerId: string, amount: number) {
  const res = await apiRequest("/api/payouts/request", { method: "POST", json: { amount } });
  if (res.ok && (res.data as any)?.success) {
    return { data: (res.data as any).payout as PayoutRecord, error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to request cashout") };
}

export async function updatePayoutStatus(payoutId: string, status: PayoutRecord["status"], notes?: string) {
  const action = status === "completed" ? "approve" : "reject";
  const res = await apiRequest(`/api/payouts/${payoutId}/process`, { method: "PATCH", json: { action, adminNotes: notes } });
  if (res.ok && (res.data as any)?.success) {
    return { data: { id: payoutId, status, admin_notes: notes } as any, error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to update payout") };
}

// ─── COUPON QUERIES ──────────────────────────────────────────────────────────

export async function validateCoupon(code: string) {
  const res = await apiRequest("/api/coupons/validate", { method: "POST", auth: false, json: { couponCode: code, orderAmount: 100 } });
  if (res.ok && (res.data as any)?.success) {
    const data = res.data as any;
    return { 
      data: { 
        code: data.coupon_code, 
        discount_value: data.discount_percentage, 
        discount_type: "percentage", 
        workers: { name: "Worker", is_active: true } 
      } as any, 
      error: null 
    };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Invalid coupon") };
}

export async function getAllCoupons() {
  const res = await apiRequest("/api/workers", { method: "GET" });
  if (res.ok && (res.data as any)?.success) {
    const workers = (res.data as any).workers as Worker[];
    const coupons = workers.filter(w => w.coupon_code).map(w => ({
      id: w.id,
      code: w.coupon_code,
      worker_id: w.user_id,
      discount_type: "percentage",
      discount_value: w.discount_percentage,
      is_active: w.status === "active",
      usage_count: w.coupon_used_count || 0,
      max_usage: w.coupon_max_uses,
      expires_at: w.coupon_expires_at,
      created_at: w.created_at,
      workers: { name: w.users?.name || "Unknown Worker" }
    }));
    return { data: coupons as any, error: null };
  }
  return { data: null, error: new Error((res.data as any)?.message || "Failed to fetch coupons") };
}

export async function createCoupon(payload: Partial<CouponCode>) {
  // The backend ties coupons to workers 1-to-1. We cannot arbitrarily create coupons without workers.
  return { data: null, error: new Error("Coupons must be created by adding a worker") };
}

export async function toggleCouponStatus(id: string, is_active: boolean) {
  // Disabling a coupon means suspending the worker in the backend
  return toggleWorkerStatus(id, is_active);
}

export async function getTopWorkers(limit = 5) {
  const res = await apiRequest(`/api/workers?sort=total_earnings&order=desc&limit=${limit}`, { method: "GET" });
  if (res.ok && (res.data as any)?.success) {
    const workers = (res.data as any).workers.map((w: any) => ({
      ...w,
      name: w.users?.name || w.name || "Unknown",
      email: w.users?.email || w.email,
      phone: w.users?.mobileno || w.phone,
    }));
    return { data: workers as Worker[], error: null };
  }
  return { data: null, error: new Error("Failed to fetch top workers") };
}

export async function getRevenueStats() {
  const res = await apiRequest("/api/admin/dashboard", { method: "GET" });
  if (res.ok && (res.data as any)?.success) {
    const d = (res.data as any).dashboard;
    return { 
      data: { 
        totalRevenue: d.total_revenue, 
        totalCommissions: d.total_commissions, 
        totalOrders: d.total_coupon_orders, 
        pendingPayouts: d.pending_payouts 
      }, 
      error: null 
    };
  }
  return { data: null, error: new Error("Failed to fetch stats") };
}

