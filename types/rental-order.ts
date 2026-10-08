export type RentalOrderStatus =
  | "PLACED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export interface RentalOrder {
  id: string;
  status: RentalOrderStatus;
  totalAmount: number;
  createdAt: string;
}

export interface RentalOrdersMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RentalOrdersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: RentalOrder[];
  meta: RentalOrdersMeta;
}