"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BUILDING_TYPES, EnergySimulation, MOCK_ENERGY_SIMULATION } from "@/lib/energy-types";
import { Zap, Calculator, Sparkles, Loader2, CloudSun } from "lucide-react";

interface EnergyFormProps {
  onSimulate: (simulation: EnergySimulation) => void;
  isSimulating: boolean;
}

export default function EnergyForm({ onSimulate, isSimulating }: EnergyFormProps) {
  const [formData, setFormData] = useState({
    buildingType: BUILDING_TYPES[0],
    peopleCount: 4,
    dailyUsage: 30,
    solarCapacity: 5,
    batteryStorage: 10,
    weatherCondition: 'Sunny' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sim: EnergySimulation = {
      ...(MOCK_ENERGY_SIMULATION as EnergySimulation),
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      inputs: formData
    };
    onSimulate(sim);
  };

  return (
    <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2rem] overflow-hidden">
      <CardHeader className="p-8">
        <CardTitle className="text-2xl flex items-center gap-3">
          <Zap className="h-6 w-6 text-primary" />
          Energy Forecast Simulator
        </CardTitle>
        <CardDescription>
          Input your building profile to generate AI-powered renewable energy projections.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Building Type</Label>
              <Select 
                value={formData.buildingType} 
                onValueChange={(v) => setFormData({...formData, buildingType: v})}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {BUILDING_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Avg. Occupancy (People)</Label>
              <Input 
                type="number" 
                className="rounded-xl"
                value={formData.peopleCount}
                onChange={(e) => setFormData({...formData, peopleCount: parseInt(e.target.value) || 0})}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Daily Electricity Usage (kWh)</Label>
                <span className="text-xs font-bold text-primary">{formData.dailyUsage} kWh</span>
              </div>
              <Slider 
                value={[formData.dailyUsage]} 
                max={500} 
                step={5} 
                onValueChange={([v]) => setFormData({...formData, dailyUsage: v})}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Solar Panel Capacity (kWp)</Label>
                <span className="text-xs font-bold text-primary">{formData.solarCapacity} kWp</span>
              </div>
              <Slider 
                value={[formData.solarCapacity]} 
                max={100} 
                step={1} 
                onValueChange={([v]) => setFormData({...formData, solarCapacity: v})}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Battery Storage (kWh)</Label>
                <span className="text-xs font-bold text-primary">{formData.batteryStorage} kWh</span>
              </div>
              <Slider 
                value={[formData.batteryStorage]} 
                max={200} 
                step={2} 
                onValueChange={([v]) => setFormData({...formData, batteryStorage: v})}
              />
            </div>

            <div className="space-y-2">
              <Label>Simulated Weather Condition</Label>
              <Select 
                value={formData.weatherCondition} 
                onValueChange={(v: any) => setFormData({...formData, weatherCondition: v})}
              >
                <SelectTrigger className="rounded-xl">
                  <div className="flex items-center gap-2">
                    <CloudSun className="h-4 w-4" />
                    <SelectValue placeholder="Select condition" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {['Sunny', 'Cloudy', 'Rainy', 'Variable'].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSimulating}
            className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          >
            {isSimulating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Load Profiles...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Intelligence Forecast
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
