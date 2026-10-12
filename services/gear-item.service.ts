
import { apiRequest } from "@/lib/api";
import { ProviderGearItemsResponse } from "@/types/gear-item";

export const getProviderGearItems = async (
  token: string,
): Promise<ProviderGearItemsResponse> => {
  return apiRequest<ProviderGearItemsResponse>("/gear-items/my", {
    method: "GET",
    token,
  });
};
