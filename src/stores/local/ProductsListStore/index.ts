import { createContextLocalStore } from 'utils/createContextLocalStore';
import ProductsListStore from './ProductsListStore';

export { default } from './ProductsListStore'

const { Provider, useStore } = createContextLocalStore(ProductsListStore);
export { Provider as StoreProvider, useStore, ProductsListStore };
