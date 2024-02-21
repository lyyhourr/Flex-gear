export interface IProduct {
  id: number;
  image: string;
  productName: string;
  isDiscount: boolean;
  discountPercentage?: number;
  price: number;
  rating: 1 | 2 | 3 | 4 | 5;
  category: string;
  productType: string;
}
export interface ICartProducts {
  name: string;
  price: number;
  image: string;
  priceAfterDiscount: number;
  qty: number;
  isDiscount: boolean;
}
export interface IWishListProducts {
  name: string;
  price: number;
  image: string;
  priceAfterDiscount: number;
  qty: number;
  isDiscount: boolean;
  discountPercentage?: number;
}
