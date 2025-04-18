import React from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import * as s from './CartCounter.module.scss';

const CartCounter = () => {
  const [cartItems] = useLocalStorage('cart', []);
  const counter = cartItems.length;

  if (counter === 0) return null;

  return <div className={s.counter}>{counter > 99? '\u{221E}' : counter}</div>;
};

export default CartCounter;
