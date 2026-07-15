"use client";

import { 
  Search, 
  Bell, 
  ChevronRight,
  Home,
  Zap,
  LayoutGrid,
  X,
  Languages,
  Sprout,
  Recycle,
  ShieldCheck,
  Building2,
  HeartPulse,
  Sparkles,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";

const SEARCH_SOURCES = [
  { label: 'Executive Command Center', href: '/executive', icon: ShieldCheck },
  { label: 'Agriculture Intelligence', href: '/agri', icon: Sprout },
  { label: 'Circular Economy Hub', href: '/circular', icon: Recycle },
  { label: 'Green Energy Analytics', href: '/energy', icon: Zap },
  { label: 'Smart City Digital Twin', href: '/smart-city', icon: Building2 },
  { label: 'Public Health Intelligence', href: '/health', icon: HeartPulse },
  { label: 'Neural AI Assistant', href: '/ai', icon: Sparkles },
  { label: 'System Configuration', href: '/settings', icon: Settings },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname === "/" ? ["Dashboard"] : pathname.split("/").filter(Boolean);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPresentation, setIsPresentation] = useState(false);
  const [searchQuery, setSearchTerm] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const checkPresentation = () => setIsPresentation(document.body.classList.contains('presentation-mode'));
    
    window.addEventListener("scroll", handleScroll);
    const observer = new MutationObserver(checkPresentation);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    return SEARCH_SOURCES.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  if (isPresentation) return null;

  return (
    <header className={cn(
      "h-18 sticky top-0 z-50 px-8 flex items-center justify-between transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b shadow-sm h-16" : "bg-transparent h-20"
    )}>
      <div className="flex items-center gap-8">
        <div className="flex items-center text-[10px] text-muted-foreground font-black uppercase tracking-widest gap-2">
          <div className="p-1.5 bg-secondary rounded-lg">
            <Home className="h-3 w-3" />
          </div>
          <ChevronRight className="h-3 w-3 opacity-30" />
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={cn(
                "transition-colors",
                index === segments.length - 1 ? "text-foreground" : "hover:text-primary cursor-pointer"
              )}>
                {segment.replace(/-/g, ' ')}
              </span>
              {index < segments.length - 1 && <ChevronRight className="h-3 w-3 opacity-30" />}
            </div>
          ))}
        </div>

        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input 
            placeholder={t.common.search}
            value={searchQuery}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSearchBox(true);
            }}
            onFocus={() => setShowSearchBox(true)}
            className="pl-10 w-[350px] bg-secondary/40 border-none h-10 text-xs rounded-full focus-visible:ring-primary focus-visible:bg-secondary/60 transition-all shadow-sm ring-1 ring-border/50"
          />

          {showSearchBox && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate-900 border rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-3 z-[60]">
              <div className="p-4 border-b bg-secondary/30 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 text-muted-foreground tracking-widest">Intelligence Nodes</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setShowSearchBox(false)}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-2">
                {filteredResults.length > 0 ? filteredResults.map((r) => (
                  <button 
                    key={r.href}
                    onClick={() => {
                      router.push(r.href);
                      setShowSearchBox(false);
                      setSearchTerm("");
                    }}
                    className="w-full text-left px-4 py-4 hover:bg-primary/5 transition-all rounded-2xl flex items-center gap-4 group"
                  >
                    <div className="p-2 bg-secondary group-hover:bg-primary/10 rounded-xl transition-colors">
                      <r.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold">{r.label}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-tighter mt-0.5">Navigation Route: {r.href}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                )) : (
                  <div className="p-8 text-center text-xs text-muted-foreground italic font-medium">No matching intelligence nodes found.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all ring-1 ring-border/50">
              <Languages className="h-4 w-4 mr-2" />
              {language.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 rounded-[1.5rem] border-none shadow-2xl p-2">
            <DropdownMenuItem className="rounded-xl px-4 py-2 text-xs font-bold" onClick={() => setLanguage('en')}>English</DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl px-4 py-2 text-xs font-bold" onClick={() => setLanguage('hi')}>हिन्दी (Hindi)</DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl px-4 py-2 text-xs font-bold" onClick={() => setLanguage('ta')}>தமிழ் (Tamil)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden sm:flex items-center gap-2 pr-4 border-r mr-2">
          <Button variant="ghost" size="sm" className="h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all">
            <Zap className="h-3 w-3 mr-2 text-amber-500 animate-pulse" />
            {t.common.liveSync}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground relative rounded-full hover:bg-secondary h-10 w-10 transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-3 right-3 h-2 w-2 bg-primary rounded-full border-2 border-background ring-1 ring-primary/20 animate-pulse" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 rounded-[2rem] overflow-hidden border-none shadow-2xl">
            <div className="p-6 bg-slate-950 text-white">
              <h3 className="font-bold text-sm tracking-tight">Neural Alerts</h3>
              <p className="text-[10px] opacity-60 uppercase tracking-[0.2em] font-bold mt-1">3 Operational Signals</p>
            </div>
            <div className="p-3 space-y-1">
              <NotificationItem title="Peak Load Predicted" time="2m ago" type="warning" />
              <NotificationItem title="Soil Telemetry Online" time="15m ago" type="info" />
              <NotificationItem title="Carbon Target Reached" time="1h ago" type="success" />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group pl-2 transition-all">
              <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-primary/30 transition-all shadow-lg">
                <AvatarImage src="https://picsum.photos/seed/director/100/100" />
                <AvatarFallback className="bg-slate-900 text-white text-xs font-black">DIR</AvatarFallback>
              </Avatar>
              <div className="hidden xl:flex flex-col items-start leading-none">
                <span className="text-xs font-black uppercase tracking-tighter">Director Alpha</span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-60 italic">Resilience Level 5</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 rounded-[2rem] border-none shadow-2xl p-2 mt-2">
            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground p-3">User Session</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-2xl px-4 py-3 text-xs font-bold hover:bg-primary/5">Profile Matrix</DropdownMenuItem>
            <DropdownMenuItem className="rounded-2xl px-4 py-3 text-xs font-bold hover:bg-primary/5">Neural Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-2xl px-4 py-3 text-xs font-black text-destructive hover:bg-destructive/5">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function NotificationItem({ title, time, type }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-secondary/50 transition-all cursor-pointer group">
      <div className={cn(
        "h-2 w-2 rounded-full mt-1.5 transition-transform group-hover:scale-150",
        type === 'warning' ? "bg-amber-500" : type === 'success' ? "bg-green-500" : "bg-blue-500"
      )} />
      <div className="flex-1">
        <p className="text-xs font-bold tracking-tight">{title}</p>
        <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-widest">{time}</p>
      </div>
    </div>
  );
}
