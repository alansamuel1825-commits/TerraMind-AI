
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { SystemMetric } from "@/lib/data";

interface KPICardProps {
  metric: SystemMetric;
  icon: LucideIcon;
}

export default function KPICard({ metric, icon: Icon }: KPICardProps) {
  const isPositive = metric.trend === 'up';
  const isNeutral = metric.trend === 'neutral';
  
  return (
    <Card className="card-hover group border-none shadow-sm bg-card ring-1 ring-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="p-2 rounded-lg bg-secondary/80 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Icon className="h-4 w-4" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
          isNeutral ? "bg-muted text-muted-foreground" : isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        )}>
          {metric.change !== 0 ? `${metric.change > 0 ? '+' : ''}${metric.change}%` : 'Stable'}
          {metric.trend === 'up' && <ArrowUpRight className="h-2 w-2" />}
          {metric.trend === 'down' && <ArrowDownRight className="h-2 w-2" />}
          {metric.trend === 'neutral' && <Minus className="h-2 w-2" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">{metric.label}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold tracking-tight">{metric.value}</span>
            <span className="text-xs font-medium text-muted-foreground">{metric.unit}</span>
          </div>
        </div>
        
        <div className="h-10 mt-4 -mx-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metric.history}>
              <defs>
                <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isNeutral ? "#64748b" : isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isNeutral ? "#64748b" : isPositive ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={isNeutral ? "#64748b" : isPositive ? "#10b981" : "#ef4444"} 
                strokeWidth={2}
                fillOpacity={1} 
                fill={`url(#gradient-${metric.id})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
