import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import Meta from 'utils/meta';
import axiosInstance from 'utils/axiosInstanse';
import { Category } from './types';

type PrivateFields = '_categories' | '_meta';

export default class CategoriesStore implements ILocalStore {
  private _categories: Category[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable,
      _meta: observable,
      categories: computed,
      meta: computed,
      fetchCategories: action,
    });
  }

  get categories(): Category[] {
    return this._categories;
  }

  get meta(): Meta {
    return this._meta;
  }

  fetchCategories = async () => {
    this._meta = Meta.loading;
    try {
      const response = await axiosInstance.get('/categories');

      runInAction(() => {
        if (response.status < 200 || response.status >= 300) {
          this._meta = Meta.error;
          return;
        }

        this._categories = response.data;
        this._meta = Meta.success;
      });
    } catch (err) {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  };

  destroy(): void {
  }
}
