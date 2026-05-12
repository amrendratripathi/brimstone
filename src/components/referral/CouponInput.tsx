/**
 * CouponInput — drop-in checkout coupon widget.
 * Props let the parent update the discount/total in real time.
 */

import { useState } from "react";
import { Tag, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { validateCoupon } from "@/lib/workerApi";
import type { CouponCode } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export type AppliedCoupon = {
  coupon: CouponCode;
  discountAmount: number;
};

interface CouponInputProps {
  subtotal: number;                           // pre-discount subtotal in paise / rupees
  onApply: (applied: AppliedCoupon | null) => void;
  className?: string;
}

export function CouponInput({ subtotal, onApply, className }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState<AppliedCoupon | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calcDiscount = (coupon: CouponCode) => {
    if (coupon.discount_type === "percentage") {
      return Math.round((subtotal * coupon.discount_value) / 100);
    }
    return Math.min(coupon.discount_value, subtotal);
  };

  const applyCoupon = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);

    const { data, error: fetchErr } = await validateCoupon(code.trim());

    setLoading(false);

    if (fetchErr || !data) {
      setError("Invalid or expired coupon code.");
      setApplied(null);
      onApply(null);
      return;
    }

    if (!data.workers?.is_active) {
      setError("This coupon is no longer available.");
      setApplied(null);
      onApply(null);
      return;
    }

    if (data.max_usage && data.usage_count >= data.max_usage) {
      setError("This coupon has reached its usage limit.");
      setApplied(null);
      onApply(null);
      return;
    }

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      setError("This coupon has expired.");
      setApplied(null);
      onApply(null);
      return;
    }

    const discountAmount = calcDiscount(data);
    const result: AppliedCoupon = { coupon: data, discountAmount };
    setApplied(result);
    onApply(result);
  };

  const removeCoupon = () => {
    setApplied(null);
    setCode("");
    setError(null);
    onApply(null);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="text-sm font-medium text-muted-foreground">Promo / Referral Code</span>
      </div>

      {!applied ? (
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(null); }}
            onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
            placeholder="Enter code e.g. JOHN10"
            disabled={loading}
            className={cn(
              "flex-1 px-4 py-2.5 rounded-xl bg-muted/30 border text-foreground placeholder:text-muted-foreground font-mono text-sm",
              "focus:outline-none focus:ring-1 transition-all",
              error
                ? "border-destructive/50 focus:border-destructive focus:ring-destructive/20"
                : "border-border focus:border-primary focus:ring-primary/20"
            )}
          />
          <button
            onClick={applyCoupon}
            disabled={loading || !code.trim()}
            className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
          </button>
        </div>
      ) : (
        /* ── Applied success state ── */
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Code applied: <span className="font-mono">{applied.coupon.code}</span>
              </p>
              <p className="text-xs text-emerald-600/70 dark:text-emerald-300/70 mt-0.5">
                You save{" "}
                {applied.coupon.discount_type === "percentage"
                  ? `${applied.coupon.discount_value}%`
                  : `₹${applied.coupon.discount_value}`}{" "}
                (−₹{applied.discountAmount.toLocaleString("en-IN")})
              </p>
            </div>
          </div>
          <button onClick={removeCoupon} className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-2.5 animate-in slide-in-from-top-1 duration-200">
          <XCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
