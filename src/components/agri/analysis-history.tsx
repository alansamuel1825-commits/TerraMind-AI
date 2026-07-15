"use client";

import { useCollection, useFirestore, useUser } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { AgriAnalysis } from "@/lib/agri-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, Clock } from "lucide-react";
import { deleteAgriAnalysis } from "@/firebase/firestore/agri-service";
import Image from "next/image";
import { useMemo } from "react";

interface AnalysisHistoryProps {
  onView: (analysis: AgriAnalysis) => void;
}

export default function AnalysisHistory({ onView }: AnalysisHistoryProps) {
  const firestore = useFirestore();
  const { user } = useUser();

  const historyQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "agri_analyses"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc")
    );
  }, [firestore, user]);

  const { data: analyses, loading } = useCollection<AgriAnalysis>(historyQuery);

  if (loading) return <div className="animate-pulse space-y-4">
    {[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted rounded-xl" />)}
  </div>;

  if (!analyses || analyses.length === 0) return (
    <div className="text-center py-12 bg-secondary/20 rounded-3xl border border-dashed">
      <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-20" />
      <p className="text-sm text-muted-foreground font-medium">No previous analyses found</p>
    </div>
  );

  return (
    <div className="grid gap-4">
      {analyses.map((item) => (
        <Card key={item.id} className="group overflow-hidden border-none shadow-sm ring-1 ring-border/50 hover:ring-primary/50 transition-all">
          <CardContent className="p-0 flex h-24">
            <div className="relative w-24 h-full shrink-0">
              <Image src={item.imageUrl} alt={item.plantName} fill className="object-cover" />
            </div>
            <div className="flex-1 p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">{item.plantName}</h4>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">
                  {new Date(item.timestamp).toLocaleDateString()} • {item.isHealthy ? 'Healthy' : item.disease}
                </p>
                <div className="flex items-center gap-2 mt-1">
                   <div className="h-1 w-12 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${item.confidence * 100}%` }} />
                   </div>
                   <span className="text-[9px] font-bold text-primary">{Math.round(item.confidence * 100)}% Match</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="rounded-full hover:bg-primary/10 hover:text-primary"
                  onClick={() => onView(item)}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => deleteAgriAnalysis(firestore!, item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
