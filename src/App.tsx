import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Products from 'pages/ProductsPage';
import Product from 'pages/OneProductPage';
import AboutUs from 'pages/AboutUsPage';
import Cart from 'pages/CartPage';
import Categories from 'pages/CategoriesPage';
import { useQueryParamsStoreInit } from 'stores/global/RootStore/hooks/useQueryParamsStoreInit';
import QueryParamsConnector from 'components/QueryParamsConnector';
import './App.scss';

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
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
