import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import Header from 'components/Header';
import Products from 'pages/ProductsPage';
import Product from 'pages/OneProductPage';
import { useQueryParamsStoreInit } from 'stores/global/RootStore/hooks/useQueryParamsStoreInit';
import QueryParamsConnector from 'components/QueryParamsConnector';

function App() {
  useQueryParamsStoreInit();

  return (
// <<<<<<< publication
<!--     <HashRouter> -->
<!-- ======= -->
    <>
      <QueryParamsConnector />
<!-- >>>>>>> main -->
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
<!-- <<<<<<< publication -->
<!--     </HashRouter> -->
<!-- ======= -->
    </>
// >>>>>>> main
  );
}

export default App;
