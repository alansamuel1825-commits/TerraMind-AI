"use client";

import { SimulationResults } from "@/lib/smart-city-types";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  CloudRain, 
  Activity, 
  Droplets, 
  Thermometer, 
  Trash2, 
  Sprout, 
  Globe 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CityIndicatorsProps {
  results: SimulationResults;
}

export default function CityIndicators({ results }: CityIndicatorsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      <IndicatorItem 
        icon={Globe} 
        label="Sustain. Score" 
        value={results.sustainabilityScore} 
        unit="" 
        color="text-primary" 
        isScore 
      />
      <IndicatorItem 
        icon={Zap} 
        label="Energy Demand" 
        value={results.energyDemand} 
        unit="MW" 
        inverse 
      />
      <IndicatorItem 
        icon={CloudRain} 
        label="Carbon Flow" 
        value={results.carbonEmissions} 
        unit="t/h" 
        inverse 
      />
      <IndicatorItem 
        icon={Activity} 
        label="Air Quality" 
        value={results.airQualityIndex} 
        unit="AQI" 
        inverse 
      />
      <IndicatorItem 
        icon={Droplets} 
        label="Water Stress" 
        value={results.waterStress} 
        unit="%" 
        inverse 
      />
      <IndicatorItem 
        icon={Thermometer} 
        label="Urban Heat" 
        value={results.urbanHeatScore} 
        unit="" 
        inverse 
      />
      <IndicatorItem 
        icon={Sprout} 
        label="Crop Yield" 
        value={results.cropProductivity} 
        unit="%" 
      />
      <IndicatorItem 
        icon={Trash2} 
        label="Waste Eff." 
        value={results.wasteManagement} 
        unit="%" 
      />
    </div>
  );
}

function IndicatorItem({ icon: Icon, label, value, unit, color, inverse, isScore }: any) {
  // Simple logic for coloring (green = good, red = bad)
  const isBad = inverse ? value > 60 : value < 40;
  
  return (
    <Card className="border-none shadow-sm ring-1 ring-border/50 hover:translate-y-[-2px] transition-all bg-card/50 backdrop-blur overflow-hidden">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-lg bg-secondary", color || "text-muted-foreground")}>
            <Icon className="h-4 w-4" />
          </div>
          {isBad ? (
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          ) : (
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          )}
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground truncate">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className={cn("text-lg font-bold tracking-tight", isBad ? "text-red-500" : "text-foreground")}>
              {Math.round(value)}
            </span>
            <span className="text-[10px] text-muted-foreground">{unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
