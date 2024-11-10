export type ProductInfo = {
  id: number;
  description: string;
  images: string[];
  price: string;
  title: string;
  category: string;
};

export type FetchedProductInfo = {
  id: number;
  description: string;
  images: string[];
  price: string;
  title: string;
  category: { name: string };
};
