import React from 'react';
import AppContext from '../context';

/**
 * Тут я сделал такой "хук" (функцию), которая будет нам возвращать логику под корзину,
 * т.е cartItems, setCartItems, totalPrice
 * @returns {{setCartItems: *, totalPrice: *, cartItems: *}}
 */

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return { cartItems, setCartItems, totalPrice };
};
