import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axiosInstance from 'utils/axiosInstanse';
import { ILocalStore } from 'utils/useLocalStore';
import Meta from 'utils/meta';
import { normalizeProductInfo, ProductInfoModel } from '../models/products';
import noImage from 'assets/noimage.png';

type PrivateFields = '_id' | '_product' | '_relatedItems' | '_meta';

export default class ProductItemStore implements ILocalStore {
  private _id: number | null = null;
  private _product: ProductInfoModel | null = null;
  private _relatedItems: ProductInfoModel[] = [];
  // состояние загрузки
  private _meta: Meta = Meta.initial;

  constructor(id?: number) {
    if (id) {
      this._id = id;
    }

    makeObservable<ProductItemStore, PrivateFields>(this, {
      _id: observable,
      _product: observable.ref,
      _meta: observable,
      _relatedItems: observable.ref,
      product: computed,
      meta: computed,
      relatedItems: computed,
      setProductId: action,
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

  setProductId = (id: number) => {
    this._id = id;
    this._product = null;
    this._relatedItems = [];
    this._meta = Meta.initial;
  };

  // Метод для загрузки одного товара по ID
  fetchProductById = async () => {
    if (!this._id) {
      return;
    }

    this._meta = Meta.loading;
    try {
      const result = await axiosInstance.get(`/products/${this._id}`);

      runInAction(() => {
        this._product = {
          id: result.data.id,
          description: result.data.description,
          images: result.data.images
            ? result.data.images.map((el: string) => el.match(/https?:\/\/[^\s"]+/))
            : [noImage],
          price: result.data.price,
          title: result.data.title,
          category: result.data.category.name,
        };
        this._meta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  };

  // Метод для загрузки рекомендованных товаров
  fetchRelatedItems = async () => {
    if (!this._id) {
      return;
    }

    this._meta = Meta.loading;
    try {
      const response = await axiosInstance.get(`/products/${this._id}/related`);
      // тестовые related items на основе общего списка товаров
      // const response = await axiosInstance.get('/products', {
      //   params: {
      //     limit: 3,
      //     offset: 1,
      //   },
      // });

      runInAction(() => {
        if (response.status < 200 || response.status >= 300) {
          this._meta = Meta.error;
          return;
        }

        this._relatedItems = response.data.slice(0, 3).map(normalizeProductInfo);
        this._meta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this._relatedItems = [];
        this._meta = Meta.error;
      });
    }
  };

  destroy(): void {
    // nothing to do yet
  }
}
