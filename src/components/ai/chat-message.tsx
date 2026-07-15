"use client";

import { Message } from "@/lib/ai-assistant-types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  User, 
  Info, 
  Lightbulb, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={cn(
      "flex w-full gap-4 p-6 rounded-[2rem] transition-all animate-in fade-in slide-in-from-bottom-2",
      isAssistant ? "bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border shadow-sm" : "bg-transparent"
    )}>
      <Avatar className={cn(
        "h-10 w-10 shrink-0",
        isAssistant ? "ring-2 ring-primary/20" : "ring-2 ring-slate-200"
      )}>
        {isAssistant ? (
          <>
            <AvatarImage src="/ai-avatar.png" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarFallback className="bg-slate-100 text-slate-600">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </>
        )}
      </Avatar>

      <div className="flex-1 space-y-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight">
            {isAssistant ? "TerraMind Intelligence" : "You"}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isAssistant && message.isSimulated && (
            <Badge variant="outline" className="text-[8px] h-4 bg-amber-500/5 text-amber-600 border-amber-500/20">
              Simulated Analysis
            </Badge>
          )}
        </div>

        {message.imageUrl && (
          <div className="relative aspect-video w-full max-w-md rounded-2xl overflow-hidden border shadow-lg group">
            <Image src={message.imageUrl} alt="Uploaded content" fill className="object-cover" />
          </div>
        )}

        <div className={cn(
          "text-sm leading-relaxed prose dark:prose-invert max-w-none",
          isAssistant ? "text-foreground" : "text-muted-foreground font-medium"
        )}>
          {message.content}
        </div>

        {isAssistant && message.sections && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Intelligence Breakdown</h4>
              <button onClick={() => setExpanded(!expanded)} className="text-muted-foreground hover:text-primary transition-colors">
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            {expanded && (
              <div className="grid gap-4 animate-in fade-in zoom-in-95 duration-300">
                {message.sections.summary && (
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-xs font-medium text-primary leading-relaxed">
                      <span className="font-bold">Summary:</span> {message.sections.summary}
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {message.sections.reasoning && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                        <Info className="h-3 w-3" /> Reasoning
                      </div>
                      <p className="text-[11px] leading-relaxed italic">{message.sections.reasoning}</p>
                    </div>
                  )}

                  {message.sections.recommendations && message.sections.recommendations.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                        <Lightbulb className="h-3 w-3 text-amber-500" /> Actions
                      </div>
                      <ul className="space-y-1.5">
                        {message.sections.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px]">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-2 border-t text-[9px] font-bold uppercase tracking-tighter text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    Confidence: {Math.round((message.sections.confidence || 0.85) * 100)}%
                  </div>
                  {message.sections.limitations && (
                    <div className="flex items-center gap-1 text-amber-600">
                      <AlertTriangle className="h-3 w-3" />
                      Model Limitation Noted
                    </div>
                  )}
                </div>

                {message.sections.limitations && (
                  <p className="text-[10px] text-muted-foreground italic bg-secondary/30 p-3 rounded-xl">
                    {message.sections.limitations}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
