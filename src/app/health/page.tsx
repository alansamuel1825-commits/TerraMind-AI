"use client";

import { useState, useMemo } from "react";
import { EnvironmentalReport, MOCK_HEALTH_DATA } from "@/lib/health-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  HeartPulse, 
  Wind, 
  Droplets, 
  Trees, 
  Waves, 
  Activity, 
  AlertTriangle, 
  ShieldCheck,
  Save,
  Download,
  Info,
  Sparkles,
  Search,
  Map as MapIcon,
  Circle
} from "lucide-react";
import { useFirestore, useUser } from "@/firebase";
import { saveEnvironmentalReport } from "@/firebase/firestore/health-service";
import AirQualityPanel from "@/components/health/air-quality-panel";
import WaterQualityPanel from "@/components/health/water-quality-panel";
import EcosystemPanel from "@/components/health/ecosystem-panel";
import HealthAwarenessPanel from "@/components/health/health-awareness-panel";
import EnvironmentalMap from "@/components/health/environmental-map";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";

export default function HealthEnvironmentPage() {
  const [report] = useState<EnvironmentalReport>(MOCK_HEALTH_DATA);
  const firestore = useFirestore();
  const { user } = useUser();

  const handleSave = () => {
    if (firestore && user) {
      const { id, ...saveData } = report;
      saveEnvironmentalReport(firestore, user.uid, saveData);
    }
  };

  const trendData = [
    { name: 'Jan', air: 35, water: 82, biodiversity: 75 },
    { name: 'Feb', air: 38, water: 80, biodiversity: 74 },
    { name: 'Mar', air: 42, water: 85, biodiversity: 78 },
    { name: 'Apr', air: 40, water: 88, biodiversity: 80 },
    { name: 'May', air: 45, water: 86, biodiversity: 82 },
    { name: 'Jun', air: 42, water: 88, biodiversity: 85 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-12 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 bg-[url('https://picsum.photos/seed/health-env/1200/800')] bg-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl backdrop-blur-xl border border-primary/30">
              <HeartPulse className="h-8 w-8 text-primary" />
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest">
              Eco-Health Monitoring V1.2
            </Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">Public Health & Environment</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Monitor environmental indicators and understand their impact on communities and ecosystems.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
             <Button variant="secondary" className="rounded-full px-8 bg-white text-slate-900 hover:bg-slate-200" onClick={handleSave}>
               <Save className="mr-2 h-4 w-4" /> Save Audit
             </Button>
             <Button variant="outline" className="rounded-full px-8 border-white/20 text-white hover:bg-white/10" onClick={() => window.print()}>
               <Download className="mr-2 h-4 w-4" /> Export Report
             </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          {/* Air & Water Monitoring */}
          <div className="grid gap-6 md:grid-cols-2">
            <AirQualityPanel data={report.airQuality} />
            <WaterQualityPanel data={report.waterQuality} />
          </div>

          {/* Environmental Health Dashboard */}
          <HealthAwarenessPanel risks={report.risks} />

          {/* Map Visualization */}
          <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden">
            <EnvironmentalMap />
          </Card>

          {/* Ecosystems */}
          <EcosystemPanel ecosystem={report.ecosystem} />
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* AI Insights */}
          <Card className="border-none shadow-lg ring-1 ring-border/50 rounded-[2.5rem]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Environmental Insights
              </CardTitle>
              <CardDescription>Predictive ecosystem delta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="p-4 rounded-2xl bg-secondary/20 border border-border/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Air Quality Trend</h4>
                    <Badge variant="outline" className="text-[10px] text-green-600">Stable</Badge>
                  </div>
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={trendData}>
                          <Area type="monotone" dataKey="air" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                       </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    AQI remains within the "Good" range despite a 4% increase in humidity levels.
                  </p>
               </div>

               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-bold uppercase">Community Action</span>
                    </div>
                    <p className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">
                      Current low PM2.5 levels are ideal for urban reforestation planting cycles in Sector 7.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="text-xs font-bold uppercase">Model Limitation</span>
                    </div>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium italic leading-relaxed">
                      Microplastic sensors are currently reporting with a ±12% margin of error due to seasonal turbidity peaks.
                    </p>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* Fact Panel */}
          <Card className="border-none shadow-sm ring-1 ring-border/50 rounded-[2.5rem] bg-slate-950 text-white">
             <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                   <Info className="h-4 w-4 text-primary" />
                   Ecosystem Fact
                </CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  A single mature tree can absorb approximately 48 pounds of CO2 per year while releasing enough oxygen to support two human beings. Urban green spaces can reduce local air temperatures by as much as 7°C.
                </p>
             </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Footer Notice */}
      <Card className="border-none shadow-sm ring-1 ring-border/50 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem]">
        <CardContent className="p-8 text-center space-y-2">
           <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Educational Disclosure</p>
           <p className="text-[11px] text-muted-foreground max-w-2xl mx-auto italic">
             TerraMind AI provides environmental indicators for educational and strategic planning purposes. This platform does not provide medical diagnoses or treatment recommendations. Always consult public health officials for personal health guidance.
           </p>
        </CardContent>
      </Card>
    </div>
  );
}
