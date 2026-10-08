import { apiRequest } from "@/lib/api";
import type { RentalOrdersResponse } from "@/types/rental-order";

const getCustomerRentalOrders = async (
  token: string,
): Promise<RentalOrdersResponse> => {
  return apiRequest<RentalOrdersResponse>("/rental-orders", {
    method: "GET",
    token,
  });
};

export {
  getCustomerRentalOrders,
};