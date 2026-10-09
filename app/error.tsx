
"use client";

import { ErrorRetryButton } from "@/components/shared/ErrorRetryButton";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-4xl font-bold">
        Something went wrong
      </h1>

      <p className="max-w-md text-muted-foreground">
        We couldn't complete your request. Please try again.
      </p>

      <ErrorRetryButton onRetry={reset} />
    </main>
  );
};

export default Error;
