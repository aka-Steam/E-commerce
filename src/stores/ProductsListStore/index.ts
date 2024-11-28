export { default } from './ProductsListStore';

import { createContext, useContext } from 'react';
import ProductsListStore from './ProductsListStore';

export const ProductsListStoreContext = createContext<ProductsListStore | null>(null);

export const useProductsListStore = () => {
  const context = useContext(ProductsListStoreContext);
  if (!context) {
    throw new Error('useProductsListStore must be used within a RootStoreProvider');
  }
  return context;
};


// export const ProductsListStoreProvider: React.FC = ({ children }) => {
//     // TODO? useLocalStore(() => new ProductsListStore());
//     const ProductsListStore: ProductsListStore  = React.useMemo(() => new ProductsListStore(), []);
//     return (
//         <ProductsListStoreContext.Provider value={ProductsListStore}>
//           {children}
//         </ProductsListStoreContext.Provider>
//       );

// }