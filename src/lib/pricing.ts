export const DELIVERY_CHARGE = 50;
export const GST_RATE = 0.18; // change if needed

export function parseRupees(value: string | number): number {
  if (typeof value === "number") return value;
  const cleaned = value.replace(/[^\d.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export function calcGST(subtotal: number): number {
  return Math.round(subtotal * GST_RATE);
}

