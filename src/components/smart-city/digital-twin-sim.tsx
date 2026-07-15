"use client";

import { useState } from "react";
import { CITY_OBJECTS } from "@/lib/smart-city-types";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  BookOpen, 
  HeartPulse, 
  Zap, 
  Wind, 
  Factory, 
  Sprout, 
  BatteryCharging, 
  Droplets, 
  Recycle, 
  Leaf, 
  Bus,
  Info,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const IconMap: any = {
  Home, BookOpen, HeartPulse, Zap, Wind, Factory, Sprout, BatteryCharging, Droplets, Recycle, Leaf, Bus
};

export default function DigitalTwinSim() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedItem = CITY_OBJECTS.find(o => o.id === selected);

  return (
    <div className="relative h-[600px] bg-slate-100 dark:bg-slate-900/50 rounded-[2.5rem] overflow-hidden border ring-1 ring-border/50">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* City Elements */}
      <div className="absolute inset-0 p-12 grid grid-cols-4 md:grid-cols-6 gap-6 overflow-y-auto">
        {CITY_OBJECTS.map((item) => {
          const Icon = IconMap[item.icon];
          return (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={cn(
                "group relative aspect-square rounded-3xl p-4 flex flex-col items-center justify-center transition-all duration-300",
                selected === item.id 
                  ? "bg-primary text-primary-foreground shadow-2xl scale-110 z-10" 
                  : "bg-background hover:bg-secondary border shadow-sm hover:scale-105"
              )}
            >
              <Icon className={cn("h-10 w-10 mb-2 transition-transform group-hover:rotate-12")} />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-center">{item.label}</span>
              {selected === item.id && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Info Overlay */}
      {selectedItem && (
        <div className="absolute bottom-8 left-8 right-8 animate-in slide-in-from-bottom-8 duration-500">
          <Card className="border-none shadow-2xl ring-1 ring-primary/20 bg-background/90 backdrop-blur-xl rounded-[2rem]">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="p-5 bg-primary/10 rounded-2xl">
                {(() => {
                  const Icon = IconMap[selectedItem.icon];
                  return <Icon className="h-10 w-10 text-primary" />;
                })()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="text-xl font-bold">{selectedItem.label}</h3>
                  <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">Active Node</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => setSelected(null)}>Close</Button>
                <Button size="sm" className="rounded-full bg-primary">Optimize Node</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* View Controls */}
      <div className="absolute top-8 right-8 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-white/80 backdrop-blur shadow-lg border">
          <Maximize2 className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-white/80 backdrop-blur shadow-lg border">
          <Info className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="absolute bottom-8 left-8">
        <Badge className="bg-slate-900/80 text-white backdrop-blur px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          Digital Twin Synchronized
        </Badge>
      </div>
    </div>
  );
}
