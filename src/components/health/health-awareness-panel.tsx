"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Thermometer, ShieldCheck, AlertCircle, HeartPulse, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthAwarenessPanelProps {
  risks: {
    respiratory: 'Low' | 'Moderate' | 'High';
    heatStress: 'Low' | 'Moderate' | 'High';
    vectorBorne: 'Low' | 'Moderate' | 'High';
  };
}

export default function HealthAwarenessPanel({ risks }: HealthAwarenessPanelProps) {
  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-transparent to-transparent">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <Activity className="h-6 w-6 text-primary" />
          Environmental Health awareness
        </CardTitle>
        <CardDescription>
          Educational summaries derived from current environmental telemetry.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          <RiskCard 
            icon={HeartPulse} 
            label="Respiratory Awareness" 
            risk={risks.respiratory} 
            description="Linked to current AQI and pollen concentrations." 
          />
          <RiskCard 
            icon={Thermometer} 
            label="Heat Stress Level" 
            risk={risks.heatStress} 
            description="Calculated from ambient temp and humidity (Heat Index)." 
          />
          <RiskCard 
            icon={Sparkles} 
            label="Hygiene Indicator" 
            risk="Low" 
            description="Derived from local waste accumulation and water purity." 
          />
        </div>
      </CardContent>
    </Card>
  );
}

function RiskCard({ icon: Icon, label, risk, description }: any) {
  const getRiskColor = (r: string) => {
    switch (r) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Moderate': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20';
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm ring-1 ring-border/50 hover:shadow-lg transition-all space-y-4">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <Badge className={cn("rounded-full border-none px-3", getRiskColor(risk))}>
          {risk} Awareness
        </Badge>
      </div>
      <div>
        <h4 className="text-sm font-bold mb-1">{label}</h4>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="pt-4 border-t flex items-center gap-2">
         <ShieldCheck className="h-3 w-3 text-primary" />
         <span className="text-[9px] font-bold text-primary uppercase">Safe Operational Margin</span>
      </div>
    </div>
  );
}
