import { action, computed, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = ''; // оригинальная query строка
  private _isUpdating = false; // Флаг блокировки реакций

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      params: computed,
      setSearch: action,
    });
  }

  get params() {
    return this._params;
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setParam(key: string, value: string){
    // debugger;
    this._params = { ...this._params, [key]: value };  
    // search = search.startsWith('?') ? search.slice(1) : search;
    // console.log(`obnovim ${this._search} <- setSearch${search} ?`)
    // // debugger;
    // if (this._search !== search) {
    //   this._search = search;
    //   this._params = qs.parse(search);
    // }
    
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;
    console.log(`obnovim ${this._search} <- setSearch${search} ?`)
    // debugger;
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);

      // Обновляем URL
    //   if (!this._isUpdating) {
    //     console.log("obnovimsya")
    //     this._isUpdating = true;
    //     const newUrl = `${window.location.pathname}?${search}`;
    //     window.history.replaceState(null, '', newUrl);
    //     this._isUpdating = false;
    // }

    }

    console.log( this._params );
  }
}