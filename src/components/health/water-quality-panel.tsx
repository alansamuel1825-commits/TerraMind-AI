"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Waves, CheckCircle2, FlaskConical } from "lucide-react";

interface WaterQualityPanelProps {
  data: {
    ph: number;
    turbidity: number;
    dissolvedOxygen: number;
    temp: number;
    score: number;
  };
}

export default function WaterQualityPanel({ data }: WaterQualityPanelProps) {
  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          Water Quality
        </CardTitle>
        <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">Optimal</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold tracking-tighter">{data.score}</div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Purity Score</span>
            <span className="text-xs text-muted-foreground">Ecosystem Delta</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <MetricItem icon={FlaskConical} label="pH Level" value={data.ph} unit="" />
           <MetricItem icon={Waves} label="Turbidity" value={data.turbidity} unit="NTU" />
           <MetricItem icon={Droplets} label="D. Oxygen" value={data.dissolvedOxygen} unit="mg/L" />
           <MetricItem icon={Droplets} label="Water Temp" value={data.temp} unit="°C" />
        </div>

        <div className="space-y-3">
           <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b pb-1">Indicator Glossary</h5>
           <ul className="grid gap-2">
              <li className="text-[10px] leading-relaxed">
                <span className="font-bold text-blue-600">Dissolved Oxygen:</span> Essential for aquatic respiration. Levels above 5 mg/L are typically optimal for most fish species.
              </li>
           </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricItem({ icon: Icon, label, value, unit }: any) {
  return (
    <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 flex items-center gap-3">
      <Icon className="h-4 w-4 text-blue-500" />
      <div>
        <p className="text-[9px] font-bold text-muted-foreground uppercase">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-bold">{value}</span>
          {unit && <span className="text-[10px] text-muted-foreground">{unit}</span>}
        </div>
      </div>
    </div>
  );
}
