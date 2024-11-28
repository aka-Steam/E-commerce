import { createContext, useContext } from 'react';
import ProductItemStore from './ProductItemStore';

export { default } from './ProductItemStore';

export const ProductItemStoreContext = createContext<ProductItemStore | null>(null);

// export const ProductItemStoreProvider: React.FC = ({ children }) => {
//   const ProductItemStore: ProductItemStore  = React.useMemo(() => new ProductItemStore(), []);
//   return (
//       <ProductItemStoreContext.Provider value={ProductItemStore}>
//         {children}
//       </ProductItemStoreContext.Provider>
//     );
// }

export const useProductItemStore = () => {
  const context = useContext(ProductItemStoreContext);
  if (!context) {
    throw new Error('useProductItemStore must be used within a ProductItemStoreProvider');
  }
  return context;
};



  // TODO? useLocalStore(() => new ProductsListStore());