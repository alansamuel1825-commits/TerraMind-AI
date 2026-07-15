
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map as MapIcon, Maximize2, Layers, Search, Crosshair } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ExecutiveMap() {
  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden lg:col-span-2">
      <CardHeader className="p-8 pb-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <MapIcon className="h-5 w-5 text-primary" />
              Global Intelligence Map
            </CardTitle>
            <CardDescription>Unified facility and sensor telemetry overlay</CardDescription>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search facility ID..." className="pl-9 h-9 rounded-full bg-secondary border-none text-xs" />
             </div>
             <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full"><Layers className="h-4 w-4" /></Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative h-[500px] mt-6">
         {/* Grid and Map Placeholder */}
         <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 bg-[url('https://picsum.photos/seed/executive-map/1600/1000')] bg-cover opacity-60 grayscale" />
         <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
         
         {/* Live Markers */}
         <MapMarker top="20%" left="30%" label="Agri-Zone Alpha" status="Healthy" />
         <MapMarker top="45%" left="60%" label="Solar Plant B-12" status="Optimal" />
         <MapMarker top="70%" left="25%" label="Waste Hub #4" status="High Load" color="bg-amber-500" />
         <MapMarker top="30%" left="75%" label="River Sensor 09" status="Good" />

         <div className="absolute bottom-6 left-6 flex flex-col gap-2">
            <Badge className="bg-slate-950/90 text-white backdrop-blur px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
               <Crosshair className="h-3.5 w-3.5 text-primary" />
               Real-time GIS Sync: Active
            </Badge>
         </div>

         <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <Button size="icon" className="h-10 w-10 rounded-full shadow-lg"><Maximize2 className="h-5 w-5" /></Button>
         </div>
      </CardContent>
    </Card>
  );
}

function MapMarker({ top, left, label, status, color = "bg-primary" }: any) {
  return (
    <div className="absolute group cursor-pointer" style={{ top, left }}>
       <div className={cn("h-4 w-4 rounded-full border-2 border-white shadow-xl animate-pulse ring-4 ring-primary/20", color)} />
       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 rounded-xl text-[10px] font-bold border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap min-w-[120px]">
          <div className="flex justify-between items-center mb-1">
             <span>{label}</span>
             <Badge variant="outline" className="text-[8px] h-3 px-1">{status}</Badge>
          </div>
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
             <div className="h-full bg-primary w-2/3" />
          </div>
       </div>
    </div>
  );
}
