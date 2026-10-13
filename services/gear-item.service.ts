import { apiRequest } from "@/lib/api";
import type {
  CreateGearItemInput,
  GearItem,
  GearItemsQuery,
  GearItemsResponse,
  ProviderGearItemsResponse,
  UpdateGearItemInput,
} from "@/types/gear-item";

const getGearItems = async (
  query: GearItemsQuery = {},
): Promise<GearItemsResponse> => {
  const params = new URLSearchParams();

  if (query.page !== undefined) {
    params.set("page", String(query.page));
  }

  if (query.limit !== undefined) {
    params.set("limit", String(query.limit));
  }

  if (query.searchTerm?.trim()) {
    params.set("searchTerm", query.searchTerm.trim());
  }

  if (query.categoryId) {
    params.set("categoryId", query.categoryId);
  }

  if (query.minPrice !== undefined) {
    params.set("minPrice", String(query.minPrice));
  }

  if (query.maxPrice !== undefined) {
    params.set("maxPrice", String(query.maxPrice));
  }

  if (query.isAvailable !== undefined) {
    params.set("isAvailable", String(query.isAvailable));
  }

  if (query.sortBy) {
    params.set("sortBy", query.sortBy);
  }

  if (query.sortOrder) {
    params.set("sortOrder", query.sortOrder);
  }

  const queryString = params.toString();

  return apiRequest<GearItemsResponse>(
    `/gear-items${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    },
  );
};

const getGearItemById = async (id: string): Promise<GearItem> => {
  const response = await apiRequest<{
    success: boolean;
    statusCode: number;
    message: string;
    data: GearItem | { gearItem: GearItem };
  }>(`/gear-items/${id}`, {
    method: "GET",
  });

  if ("gearItem" in response.data) {
    return response.data.gearItem;
  }

  return response.data;
};

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

export { createGearItem, getProviderGearItems, getGearItems, getGearItemById };
