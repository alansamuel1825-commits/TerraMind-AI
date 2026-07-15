"use client";

import { useState } from "react";
import { useFirestore, useUser } from "@/firebase";
import { AgriAnalysis, MOCK_ANALYSES } from "@/lib/agri-types";
import { saveAgriAnalysis } from "@/firebase/firestore/agri-service";
import ImageUpload from "@/components/agri/image-upload";
import AnalysisResults from "@/components/agri/analysis-results";
import AnalysisHistory from "@/components/agri/analysis-history";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Sparkles, History, Map as MapIcon, Microscope, BrainCircuit } from "lucide-react";

export default function AgriIntelligencePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AgriAnalysis | null>(null);
  const firestore = useFirestore();
  const { user } = useUser();

  const handleAnalysisStart = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate multi-stage AI processing for maximum exhibition impact
    await new Promise(r => setTimeout(r, 4500));
    
    const mockResult: AgriAnalysis = {
      ...(MOCK_ANALYSES[0] as AgriAnalysis),
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      imageUrl: imageData,
    };

    if (firestore && user) {
      saveAgriAnalysis(firestore, user.uid, mockResult);
    }
    
    setCurrentResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Hero Section - SaaS Inspired */}
      <div className="relative overflow-hidden rounded-[3rem] bg-slate-950 p-16 text-white shadow-2xl premium-shadow border ring-1 ring-white/10">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 bg-[url('https://picsum.photos/seed/agri-hero/1200/800')] bg-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary rounded-[2rem] shadow-2xl shadow-primary/40 animate-float">
              <Sprout className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-1">
               <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-xl">
                 Live Neural Cluster Alpha
               </Badge>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">V4.2 Autonomous Diagnostic</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter leading-[0.9] italic">
              Agriculture <span className="text-primary not-italic">Intelligence</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
              AI-powered Crop Analysis and Sustainable Farming Decision Support. Deploying convolutional neural networks for real-time pathology detection.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
             <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                <Microscope className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">Morphological Vision Active</span>
             </div>
             <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                <BrainCircuit className="h-5 w-5 text-green-500" />
                <span className="text-xs font-bold uppercase tracking-widest">Inference Latency: 42ms</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-10">
          {!currentResult ? (
            <Card className="border-none shadow-2xl ring-1 ring-border/50 rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm animate-in zoom-in-95 duration-700">
              <CardHeader className="p-12 pb-0">
                <CardTitle className="text-3xl font-black tracking-tight flex items-center gap-4 italic">
                  <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  New Diagnostic Scan
                </CardTitle>
                <CardDescription className="text-lg font-medium opacity-60 mt-4 leading-relaxed">
                  Upload high-resolution source imagery to detect pathogens, nutrient deficiencies, and irrigation stress within 5 seconds.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-12 pt-10">
                <ImageUpload onAnalysisStart={handleAnalysisStart} isAnalyzing={isAnalyzing} />
              </CardContent>
            </Card>
          ) : (
            <AnalysisResults 
              analysis={currentResult} 
              onReset={() => setCurrentResult(null)} 
            />
          )}
        </div>

        <div className="lg:col-span-4 space-y-10">
          <Card className="border-none shadow-2xl ring-1 ring-border/50 rounded-[3rem] sticky top-28 bg-card/80 backdrop-blur-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3 uppercase italic">
                <History className="h-6 w-6 text-primary" />
                Recent Audit History
              </CardTitle>
              <CardDescription className="text-sm font-medium">Tracking seasonal health delta across sectors</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <AnalysisHistory onView={(item) => setCurrentResult(item)} />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-border/50 rounded-[2.5rem] bg-slate-950 p-8 text-white group overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-xl"><BrainCircuit className="h-4 w-4 text-primary" /></div>
                  <h4 className="text-sm font-black uppercase tracking-widest italic">AI Planning Tip</h4>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">
                 Our neural layer predicts a 15% increase in humidity next week. Ensure all tomato crops have optimized pruning to prevent **Late Blight** outbreaks.
               </p>
               <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-2/3 group-hover:translate-x-full transition-transform duration-[3s] ease-linear repeat-infinite" />
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
