"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wind, Info, CloudRain, Thermometer, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface AirQualityPanelProps {
  data: {
    aqi: number;
    pm25: number;
    pm10: number;
    co2: number;
    temp: number;
    humidity: number;
  };
}

export default function AirQualityPanel({ data }: AirQualityPanelProps) {
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good', color: 'text-green-500', bg: 'bg-green-500/10' };
    if (aqi <= 100) return { label: 'Moderate', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { label: 'Unhealthy', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const status = getAQIStatus(data.aqi);

  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wind className="h-5 w-5 text-primary" />
          Air Quality
        </CardTitle>
        <Badge className={cn("rounded-full border-none", status.bg, status.color)}>
          {status.label}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold tracking-tighter">{data.aqi}</div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Global AQI</span>
            <span className="text-xs text-muted-foreground">Example Simulation</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MetricItem label="PM2.5" value={data.pm25} unit="µg/m³" />
          <MetricItem label="PM10" value={data.pm10} unit="µg/m³" />
          <MetricItem label="CO₂" value={data.co2} unit="ppm" />
          <MetricItem label="Humidity" value={data.humidity} unit="%" />
        </div>

        <div className="p-4 bg-primary/5 rounded-2xl space-y-2">
           <h5 className="text-[10px] font-bold uppercase flex items-center gap-2">
             <Info className="h-3.5 w-3.5 text-primary" />
             Educational Guidance
           </h5>
           <p className="text-[11px] text-muted-foreground leading-relaxed">
             AQI levels are currently safe for all groups. Ideal for outdoor physical activity and continuous ventilation.
           </p>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricItem({ label, value, unit }: any) {
  return (
    <div className="p-3 bg-secondary/30 rounded-xl border border-border/50">
      <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-sm font-bold">{value}</span>
        <span className="text-[10px] text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}
