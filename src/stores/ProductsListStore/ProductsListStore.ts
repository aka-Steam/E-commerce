import { action, computed, makeObservable, observable, runInAction, reaction, IReactionDisposer } from 'mobx';
import axiosInstance from 'utils/axiosInstanse';
import { ILocalStore, useLocalStore } from 'utils/useLocalStore';
import Meta from 'utils/meta';
import { normalizeProductInfo, ProductInfoApi, ProductInfoModel } from '../models/products';
import { FilterModel } from '../models/FilterModel';
import { SearchModel } from '../models/SearchModel';
import { PaginationModel } from '../models/PaginationModel';
import rootStore from '../RootStore';
import qs from 'qs';
// import { useLocalStore } from 'mobx-react-lite';

const ITEMS_PER_PAGE = 9;

type PrivateFields = '_products' | '_meta' | '_totalProducts';

export default class ProductsListStore implements ILocalStore {
  // private _products: ProductInfoModel[] = [];
  // состояние загрузки
  private _meta: Meta = Meta.initial;

  private _products: Map<number, ProductInfoModel[]> = new Map();

  private _totalProducts: number = 0;

  // filterStore: FilterModel = (new FilterModel(this));
  filterStore: FilterModel = new FilterModel();
  searchStore: SearchModel = new SearchModel();
  paginationStore: PaginationModel = new PaginationModel();

  // private reactionFilter = reaction(
  //   // Первый аргумент – колбэк, который возвращает отслеживаемые поля
  //   () => this.filterStore.value,

  //   // Второй аргумент – колбэк, в котором выполняется желаемая логика
  //   (newValue) => {
  //     console.log('reactionFiltr -' + newValue);
  //     // this.paginationStore.setCurrentPage(1);
  //     this.fetchProducts(1, '', Array.from(this.filterStore.selectedKeysSet));
  //   },
  // );

  // private readonly _qpReaction = reaction(
  //   () => rootStore.query.params,
  //   (params) => {
  //     // TODO. тут запрос данных, НЕ обращаемся к валью элементов
  //     console.log('Params reaction[');
  //     // if (params.search !== this.searchStore.searchValue) {
  //     //   this.searchStore.setSearchValue((params.search as string) || '');
  //     // }

  //     // const page = parseInt((params.page as string) || '1');
  //     // console.log(`${page} !== ${this.paginationStore.currentPage}?`);
  //     // if (page !== this.paginationStore.currentPage) {
  //     //   this.paginationStore.setCurrentPage(page);
  //     // }

  //     // if (params.filters) {
  //     //   const filters = (params.filters as string).split(',');
  //     //   // this.filterStore.setSelectedKeys(new Set(filters));
  //     // }
  //     console.log(']');
  //   },
  // );

  // TODO в конструктор стора надо принимать текущие search-параметры и выставлять дефолтные значения в поиск, фильтр и пагинацию,
  constructor() {
    makeObservable<ProductsListStore, PrivateFields>(this, {
      _products: observable.ref,
      _meta: observable,
      _totalProducts: observable,
      products: computed,
      meta: computed,
      totalProducts: computed,
      currentProducts: computed,
      fetchProducts: action,
    });

    // Устанавливаем начальные значения из query параметров
    this.searchStore.setSearchValue((rootStore.query.getParam('search') as string) || '');
    this.paginationStore.setCurrentPage(parseInt(rootStore.query.getParam('page') as string) || 1);
    this.filterStore.fetchCategories();

    //Реакция на изменения текущей страницы
    reaction(
      () => this.paginationStore.currentPage,
      (currentPage) => {
        rootStore.query.setParam('page', currentPage.toString());
      },
    );

    // Реакция на изменения поиска
    reaction(
      () => this.searchStore.searchValue,
      (newSearchValue) => {
        if (newSearchValue.length === 0) {
          rootStore.query.setParam('search', newSearchValue);
          this.fetchProducts();
        }
      },
    );

    // Реакция на изменения фильтров
    reaction(
      () => this.filterStore.selectedKeys,
      (newFilter) => {
        rootStore.query.setParam('filter', newFilter.join(','));
        this.fetchProducts();
      },
    );
  }

  get products(): Map<number, ProductInfoModel[]> {
    return this._products;
  }

  get meta(): Meta {
    return this._meta;
  }

  get totalProducts(): number {
    return this._totalProducts;
  }

  get currentProducts() {
    return this._products.get(this.paginationStore.currentPage);
  }

  // Метод для загрузки всех товаров
  fetchProducts = async () => {
    this._meta = Meta.loading;

    /*
     * Т.к api не позволяет находить товару по списку(массиву) категорий,
     * то результатом запроса всегда будут только товары из категории,
     * которая была выбрана первой
     */
    const response = await axiosInstance.get('/products', {
      params: {
        title: this.searchStore.searchValue,
        categoryId: Number(rootStore.query.getParam('filter')),
      },
    });
    console.log(response);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
        return;
      }

      try {
        const productsArr = response.data.map(normalizeProductInfo);
        this._totalProducts = productsArr.length;
        this._products = this.paginateProducts(productsArr);
        this.paginationStore.setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
        this._meta = Meta.success;
      } catch (err) {
        this._products.clear();
        this.paginationStore.setTotalPages(1);
        this._meta = Meta.error;
        return;
      }
    });
  };

  private paginateProducts(products: ProductInfoModel[]): Map<number, ProductInfoModel[]> {
    const paginatedMap = new Map<number, ProductInfoModel[]>();

    for (let i = 0; i < products.length; i += ITEMS_PER_PAGE) {
      const pageNumber = Math.floor(i / ITEMS_PER_PAGE) + 1; // Номера страниц начинаются с 1
      const pageItems = products.slice(i, i + ITEMS_PER_PAGE);
      paginatedMap.set(pageNumber, pageItems);
    }

    return paginatedMap;
  }

  destroy(): void {
    // this.reactionPage;
    // this.reactionSerch;
    // this.reactionFilter;
    // this._qpReaction;
  }
}
