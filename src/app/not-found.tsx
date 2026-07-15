
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="relative mb-8">
        <div className="p-8 bg-primary/10 rounded-[3rem] animate-float relative z-10">
          <Globe className="h-24 w-24 text-primary" />
        </div>
        <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
        <div className="absolute -top-4 -right-4 bg-destructive text-white p-2 rounded-2xl shadow-xl z-20">
          <ShieldAlert className="h-8 w-8" />
        </div>
      </div>
      
      <div className="space-y-4 max-w-lg">
        <h1 className="text-7xl font-black tracking-tighter italic">404</h1>
        <h2 className="text-2xl font-bold uppercase tracking-widest text-primary">Sector Not Found</h2>
        <p className="text-muted-foreground font-medium leading-relaxed">
          The intelligence node you are attempting to access is currently offline or outside our regional telemetry parameters.
        </p>
      </div>

      <div className="flex gap-4 mt-12">
        <Button asChild className="rounded-full px-8 h-14 bg-slate-950 text-white hover:bg-slate-800 transition-all font-black uppercase tracking-widest text-xs">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Command
          </Link>
        </Button>
        <Button variant="outline" asChild className="rounded-full px-8 h-14 border-2 transition-all font-black uppercase tracking-widest text-xs">
          <Link href="/ai">
            Neural Support
          </Link>
        </Button>
      </div>

      <div className="mt-20 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">TerraMind Resilience Protocol v4.2</p>
      </div>
    </div>
  );
}
