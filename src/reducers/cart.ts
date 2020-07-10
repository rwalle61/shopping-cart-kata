import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions';
import {
  Cart,
  clearCart,
  addToCart,
  removeFromCart,
} from '../utilities/cart.utils';

const cart = (state = clearCart(), action): Cart => {
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
