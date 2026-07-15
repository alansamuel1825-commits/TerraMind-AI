"use client";

import { AgriAnalysis } from "@/lib/agri-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  CheckCircle2, 
  Droplets, 
  Sprout, 
  Thermometer, 
  Download, 
  RotateCcw,
  ShieldCheck,
  Zap,
  Leaf,
  Info,
  Activity
} from "lucide-react";
import ConfidenceGauge from "./confidence-gauge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AnalysisResultsProps {
  analysis: AgriAnalysis;
  onReset: () => void;
}

export default function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
  const isHealthy = analysis.isHealthy;
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Intelligence Report</h2>
          <p className="text-muted-foreground text-sm">Target ID: {analysis.id} | Scanned via Neural V4</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset} className="rounded-full bg-background/50 backdrop-blur">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Scan
          </Button>
          <Button className="rounded-full bg-primary shadow-lg shadow-primary/20" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Export Audit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Result Card */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-2xl ring-1 ring-border/50 rounded-[2.5rem]">
          <div className="grid md:grid-cols-5 h-full">
            <div className="md:col-span-2 relative aspect-square md:aspect-auto">
              <Image src={analysis.imageUrl} alt="Analyzed Crop" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                 <Badge className={cn(
                   "mb-3 border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                   isHealthy ? "bg-green-500" : "bg-red-500"
                 )}>
                   {isHealthy ? "Healthy Specimen" : "Pathogen Detected"}
                 </Badge>
                 <h3 className="text-3xl font-bold text-white tracking-tight">{analysis.plantName}</h3>
                 <p className="text-white/70 text-xs italic font-medium">{analysis.scientificName}</p>
              </div>
            </div>

            <CardContent className="md:col-span-3 p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Neural Diagnosis</h4>
                  <p className="text-3xl font-black italic tracking-tighter">
                    {isHealthy ? "Optimal Health" : analysis.disease}
                  </p>
                </div>
                <ConfidenceGauge value={analysis.confidence} label="Pattern Accuracy" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-secondary/30 rounded-[2rem] border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className={cn("h-4 w-4", analysis.severity === 'high' ? "text-red-500" : "text-amber-500")} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Disease Severity</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000 ease-out",
                        analysis.severity === 'high' ? "bg-red-500 w-full" : 
                        analysis.severity === 'medium' ? "bg-amber-500 w-2/3" : "bg-green-500 w-1/3"
                      )} 
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{analysis.severity} Risk</span>
                    <Badge variant="outline" className="text-[8px] h-4 py-0">Critical Delta</Badge>
                  </div>
                </div>

                <div className="p-5 bg-secondary/30 rounded-[2rem] border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Yield impact</span>
                  </div>
                  <p className="text-2xl font-black italic">{analysis.yieldImpact}</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">Projected Loss</p>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-[10px] font-bold flex items-center gap-2 text-primary uppercase tracking-[0.2em] border-b pb-3">
                  <ShieldCheck className="h-4 w-4" />
                  Strategic Mitigation Actions
                </h5>
                <ul className="grid gap-3">
                  {analysis.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-medium leading-relaxed">
                      <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      </div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Side Info Panels */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl ring-1 ring-border/50 bg-primary/5 rounded-[2.5rem]">
            <CardHeader className="p-8 pb-2">
              <CardTitle className="text-lg flex items-center gap-2 font-bold">
                <Leaf className="h-5 w-5 text-primary" />
                Biological Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
               <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest py-2 border-b">
                    <span className="text-muted-foreground">Conditions</span>
                    <span className="text-foreground">{analysis.plantInfo.growingConditions}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest py-2 border-b">
                    <span className="text-muted-foreground">Climate</span>
                    <span className="text-foreground">{analysis.plantInfo.climatePreference}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest py-2 border-b">
                    <span className="text-muted-foreground">Soil pH</span>
                    <span className="text-foreground">{analysis.plantInfo.soilPreference}</span>
                  </div>
               </div>
               <div className="p-5 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm space-y-4 ring-1 ring-border/50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl"><Droplets className="h-5 w-5 text-blue-600" /></div>
                    <div>
                      <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">Water Protocol</p>
                      <p className="text-xs font-bold">{analysis.waterRecommendation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl"><Thermometer className="h-5 w-5 text-amber-600" /></div>
                    <div>
                      <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">Recovery ETA</p>
                      <p className="text-xs font-bold">{analysis.recoveryTimeline}</p>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2.5rem]">
            <CardHeader className="p-8 pb-2">
              <CardTitle className="text-lg flex items-center gap-2 font-bold">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                Organic Countermeasures
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-3">
              {analysis.organicTreatments.map((ot, i) => (
                <div key={i} className="flex items-center gap-3 text-xs p-3 rounded-2xl bg-green-500/5 text-green-700 dark:text-green-400 font-bold border border-green-500/10">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {ot}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer / AI Explanation */}
      <Card className="border-none shadow-sm ring-1 ring-border/50 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-10">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3 space-y-4">
               <h5 className="text-sm font-bold flex items-center gap-3 text-primary uppercase tracking-[0.2em]">
                 <Info className="h-5 w-5" />
                 Neural Decision Logic
               </h5>
               <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                 TerraMind's Agri-Vision v4 utilizes a deep convolutional neural network calibrated for micro-morphological analysis. Confidence levels reflect pattern matching against our verified pathology library.
               </p>
               <div className="flex gap-2">
                 <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest">Engine: V3.4-AGRI</Badge>
                 <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest">LIME Validated</Badge>
               </div>
            </div>
            <div className="flex-1 grid md:grid-cols-2 gap-10">
               <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Observed Visual Markers</p>
                  <ul className="text-xs space-y-2 list-none font-medium">
                    {analysis.explanation.observations.map((obs, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary">•</span>
                        {obs}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Intelligence Limits</p>
                  <p className="text-[11px] text-muted-foreground italic leading-relaxed bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10">
                    "This report is an educational simulation. Visual identifiers alone may not account for subterranean nutrient deficiencies. Confirmation via certified agronomist is mandatory before implementing commercial chemical regimes."
                  </p>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
