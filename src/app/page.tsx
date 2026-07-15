
"use client";

import { useState, useEffect } from "react";
import { 
  dashboardKPIs, 
  energyTrendData, 
  wasteDistributionData, 
  aiInsights,
  recentActivity 
} from "@/lib/data";
import KPICard from "@/components/dashboard/kpi-card";
import EmptyState from "@/components/shared/empty-state";
import { 
  Sprout, 
  Zap, 
  CloudRain, 
  Recycle, 
  Activity, 
  Wind, 
  AlertTriangle, 
  Droplets,
  Plus,
  Play,
  Sparkles,
  Map as MapIcon,
  Circle,
  HelpCircle,
  X,
  ChevronRight,
  TrendingUp,
  Database
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";

const kpiIcons = {
  crop: Sprout,
  energy: Zap,
  carbon: CloudRain,
  water: Droplets,
  waste: Recycle,
  air: Wind,
  climate: AlertTriangle,
  health: Activity
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function Dashboard() {
  const [showTour, setShowTour] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setHasMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) return null;

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-48 bg-secondary/40 rounded-[2.5rem]" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-secondary/40 rounded-3xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 pb-20">
      {/* Hero Presentation Layer */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-12 text-white shadow-2xl premium-shadow group">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 bg-[url('https://picsum.photos/seed/terra-hero/1200/800')] bg-cover grayscale transition-all duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="flex items-center gap-4">
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-xl">
              System Operational
            </Badge>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Database className="h-3 w-3 text-primary" />
              1.2TB Processed Today
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-6xl font-black tracking-tighter leading-tight italic">
              {t.dashboard.welcome.split(',')[0]}, <span className="text-primary not-italic">{t.dashboard.welcome.split(',')[1]}</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
              {t.dashboard.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all active:scale-95 group">
              <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              {t.dashboard.askAssistant}
            </Button>
            <Button variant="outline" size="lg" className="bg-white/5 border-white/10 hover:bg-white/10 rounded-full px-8 h-14 font-black uppercase tracking-widest text-xs transition-all text-white backdrop-blur-md" onClick={() => setShowTour(true)}>
              <HelpCircle className="mr-2 h-4 w-4" />
              {t.dashboard.tour}
            </Button>
          </div>
        </div>

        {/* Global Score Indicator */}
        <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-end animate-in slide-in-from-right-10 duration-1000">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{t.dashboard.resilienceIndex}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-black tracking-tighter italic">84.2</span>
            <TrendingUp className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <div className="h-1.5 w-64 bg-slate-800 rounded-full mt-4 overflow-hidden ring-1 ring-white/5">
            <div className="h-full bg-primary w-[84.2%] shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
          </div>
        </div>
      </div>

      {/* KPI Dynamic Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(dashboardKPIs ?? []).map((metric, idx) => (
          <div key={metric.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
            <KPICard 
              metric={metric} 
              icon={kpiIcons[metric.id as keyof typeof kpiIcons]} 
            />
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Intelligence Visualization */}
        <Card className="lg:col-span-2 border-none glass-card rounded-[2.5rem] overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-10 pb-0">
            <div>
              <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Zap className="h-6 w-6 text-amber-500" />
                {t.dashboard.energyMatrix}
              </CardTitle>
              <CardDescription className="text-sm font-medium opacity-60">Daily renewable distribution vs global load</CardDescription>
            </div>
            <Button variant="secondary" size="sm" className="rounded-full font-bold text-[10px] uppercase tracking-widest px-6 h-9 bg-secondary/50 group">
              Intelligence Audit <ChevronRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardHeader>
          <CardContent className="h-[400px] p-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyTrendData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '20px' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                <Area type="monotone" dataKey="solar" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSolar)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Circular Distribution */}
        <Card className="border-none glass-card rounded-[2.5rem] overflow-hidden flex flex-col">
          <CardHeader className="p-10 pb-4">
            <CardTitle className="text-2xl font-black tracking-tight">{t.dashboard.circularFlow}</CardTitle>
            <CardDescription className="text-sm font-medium opacity-60">Material distribution audit</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center p-10">
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {(wasteDistributionData ?? []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="outline-none focus:outline-none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                <span className="text-3xl font-black italic tracking-tighter">88%</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Efficiency</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GIS Interactive Layer */}
      <Card className="border-none glass-card rounded-[2.5rem] overflow-hidden group">
        <CardHeader className="flex flex-row items-center justify-between p-10 pb-4">
          <div>
            <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
              <MapIcon className="h-6 w-6 text-primary" />
              {t.dashboard.geospatial}
            </CardTitle>
            <CardDescription className="text-sm font-medium opacity-60">Live sensor clusters and facility telemetry</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-[450px] relative">
          <div className="absolute inset-0 bg-slate-950 bg-[url('https://picsum.photos/seed/terra-map/1600/1000')] bg-cover opacity-50 transition-all duration-[20s] group-hover:scale-110 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </CardContent>
      </Card>
    </div>
  );
}
