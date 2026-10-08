import { apiRequest } from "@/lib/api";
import type { ReviewsResponse } from "@/types/review";

const getReviews = async (
  token: string,
): Promise<ReviewsResponse> => {
  return apiRequest<ReviewsResponse>("/reviews", {
    method: "GET",
    token,
  });
};

export {
  getReviews,
};