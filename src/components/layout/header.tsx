
"use client";

import { 
  Search, 
  Bell, 
  ChevronRight,
  Home,
  Zap,
  LayoutGrid,
  X,
  Languages
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
import { Avatar, AvatarFallback, AvatarImage } from "@/avatar"; // Corrected import path alias in use? No, standard is @/components/ui/avatar
import { Avatar as AvatarUI, AvatarFallback as AvatarFallbackUI, AvatarImage as AvatarImageUI } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";
import { Language } from "@/lib/translations";

const SEARCH_SOURCES = [
  { label: 'Strategic Hub', href: '/executive' },
  { label: 'Agriculture Intelligence', href: '/agri' },
  { label: 'Circular Economy', href: '/circular' },
  { label: 'Smart Grid', href: '/energy' },
  { label: 'Digital Twin', href: '/smart-city' },
  { label: 'Public Health', href: '/health' },
  { label: 'AI Assistant', href: '/ai' },
  { label: 'System Configuration', href: '/settings' },
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
            className="pl-10 w-[300px] bg-secondary/40 border-none h-9 text-xs rounded-xl focus-visible:ring-primary focus-visible:bg-secondary/60 transition-all"
          />

          {showSearchBox && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-2 border-b bg-secondary/30 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 text-muted-foreground">Results</span>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setShowSearchBox(false)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredResults.length > 0 ? filteredResults.map((r) => (
                  <button 
                    key={r.href}
                    onClick={() => {
                      router.push(r.href);
                      setShowSearchBox(false);
                      setSearchTerm("");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors text-xs font-semibold flex items-center gap-3"
                  >
                    <LayoutGrid className="h-3 w-3 text-primary" />
                    {r.label}
                  </button>
                )) : (
                  <div className="p-4 text-center text-xs text-muted-foreground italic">No matching nodes found</div>
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
            <Button variant="ghost" size="sm" className="h-9 px-3 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-primary/5 hover:text-primary">
              <Languages className="h-4 w-4 mr-2" />
              {language.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 rounded-xl">
            <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('hi')}>हिन्दी (Hindi)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('ta')}>தமிழ் (Tamil)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden sm:flex items-center gap-2 pr-4 border-r mr-2">
          <Button variant="ghost" size="sm" className="h-8 px-3 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-primary/5 hover:text-primary">
            <Zap className="h-3 w-3 mr-2 text-amber-500" />
            {t.common.liveSync}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground relative rounded-full hover:bg-secondary">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full border-2 border-background ring-1 ring-primary/20 animate-pulse" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 rounded-2xl overflow-hidden border-none shadow-2xl">
            <div className="p-4 bg-primary text-white">
              <h3 className="font-bold text-sm">System Intelligence</h3>
              <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">3 Active Alerts</p>
            </div>
            <div className="p-2 space-y-1">
              <NotificationItem title="Grid Deviation" time="2m ago" type="warning" />
              <NotificationItem title="Soil Calibration Ready" time="15m ago" type="info" />
              <NotificationItem title="Net-Zero Target Hit" time="1h ago" type="success" />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group pl-2">
              <AvatarUI className="h-9 w-9 ring-2 ring-transparent group-hover:ring-primary/30 transition-all shadow-md">
                <AvatarImageUI src="https://picsum.photos/seed/director/100/100" />
                <AvatarFallbackUI className="bg-slate-900 text-white text-xs">DIR</AvatarFallbackUI>
              </AvatarUI>
              <div className="hidden xl:flex flex-col items-start leading-none">
                <span className="text-xs font-black uppercase tracking-tighter">Director Alpha</span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-60">Global Access</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border shadow-2xl">
            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Command Center</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-semibold py-2">Profile & Bio-ID</DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-semibold py-2">Neural Link Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-semibold py-2">Regional Controls</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-bold text-destructive py-2">Terminate Session</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function NotificationItem({ title, time, type }: any) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
      <div className={cn(
        "h-2 w-2 rounded-full mt-1.5",
        type === 'warning' ? "bg-amber-500" : type === 'success' ? "bg-green-500" : "bg-blue-500"
      )} />
      <div className="flex-1">
        <p className="text-xs font-bold leading-tight">{title}</p>
        <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{time}</p>
      </div>
    </div>
  );
}
