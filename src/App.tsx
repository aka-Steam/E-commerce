import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import Header from 'components/Header';
import Products from 'pages/ProductsPage';
import Product from 'pages/OneProductPage';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
