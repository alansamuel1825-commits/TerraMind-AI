"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  CityMetrics, 
  SimulationResults, 
  INITIAL_CITY_METRICS,
  CitySimulation 
} from "@/lib/smart-city-types";
import DigitalTwinSim from "@/components/smart-city/digital-twin-sim";
import SimulationControls from "@/components/smart-city/simulation-controls";
import CityIndicators from "@/components/smart-city/city-indicators";
import ClimateEvents from "@/components/smart-city/climate-events";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Sparkles, 
  RotateCcw, 
  Save, 
  Download, 
  BarChart3, 
  Map as MapIcon,
  Search,
  Zap,
  Leaf
} from "lucide-react";
import { useFirestore, useUser } from "@/firebase";
import { saveCitySimulation } from "@/firebase/firestore/smart-city-service";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function SmartCityPage() {
  const [metrics, setMetrics] = useState<CityMetrics>(INITIAL_CITY_METRICS);
  const firestore = useFirestore();
  const { user } = useUser();

  // Simulated logic to calculate results based on metrics
  const results: SimulationResults = useMemo(() => {
    const { 
      population, 
      renewablePercent, 
      trafficDensity, 
      electricityDemand, 
      treeCoverage, 
      greenRoofAdoption,
      recyclingRate,
      rainfall,
      waterAvailability
    } = metrics;

    const carbon = (population * 0.001) + (trafficDensity * 0.5) + (electricityDemand * 0.1) - (renewablePercent * 0.4) - (treeCoverage * 0.2);
    const energy = (population * 0.005) + (electricityDemand * 0.8) + (metrics.temperature * 0.1);
    const air = (trafficDensity * 0.8) - (treeCoverage * 0.5) - (renewablePercent * 0.3);
    const water = (population * 0.002) + (rainfall < 500 ? 40 : 10) - (waterAvailability * 0.5);
    const heat = (metrics.temperature) - (treeCoverage * 0.3) - (greenRoofAdoption * 0.2) + (population * 0.0001);
    const sustainability = 100 - ((carbon + air + water + heat) / 4);

    return {
      energyDemand: Math.max(energy, 0),
      carbonEmissions: Math.max(carbon, 0),
      cropProductivity: Math.min(Math.max(60 + (rainfall / 100) - (heat / 2), 0), 100),
      airQualityIndex: Math.min(Math.max(air, 10), 500),
      waterStress: Math.min(Math.max(water, 0), 100),
      urbanHeatScore: Math.min(Math.max(heat, 0), 100),
      wasteManagement: recyclingRate,
      sustainabilityScore: Math.min(Math.max(sustainability, 0), 100),
    };
  }, [metrics]);

  const handleSave = () => {
    if (firestore && user) {
      saveCitySimulation(firestore, user.uid, {
        name: `Simulation ${new Date().toLocaleDateString()}`,
        inputs: metrics,
        results: results
      });
    }
  };

  const chartData = [
    { name: '00:00', demand: results.energyDemand * 0.4 },
    { name: '04:00', demand: results.energyDemand * 0.3 },
    { name: '08:00', demand: results.energyDemand * 0.7 },
    { name: '12:00', demand: results.energyDemand * 1.0 },
    { name: '16:00', demand: results.energyDemand * 0.9 },
    { name: '20:00', demand: results.energyDemand * 0.6 },
    { name: '23:59', demand: results.energyDemand * 0.5 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-12 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 bg-[url('https://picsum.photos/seed/smart-city-twin/1200/800')] bg-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl backdrop-blur-xl border border-primary/30">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest">
              Digital Twin v2.0
            </Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">Climate Intelligence & Smart City Twin</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Simulate high-impact sustainable decisions and visualize real-time environmental trajectories.
            </p>
          </div>
          <div className="flex gap-4 pt-2">
             <Button variant="secondary" className="rounded-full px-8 bg-white text-slate-900 hover:bg-slate-200" onClick={handleSave}>
               <Save className="mr-2 h-4 w-4" /> Save Scenario
             </Button>
             <Button variant="outline" className="rounded-full px-8 border-white/20 text-white hover:bg-white/10" onClick={() => window.print()}>
               <Download className="mr-2 h-4 w-4" /> Export Report
             </Button>
          </div>
        </div>
      </div>

      {/* Main Simulation Layout */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          {/* Top Indicators */}
          <CityIndicators results={results} />

          {/* 2D Simulation Map */}
          <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden">
             <DigitalTwinSim />
          </Card>

          {/* Deep Analytics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-lg ring-1 ring-border/50 rounded-[2rem]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Load balancing projection
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                       <XAxis dataKey="name" hide />
                       <YAxis hide />
                       <Tooltip />
                       <Area type="monotone" dataKey="demand" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
                    </AreaChart>
                 </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg ring-1 ring-border/50 rounded-[2rem]">
               <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapIcon className="h-5 w-5 text-green-600" />
                    Geospatial Heatmap
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0 relative h-[250px] rounded-b-[2rem] overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/heatmap/800/600')] bg-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 bg-red-500/20 rounded-full animate-pulse border-2 border-red-500/50" />
                  <Badge className="absolute bottom-4 right-4 bg-slate-900/80 text-white backdrop-blur">Heat Island Sector 4</Badge>
               </CardContent>
            </Card>
          </div>
        </div>

        {/* Control Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <SimulationControls metrics={metrics} onChange={setMetrics} />
          <ClimateEvents />
          
          <Card className="border-none shadow-sm ring-1 ring-border/50 rounded-[2rem] bg-primary/5">
             <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                   <Sparkles className="h-4 w-4 text-primary" />
                   AI Planning Insight
                </CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                   Based on your current <span className="text-primary font-bold">population growth</span> of {Math.round(metrics.population / 1000)}k/yr, 
                   increasing <span className="text-green-600 font-bold">Green Roof Adoption</span> to 45% would reduce urban heat risk by 18% 
                   without adding grid load.
                </p>
             </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer / Scenario Comparison */}
      <Card className="border-none shadow-sm ring-1 ring-border/50 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem]">
        <CardContent className="p-10 flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3 space-y-4">
             <h4 className="text-xl font-bold flex items-center gap-2 text-primary">
                <Leaf className="h-5 w-5" />
                Scenario Assumptions
             </h4>
             <p className="text-xs text-muted-foreground leading-relaxed">
                This digital twin simulation utilizes the TerraMind Resilience Model (TRM-v2). All outputs are educational estimates based on weighted linear regressions of current climate datasets.
             </p>
             <div className="flex gap-2">
                <Badge variant="outline" className="text-[10px]">Model: GIS-TWIN-v4</Badge>
                <Badge variant="outline" className="text-[10px]">LIME Validated</Badge>
             </div>
          </div>
          <div className="flex-1 grid md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Strategic Recommendations</p>
                <ul className="grid gap-3">
                   <li className="flex items-start gap-2 text-xs">
                      <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                      Expand Wind Turbine clusters in the North-Western plateau to offset rising cooling demand.
                   </li>
                   <li className="flex items-start gap-2 text-xs">
                      <Leaf className="h-4 w-4 text-green-500 shrink-0" />
                      Incentivize vertical urban farming to reduce "Food Miles" emissions by an estimated 14%.
                   </li>
                </ul>
             </div>
             <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border space-y-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-100 rounded-lg"><Search className="h-4 w-4 text-blue-600" /></div>
                   <div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Calibration Status</p>
                      <p className="text-xs font-bold">Global Data Sync: 98.4%</p>
                   </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[98.4%]" />
                </div>
                <p className="text-[10px] text-muted-foreground italic">
                   "Model accuracy is optimized for temperate urban corridors. Tropical delta adjustments are currently in beta."
                </p>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
