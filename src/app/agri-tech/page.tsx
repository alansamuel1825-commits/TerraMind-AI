
"use client";

import { agriMetrics } from "@/lib/data";
import MetricCard from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sprout, Microscope, Dna } from "lucide-react";

export default function AgriTechPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sustainable Agri-Tech</h2>
        <p className="text-muted-foreground mt-1">Molecular synthesis & soil genome predictive modeling</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {agriMetrics.map((m) => <MetricCard key={m.label} metric={m} />)}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dna className="h-5 w-5 text-primary" />
              Real-time Genome Sequencing
            </CardTitle>
            <CardDescription>Designing custom bio-fertilizers via soil DNA telemetry</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[88%] animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                   <div className="p-3 bg-muted rounded">
                      <p className="text-muted-foreground text-xs">Phosphate Matching</p>
                      <p className="font-bold">92% Precision</p>
                   </div>
                   <div className="p-3 bg-muted rounded">
                      <p className="text-muted-foreground text-xs">Nitrogen Cycle</p>
                      <p className="font-bold">Optimized</p>
                   </div>
                </div>
                <p className="text-xs text-muted-foreground italic border-l-2 pl-2 border-primary">
                  "Molecular synthesis AI is currently generating a custom liquid microbial fertilizer blueprint for the Southwest plot."
                </p>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5 text-primary" />
              Precision Resource Allocation
            </CardTitle>
            <CardDescription>Satellite/Drone imagery & automated irrigation control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="aspect-video bg-[url('https://picsum.photos/seed/farm/800/450')] bg-cover rounded-md flex items-end p-4 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <div className="bg-black/60 text-white text-[10px] p-2 rounded backdrop-blur-sm">
                   Live Analysis: Plot B-12 | NDVI: 0.84 | Water Stress: 0.02
                </div>
             </div>
             <p className="text-sm text-muted-foreground">Cascading effects prediction: High efficiency irrigation in Plot B-12 will reduce wastewater downstream by 14%.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
