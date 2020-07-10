import * as actions from '.';

describe('actions', () => {
  it('addToCart should create ADD_TO_CART action', () => {
    expect(actions.addToCart('item1')).toEqual({
      type: 'ADD_TO_CART',
      payload: {
        itemDescription: 'item1',
      },
    });
  });
  it('removeFromCart should create REMOVE_FROM_CART action', () => {
    expect(actions.removeFromCart('item1')).toEqual({
      type: 'REMOVE_FROM_CART',
      payload: {
        itemDescription: 'item1',
      },
    });
  });
  it('clearCart should create CLEAR_CART action', () => {
    expect(actions.clearCart()).toEqual({
      type: 'CLEAR_CART',
    });
  });
});
