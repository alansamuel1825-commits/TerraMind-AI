
"use client";

import { EXECUTIVE_SCORES } from "@/lib/executive-types";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, LucideIcon, ShieldCheck, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Sprout, 
  Zap, 
  CloudRain, 
  Droplets, 
  Recycle, 
  Wind, 
  Activity, 
  Globe 
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  total: Globe,
  agri: Sprout,
  circular: Recycle,
  energy: Zap,
  climate: ShieldCheck,
  health: Activity,
  water: Droplets,
  air: Wind,
  carbon: CloudRain,
};

export default function GlobalKPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9 gap-4">
      {EXECUTIVE_SCORES.map((metric) => (
        <KPICard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}

function KPICard({ metric }: { metric: any }) {
  const Icon = ICON_MAP[metric.id] || Globe;
  const isPositive = metric.trend === 'up';
  const isNeutral = metric.trend === 'neutral';

  return (
    <Card className="border-none shadow-sm ring-1 ring-border/50 rounded-2xl bg-card/50 backdrop-blur hover:translate-y-[-2px] transition-all overflow-hidden group">
      <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-lg bg-secondary/80 group-hover:bg-primary/10 transition-colors", metric.color)}>
            <Icon className="h-4 w-4" />
          </div>
          {metric.isSimulated ? (
            <Database className="h-3 w-3 text-amber-500 opacity-40" />
          ) : (
            <ShieldCheck className="h-3 w-3 text-green-500 opacity-40" />
          )}
        </div>
        
        <div>
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter truncate">{metric.label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black tracking-tighter">{metric.score}</span>
            <span className="text-[9px] text-muted-foreground">%</span>
          </div>
        </div>

        <div className={cn(
          "flex items-center gap-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full w-fit",
          isNeutral ? "bg-muted text-muted-foreground" : isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}>
          {isPositive && <TrendingUp className="h-2 w-2" />}
          {metric.trend === 'down' && <TrendingDown className="h-2 w-2" />}
          {isNeutral && <Minus className="h-2 w-2" />}
          {metric.change}%
        </div>
      </CardContent>
    </Card>
  );
}
