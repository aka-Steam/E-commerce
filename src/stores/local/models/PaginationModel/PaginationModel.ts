import { action, computed, makeObservable, observable, runInAction, reaction, IReactionDisposer } from 'mobx';

import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_currentPage' | '_totalPages';

export class PaginationModel implements ILocalStore {
  private _currentPage: number = 1;
  private _totalPages: number = 1;

  private readonly reactionTotalPages: IReactionDisposer = reaction(
    () => this._totalPages,
    (newValue) => {
      if (this._currentPage > newValue) {
        this._currentPage = 1;
      }
    },
  );

  constructor(initialTotalPages: number = 1) {
    this._totalPages = initialTotalPages;

    makeObservable<PaginationModel, PrivateFields>(this, {
      _currentPage: observable,
      _totalPages: observable,
      currentPage: computed,
      totalPages: computed,
      getPageNumbers: computed,
      prev: action.bound,
      next: action.bound,
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

  // Функция для генерации массива страниц
  get getPageNumbers() {
    const pages = [];
    if (this.totalPages <= 5) {
      // Если страниц мало, просто отображаем все
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Логика отображения с многоточием
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }

    return pages;
  }

  prev() {
    this._currentPage = this._currentPage - 1;
    console.log('awwwww&');
    window.scrollTo(0, 360);
    // TODO: заставить работать вариант со smooth
    // window.scrollTo({ top: 360, left: 0, behavior: 'smooth'})
  }

  next() {
    this._currentPage = this._currentPage + 1;
    window.scrollTo(0, 360);
    // TODO: заставить работать вариант со smooth
    // window.scrollTo({ top: 360, left: 0, behavior: 'smooth'})
  }

  setCurrentPage = (value: number) => {
    if (value === this._currentPage) {
      return;
    }

    this._currentPage = value;
    window.scrollTo({ top: 360, left: 0, behavior: 'smooth'})
  };

  setTotalPages = (value: number) => {
    this._totalPages = value;
    if (value > this.totalPages) {
      this._currentPage = this.totalPages;
    }
  };

  destroy(): void {
    this.reactionTotalPages();
  }
}
