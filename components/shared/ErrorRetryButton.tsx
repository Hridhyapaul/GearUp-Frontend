
"use client";

import { Button } from "@/components/ui/button";

interface ErrorRetryButtonProps {
  onRetry: () => void;
}

const ErrorRetryButton = ({
  onRetry,
}: ErrorRetryButtonProps) => {
  return (
    <Button onClick={onRetry}>
      Try again
    </Button>
  );
};

export { ErrorRetryButton };
