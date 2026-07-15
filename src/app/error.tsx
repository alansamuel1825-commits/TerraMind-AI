
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // We centrally handle errors via FirebaseErrorListener usually, 
    // but this catch-all handles UI crashes.
  }, [error]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-10 text-center space-y-8 bg-slate-50 dark:bg-slate-950 rounded-[3rem] border border-dashed">
      <div className="p-6 bg-destructive/10 rounded-full">
        <AlertTriangle className="h-16 w-16 text-destructive" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight">System Anomaly Detected</h2>
        <p className="text-muted-foreground max-w-md mx-auto font-medium">
          TerraMind's neural layers encountered an unexpected interruption. Telemetry sync may be temporarily affected.
        </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => reset()} className="rounded-full px-8 bg-primary shadow-lg shadow-primary/20">
          <RotateCcw className="mr-2 h-4 w-4" />
          Attempt Recovery
        </Button>
        <Button variant="outline" asChild className="rounded-full px-8">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Command
          </Link>
        </Button>
      </div>
      <div className="opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Error Digest: {error.digest || 'Unknown'}</p>
      </div>
    </div>
  );
}
