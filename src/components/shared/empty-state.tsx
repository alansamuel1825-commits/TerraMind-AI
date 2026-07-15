
"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="p-6 bg-secondary/30 rounded-[2.5rem] mb-6 ring-1 ring-border/50">
        <Icon className="h-12 w-12 text-muted-foreground opacity-40" />
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-8">
        {description}
      </p>
      {actionLabel && (
        <Button 
          onClick={onAction}
          variant="outline" 
          className="rounded-full px-8 hover:bg-primary hover:text-white transition-all"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
