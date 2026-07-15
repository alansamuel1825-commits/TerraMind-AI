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
import { Sprout, Sparkles, History, Map as MapIcon, Microscope } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AgriIntelligencePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AgriAnalysis | null>(null);
  const firestore = useFirestore();
  const { user } = useUser();

  const handleAnalysisStart = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate multi-stage AI processing
    await new Promise(r => setTimeout(r, 4000));
    
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
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-12 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 bg-[url('https://picsum.photos/seed/agri-hero/1200/800')] bg-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl backdrop-blur-xl border border-primary/30">
              <Sprout className="h-8 w-8 text-primary" />
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest">
              Live AI Network V4
            </Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">Agriculture Intelligence</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              AI-powered Crop Analysis and Sustainable Farming Decision Support.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Microscope className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold">Vision AI Active</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <MapIcon className="h-4 w-4 text-green-500" />
                <span className="text-xs font-semibold">Soil Telemetry Sync</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          {!currentResult ? (
            <Card className="border-none shadow-xl ring-1 ring-border/50 rounded-[2rem] overflow-hidden">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Crop Health Diagnostic
                </CardTitle>
                <CardDescription className="text-base">
                  Upload high-resolution imagery to detect pathogens, nutrient deficiencies, and irrigation stress.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-10">
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

        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-lg ring-1 ring-border/50 rounded-[2rem] sticky top-24">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-3">
                <History className="h-5 w-5 text-primary" />
                Recent Analyses
              </CardTitle>
              <CardDescription>Track seasonal health progression</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalysisHistory onView={(item) => setCurrentResult(item)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
