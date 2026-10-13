
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api-error";
import { updateProviderRentalOrderStatus } from "@/services/rental-order.service";
import type { RentalOrderStatus } from "@/types/rental-order";

interface ProviderOrderStatusActionsProps {
  orderId: string;
  status: RentalOrderStatus;
  token: string;
}

const ProviderOrderStatusActions = ({
  orderId,
  status,
  token,
}: ProviderOrderStatusActionsProps) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nextStatus: Partial<
    Record<RentalOrderStatus, RentalOrderStatus>
  > = {
    PAID: "PICKED_UP",
    PICKED_UP: "RETURNED",
  };

  const next = nextStatus[status];

  if (!next) {
    return <span className="text-sm text-muted-foreground">No action</span>;
  }

  const actionLabel =
    next === "PICKED_UP" ? "Mark as Picked Up" : "Mark as Returned";

  const handleUpdate = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to mark this order as ${next.replaceAll("_", " ")}?`,
    );

    if (!confirmed) return;

    setIsUpdating(true);
    setErrorMessage("");

    try {
      await updateProviderRentalOrderStatus(token, orderId, next);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "Unable to update order status. Please try again.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="sm"
        onClick={handleUpdate}
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : actionLabel}
      </Button>

      {errorMessage && (
        <p role="alert" className="max-w-48 text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default ProviderOrderStatusActions;
