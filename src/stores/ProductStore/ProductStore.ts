import { action, makeObservable, observable, runInAction } from 'mobx';
import axiosInstance from 'utils/axiosInstanse';
import noImage from 'assets/noimage.png';
import { ProductInfo, Categoty, Option, FetchedProductInfo } from './types.ts';

class ProductStore {
  products: ProductInfo[] = [];
  product: Partial<ProductInfo> = {};

  isLoading: boolean = false;
  error: string | null = null;

  categories: Categoty[] = [];
  options: Option[] = [];
  selectedOptions: Option[] = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      product: observable,
      categories: observable,
      options: observable,
      selectedOptions: observable,
      isLoading: observable,
      error: observable,

      fetchProducts: action,
      fetchSearchResult: action,
      fetchProductById: action,
      fetchCategories: action,
    });
  }

  getProducts = (selectedOptions: Option[] = []): ProductInfo[] => {
    if (selectedOptions.length === 0) {
      return this.products;
    }
    const selectedOptionsNames = selectedOptions.map((option) => option.value);
    return this.products.filter((product) => selectedOptionsNames.includes(product.category));
  };

  // Метод для загрузки всех продуктов
  fetchProducts = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await axiosInstance.get('/products');
      runInAction(() => {
        this.products = result.data.map((p: FetchedProductInfo) => ({
          id: p.id,
          description: p.description,
          images: p.images ? p.images.map((el) => el.match(/https?:\/\/[^\s"]+/)) : [noImage],
          price: p.price,
          title: p.title,
          category: p.category.name,
        }));
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке товаров';
        this.isLoading = false;
      });
    }
  };

  fetchSearchResult = async (title: string) => {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await axiosInstance.get('/products', {
        params: {
          title: title,
        },
      });
      runInAction(() => {
        this.products = result.data.map((p: FetchedProductInfo) => ({
          id: p.id,
          description: p.description,
          images: p.images ? p.images.map((el) => el.match(/https?:\/\/[^\s"]+/)) : [noImage],
          price: p.price,
          title: p.title,
          category: p.category.name,
        }));
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке товаров';
        this.isLoading = false;
      });
    }
  };

  // Метод для загрузки одного товара по ID
  fetchProductById = async (id: string | undefined) => {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await axiosInstance.get(`/products/${id}`);
      runInAction(() => {
        this.product = {
          id: result.data.id,
          description: result.data.description,
          images: result.data.images
            ? result.data.images.map((el: string) => el.match(/https?:\/\/[^\s"]+/))
            : [noImage],
          price: result.data.price,
          title: result.data.title,
          category: result.data.category.name,
        };
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = `Ошибка при загрузке товара с ID ${id}`;
        this.isLoading = false;
      });
    }
  };

  // Метод для получения выбранных опций
  getOptionsByKeys = async (Keys: string[] = []) => {
    return this.options.filter((option: Option) => Keys.includes(option.key));
  };

  // Метод для получения категорий
  fetchCategories = async () => {
    this.isLoading = true;
    try {
      const result = await axiosInstance.get('/categories');
      this.categories = [];
      this.options = [];

      runInAction(() => {
        for (const category of result.data) {
          this.categories.push({
            id: category.id,
            image: category.image ? category.image.match(/https?:\/\/[^\s"]+/) : noImage,
            name: category.name,
          });

          this.options.push({
            key: category.id,
            value: category.name,
          });
        }

        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = `Ошибка при загрузке категорий`;
        this.isLoading = false;
      });
    }
  };
}

const productStore = new ProductStore();
export default productStore;
