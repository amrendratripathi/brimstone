import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral" | "purple";

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  error: "bg-red-500/15 text-red-400 border-red-500/30",
  info: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  neutral: "bg-white/10 text-white/60 border-white/15",
  purple: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ variant = "neutral", children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantClasses[variant],
        className
      )}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", {
          "bg-emerald-400": variant === "success",
          "bg-amber-400": variant === "warning",
          "bg-red-400": variant === "error",
          "bg-sky-400": variant === "info",
          "bg-white/60": variant === "neutral",
          "bg-violet-400": variant === "purple",
        })} />
      )}
      {children}
    </span>
  );
}

export function payoutStatusBadge(status: string) {
  const map: Record<string, BadgeVariant> = {
    pending: "warning",
    processing: "info",
    paid: "success",
    rejected: "error",
  };
  return <Badge variant={map[status] ?? "neutral"} dot>{status}</Badge>;
}
