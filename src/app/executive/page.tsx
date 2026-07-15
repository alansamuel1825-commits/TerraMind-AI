
"use client";

import GlobalKPIGrid from "@/components/executive/global-kpi-grid";
import ScoreEngine from "@/components/executive/score-engine";
import ExecutiveMap from "@/components/executive/executive-map";
import ScenarioComparison from "@/components/executive/scenario-comparison";
import ReportCenter from "@/components/executive/report-center";
import { SYSTEM_ALERTS } from "@/lib/executive-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  Sparkles, 
  Search, 
  Download, 
  Printer, 
  Zap, 
  FileText,
  Clock,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExecutiveCenter() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Executive Hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-12 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-30 bg-[url('https://picsum.photos/seed/executive-center/1200/800')] bg-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl backdrop-blur-xl border border-primary/30">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest">
              Executive Command Layer v1.0
            </Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">Executive Intelligence Center</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Unified Sustainability Decision Dashboard for global resilience and climate strategy.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
             <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-12 shadow-lg shadow-primary/20">
               <FileText className="mr-2 h-5 w-5" /> Generate Quarterly Audit
             </Button>
             <Button variant="outline" className="rounded-full px-8 border-white/20 text-white hover:bg-white/10 font-bold h-12">
               <Printer className="mr-2 h-5 w-5" /> Print Strategic Overview
             </Button>
          </div>
        </div>
      </div>

      {/* Global Metrics Row */}
      <GlobalKPIGrid />

      {/* Main Command Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left/Middle Column */}
        <div className="lg:col-span-2 space-y-8">
           <ScoreEngine />
           <ExecutiveMap />
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-8">
           {/* Scenario Comparison */}
           <ScenarioComparison />

           {/* System Status / Alerts */}
           <Card className="border-none shadow-lg ring-1 ring-border/50 rounded-[2.5rem]">
              <CardHeader className="pb-2">
                 <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    System Operational Status
                 </CardTitle>
                 <CardDescription>Live health of the TerraMind network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 {SYSTEM_ALERTS.map((alert) => (
                   <div key={alert.id} className="p-4 rounded-2xl bg-secondary/30 border border-border/50 flex items-start gap-4">
                      <div className={cn(
                        "p-2 rounded-xl mt-0.5",
                        alert.type === 'success' ? "bg-green-100 text-green-600" : 
                        alert.type === 'warning' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                      )}>
                        {alert.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                         <h5 className="text-xs font-bold mb-1">{alert.title}</h5>
                         <p className="text-[10px] text-muted-foreground leading-relaxed">{alert.message}</p>
                         <p className="text-[9px] font-bold text-muted-foreground mt-2 uppercase">{alert.time}</p>
                      </div>
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full text-xs font-bold text-primary group">
                   View Full Logs <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                 </Button>
              </CardContent>
           </Card>

           {/* Report Hub */}
           <ReportCenter />
        </div>
      </div>

      {/* Footer / AI Strategy Notice */}
      <Card className="border-none shadow-sm ring-1 ring-border/50 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem]">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="p-4 bg-primary/10 rounded-2xl">
                 <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-lg font-bold">AI Strategy recommendation active</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                   Based on executive score trends, we recommend prioritizing <span className="text-green-600 font-bold">Agriculture Yield Protection</span> in Sector 7 to maintain overall resilience scores above 80.0.
                 </p>
              </div>
           </div>
           <Button className="rounded-full px-6 bg-slate-950 text-white hover:bg-slate-800">
             Open AI Assistant
           </Button>
        </CardContent>
      </Card>
    </div>
  );
}
