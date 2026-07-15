
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Sprout, 
  Recycle, 
  Zap, 
  Building2, 
  HeartPulse, 
  Leaf, 
  BarChart3, 
  Sparkles, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe,
  ShieldCheck,
  Tv
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/components/LanguageProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isPresentation, setIsPresentation] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { group: "Core Intelligence", items: [
      { href: "/", label: t.nav.dashboard, icon: LayoutDashboard },
      { href: "/executive", label: t.nav.executive, icon: ShieldCheck },
      { href: "/agri", label: t.nav.agri, icon: Sprout },
      { href: "/circular", label: t.nav.circular, icon: Recycle },
      { href: "/energy", label: t.nav.energy, icon: Zap },
      { href: "/smart-city", label: t.nav.smartCity, icon: Building2 },
    ]},
    { group: "Deep Analysis", items: [
      { href: "/health", label: t.nav.health, icon: HeartPulse },
      { href: "/environment", label: t.nav.environment, icon: Leaf },
      { href: "/analytics", label: t.nav.analytics, icon: BarChart3 },
    ]},
    { group: "Collaboration", items: [
      { href: "/ai", label: t.nav.ai, icon: Sparkles },
      { href: "/reports", label: t.nav.reports, icon: FileText },
      { href: "/settings", label: t.nav.settings, icon: Settings },
    ]}
  ];

  useEffect(() => {
    const checkPresentation = () => {
      setIsPresentation(document.body.classList.contains('presentation-mode'));
    };
    checkPresentation();
    const observer = new MutationObserver(checkPresentation);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (isPresentation) return null;

  return (
    <TooltipProvider delayDuration={0}>
      <aside className={cn(
        "relative h-screen bg-card border-r transition-all duration-500 ease-in-out flex flex-col z-40 premium-shadow",
        collapsed ? "w-20" : "w-64"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary rounded-xl p-2 shadow-lg shadow-primary/20 animate-float">
            <Globe className="h-6 w-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-500">
              <h1 className="text-lg font-black tracking-tighter uppercase">TerraMind AI</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Resilience Layer</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 bg-background border shadow-xl rounded-full h-7 w-7 z-50 hover:bg-primary hover:text-white transition-all"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 scrollbar-none">
          {navItems.map((group) => (
            <div key={group.group}>
              {!collapsed && (
                <p className="text-[10px] font-black text-muted-foreground mb-4 px-2 uppercase tracking-[0.2em] opacity-60">
                  {group.group}
                </p>
              )}
              <nav className="space-y-1.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Tooltip key={item.href} disableHoverableContent={!collapsed}>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                            isActive 
                              ? "bg-primary text-white shadow-lg shadow-primary/20" 
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                            isActive ? "text-white" : "group-hover:text-primary"
                          )} />
                          {!collapsed && (
                            <span className="text-sm font-semibold whitespace-nowrap animate-in fade-in duration-300">
                              {item.label}
                            </span>
                          )}
                        </Link>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right" className="bg-slate-950 text-white border-none font-bold text-xs rounded-lg px-4 py-2">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 border-t space-y-4">
          <Button
            variant="outline"
            className={cn(
              "w-full rounded-xl border-dashed hover:border-primary hover:text-primary transition-all group",
              collapsed ? "p-0 h-10" : "h-12"
            )}
            onClick={() => document.body.classList.toggle('presentation-mode')}
          >
            <Tv className={cn("h-4 w-4 shrink-0", !collapsed && "mr-2")} />
            {!collapsed && <span className="text-xs font-bold uppercase tracking-wider">{t.nav.presentation}</span>}
          </Button>
          
          {!collapsed && (
            <div className="bg-secondary/30 rounded-2xl p-4 border border-border/50 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t.common.systemHealth}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                Regional datasets synchronized.
              </p>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
