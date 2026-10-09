
"use client";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>

      <p className="max-w-md text-muted-foreground">
        We couldn't complete your request. Please try again.
      </p>

      {process.env.NODE_ENV === "development" && (
        <p className="max-w-md wrap-break-word text-sm text-destructive">
          {error.message}
        </p>
      )}

      <Button onClick={reset}>
        Try again
      </Button>
    </main>
  );
};

export default Error;
