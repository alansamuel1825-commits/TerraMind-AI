"use client";

import { useState } from "react";
import { useFirestore, useUser } from "@/firebase";
import { WasteAnalysis, MOCK_WASTE_ANALYSES } from "@/lib/waste-types";
import { saveWasteAnalysis } from "@/firebase/firestore/waste-service";
import WasteUpload from "@/components/waste/waste-upload";
import WasteResults from "@/components/waste/waste-results";
import WasteHistory from "@/components/waste/waste-history";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle, History, Sparkles, Box, Info } from "lucide-react";

export default function CircularEconomyPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<WasteAnalysis | null>(null);
  const firestore = useFirestore();
  const { user } = useUser();

  const handleAnalysisStart = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate multi-stage AI processing
    await new Promise(r => setTimeout(r, 4500));
    
    const mockResult: WasteAnalysis = {
      ...(MOCK_WASTE_ANALYSES[0] as WasteAnalysis),
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      imageUrl: imageData,
    };

    if (firestore && user) {
      saveWasteAnalysis(firestore, user.uid, mockResult);
    }
    
    setCurrentResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-12 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 bg-[url('https://picsum.photos/seed/circular-hero/1200/800')] bg-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl backdrop-blur-xl border border-primary/30">
              <Recycle className="h-8 w-8 text-primary" />
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest">
              Circular Intelligence Node
            </Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">Circular Economy & Waste Intelligence</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              AI-powered waste classification, recycling guidance, and sustainability insights.
            </p>
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
                  Waste Classification Engine
                </CardTitle>
                <CardDescription className="text-base">
                  Upload an image of an object or material to identify its composition and optimal circular lifecycle.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-10">
                <WasteUpload onAnalysisStart={handleAnalysisStart} isAnalyzing={isAnalyzing} />
              </CardContent>
            </Card>
          ) : (
            <WasteResults 
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
                Audit History
              </CardTitle>
              <CardDescription>Track material flow and classification logs</CardDescription>
            </CardHeader>
            <CardContent>
              <WasteHistory onView={(item) => setCurrentResult(item)} />
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm ring-1 ring-border/50 rounded-[2rem] bg-secondary/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Sustainability Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 Electronic waste (e-waste) is the fastest-growing waste stream. Most components contain precious metals like gold and silver that can be recovered through specialized recycling.
               </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
