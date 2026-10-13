
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

export interface CategoriesMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CategoriesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Category[];
  meta: CategoriesMeta;
}
