export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  brandId: number;
  CustomerId: number;
  createdAt: Date;
  updatedAt: Date;
}
