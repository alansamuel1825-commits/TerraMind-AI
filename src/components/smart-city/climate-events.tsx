"use client";

import { ClimateEvent } from "@/lib/smart-city-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Flame, 
  Waves, 
  Wind, 
  Thermometer, 
  CloudLightning, 
  AlertTriangle,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const EVENTS = [
  { id: 'Heatwave', label: 'Heatwave', icon: Thermometer, color: 'bg-amber-500', risk: 'High' },
  { id: 'Flood', label: 'Flood Risk', icon: Waves, color: 'bg-blue-500', risk: 'Extreme' },
  { id: 'Drought', label: 'Drought', icon: AlertTriangle, color: 'bg-orange-500', risk: 'Medium' },
  { id: 'Wildfire', label: 'Wildfire', icon: Flame, color: 'bg-red-500', risk: 'Critical' },
  { id: 'Heavy Rain', label: 'Heavy Rain', icon: CloudLightning, color: 'bg-indigo-500', risk: 'High' },
  { id: 'Pollution', label: 'Smog Event', icon: Wind, color: 'bg-slate-500', risk: 'Moderate' },
];

export default function ClimateEvents() {
  const [activeEvent, setActiveEvent] = useState<any>(null);

  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2rem] overflow-hidden">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-xl flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Climate Resilience Stress Test
        </CardTitle>
        <CardDescription>Simulate extreme weather events and measure impact</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {EVENTS.map((event) => (
            <Button
              key={event.id}
              variant={activeEvent?.id === event.id ? "default" : "outline"}
              className={cn(
                "h-auto py-4 px-3 flex flex-col items-center gap-2 rounded-2xl border-2 transition-all",
                activeEvent?.id === event.id ? "ring-4 ring-primary/20 scale-105" : "hover:border-primary/50"
              )}
              onClick={() => setActiveEvent(event)}
            >
              <div className={cn("p-2 rounded-xl text-white", event.color)}>
                <event.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold">{event.label}</span>
            </Button>
          ))}
        </div>

        {activeEvent && (
          <div className="p-6 bg-secondary/30 rounded-3xl border border-border/50 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <Badge variant="destructive" className="mb-2">{activeEvent.risk} Risk Identified</Badge>
                  <h4 className="text-lg font-bold">Simulated {activeEvent.label}</h4>
               </div>
               <ShieldCheck className="h-10 w-10 text-primary opacity-20" />
            </div>
            
            <div className="space-y-4">
               <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Immediate Mitigation Strategy</p>
                  <ul className="grid gap-2">
                     <li className="flex items-start gap-2 text-xs">
                        <div className="h-1 w-1 bg-primary rounded-full mt-1.5 shrink-0" />
                        Activate municipal cooling stations and emergency water rationing.
                     </li>
                     <li className="flex items-start gap-2 text-xs">
                        <div className="h-1 w-1 bg-primary rounded-full mt-1.5 shrink-0" />
                        Deploy AI load-balancing to priority grid sectors (Hospitals, Shelters).
                     </li>
                  </ul>
               </div>
               
               <div className="pt-4 border-t flex justify-between items-center">
                  <p className="text-[10px] font-bold text-muted-foreground">Expected Sustainability Delta: <span className="text-red-500">-12.4%</span></p>
                  <Button variant="ghost" size="sm" className="text-primary font-bold text-xs h-8">
                     Full Protocol <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
               </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
