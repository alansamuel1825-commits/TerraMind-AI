
"use client";

import { 
  dashboardKPIs, 
  energyTrendData, 
  wasteDistributionData, 
  aiInsights,
  recentActivity 
} from "@/lib/data";
import KPICard from "@/components/dashboard/kpi-card";
import { 
  Sprout, 
  Zap, 
  CloudRain, 
  Recycle, 
  Activity, 
  Wind, 
  AlertTriangle, 
  Droplets,
  ArrowRight,
  Plus,
  Play,
  FileText,
  Sparkles,
  Map as MapIcon,
  Circle
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
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-8 py-10 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-[url('https://picsum.photos/seed/earth/600/600')] bg-cover grayscale" />
        <div className="relative z-10 max-w-2xl">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 backdrop-blur-md">System Operational</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back, Director.</h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            TerraMind AI has processed <span className="text-white font-semibold">1.2TB</span> of satellite telemetry today. 
            Overall Sustainability Score is <span className="text-primary font-bold">84.2</span>, up 2% from last cycle.
          </p>
          <div className="flex items-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Ask AI Assistant
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-slate-700 hover:bg-slate-800 rounded-full text-white">
              <FileText className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardKPIs.map((metric) => (
          <KPICard 
            key={metric.id} 
            metric={metric} 
            icon={kpiIcons[metric.id as keyof typeof kpiIcons]} 
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Analytics */}
        <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Energy Strategy Trend</CardTitle>
              <CardDescription>Renewable vs Consumption distribution (Daily)</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">
              Full Analysis <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#3b82f6" fillOpacity={0.1} fill="#3b82f6" />
                <Area type="monotone" dataKey="solar" stroke="#10b981" fillOpacity={0.2} fill="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Pie */}
        <Card className="border-none shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Circular Flow</CardTitle>
            <CardDescription>Material distribution index</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-6 w-full">
              {wasteDistributionData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map Panel */}
        <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-border/50 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <MapIcon className="h-5 w-5 text-primary" />
                Geospatial Intelligence
              </CardTitle>
              <CardDescription>Live sensor clusters and facility mapping</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Farms</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Solar</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Cities</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[400px] relative">
            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 bg-[url('https://picsum.photos/seed/geospatial/1200/800')] bg-cover opacity-60 transition-all hover:scale-105 duration-[10s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            
            {/* Fake Markers */}
            <div className="absolute top-1/4 left-1/3 h-4 w-4 bg-primary rounded-full animate-pulse border-4 border-background ring-4 ring-primary/20 shadow-xl cursor-pointer group">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-[10px] p-2 rounded border shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Solar Plant Alpha - 120% Eff
              </div>
            </div>
            <div className="absolute top-1/2 left-2/3 h-4 w-4 bg-green-500 rounded-full animate-pulse border-4 border-background ring-4 ring-green-500/20 shadow-xl cursor-pointer group">
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-[10px] p-2 rounded border shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Smart Farm #12 - Optimal
              </div>
            </div>

            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <Button size="icon" className="h-10 w-10 rounded-full shadow-lg"><Plus className="h-5 w-5" /></Button>
              <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full shadow-lg"><Play className="h-5 w-5" /></Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm ring-1 ring-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="p-3 rounded-xl bg-secondary/30 border border-border/50 group cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-xs font-bold flex items-center gap-1.5">
                      <Circle className={cn(
                        "h-1.5 w-1.5 fill-current",
                        insight.type === 'success' ? "text-green-500" : insight.type === 'warning' ? "text-amber-500" : "text-blue-500"
                      )} />
                      {insight.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground">{insight.time}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm ring-1 ring-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border">
                {recentActivity.map((item) => (
                  <div key={item.id} className="relative pl-8">
                    <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>
                    <p className="text-xs font-bold leading-none">{item.action}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{item.target} • {item.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-xs text-primary font-bold">View Audit Trail</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
