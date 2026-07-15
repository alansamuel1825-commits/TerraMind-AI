
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
  Database,
  LayoutDashboard
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
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 h-[400px] bg-secondary/40 rounded-[2.5rem]" />
          <div className="h-[400px] bg-secondary/40 rounded-[2.5rem]" />
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
              Welcome back, <span className="text-primary not-italic">Director.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
              TerraMind AI has stabilized regional environmental corridors. Global Sustainability Score is trending at <span className="text-primary font-black">84.2%</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all active:scale-95 group">
              <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              Ask Neural Assistant
            </Button>
            <Button variant="outline" size="lg" className="bg-white/5 border-white/10 hover:bg-white/10 rounded-full px-8 h-14 font-black uppercase tracking-widest text-xs transition-all text-white backdrop-blur-md" onClick={() => setShowTour(true)}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Director's Tour
            </Button>
          </div>
        </div>

        {/* Global Score Indicator */}
        <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-end animate-in slide-in-from-right-10 duration-1000">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Resilience Index</p>
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
        {dashboardKPIs.map((metric, idx) => (
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
                Energy Strategy Matrix
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
            <CardTitle className="text-2xl font-black tracking-tight">Circular Flow</CardTitle>
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
                    {wasteDistributionData.map((entry, index) => (
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
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-10 w-full">
              {wasteDistributionData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full ring-4 ring-secondary/50" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* GIS Interactive Layer */}
        <Card className="lg:col-span-2 border-none glass-card rounded-[2.5rem] overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between p-10 pb-4">
            <div>
              <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                <MapIcon className="h-6 w-6 text-primary" />
                Geospatial Intelligence
              </CardTitle>
              <CardDescription className="text-sm font-medium opacity-60">Live sensor clusters and facility telemetry</CardDescription>
            </div>
            <div className="flex gap-2">
              {['Farms', 'Solar', 'Cities'].map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer bg-white/5 hover:bg-primary hover:text-white transition-all rounded-lg px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border-none">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[450px] relative">
            <div className="absolute inset-0 bg-slate-950 bg-[url('https://picsum.photos/seed/terra-map/1600/1000')] bg-cover opacity-50 transition-all duration-[20s] group-hover:scale-110 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            
            {/* Pulsing Facility Markers */}
            <div className="absolute top-1/4 left-1/3 h-5 w-5 bg-primary rounded-full animate-pulse border-4 border-white ring-4 ring-primary/20 shadow-2xl cursor-pointer group/marker z-10">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-slate-950 text-white text-[10px] font-bold p-3 rounded-2xl border border-white/10 shadow-2xl opacity-0 group-hover/marker:opacity-100 transition-all duration-300 scale-95 group-hover/marker:scale-100 whitespace-nowrap">
                Solar Plant Alpha <span className="text-primary ml-2">• 120% Efficiency</span>
              </div>
            </div>

            <div className="absolute top-1/2 left-2/3 h-5 w-5 bg-green-500 rounded-full animate-pulse border-4 border-white ring-4 ring-green-500/20 shadow-2xl cursor-pointer group/marker z-10">
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-slate-950 text-white text-[10px] font-bold p-3 rounded-2xl border border-white/10 shadow-2xl opacity-0 group-hover/marker:opacity-100 transition-all duration-300 scale-95 group-hover/marker:scale-100 whitespace-nowrap">
                Smart Farm #12 <span className="text-green-500 ml-2">• Soil Index Optimal</span>
              </div>
            </div>

            <div className="absolute bottom-10 right-10 flex items-center gap-3">
              <Button size="icon" className="h-14 w-14 rounded-full shadow-2xl bg-primary text-white border-4 border-white hover:scale-110 transition-all"><Plus className="h-6 w-6" /></Button>
              <Button size="icon" variant="secondary" className="h-14 w-14 rounded-full shadow-2xl bg-white text-slate-900 border-4 border-white hover:scale-110 transition-all"><Play className="h-6 w-6" /></Button>
            </div>
            
            <div className="absolute bottom-10 left-10 p-5 bg-slate-950/80 backdrop-blur-2xl rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="h-6 w-6 rounded-full border-2 border-slate-950 bg-primary" />)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">34 Active Analysts</span>
            </div>
          </CardContent>
        </Card>

        {/* AI & Operations Sidebar */}
        <div className="space-y-8">
          <Card className="border-none glass-card rounded-[2.5rem] overflow-hidden premium-shadow">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                Neural Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-8 pt-0">
              {aiInsights.length > 0 ? (
                aiInsights.map((insight) => (
                  <div key={insight.id} className="p-5 rounded-3xl bg-secondary/30 border border-border/50 group cursor-pointer hover:bg-primary/5 hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xs font-black flex items-center gap-2 uppercase tracking-tight">
                        <Circle className={cn(
                          "h-1.5 w-1.5 fill-current",
                          insight.type === 'success' ? "text-green-500" : insight.type === 'warning' ? "text-amber-500" : "text-blue-500"
                        )} />
                        {insight.title}
                      </h4>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">{insight.time}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">{insight.description}</p>
                  </div>
                ))
              ) : (
                <EmptyState icon={Sparkles} title="No insights" description="System is currently calibrating data." />
              )}
            </CardContent>
          </Card>

          <Card className="border-none glass-card rounded-[2.5rem] overflow-hidden premium-shadow">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black tracking-tight">Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-primary/10">
                {recentActivity.map((item) => (
                  <div key={item.id} className="relative pl-10 group cursor-pointer">
                    <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 transition-transform group-hover:scale-125">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>
                    <p className="text-xs font-black leading-none uppercase tracking-tight group-hover:text-primary transition-colors">{item.action}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-bold opacity-60 uppercase">{item.target} • {item.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-8 h-10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5">
                Audit Trail Archive
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Guided Tour Modal */}
      {showTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
           <Card className="w-full max-w-lg rounded-[2.5rem] border-none shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="p-10 bg-primary text-white space-y-4 relative">
                <Button variant="ghost" size="icon" className="absolute top-6 right-6 text-white hover:bg-white/10 rounded-full" onClick={() => setShowTour(false)}>
                  <X className="h-5 w-5" />
                </Button>
                <div className="p-3 bg-white/20 rounded-2xl w-fit backdrop-blur-xl">
                  <Activity className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter italic">TerraMind Director's Tour</h2>
                <p className="text-sm font-medium opacity-80 leading-relaxed">Welcome to the future of planetary management. Let's explore your command center.</p>
              </div>
              <CardContent className="p-10 space-y-6">
                <TourItem icon={LayoutDashboard} title="Overview Dashboard" text="Aggregate telemetry from every regional module." />
                <TourItem icon={Sprout} title="Agricultural AI" titleColor="text-green-500" text="Predictive crop pathology and soil genome sequencing." />
                <TourItem icon={Zap} title="Grid Management" titleColor="text-amber-500" text="Decentralized microgrid load-balancing and solar forecasting." />
                <TourItem icon={Sparkles} title="Neural Assistant" titleColor="text-primary" text="Direct interface with the TerraMind LLM for complex queries." />
                
                <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-slate-950 text-white mt-4" onClick={() => setShowTour(false)}>
                  Initialize Command
                </Button>
              </CardContent>
           </Card>
        </div>
      )}
    </div>
  );
}

function TourItem({ icon: Icon, title, titleColor = "text-foreground", text }: any) {
  return (
    <div className="flex gap-5">
      <div className="p-3 bg-secondary rounded-2xl h-fit">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <h4 className={cn("text-sm font-black uppercase tracking-tight mb-1", titleColor)}>{title}</h4>
        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
