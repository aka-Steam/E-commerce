import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import Header from 'components/Header';
import Products from 'pages/ProductsPage';
import Product from 'pages/OneProductPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
