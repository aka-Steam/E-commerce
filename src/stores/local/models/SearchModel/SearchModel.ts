import { action, computed, makeObservable, observable} from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';

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
