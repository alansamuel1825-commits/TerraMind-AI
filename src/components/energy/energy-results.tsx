"use client";

import { EnergySimulation } from "@/lib/energy-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Sun, 
  Battery, 
  CloudRain, 
  Download, 
  RotateCcw, 
  TrendingUp, 
  Leaf, 
  DollarSign,
  Activity,
  ArrowRight,
  ShieldCheck,
  Info
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface EnergyResultsProps {
  simulation: EnergySimulation;
  onReset: () => void;
}

export default function EnergyResults({ simulation, onReset }: EnergyResultsProps) {
  const { results, recommendations, charts } = simulation;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Intelligence Forecast</h2>
          <p className="text-muted-foreground">Simulation ID: {simulation.id} | {new Date(simulation.timestamp).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset} className="rounded-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Simulation
          </Button>
          <Button className="rounded-full" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPIItem icon={Zap} label="Expected Demand" value={`${results.expectedDemand}kWh`} color="text-blue-500" />
        <KPIItem icon={Sun} label="Solar Potential" value={`${results.estimatedSolarGen}kWh`} color="text-amber-500" />
        <KPIItem icon={Leaf} label="CO2 Reduction" value={`${results.carbonReduction}t`} color="text-green-500" />
        <KPIItem icon={DollarSign} label="Estimated Savings" value={`$${results.costSavings}`} color="text-primary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-xl ring-1 ring-border/50 rounded-[2rem] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Load Balancing Forecast
            </CardTitle>
            <CardDescription>Daily energy consumption vs potential solar offset</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.consumptionTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2rem] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Energy Mix</CardTitle>
            <CardDescription>Source distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex flex-col items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.renewableMix}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {charts.renewableMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="grid grid-cols-2 gap-2 mt-6 w-full">
                {charts.renewableMix.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.name}</span>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2rem]">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                AI Smart Recommendations
              </CardTitle>
              <CardDescription>Optimized actions based on load profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {recommendations.map((rec, i) => (
                 <div key={i} className="group p-4 bg-secondary/30 rounded-2xl border border-border/50 hover:border-primary/50 transition-all flex items-start gap-4 cursor-pointer">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                       <Zap className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-sm mb-1">{rec.title}</h4>
                       <p className="text-xs text-muted-foreground leading-relaxed mb-2">{rec.description}</p>
                       <Badge variant="outline" className="bg-primary/5 text-primary text-[10px] uppercase font-bold border-primary/20">
                          {rec.benefit}
                       </Badge>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground self-center" />
                 </div>
               ))}
            </CardContent>
         </Card>

         <div className="space-y-6">
            <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2rem] bg-gradient-to-br from-primary/5 to-transparent">
               <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Efficiency Rating
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex items-end gap-2 mb-4">
                     <span className="text-5xl font-bold tracking-tighter">{results.efficiencyRating}</span>
                     <span className="text-xl font-bold text-muted-foreground mb-1">/ 100</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: `${results.efficiencyRating}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic border-l-2 border-primary pl-3">
                    "Your facility is performing 24% better than similar residential structures in the Pacific Northwest region."
                  </p>
               </CardContent>
            </Card>

            <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2rem]">
               <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    Sustainability Profile
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 bg-secondary/20 rounded-xl">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Grid Dependency</p>
                        <p className="text-lg font-bold">{results.gridDependency}%</p>
                     </div>
                     <div className="p-3 bg-secondary/20 rounded-xl">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Battery Health</p>
                        <p className="text-lg font-bold">Optimal</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 rounded-xl">
                     <Info className="h-5 w-5 text-amber-500 shrink-0" />
                     <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                        Peak Solar generation occurs between {results.peakHours}. Maximize appliance usage during this window.
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}

function KPIItem({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <Card className="border-none shadow-lg ring-1 ring-border/50 rounded-3xl overflow-hidden p-6 hover:translate-y-[-2px] transition-all">
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-2xl bg-slate-100 dark:bg-slate-800", color)}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
      </div>
    </Card>
  );
}
