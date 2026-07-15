"use client";

import { useCollection, useFirestore, useUser } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { WasteAnalysis } from "@/lib/waste-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, Box } from "lucide-react";
import { deleteWasteAnalysis } from "@/firebase/firestore/waste-service";
import Image from "next/image";
import { useMemo } from "react";

interface WasteHistoryProps {
  onView: (analysis: WasteAnalysis) => void;
}

export default function WasteHistory({ onView }: WasteHistoryProps) {
  const firestore = useFirestore();
  const { user } = useUser();

  const historyQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "waste_analyses"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc")
    );
  }, [firestore, user]);

  const { data: analyses, loading } = useCollection<WasteAnalysis>(historyQuery);

  if (loading) return <div className="animate-pulse space-y-4">
    {[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted rounded-xl" />)}
  </div>;

  if (!analyses || analyses.length === 0) return (
    <div className="text-center py-12 bg-secondary/20 rounded-3xl border border-dashed border-border/50">
      <Box className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-20" />
      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Empty Audit Trail</p>
    </div>
  );

  return (
    <div className="grid gap-3">
      {analyses.map((item) => (
        <Card key={item.id} className="group overflow-hidden border-none shadow-sm ring-1 ring-border/50 hover:ring-primary/50 transition-all cursor-pointer" onClick={() => onView(item)}>
          <CardContent className="p-0 flex h-20">
            <div className="relative w-20 h-full shrink-0 grayscale group-hover:grayscale-0 transition-all">
              <Image src={item.imageUrl} alt={item.category} fill className="object-cover" />
            </div>
            <div className="flex-1 p-3 flex items-center justify-between overflow-hidden">
              <div className="min-w-0">
                <h4 className="font-bold text-xs truncate">{item.category}</h4>
                <p className="text-[9px] text-muted-foreground font-bold uppercase">
                  {new Date(item.timestamp).toLocaleDateString()} • {Math.round(item.confidence * 100)}% Match
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="h-1 w-12 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${item.confidence * 100}%` }} />
                   </div>
                   <span className="text-[8px] font-bold text-primary">{item.isRecyclable ? 'Recyclable' : 'Waste'}</span>
                </div>
              </div>
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
                  onClick={() => onView(item)}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => deleteWasteAnalysis(firestore!, item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
