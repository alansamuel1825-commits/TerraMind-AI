
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Sprout, 
  Recycle, 
  Zap, 
  Building2, 
  CloudRain, 
  HeartPulse, 
  Leaf, 
  BarChart3, 
  Sparkles, 
  FileText, 
  BookOpen, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { group: "Core", items: [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/agri", label: "Agriculture Intelligence", icon: Sprout },
    { href: "/circular", label: "Circular Economy", icon: Recycle },
    { href: "/energy", label: "Green Energy", icon: Zap },
    { href: "/smart-city", label: "Smart City", icon: Building2 },
  ]},
  { group: "Analysis", items: [
    { href: "/climate", label: "Climate Intelligence", icon: CloudRain },
    { href: "/health", label: "Public Health", icon: HeartPulse },
    { href: "/environment", label: "Environment", icon: Leaf },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
  ]},
  { group: "System", items: [
    { href: "/ai", label: "AI Assistant", icon: Sparkles },
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/docs", label: "Documentation", icon: BookOpen },
    { href: "/settings", label: "Settings", icon: Settings },
  ]}
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "relative h-screen bg-card border-r transition-all duration-300 flex flex-col z-40",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary rounded-lg p-1.5">
          <Globe className="h-6 w-6 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">TerraMind AI</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Intelligence Dashboard</p>
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 bg-background border shadow-sm rounded-full h-6 w-6"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {navItems.map((group) => (
          <div key={group.group}>
            {!collapsed && <p className="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">{group.group}</p>}
            <nav className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all group relative",
                    pathname === item.href 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", pathname === item.href ? "text-primary" : "")} />
                  {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                  {collapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border shadow-md z-50 whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className={cn(
          "bg-secondary/50 rounded-xl p-3 transition-all",
          collapsed ? "opacity-0" : "opacity-100"
        )}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold">Pro Features</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">Unlock advanced climate simulations and real-time GIS layers.</p>
        </div>
      </div>
    </aside>
  );
}
