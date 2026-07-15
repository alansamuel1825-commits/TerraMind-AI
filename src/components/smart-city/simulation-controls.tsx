"use client";

import { CityMetrics } from "@/lib/smart-city-types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, 
  CloudRain, 
  Thermometer, 
  Zap, 
  Trees, 
  Recycle, 
  Car, 
  Droplet, 
  Bus, 
  Building 
} from "lucide-react";

interface SimulationControlsProps {
  metrics: CityMetrics;
  onChange: (metrics: CityMetrics) => void;
}

export default function SimulationControls({ metrics, onChange }: SimulationControlsProps) {
  const updateMetric = (key: keyof CityMetrics, value: number) => {
    onChange({ ...metrics, [key]: value });
  };

  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2rem] h-full overflow-hidden">
      <CardHeader className="bg-secondary/20 border-b p-8">
        <CardTitle className="text-xl">Decision Controls</CardTitle>
        <CardDescription>Adjust variables to simulate urban impact</CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-8 h-[calc(100%-120px)] overflow-y-auto">
        <div className="space-y-6">
          <ControlItem 
            icon={Users} 
            label="Population" 
            value={metrics.population} 
            unit="" 
            max={500000} 
            step={1000} 
            onChange={(v) => updateMetric('population', v)} 
          />
          <ControlItem 
            icon={Thermometer} 
            label="Ambient Temp" 
            value={metrics.temperature} 
            unit="°C" 
            max={50} 
            step={1} 
            onChange={(v) => updateMetric('temperature', v)} 
          />
          <ControlItem 
            icon={Zap} 
            label="Renewable Energy" 
            value={metrics.renewablePercent} 
            unit="%" 
            max={100} 
            step={1} 
            onChange={(v) => updateMetric('renewablePercent', v)} 
          />
          <ControlItem 
            icon={Trees} 
            label="Tree Coverage" 
            value={metrics.treeCoverage} 
            unit="%" 
            max={80} 
            step={1} 
            onChange={(v) => updateMetric('treeCoverage', v)} 
          />
          <ControlItem 
            icon={Car} 
            label="Traffic Density" 
            value={metrics.trafficDensity} 
            unit="%" 
            max={100} 
            step={1} 
            onChange={(v) => updateMetric('trafficDensity', v)} 
          />
          <ControlItem 
            icon={Bus} 
            label="Public Transit" 
            value={metrics.publicTransport} 
            unit="%" 
            max={100} 
            step={1} 
            onChange={(v) => updateMetric('publicTransport', v)} 
          />
          <ControlItem 
            icon={Building} 
            label="Green Roofs" 
            value={metrics.greenRoofAdoption} 
            unit="%" 
            max={100} 
            step={1} 
            onChange={(v) => updateMetric('greenRoofAdoption', v)} 
          />
          <ControlItem 
            icon={Recycle} 
            label="Recycling Rate" 
            value={metrics.recyclingRate} 
            unit="%" 
            max={100} 
            step={1} 
            onChange={(v) => updateMetric('recyclingRate', v)} 
          />
          <ControlItem 
            icon={CloudRain} 
            label="Annual Rainfall" 
            value={metrics.rainfall} 
            unit="mm" 
            max={4000} 
            step={50} 
            onChange={(v) => updateMetric('rainfall', v)} 
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ControlItem({ icon: Icon, label, value, unit, max, step, onChange }: any) {
  return (
    <div className="space-y-3 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
            <Icon className="h-4 w-4" />
          </div>
          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</Label>
        </div>
        <span className="text-xs font-bold text-primary">{value.toLocaleString()}{unit}</span>
      </div>
      <Slider 
        value={[value]} 
        max={max} 
        step={step} 
        onValueChange={([v]) => onChange(v)} 
        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
      />
    </div>
  );
}
