import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axiosInstance from 'utils/axiosInstanse';
import { ILocalStore } from 'utils/useLocalStore';
import Meta from 'utils/meta';
import { normalizeProductInfo, ProductInfoModel } from '../models/products';
import noImage from 'assets/noimage.png';

type PrivateFields = '_id' | '_product' | '_relatedItems' | '_meta';

export default class ProductItemStore implements ILocalStore {
  private _id: number;
  private _product: ProductInfoModel | null = null;
  private _relatedItems: ProductInfoModel[] = [];
  // состояние загрузки
  private _meta: Meta = Meta.initial;

  constructor(id: number) {
    this._id = id;

    makeObservable<ProductItemStore, PrivateFields>(this, {
      _id: observable,
      _product: observable.ref,
      _meta: observable,
      _relatedItems: observable.ref,
      product: computed,
      meta: computed,
      relatedItems: computed,
      fetchProductById: action,
      fetchRelatedItems: action,
    });
  }

  get product(): ProductInfoModel | null {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  get relatedItems(): ProductInfoModel[] {
    return this._relatedItems;
  }

  // Метод для загрузки одного товара по ID
  fetchProductById = async () => {
    this._meta = Meta.loading;
    const result = await axiosInstance.get(`/products/${this._id}`);

    runInAction(() => {
      this._product = {
        id: result.data.id,
        description: result.data.description,
        images: result.data.images ? result.data.images.map((el: string) => el.match(/https?:\/\/[^\s"]+/)) : [noImage],
        price: result.data.price,
        title: result.data.title,
        category: result.data.category.name,
      };
      this._meta = Meta.success;
    });
  };

  // Метод для загрузки рекомендованных товаров
  fetchRelatedItems = async () => {
    this._meta = Meta.loading;
    const response = await axiosInstance.get('/products', {
      params: {
        limit: 3,
        offset: 1,
      },
    });

    runInAction(() => {
      if (response.status < 200 || response.status >= 300) {
        this._meta = Meta.error;
        return;
      }

      try {
        this._relatedItems = response.data.map(normalizeProductInfo);
        this._meta = Meta.success;
      } catch (err) {
        this._relatedItems = [];
        this._meta = Meta.error;
      }
    });
  };

  destroy(): void {
    // nothing to do yet
  }
}
