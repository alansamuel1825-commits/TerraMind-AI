import SuccessRedirector from '@/components/SuccessRedirector';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg text-center p-8 shadow-2xl">
        <CardHeader>
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold tracking-tight text-primary">Vote Submitted!</h1>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Thank you for participating in the school election.
          </p>
          <SuccessRedirector />
        </CardContent>
      </Card>
    </div>
  );
}
