import React from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import { useLocalStorage } from 'hooks/useLocalStorage';
import * as s from './CartPage.module.scss';

export const CartPage = () => {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item: any) => item.id !== itemId));
    } else {
      setCartItems(cartItems.map((item: any) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item: any) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };


  const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  return (
    <div className={s.cart}>
      <Text className={s.cart__title} tag="h1" view="title">
        Shopping Cart
      </Text>
      {cartItems.length === 0 ? (
        <div className={s.cart__empty}>
          <Text tag="h2" view="p-20" weight="bold">
            Your cart is empty
          </Text>
          <Text view="p-16">Add some items to your cart to see them here</Text>
        </div>
      ) : (
        <div className={s.cart__items}>
        {cartItems.map((item: any) => (
          <div key={item.id} className={s.cart__item}>
            <img src={item.images[0]} alt={item.title} className={s.cart__item_image} />
            <div className={s.cart__item_info}>
              <Text tag="h3" view="p-20" weight="bold">
                {item.title}
              </Text>
              <Text className={s.cart__item_price} view="p-20" weight="bold">
                ${item.price}
              </Text>
              <div className={s.cart__item_quantity}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={s.cart__item_button}>
                  -
                </button>
                <Text view="p-16">{item.quantity}</Text>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={s.cart__item_button}>
                  +
                </button>
              </div>
              <Button onClick={() => removeItem(item.id)} className={s.cart__item_remove}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>)}

      <div className={s.cart__summary}>
        <Text tag="h2" view="p-20" weight="bold">
          Cart Summary
        </Text>
        <Text view="p-16">Total Items: {totalItems}</Text>
        <Text view="p-16">Total Price: ${totalPrice}</Text>
        <Button onClick={clearCart} className={s.cart__summary_clear}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
