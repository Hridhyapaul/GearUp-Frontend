
import { Badge } from "@/components/ui/badge";
import type { PaymentStatus } from "@/types/payment";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusStyles: Record<PaymentStatus, string> = {
  PENDING:
    "border-yellow-200 bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  PAID:
    "border-green-200 bg-green-100 text-green-800 hover:bg-green-100",
  FAILED:
    "border-red-200 bg-red-100 text-red-800 hover:bg-red-100",
  CANCELLED:
    "border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-100",
};

const PaymentStatusBadge = ({
  status,
}: PaymentStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={statusStyles[status]}
    >
      {status}
    </Badge>
  );
};

export { PaymentStatusBadge };
