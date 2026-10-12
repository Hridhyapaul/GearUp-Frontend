export type RentalOrderStatus =
  | "PLACED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export interface RentalOrderGearItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  pricePerDay?: string;
}

export interface RentalOrderItem {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  quantity: number;
  pricePerDay: string;
  startDate: string;
  endDate: string;
  subtotal: string;
  createdAt: string;
  updatedAt: string;
  gearItem: RentalOrderGearItem;
}


export interface RentalOrderPayment {
  id: string;
  amount: string;
  paymentMethod: "STRIPE";
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}


export interface RentalOrder {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: RentalOrderStatus;
  createdAt: string;
  updatedAt: string;
  items: RentalOrderItem[];
  payment: RentalOrderPayment | null;
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

export interface RentalOrderDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    rentalOrder: RentalOrder;
  };
}