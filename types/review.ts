export interface ReviewGearItem {
  id: string;
  name: string;
}

export interface Review {
  id: string;
  customerId: string;
  gearItemId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  gearItem: ReviewGearItem;
}

export interface ReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review[];
}