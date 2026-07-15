
"use client";

import { SCENARIOS } from "@/lib/executive-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, ArrowRight, Zap, CloudRain, Droplets } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = ['#94a3b8', '#3b82f6', '#10b981'];

export default function ScenarioComparison() {
  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden">
      <CardHeader className="p-8">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              Scenario Forecasting
            </CardTitle>
            <CardDescription>Comparing trajectory pathways for Net-Zero targets</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">
            Manage Scenarios <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-8">
        <div className="h-[250px]">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SCENARIOS}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600 }} />
                 <YAxis hide />
                 <Tooltip cursor={{ fill: 'transparent' }} />
                 <Bar dataKey="sustainability" radius={[8, 8, 0, 0]} barSize={40}>
                   {SCENARIOS.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Bar>
              </BarChart>
           </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
           {SCENARIOS.map((s, i) => (
             <div key={s.id} className="p-4 rounded-[1.5rem] bg-secondary/20 border border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.name}</h5>
                   <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                   <StatMini icon={CloudRain} value={s.carbon} unit="t" />
                   <StatMini icon={Zap} value={s.energy} unit="MW" />
                   <StatMini icon={Droplets} value={s.water} unit="ML" />
                </div>
                <div className="flex justify-between items-end pt-2 border-t border-border/50">
                   <span className="text-[9px] font-bold uppercase text-muted-foreground">Overall Index</span>
                   <span className="text-lg font-black text-foreground">{s.sustainability}%</span>
                </div>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatMini({ icon: Icon, value, unit }: any) {
  return (
    <div className="flex flex-col items-center">
      <Icon className="h-3 w-3 text-muted-foreground mb-1" />
      <span className="text-[10px] font-bold">{value}{unit}</span>
    </div>
  );
}
