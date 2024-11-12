export interface ProductInfo {
  id: number;
  description: string;
  images: string[];
  price: number;
  title: string;
  category: string;
}

export type Categoty = {
  id: number;
  image: string;
  name: string;
};

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type FetchedProductInfo = {
  id: number;
  description: string;
  images: string[];
  price: number;
  title: string;
  category: Categoty;
};
