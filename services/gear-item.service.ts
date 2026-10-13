import { apiRequest } from "@/lib/api";
import type {
  CreateGearItemInput,
  GearItem,
  ProviderGearItemsResponse,
  UpdateGearItemInput,
} from "@/types/gear-item";

const getProviderGearItems = async (
  token: string,
): Promise<ProviderGearItemsResponse> => {
  return apiRequest<ProviderGearItemsResponse>("/gear-items/my", {
    method: "GET",
    token,
  });
};

const createGearItem = async (token: string, payload: CreateGearItemInput) => {
  return apiRequest<{
    success: boolean;
    statusCode: number;
    message: string;
    data: {
      gearItem: import("@/types/gear-item").GearItem;
    };
  }>("/gear-items", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
};

export const updateGearItem = async (
  token: string,
  id: string,
  payload: UpdateGearItemInput,
) =>
  apiRequest<{
    success: boolean;
    statusCode: number;
    message: string;
    data: {
      gearItem: GearItem;
    };
  }>(`/gear-items/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(payload),
  });

export const deleteGearItem = async (token: string, id: string) =>
  apiRequest<{
    success: boolean;
    statusCode: number;
    message: string;
    data: {
      gearItem: GearItem;
    };
  }>(`/gear-items/${id}`, {
    method: "DELETE",
    token,
  });

export { createGearItem, getProviderGearItems };
