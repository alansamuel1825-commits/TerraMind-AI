"use client";

import Image from "next/image";
import type { Candidate } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onVote: () => void;
}

export default function CandidateCard({
  candidate,
  isSelected,
  onVote,
}: CandidateCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer",
        isSelected ? "border-primary ring-2 ring-primary shadow-2xl" : "border-border"
      )}
      onClick={onVote}
    >
      <CardHeader>
        <div className={cn("relative aspect-square w-full rounded-full overflow-hidden mx-auto mb-4 border-4 transition-colors",
            isSelected ? "border-primary" : "border-transparent"
        )}>
          <Image
            src={candidate.imageUrl}
            alt={candidate.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            data-ai-hint={candidate.imageHint}
          />
        </div>
        <CardTitle className="text-xl font-semibold">{candidate.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Future candidate descriptions can be added here */}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className="w-full pointer-events-none"
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Selected
            </>
          ) : (
            <>
              <Circle className="mr-2 h-5 w-5" />
              Vote
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
