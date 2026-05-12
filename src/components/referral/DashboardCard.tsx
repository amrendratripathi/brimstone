import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function DashboardCard({
  title,
  description,
  actions,
  children,
  className,
  noPadding,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm",
        className
      )}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 p-5 border-b border-white/10">
          <div>
            {title && <h3 className="font-semibold text-white text-base">{title}</h3>}
            {description && <p className="text-sm text-white/50 mt-0.5">{description}</p>}
          </div>
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      )}
      <div className={cn(!noPadding && "p-5")}>{children}</div>
    </div>
  );
}
