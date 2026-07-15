"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Maximize2, Map as MapIcon, Layers, Info } from "lucide-react";

export default function EnvironmentalMap() {
  return (
    <div className="relative h-[450px] bg-slate-100 dark:bg-slate-900/50">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/env-map/1200/800')] bg-cover opacity-60 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

      {/* Markers */}
      <div className="absolute top-1/4 left-1/3">
         <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse ring-4 ring-blue-500/20" />
         <div className="mt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold border shadow-lg">
           Water Sensor Alpha | pH 7.2
         </div>
      </div>

      <div className="absolute top-1/2 right-1/4">
         <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse ring-4 ring-green-500/20" />
         <div className="mt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold border shadow-lg">
           Reforestation Plot #12
         </div>
      </div>

      <div className="absolute bottom-1/3 left-1/2">
         <div className="h-3 w-3 bg-amber-500 rounded-full animate-pulse ring-4 ring-amber-500/20" />
         <div className="mt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold border shadow-lg">
           AQI Node | 42 (Good)
         </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-white/80 backdrop-blur shadow-lg border">
          <Maximize2 className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-white/80 backdrop-blur shadow-lg border">
          <Layers className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="absolute bottom-6 left-6">
        <Badge className="bg-slate-950/90 text-white backdrop-blur px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
          <MapIcon className="h-3.5 w-3.5 text-primary" />
          GIS Environmental Overlay Sync
        </Badge>
      </div>

      <div className="absolute bottom-6 right-6 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl border shadow-xl flex items-center gap-3">
         <div className="h-2 w-2 rounded-full bg-green-500" />
         <span className="text-[10px] font-bold uppercase tracking-widest">Sensors Online: 98.4%</span>
      </div>
    </div>
  );
}
