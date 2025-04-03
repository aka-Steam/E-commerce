import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axiosInstance from 'utils/axiosInstanse';
import { ILocalStore } from 'utils/useLocalStore';
import Meta from 'utils/meta';
import { normalizeProductInfo, ProductInfoModel } from '../models/products';
import React from 'react';
import { MultiDropdownModel } from '../MultiDropdownModel';
import rootStore from '../../../global/RootStore';
import { Categoty } from './types';

type PrivateFields = '_meta';

export class FilterModel extends MultiDropdownModel {
  private _meta: Meta = Meta.initial;

  constructor() {
    super();

    makeObservable<FilterModel, PrivateFields>(this, {
      _meta: observable,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  fetchCategories = async () => {
    this._meta = Meta.loading;
    const response = await axiosInstance.get('/categories');

    runInAction(() => {
      if (response.status < 200 || response.status >= 300) {
        this._meta = Meta.error;
        return;
      }

      this.options = [];

      try {
        response.data.map((category: Categoty) => {
          this.options.push({
            key: category.id.toString(),
            value: category.name,
          });
        });

        this.setVelueByKeys(rootStore.query.getParam('filter') as string[]);

        this._meta = Meta.success;
      } catch (err) {
        this._meta = Meta.error;
        return;
      }
    });
  };

  destroy() {}
}
