"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Candidate } from "@/lib/data";
import CandidateCard from "./CandidateCard";
import { Button } from "./ui/button";
import { Check, Vote } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface VotingFormProps {
  headBoyCandidates: Candidate[];
  headGirlCandidates: Candidate[];
}

export default function VotingForm({
  headBoyCandidates,
  headGirlCandidates,
}: VotingFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('studentId');
  const [selectedHeadBoy, setSelectedHeadBoy] = useState<string | null>(null);
  const [selectedHeadGirl, setSelectedHeadGirl] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
      router.replace('/');
    }
  }, [studentId, router]);


  const handleSubmit = () => {
    if (!selectedHeadBoy || !selectedHeadGirl || !studentId) {
      return;
    }
    
    // Mark student as voted in localStorage
    if(typeof window !== "undefined") {
      localStorage.setItem(`voted_${studentId}`, 'true');
    }

    router.push("/success");
  };

  const isVoteReady = selectedHeadBoy && selectedHeadGirl;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Cast Your Vote</h1>
        <p className="text-center text-muted-foreground mb-10">Select one candidate for each position.</p>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 border-b-2 border-primary pb-2">Head Boy Candidates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {headBoyCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedHeadBoy === candidate.id}
                onVote={() => setSelectedHeadBoy(candidate.id)}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 border-b-2 border-primary pb-2">Head Girl Candidates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {headGirlCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedHeadGirl === candidate.id}
                onVote={() => setSelectedHeadGirl(candidate.id)}
              />
            ))}
          </div>
        </section>
        
        {isVoteReady && (
            <div className="max-w-md mx-auto mb-8">
                <Alert className="bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200">
                    <Check className="h-4 w-4 !text-green-500" />
                    <AlertTitle className="font-bold">Selections Complete!</AlertTitle>
                    <AlertDescription>
                        You are ready to submit your vote.
                    </AlertDescription>
                </Alert>
            </div>
        )}

        <div className="flex justify-center">
          <Button
            size="lg"
            className="text-xl px-12 py-8 rounded-full shadow-lg transition-transform hover:scale-105"
            onClick={handleSubmit}
            disabled={!isVoteReady}
          >
            <Vote className="mr-3 h-6 w-6"/>
            Submit Final Vote
          </Button>
        </div>
      </div>
    </div>
  );
}
