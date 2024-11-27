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

type PrivateFields = '_products' | '_meta';

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

  private reactionFilter = reaction(
    // Первый аргумент – колбэк, который возвращает отслеживаемые поля
    () => this.filterStore.value,

    // Второй аргумент – колбэк, в котором выполняется желаемая логика
    (newValue) => {
      console.log('reactionFiltr -' + newValue);
      this.fetchProducts(1, '', Array.from(this.filterStore.selectedKeysSet));
    },
  );




  constructor() {
    makeObservable<ProductsListStore, PrivateFields>(this, {
      _products: observable.ref,
      _meta: observable,
      products: computed,
      meta: computed,
      totalProducts: computed,
      fetchProducts: action,
    });

    // Устанавливаем начальные значения из query параметров
    // const initialParams = rootStore.query.params;

    this.searchStore.setSearchValue((rootStore.query.getParam('search') as string) || '');
    this.paginationStore.setCurrentPage(parseInt(rootStore.query.getParam('page') as string) || 1);

    //Реакция на изменения текущей страницы
    reaction(
      () => this.paginationStore.currentPage,
      (currentPage) => {
        console.log(
          'Page reaction ',
          currentPage,
          ' Qs ',
          qs.stringify({
            page: currentPage,
          }),
        );

        // rootStore.query._params['page'] = currentPage;
        const newUrl = `${window.location.pathname}?${qs.stringify({
          search: rootStore.query.getParam('search') || '',
          filter: rootStore.query.getParam('filter') || '', // Сохраняем массив как строку
          page: currentPage,
        })}`;
        window.history.replaceState(null, '', newUrl);

        console.log('тут вызывается setSerch?');

      },
    );

    // Реакция на изменения поиска
    reaction(
      () => this.searchStore.searchValue,
      (newSearchValue) => {
        console.log('search value change', newSearchValue);

        const newUrl = `${window.location.pathname}?${qs.stringify({
          search: newSearchValue,
          filter: rootStore.query.getParam('filter') || '', // Сохраняем массив как строку
          page: 1,
        })}`;
        window.history.replaceState(null, '', newUrl);

      },
    );

    // Реакция на изменения фильтров
    reaction(
      () => Array.from(this.filterStore.selectedKeysSet),
      (newFilter) => {
        const newUrl = `${window.location.pathname}?${qs.stringify({
          search: rootStore.query.getParam('search') || '',
          filter: newFilter.join(','),
          page: 1,
        })}`;
        window.history.replaceState(null, '', newUrl);
      },
    );
  }

  // TODO экземпляры моделей поиска и пагинации создавать в сторе страницы списка и оттуда брать и подставлять значения в запрос

  get products(): Map<number, ProductInfoModel[]> {
    return this._products;
  }

  get meta(): Meta {
    return this._meta;
  }

  get totalProducts(): number {
    return this._totalProducts;
  }

  // Метод для загрузки всех товаров
  fetchProducts = async (page = 1, search = '', filter: string[] = []) => {
    //TODO в запрос подставляются всегда актуальные значения поиска, пагинации итп,
    // его надо тригеррить один раз при маунте компонента (создании стора)
    //и дальше внутри стора сделать реакцию на изменение значений поиска, пагинации, фильтров итп
    this._meta = Meta.loading;

    console.log('fetchProducts');
    if (filter.length === 0) {
      console.log('fetchProducts, filter0');
      console.log(search);
      // TODO if  filter.length>1 then cicle of query
      const response = await axiosInstance.get('/products', {
        params: {
          title: search,
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
    } else {
      console.log('reactodsfs');
      const requests = filter.map((categoryIdStr) =>
        axiosInstance.get('/products', {
          params: {
            title: search,
            categoryId: Number(categoryIdStr),
          },
        }),
      );

      const responses = await Promise.all(requests);

      runInAction(() => {
        for (const response of responses) {
          if (response.status !== 200) {
            this._meta = Meta.error;
            return;
          }
        }

        // Извлекаем товары из каждого ответа
        const allProducts = responses.flatMap((response: { data: ProductInfoApi }) => response.data);

        try {
          const productsArr = allProducts.map(normalizeProductInfo);
          this._totalProducts = productsArr.length;
          this._products = this.paginateProducts(productsArr);
          this.paginationStore.setTotalPages(Math.ceil(allProducts.length / ITEMS_PER_PAGE));
          this._meta = Meta.success;
        } catch (err) {
          this._products.clear();
          this.paginationStore.setTotalPages(1);
          this._meta = Meta.error;
          return;
        }
      });
    }
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
    this.reactionFilter;
  }
}
