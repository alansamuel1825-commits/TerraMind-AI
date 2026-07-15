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
  Info
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
          <h2 className="text-3xl font-bold tracking-tight">Analysis Report</h2>
          <p className="text-muted-foreground">Generated on {new Date(analysis.timestamp).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset} className="rounded-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Scan
          </Button>
          <Button className="rounded-full" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Result Card */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-xl ring-1 ring-border/50">
          <div className="grid md:grid-cols-5 h-full">
            <div className="md:col-span-2 relative aspect-square md:aspect-auto">
              <Image src={analysis.imageUrl} alt="Analyzed Crop" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                 <Badge className={cn(
                   "mb-2 border-none",
                   isHealthy ? "bg-green-500" : "bg-red-500"
                 )}>
                   {isHealthy ? "Healthy Specimen" : "Disease Detected"}
                 </Badge>
                 <h3 className="text-2xl font-bold text-white">{analysis.plantName}</h3>
                 <p className="text-white/80 text-xs italic">{analysis.scientificName}</p>
              </div>
            </div>

            <CardContent className="md:col-span-3 p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Primary Diagnosis</h4>
                  <p className="text-2xl font-bold">{isHealthy ? "Optimal Health" : analysis.disease}</p>
                </div>
                <ConfidenceGauge value={analysis.confidence} label="Neural Pattern Match" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className={cn("h-4 w-4", analysis.severity === 'high' ? "text-red-500" : "text-amber-500")} />
                    <span className="text-xs font-bold uppercase">Severity</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        analysis.severity === 'high' ? "bg-red-500 w-full" : 
                        analysis.severity === 'medium' ? "bg-amber-500 w-2/3" : "bg-green-500 w-1/3"
                      )} 
                    />
                  </div>
                  <p className="text-xs font-semibold mt-2 capitalize">{analysis.severity} Risk Level</p>
                </div>

                <div className="p-4 bg-secondary/30 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Sprout className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold uppercase">Yield Impact</span>
                  </div>
                  <p className="text-lg font-bold">{analysis.yieldImpact}</p>
                  <p className="text-[10px] text-muted-foreground">Projected seasonal delta</p>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-sm font-bold flex items-center gap-2 border-b pb-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Immediate Recommended Actions
                </h5>
                <ul className="grid gap-2">
                  {analysis.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
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
          <Card className="border-none shadow-lg ring-1 ring-border/50 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Plant Biology Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-3">
                  <div className="flex justify-between text-xs py-1 border-b">
                    <span className="text-muted-foreground">Growing Conditions</span>
                    <span className="font-bold">{analysis.plantInfo.growingConditions}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b">
                    <span className="text-muted-foreground">Climate Tolerance</span>
                    <span className="font-bold">{analysis.plantInfo.climatePreference}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b">
                    <span className="text-muted-foreground">Soil Chemistry</span>
                    <span className="font-bold">{analysis.plantInfo.soilPreference}</span>
                  </div>
               </div>
               <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg"><Droplets className="h-4 w-4 text-blue-600" /></div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Water Strategy</p>
                      <p className="text-xs font-semibold">{analysis.waterRecommendation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg"><Thermometer className="h-4 w-4 text-amber-600" /></div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Recovery Phase</p>
                      <p className="text-xs font-semibold">{analysis.recoveryTimeline}</p>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg ring-1 ring-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                Eco-Friendly Measures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.organicTreatments.map((ot, i) => (
                <div key={i} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {ot}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer / AI Explanation */}
      <Card className="border-none shadow-sm ring-1 ring-border/50 bg-slate-50 dark:bg-slate-900/50">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 space-y-4">
               <h5 className="font-bold flex items-center gap-2 text-primary">
                 <Info className="h-4 w-4" />
                 AI reasoning disclosure
               </h5>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 TerraMind's Agri-Vision model utilizes a Convolutional Neural Network (CNN) trained on over 500,000 agricultural pathology datasets.
               </p>
               <div className="flex gap-2">
                 <Badge variant="outline" className="text-[10px]">Model: V3.4-AGRI</Badge>
                 <Badge variant="outline" className="text-[10px]">LIME Verified</Badge>
               </div>
            </div>
            <div className="flex-1 grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Visual Observations</p>
                  <ul className="text-xs space-y-1 list-disc pl-4">
                    {analysis.explanation.observations.map((obs, i) => <li key={i}>{obs}</li>)}
                  </ul>
               </div>
               <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Safety Notice</p>
                  <p className="text-[11px] text-muted-foreground italic border-l-2 pl-3 border-amber-500">
                    This analysis is for educational and strategic demonstration purposes. Always consult with a certified agronomist or plant pathologist before applying industrial-scale chemical or biological treatments.
                  </p>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
