
export interface GearCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GearItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  pricePerDay: string;
  stock: number;
  availableStock: number;
  image: string;
  isAvailable: boolean;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: GearCategory;
}

export interface ProviderGearItemsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GearItem[];
}


export type CreateGearItemInput = {
  name: string;
  slug: string;
  description?: string;
  pricePerDay: number;
  stock: number;
  availableStock: number;
  image?: string;
  categoryId: string;
};

export type UpdateGearItemInput = {
  name?: string;
  slug?: string;
  description?: string;
  pricePerDay?: number;
  stock?: number;
  availableStock?: number;
  image?: string;
  isAvailable?: boolean;
  categoryId?: string;
};

export interface GearItemsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GearItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

