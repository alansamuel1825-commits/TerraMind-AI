"use client";

import { useState } from "react";
import ChatSidebar from "@/components/ai/chat-sidebar";
import ChatInterface from "@/components/ai/chat-interface";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function AIAssistantPage() {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  return (
    <div className="h-[calc(100vh-120px)] flex rounded-[2.5rem] overflow-hidden border shadow-2xl bg-background/50 backdrop-blur animate-in fade-in duration-700">
      <ChatSidebar 
        activeThreadId={activeThreadId} 
        onSelectThread={setActiveThreadId} 
      />
      
      <div className="flex-1 flex flex-col relative">
        {/* Floating Headers */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest shadow-xl ring-1 ring-primary/20">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Neural Network Online
          </Badge>
          <Badge variant="outline" className="bg-white/80 dark:bg-slate-900/80 text-[10px] py-1.5 rounded-full backdrop-blur flex items-center gap-2 font-bold shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
            Safety Filters Active
          </Badge>
        </div>

        <ChatInterface 
          activeThreadId={activeThreadId} 
          setActiveThreadId={setActiveThreadId} 
        />
      </div>
    </div>
  );
}
