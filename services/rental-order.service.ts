import { apiRequest } from "@/lib/api";
import type {
  RentalOrder,
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

const getProviderRentalOrders = async (
  token: string,
): Promise<RentalOrder[]> => {
  const response = await apiRequest<{
    success: boolean;
    statusCode: number;
    message: string;
    data: RentalOrder[];
  }>("/provider/orders", {
    method: "GET",
    token,
  });

  return response.data;
};

export { getCustomerRentalOrders, getRentalOrderById, getProviderRentalOrders };
