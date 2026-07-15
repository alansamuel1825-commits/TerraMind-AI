"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trees, Waves, Leaf, Globe, Circle, Microscope } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface EcosystemPanelProps {
  ecosystem: {
    forestCover: number;
    treeDensity: number;
    coralHealth: number;
    bleachingRisk: string;
    speciesRichness: number;
    habitatQuality: number;
  };
}

export default function EcosystemPanel({ ecosystem }: EcosystemPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Forest Monitoring */}
      <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden">
        <CardHeader>
           <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trees className="h-5 w-5 text-green-600" />
                  Forest Monitoring
                </CardTitle>
                <CardDescription>Vegetation density & carbon storage</CardDescription>
              </div>
              <Badge variant="secondary">Global Sync</Badge>
           </div>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="aspect-video relative rounded-3xl overflow-hidden ring-1 ring-border/50">
              <Image src="https://picsum.photos/seed/forest-sat/800/450" alt="Forest Satellite" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-2 rounded-xl text-[10px] text-white">
                Plot F-22 | LiDAR Scanning Active
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span>Forest Cover</span>
                    <span>{ecosystem.forestCover}%</span>
                 </div>
                 <Progress value={ecosystem.forestCover} className="h-1.5" />
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span>Habitat Quality</span>
                    <span>{ecosystem.habitatQuality}/100</span>
                 </div>
                 <Progress value={ecosystem.habitatQuality} className="h-1.5 bg-secondary" />
              </div>
           </div>

           <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/10">
              <h5 className="text-[10px] font-bold uppercase text-green-600 flex items-center gap-2 mb-2">
                <Leaf className="h-3.5 w-3.5" />
                Carbon Sequestration
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Projected storage: <span className="text-green-600 font-bold">14,200 tC</span> seasonally. Protecting old-growth areas is 4x more effective than new monoculture planting.
              </p>
           </div>
        </CardContent>
      </Card>

      {/* Marine & Biodiversity */}
      <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden">
        <CardHeader>
           <CardTitle className="text-xl flex items-center gap-2">
             <Waves className="h-5 w-5 text-blue-600" />
             Coral & Biodiversity
           </CardTitle>
           <CardDescription>Marine ecosystem resilience tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/30 rounded-3xl border border-border/50 flex flex-col items-center justify-center text-center">
                 <span className="text-xs font-bold text-muted-foreground uppercase mb-1">Coral Health</span>
                 <div className="text-3xl font-bold text-blue-600">{ecosystem.coralHealth}%</div>
                 <Badge variant="outline" className="mt-2 text-[9px] border-blue-200 text-blue-600">Stable</Badge>
              </div>
              <div className="p-4 bg-secondary/30 rounded-3xl border border-border/50 flex flex-col items-center justify-center text-center">
                 <span className="text-xs font-bold text-muted-foreground uppercase mb-1">Bleaching Risk</span>
                 <div className="text-xl font-bold text-amber-600">{ecosystem.bleachingRisk}</div>
                 <Circle className="h-2 w-2 fill-amber-500 text-amber-500 mt-2" />
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-100 rounded-lg"><Microscope className="h-4 w-4 text-slate-600" /></div>
                 <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Species Richness</p>
                    <p className="text-sm font-bold">{ecosystem.speciesRichness} Catalogued Items</p>
                 </div>
              </div>

              <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200">
                 <h5 className="text-[10px] font-bold uppercase text-slate-600 mb-2">Microplastic Awareness</h5>
                 <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                   Microplastics (under 5mm) now enter the marine food chain at primary consumer levels. Estimated concentration: <span className="font-bold">2.4 particles/L</span>.
                 </p>
                 <div className="flex gap-2">
                    <Badge className="text-[9px] py-0">Filter Strategies</Badge>
                    <Badge className="text-[9px] py-0" variant="outline">Circular Path</Badge>
                 </div>
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
