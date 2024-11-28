import { createContextLocalStore } from 'utils/createContextLocalStore';
import ProductItemStore from './ProductItemStore';

export { default } from './ProductItemStore'

const { Provider, useStore } = createContextLocalStore(ProductItemStore);
export { Provider as StoreProvider, useStore, ProductItemStore };
