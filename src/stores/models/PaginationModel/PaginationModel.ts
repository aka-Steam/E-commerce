import { action, computed, makeObservable, observable, runInAction, reaction } from 'mobx';
import axiosInstance from 'utils/axiosInstanse';
import { ILocalStore } from 'utils/useLocalStore';
import Meta from 'utils/meta';
import { normalizeProductInfo, ProductInfoModel } from '../models/products';
import React from 'react';
import rootStore from '../../RootStore';

type PrivateFields = '_currentPage' | '_totalPages';

export class PaginationModel implements ILocalStore {
  private _currentPage: number = 1;
  private _totalPages: number = 1;   


  private reactionTotalPages = reaction(
    () => {
      this._totalPages;
    },
    () => {
      console.log('reactionTotalPages');
      this._currentPage = 1;
    },
  );

  constructor(initialTotalPages: number = 1) {
    this._totalPages = initialTotalPages;

    makeObservable<PaginationModel, PrivateFields>(this, {
      _currentPage: observable,
      _totalPages: observable,
      currentPage: computed,
      totalPages: computed,
      setCurrentPage: action,
      setTotalPages: action,
    });
  }

  get currentPage() {
    return this._currentPage;
  }

  get totalPages() {
    return this._totalPages;
  }

  setCurrentPage = (value: number) => {
    if (value === this._currentPage) {
      return;
    }
    // if (value > this.totalPages) {
    //   this._currentPage = this.totalPages;
    //   // TODO изменить квери параметры
    // } else {
      this._currentPage = value;
    // }
  };

  setTotalPages = (value: number) => {
    this._totalPages = value;
    if (value > this.totalPages) {
      this._currentPage = this.totalPages;
      // TODO изменить квери параметры
      }
  };

  destroy(): void {
    this.reactionTotalPages;
    // this._qpReaction;
  }
}
