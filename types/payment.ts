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
  data: unknown[];
  meta: PaymentListMeta;
}