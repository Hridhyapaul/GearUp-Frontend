
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
