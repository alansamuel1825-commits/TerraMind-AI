
"use client";

import { 
  agriMetrics, 
  energyMetrics, 
  wasteMetrics, 
  healthMetrics,
  loadData 
} from "@/lib/data";
import MetricCard from "@/components/MetricCard";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Info, Globe } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          Global Predictive Intelligence Model <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/30">v4.0 SafeAI</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {agriMetrics.slice(0, 1).map((m) => <MetricCard key={m.label} metric={m} />)}
        {energyMetrics.slice(0, 1).map((m) => <MetricCard key={m.label} metric={m} />)}
        {wasteMetrics.slice(0, 1).map((m) => <MetricCard key={m.label} metric={m} />)}
        {healthMetrics.slice(0, 1).map((m) => <MetricCard key={m.label} metric={m} />)}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Microgrid Load Balancer</CardTitle>
            <CardDescription>Predictive energy distribution as neural pathways (Load vs. Renewables)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={loadData}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="load" stroke="#10b981" fillOpacity={1} fill="url(#colorLoad)" />
                <Area type="monotone" dataKey="solar" stroke="#fbbf24" fill="#fbbf24" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Safe AI Verification
            </CardTitle>
            <CardDescription>Explainable logic for recent predictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border rounded-lg bg-secondary/30">
              <h4 className="font-semibold text-sm mb-1">Waste Thermodynamic Flow</h4>
              <p className="text-xs text-muted-foreground">The recent 8% efficiency spike in industrial recycling was triggered by real-time manufacturing input matching in the northern sector.</p>
              <div className="mt-2 flex gap-2">
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">SHAP Verified</span>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded">Grounded Sim</span>
              </div>
            </div>
            <div className="p-3 border rounded-lg bg-secondary/30">
              <h4 className="font-semibold text-sm mb-1">Pathogen Spread Risk</h4>
              <p className="text-xs text-muted-foreground">Telemetry from wastewater sensors detected anomalies in sector 7, but federated learning ensures local privacy while alerting urban health.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Global Resilience Hotspots</CardTitle>
            <CardDescription>AI-identified areas requiring immediate precision resource allocation</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center bg-muted rounded-md relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 pointer-events-none grayscale bg-[url('https://picsum.photos/seed/map/800/400')] bg-cover" />
             <div className="z-10 text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">Interactive Geo-Sim Map Initializing...</p>
             </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-4 w-4" />
                Active Simulations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span>Wildfire Propagation Model</span>
                  <span className="text-primary font-semibold">Running</span>
               </div>
               <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span>Microplastics Concentration</span>
                  <span className="text-primary font-semibold">Calibrated</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span>Coral Reef Thermodynamics</span>
                  <span className="text-muted-foreground">Queued</span>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
