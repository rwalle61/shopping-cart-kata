import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions';

const defaultState = {};

export const addToCart = (cart, itemDescription): object => {
  const existingQuantity = Object.keys(cart).includes(itemDescription)
    ? cart[itemDescription]
    : 0;
  const newCart = {
    ...cart,
    [itemDescription]: existingQuantity + 1,
  };
  return newCart;
};

export const removeFromCart = (cart, itemDescription): object => {
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

export const clearCart = (): object => ({ ...defaultState });

const cart = (state = defaultState, action): object => {
  switch (action.type) {
    case ADD_TO_CART:
      return addToCart(state, action.payload.itemDescription);
    case REMOVE_FROM_CART:
      return removeFromCart(state, action.payload.itemDescription);
    case CLEAR_CART:
      return clearCart();
    default:
      return state;
  }
};

export default cart;
