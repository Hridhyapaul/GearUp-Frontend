
export type PaymentMethod = "STRIPE";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED";

export interface PaymentRentalOrder {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: string;
}

export interface Payment {
  id: string;
  rentalOrderId: string;
  amount: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  rentalOrder: PaymentRentalOrder;
}

export interface PaymentListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaymentListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payment[];
  meta: PaymentListMeta;
}
