import { priceItemVariants } from './item.utils';
import { priceToString } from './common.utils';

export interface Cart {
  [itemDescription: string]: number;
}

export interface ItemCartState {
  description: string;
  quantity: number;
}

export const clearCart = (): Cart => ({});

export const addToCart = (cart: Cart, itemDescription: string): Cart => {
  const existingQuantity = Object.keys(cart).includes(itemDescription)
    ? cart[itemDescription]
    : 0;
  const newCart = {
    ...cart,
    [itemDescription]: existingQuantity + 1,
  };
  return newCart;
};

export const removeFromCart = (cart: Cart, itemDescription: string): Cart => {
  if (!Object.keys(cart).includes(itemDescription)) {
    return cart;
  }
  const existingQuantity = cart[itemDescription];
  const newQuantity = existingQuantity - 1;
  const { [itemDescription]: item, ...rest } = cart;
  const newCart =
    newQuantity > 0
      ? {
          ...cart,
          [itemDescription]: newQuantity,
        }
      : rest;
  return newCart;
};

export const getItemCartStates = (cart: Cart): ItemCartState[] =>
  Object.entries(cart).map(([description, quantity]) => ({
    description,
    quantity,
  }));

export const priceCart = (cart: Cart): string => {
  const items = getItemCartStates(cart);
  const price = priceItemVariants(items);
  return priceToString(price);
};
