"use client";

import { useState } from "react";
import { useFirestore, useUser } from "@/firebase";
import { EnergySimulation } from "@/lib/energy-types";
import { saveEnergySimulation } from "@/firebase/firestore/energy-service";
import EnergyForm from "@/components/energy/energy-form";
import EnergyResults from "@/components/energy/energy-results";
import EnergyHistory from "@/components/energy/energy-history";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, History, Sparkles, BookOpen, Globe } from "lucide-react";

export default function GreenEnergyPage() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentResult, setCurrentResult] = useState<EnergySimulation | null>(null);
  const firestore = useFirestore();
  const { user } = useUser();

  const handleSimulationStart = async (simulation: EnergySimulation) => {
    setIsSimulating(true);
    
    // Simulate complex energy calculation delay
    await new Promise(r => setTimeout(r, 3500));
    
    if (firestore && user) {
      saveEnergySimulation(firestore, user.uid, simulation);
    }
    
    setCurrentResult(simulation);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-12 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 bg-[url('https://picsum.photos/seed/energy-hero/1200/800')] bg-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl backdrop-blur-xl border border-primary/30">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest">
              Smart Grid Intelligence
            </Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">Green Energy Intelligence</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Predict, analyze, and optimize sustainable energy usage with real-time grid modeling.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          {!currentResult ? (
            <EnergyForm onSimulate={handleSimulationStart} isSimulating={isSimulating} />
          ) : (
            <EnergyResults 
              simulation={currentResult} 
              onReset={() => setCurrentResult(null)} 
            />
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-lg ring-1 ring-border/50 rounded-[2rem] sticky top-24">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-3">
                <History className="h-5 w-5 text-primary" />
                Simulation Logs
              </CardTitle>
              <CardDescription>Track energy profile iterations</CardDescription>
            </CardHeader>
            <CardContent>
              <EnergyHistory onView={(item) => setCurrentResult(item)} />
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm ring-1 ring-border/50 rounded-[2rem] bg-secondary/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Grid Fact
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 Decentralized micro-grids can reduce transmission losses by up to 15% and increase community resilience against large-scale power failures.
               </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-border/50 rounded-[2rem] bg-green-500/5 border border-green-500/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2 text-green-600">
                <Globe className="h-4 w-4" />
                Global Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-[11px] text-green-700 dark:text-green-400 leading-relaxed font-medium">
                 Optimizing a single commercial building for net-zero carbon is equivalent to removing 24 passenger vehicles from the road for one year.
               </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
