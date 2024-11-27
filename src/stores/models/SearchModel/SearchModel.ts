import { action, computed, makeObservable, observable, runInAction, reaction } from 'mobx';
import axiosInstance from 'utils/axiosInstanse';
import { ILocalStore } from 'utils/useLocalStore';
import Meta from 'utils/meta';
import { normalizeProductInfo, ProductInfoModel } from '../models/products';
import React from 'react';

//TODO почисть импорты не используемые

type PrivateFields = '_searchValue';

export class SearchModel implements ILocalStore {
  private _searchValue: string = ''; // Установленные опции
  constructor(initialSearch: string = '') {
    this._searchValue = initialSearch;

    makeObservable<SearchModel, PrivateFields>(this, {
      _searchValue: observable,
      searchValue: computed,
      setSearchValue: action,
    });
  }

  get searchValue() {
    return this._searchValue;
  }

  setSearchValue = (serch: string) => {
    this._searchValue = serch;
  };

  destroy(): void {}
}
