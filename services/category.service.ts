
import { apiRequest } from "@/lib/api";
import type {
  CategoriesResponse,
  Category,
} from "@/types/category";

export const getCategories = async (
  page = 1,
  limit = 10,
): Promise<CategoriesResponse> => {
  return apiRequest<CategoriesResponse>(
    `/categories?page=${page}&limit=${limit}`,
    {
      method: "GET",
    },
  );
};

export const getAllCategories = async (
  limit = 10,
): Promise<Category[]> => {
  const firstPage = await getCategories(1, limit);

  const remainingPages = Array.from(
    { length: Math.max(0, firstPage.meta.totalPages - 1) },
    (_, index) => index + 2,
  );

  const remainingResponses = await Promise.all(
    remainingPages.map((page) => getCategories(page, limit)),
  );

  return [
    ...firstPage.data,
    ...remainingResponses.flatMap((response) => response.data),
  ];
};
