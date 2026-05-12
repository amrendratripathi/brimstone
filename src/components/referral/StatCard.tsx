import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  className?: string;
  loading?: boolean;
  gradient?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  loading,
  gradient = "from-violet-500/10 to-purple-500/5",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5",
        "hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5",
        className
      )}
    >
      {/* gradient bg */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", gradient)} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium text-white/60 uppercase tracking-wider">{title}</p>
          <div className="p-2 rounded-xl bg-white/10">{icon}</div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 h-9">
            <Loader2 className="w-5 h-5 animate-spin text-white/40" />
          </div>
        ) : (
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        )}

        {subtitle && <p className="text-sm text-white/50 mt-1">{subtitle}</p>}

        {trend && (
          <div className="flex items-center gap-1 mt-3">
            <span
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                trend.value >= 0
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-xs text-white/40">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
