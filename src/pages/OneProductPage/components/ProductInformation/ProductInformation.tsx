import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import Text from 'components/Text';
import Button from 'components/Button';
import { ProductInfoModel } from 'stores/local/models/products/productInfo';
import { useLocalStorage } from 'hooks/useLocalStorage';
import Carousel from '../Carousel';
import * as s from './ProductInformation.module.scss';

export type ProductInfoProps = {
  product?: ProductInfoModel;
  className?: string;
};

const ProductInformation: React.FC<ProductInfoProps> = ({ product, className }) => {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  const [quantityInCart, setQuantityInCart] = useState(0);

  // Проверяем наличие товара в корзине при загрузке компонента
  useEffect(() => {
    if (product) {
      const itemInCart = cartItems.find((item: any) => item.id === product.id);
      if (itemInCart) {
        // setIsInCart(true);
        setQuantityInCart(itemInCart.quantity || 0);
      } else {
        // setIsInCart(false);
        setQuantityInCart(0);
      }
    }
  }, [cartItems, product]);

  const addItemToCart = (item: ProductInfoModel) => {
    // debugger;
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    let newCartItems = [...cartItems];

    if (existingItemIndex !== -1) {
      // Если товар уже есть, увеличиваем его количество
      newCartItems[existingItemIndex].quantity += 1;
    } else {
      // Если товара нет, добавляем его с количеством 1
      newCartItems.push({ ...item, quantity: 1 });
    }

    setCartItems(newCartItems);
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item: any) => item.id !== itemId));
    } else {
      setCartItems(cartItems.map((item: any) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
    }
  };

  return (
    <div className={cn(s[`product-info`], className)}>
      <Carousel source={product.images} />
      <div className={s[`product-info__description`]}>
        <Text className={s[`product-info__title`]} view="title" tag="h1">
          {product.title}
        </Text>
        <Text className={s[`product-info__subtitle`]} view="p-20" tag="div" color="secondary">
          {product.description}
        </Text>
        <Text className={s[`product-info__price`]} view="title" tag="div">
          {'$' + product.price}
        </Text>
        <div className={s[`product-info__buttons`]}>
          <Button className={s[`product-info__button`]} onClick={() => alert('Checkout is currently unavailable')}>
            Buy Now
          </Button>

          {quantityInCart > 0 ? (
            <>
              <NavLink to="/cart" className={cn(s[`product-info__button`], s['product-info__button_go-to-cart'])}>
                <Text tag={'div'} view={'button'}>
                  Go to Cart
                </Text>
              </NavLink>

              <div className={s[`cart-quantity`]}>
                <button
                  onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                  className={s[`cart-quantity__button`]}
                >
                  -
                </button>
                <Text view="p-18">{quantityInCart}</Text>
                <button
                  onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                  className={s[`cart-quantity__button`]}
                >
                  +
                </button>
              </div>
            </>
          ) : (
            <Button
              className={cn(s[`product-info__button`], s['product-info__button_add-to-cart'])}
              onClick={() => addItemToCart(product)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
