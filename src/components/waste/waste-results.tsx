"use client";

import { WasteAnalysis } from "@/lib/waste-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Recycle, 
  RotateCcw, 
  Download, 
  Trash2, 
  Lightbulb, 
  CheckCircle2, 
  Leaf, 
  Clock, 
  Info, 
  Zap,
  Globe,
  AlertTriangle
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface WasteResultsProps {
  analysis: WasteAnalysis;
  onReset: () => void;
}

export default function WasteResults({ analysis, onReset }: WasteResultsProps) {
  const circularityScore = Math.round(analysis.confidence * 100);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Intelligence Report</h2>
          <p className="text-muted-foreground">Analyzed on {new Date(analysis.timestamp).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset} className="rounded-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Upload Another
          </Button>
          <Button className="rounded-full" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Export Audit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Result Card */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-xl ring-1 ring-border/50">
          <div className="grid md:grid-cols-5 h-full">
            <div className="md:col-span-2 relative aspect-square md:aspect-auto">
              <Image src={analysis.imageUrl} alt="Analyzed Waste" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                 <Badge className={cn(
                   "mb-2 border-none px-3 py-1",
                   analysis.isRecyclable ? "bg-green-500 text-white" : "bg-red-500 text-white"
                 )}>
                   {analysis.isRecyclable ? "Recyclable" : "Non-Recyclable"}
                 </Badge>
                 <h3 className="text-3xl font-bold text-white">{analysis.category}</h3>
                 <p className="text-white/70 text-xs font-medium uppercase tracking-widest mt-1">Classification Match</p>
              </div>
            </div>

            <CardContent className="md:col-span-3 p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Optimal Disposal</h4>
                  <p className="text-2xl font-bold text-primary">{analysis.disposalMethod}</p>
                </div>
                <div className="flex flex-col items-center">
                   <div className="h-16 w-16 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 border-4 border-primary rounded-full" style={{ clipPath: `inset(0 0 ${100 - circularityScore}% 0)` }} />
                      <span className="text-lg font-bold">{circularityScore}%</span>
                   </div>
                   <span className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">Circularity Index</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-secondary/30 rounded-2xl border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                       <Recycle className="h-4 w-4 text-primary" />
                       <span className="text-[10px] font-bold uppercase">Recycling Path</span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed">{analysis.recyclingMethod}</p>
                 </div>
                 <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                       <Globe className="h-4 w-4 text-green-600" />
                       <span className="text-[10px] font-bold uppercase text-green-600">Env. Benefit</span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed text-green-700 dark:text-green-400">{analysis.environmentalBenefit}</p>
                 </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <h5 className="text-sm font-bold uppercase tracking-wider">Circular Lifecycle Ideas</h5>
                </div>
                <div className="grid gap-3">
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Reuse Suggestions</p>
                      <div className="flex flex-wrap gap-2">
                         {analysis.reuseIdeas.map((idea, i) => (
                           <Badge key={i} variant="secondary" className="text-[10px] py-0">{idea}</Badge>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Upcycling Blueprint</p>
                      <ul className="grid gap-1">
                        {analysis.upcyclingIdeas.map((idea, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            {idea}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Side Info Panels */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg ring-1 ring-border/50 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Box className="h-5 w-5 text-primary" />
                Material Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-3">
                  <div className="flex justify-between text-xs py-1 border-b">
                    <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Decomposition</span>
                    <span className="font-bold">{analysis.materialInfo.decompositionTime}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Typical Industrial Uses</span>
                    <div className="flex flex-wrap gap-1">
                       {analysis.materialInfo.typicalUses.map((use, i) => (
                         <Badge key={i} variant="outline" className="text-[9px]">{use}</Badge>
                       ))}
                    </div>
                  </div>
               </div>
               
               <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm space-y-3 ring-1 ring-border/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg"><Info className="h-4 w-4 text-blue-600" /></div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Impact Factor</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{analysis.materialInfo.environmentalConsiderations}</p>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg ring-1 ring-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Recycling Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.materialInfo.recyclingFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] p-2 rounded-lg bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 font-medium leading-relaxed">
                  <Zap className="h-3 w-3 mt-0.5 shrink-0" />
                  {fact}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Explanation Section */}
      <Card className="border-none shadow-sm ring-1 ring-border/50 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem]">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
             <div className="space-y-4">
                <h5 className="font-bold flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  AI Decision Logic
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  TerraMind's Circular Vision uses thermodynamic material mapping and spectral geometry analysis.
                </p>
                <div className="flex gap-2">
                   <Badge variant="outline" className="text-[10px]">Ver: 1.2-WASTE</Badge>
                   <Badge variant="outline" className="text-[10px]">Verified Logic</Badge>
                </div>
             </div>

             <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b pb-1">Visual Observations</p>
                   <ul className="text-xs space-y-1.5 list-disc pl-4 text-muted-foreground">
                     {analysis.explanation.observations.map((obs, i) => <li key={i}>{obs}</li>)}
                   </ul>
                </div>
                <div className="space-y-3">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b pb-1">Safety & Limitations</p>
                   <p className="text-[11px] text-muted-foreground leading-relaxed">
                     {analysis.explanation.limitations}
                   </p>
                   <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg flex items-start gap-2 border border-amber-200/50">
                      <AlertTriangle className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                        Always follow local municipal recycling codes. Uncertain items should be discarded in general waste to prevent recycling contamination.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
