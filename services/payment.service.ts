import { apiRequest } from "@/lib/api";
import type { PaymentListResponse } from "@/types/payment";

const getCustomerPayments = async (
  token: string,
): Promise<PaymentListResponse> => {
  return apiRequest<PaymentListResponse>("/payments", {
    method: "GET",
    token,
  });
};

export {
  getCustomerPayments,
};