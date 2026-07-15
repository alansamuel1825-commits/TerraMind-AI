"use client";

import { useCollection, useFirestore, useUser } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { EnergySimulation } from "@/lib/energy-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, Battery, CloudSun } from "lucide-react";
import { deleteEnergySimulation } from "@/firebase/firestore/energy-service";
import { useMemo } from "react";

interface EnergyHistoryProps {
  onView: (simulation: EnergySimulation) => void;
}

export default function EnergyHistory({ onView }: EnergyHistoryProps) {
  const firestore = useFirestore();
  const { user } = useUser();

  const historyQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "energy_simulations"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc")
    );
  }, [firestore, user]);

  const { data: simulations, loading } = useCollection<EnergySimulation>(historyQuery);

  if (loading) return <div className="animate-pulse space-y-4">
    {[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted rounded-xl" />)}
  </div>;

  if (!simulations || simulations.length === 0) return (
    <div className="text-center py-12 bg-secondary/20 rounded-3xl border border-dashed border-border/50">
      <Battery className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-20" />
      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">No Simulations Logged</p>
    </div>
  );

  return (
    <div className="grid gap-3">
      {simulations.map((item) => (
        <Card key={item.id} className="group overflow-hidden border-none shadow-sm ring-1 ring-border/50 hover:ring-primary/50 transition-all cursor-pointer" onClick={() => onView(item)}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0">
               <div className="p-3 bg-secondary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <CloudSun className="h-5 w-5" />
               </div>
               <div className="min-w-0">
                  <h4 className="font-bold text-xs truncate">{item.inputs.buildingType}</h4>
                  <p className="text-[9px] text-muted-foreground font-bold uppercase">
                    {new Date(item.timestamp).toLocaleDateString()} • {item.results.efficiencyRating}/100 Eff
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                     <span className="text-[8px] font-bold text-primary">{item.inputs.weatherCondition} Sim</span>
                     <div className="h-1 w-12 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${item.results.efficiencyRating}%` }} />
                     </div>
                  </div>
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
                onClick={() => deleteEnergySimulation(firestore!, item.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
