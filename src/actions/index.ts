export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

interface Action<Payload> {
  type: string;
  payload?: Payload;
  error?: boolean;
  meta?: object;
}

export const addToCart = (itemDescription): Action<object> => ({
  type: ADD_TO_CART,
  payload: {
    itemDescription,
  },
});

export const removeFromCart = (itemDescription): Action<object> => ({
  type: REMOVE_FROM_CART,
  payload: {
    itemDescription,
  },
});

export const clearCart = (): Action<null> => ({
  type: CLEAR_CART,
});
