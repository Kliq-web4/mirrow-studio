import { Flame, Clock, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface UrgencyBadgeProps {
  type: "low-stock" | "trending" | "limited-time" | "hot";
  value?: number | string;
  className?: string;
}

export const UrgencyBadge = ({ type, value, className }: UrgencyBadgeProps) => {
  const configs = {
    "low-stock": {
      icon: Zap,
      text: value ? `Only ${value} left` : "Low Stock",
      bgClass: "bg-destructive/10 border-destructive/30",
      textClass: "text-destructive",
    },
    trending: {
      icon: TrendingUp,
      text: "Trending Now",
      bgClass: "bg-primary/10 border-primary/30",
      textClass: "text-primary",
    },
    "limited-time": {
      icon: Clock,
      text: value ? `${value}` : "Limited Time",
      bgClass: "bg-accent/20 border-accent/30",
      textClass: "text-accent",
    },
    hot: {
      icon: Flame,
      text: "Hot Seller",
      bgClass: "bg-orange-500/10 border-orange-500/30",
      textClass: "text-orange-500",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium",
        config.bgClass,
        config.textClass,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      <span>{config.text}</span>
    </div>
  );
};

// Visitor counter component
export const VisitorCounter = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="flex -space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center"
          >
            <span className="text-[8px] text-primary font-medium">
              {["S", "M", "A"][i]}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span>{count} people viewing this now</span>
      </div>
    </div>
  );
};

// Stock progress bar
export const StockProgress = ({ remaining = 5, total = 20 }: { remaining?: number; total?: number }) => {
  const percentage = (remaining / total) * 100;
  const isLow = percentage <= 25;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className={cn("font-medium", isLow ? "text-destructive" : "text-muted-foreground")}>
          {isLow ? "Hurry!" : "In Stock"}
        </span>
        <span className="text-muted-foreground">
          Only {remaining} left
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isLow
              ? "bg-gradient-to-r from-destructive to-orange-500"
              : "bg-gradient-to-r from-primary to-accent"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default UrgencyBadge;
