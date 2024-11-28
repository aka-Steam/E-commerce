import { Categoty } from '../categories/category';
import noImage from 'assets/noimage.png';

export type ProductInfoApi = {
  id: number;
  description: string;
  images: string[];
  price: number;
  title: string;
  category: Categoty;
};

export type ProductInfoModel = {
  id: number;
  description: string;
  images: string[];
  price: number;
  title: string;
  category: string;
};

export const normalizeProductInfo = (from: ProductInfoApi): ProductInfoModel => ({
  id: from.id,
  description: from.description,
  images: from.images ? from.images.map((el) => el.match(/https?:\/\/[^\s"]+/)) : [noImage],
  price: from.price,
  title: from.title,
  category: from.category.name,
});
