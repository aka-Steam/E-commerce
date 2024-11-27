import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axiosInstance from 'utils/axiosInstanse';
import { ILocalStore } from 'utils/useLocalStore';
import Meta from 'utils/meta';
import { normalizeProductInfo, ProductInfoModel } from '../models/products';
import React from 'react';
import { MultiDropdownModel } from '../MultiDropdownModel';

type PrivateFields = '_products' | '_meta';
//Todo - props?

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

export class FilterModel extends MultiDropdownModel {

  private _meta: Meta = Meta.initial;
  // options: Option[] = [];
  constructor() {
    // console.log("FilterModel, const");
    super();
    this.fetchCategories();
  }

  get meta(): Meta {
    return this._meta;
  }

  fetchCategories = async () => {
    // console.log("FilterModel, fetch");
  // fetchCategories = async (setMultiDropdownValue: (options: Option[]) => void) => {
    this._meta = Meta.loading;
console.log("Filter Stor,fetchCategories")
    const response = await axiosInstance.get('/categories');




    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
        return;
      }

      this.options = [];

      try {
        //TODO maby normalizer
        response.data.map((category: Categoty) => {
          this.options.push({
            key: category.id.toString(),
            value: category.name,
          });
        });

      const selectedKeys = new Set(this.selectedOptions.map((option) => String(option.key)));
      this.value = this.options.filter((option) => selectedKeys.has(String(option.key)));





      // setMultiDropdownValue(this.selectedOptions);

        this._meta = Meta.success;
      } catch (err) {
        this._meta = Meta.error;
        return
      }

      
    });
  };

  destroy() {
    // TODO 
  }
}
