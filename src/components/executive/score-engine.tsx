
"use client";

import { ExecutiveScore, EXECUTIVE_SCORES } from "@/lib/executive-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from "recharts";

export default function ScoreEngine() {
  const radarData = EXECUTIVE_SCORES.filter(s => s.id !== 'total').map(s => ({
    subject: s.label.split(' ')[0],
    A: s.score,
    fullMark: 100,
  }));

  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden">
      <CardHeader className="p-8 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              Sustainability Score Engine
            </CardTitle>
            <CardDescription>Multi-modal aggregation of global resilience metrics</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] font-bold uppercase py-1">
            Algorithm: TRM-v2.1
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                <Radar
                  name="TerraMind"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-secondary/20 rounded-[2rem] border border-border/50">
               <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Weighting Methodology</h4>
               <div className="space-y-4">
                  <MethodologyItem label="Carbon Reduction" weight={25} />
                  <MethodologyItem label="Renewable Mix" weight={20} />
                  <MethodologyItem label="Circular Flow" weight={15} />
                  <MethodologyItem label="Public Health" weight={15} />
                  <MethodologyItem label="Ecosystem Health" weight={25} />
               </div>
            </div>
            
            <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem] flex gap-4 items-start">
               <Info className="h-5 w-5 text-primary shrink-0 mt-1" />
               <p className="text-xs text-muted-foreground leading-relaxed">
                 TerraMind's engine uses <span className="text-primary font-bold">weighted linear regressions</span> combined with real-time bio-telemetry. The overall score represents the city's ability to maintain equilibrium under climate stress.
               </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MethodologyItem({ label, weight }: { label: string; weight: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold uppercase">
        <span>{label}</span>
        <span className="text-primary">{weight}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${weight}%` }} />
      </div>
    </div>
  );
}
