import { headBoyCandidates, headGirlCandidates } from '@/lib/data';
import VotingForm from '@/components/VotingForm';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function VotingSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-10" />
                
                <div className="mb-12">
                    <Skeleton className="h-9 w-1/3 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="aspect-square rounded-full" />
                                <Skeleton className="h-6 w-3/4 mx-auto" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="mb-12">
                    <Skeleton className="h-9 w-1/3 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="aspect-square rounded-full" />
                                <Skeleton className="h-6 w-3/4 mx-auto" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function VotePage() {
    return (
        <Suspense fallback={<VotingSkeleton />}>
            <VotingForm headBoyCandidates={headBoyCandidates} headGirlCandidates={headGirlCandidates} />
        </Suspense>
    );
}
