import { apiRequest } from "@/lib/api";
import type {
  RentalOrderDetailResponse,
  RentalOrdersResponse,
} from "@/types/rental-order";

const getCustomerRentalOrders = async (
  token: string,
): Promise<RentalOrdersResponse> => {
  return apiRequest<RentalOrdersResponse>("/rental-orders", {
    method: "GET",
    token,
  });
};

const getRentalOrderById = async (
  token: string,
  rentalOrderId: string,
): Promise<RentalOrderDetailResponse> => {
  return apiRequest<RentalOrderDetailResponse>(
    `/rental-orders/${rentalOrderId}`,
    {
      method: "GET",
      token,
    },
  );
};

export { getCustomerRentalOrders, getRentalOrderById };
