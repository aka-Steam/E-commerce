import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import Header from 'components/Header';
import Products from 'pages/ProductsPage';
import Product from 'pages/OneProductPage';
import { useQueryParamsStoreInit } from './stores/RootStore/hooks/useQueryParamsStoreInit';
import QueryParamsConnector from 'components/QueryParamsConnector';

function App() {
  useQueryParamsStoreInit();

  return (
    <>
      <QueryParamsConnector />
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
