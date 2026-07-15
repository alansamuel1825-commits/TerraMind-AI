
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SystemMetric } from "@/lib/data";

export default function MetricCard({ metric }: { metric: SystemMetric }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
        {metric.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-green-500" />}
        {metric.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-red-500" />}
        {metric.trend === 'neutral' && <Minus className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {metric.value}{metric.unit}
        </div>
        <p className={cn(
          "text-xs font-medium mt-1",
          metric.change > 0 ? "text-green-600" : metric.change < 0 ? "text-red-600" : "text-muted-foreground"
        )}>
          {metric.change !== 0 ? `${metric.change > 0 ? '+' : ''}${metric.change}%` : 'Stable'}
          <span className="text-muted-foreground ml-1 font-normal">from last cycle</span>
        </p>
      </CardContent>
    </Card>
  );
}
