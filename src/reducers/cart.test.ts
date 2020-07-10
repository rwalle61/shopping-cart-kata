import cart from './cart';

describe('cart reducer', () => {
  it('handles initial state', () => {
    expect(cart(undefined, {})).toEqual({});
  });
  describe('when state contains no items', () => {
    it('handles ADD_TO_CART by adding the new item', () => {
      expect(
        cart({}, { type: 'ADD_TO_CART', payload: { itemDescription: 'a' } }),
      ).toEqual({ a: 1 });
    });
    it('handles CLEAR_CART by returning the cart', () => {
      expect(cart({}, { type: 'CLEAR_CART' })).toEqual({});
    });
  });

  describe('when state contains items', () => {
    it('handles ADD_TO_CART by returning a cart with the correct item quantity', () => {
      expect(
        cart(
          { a: 1, b: 1, c: 1 },
          { type: 'ADD_TO_CART', payload: { itemDescription: 'b' } },
        ),
      ).toEqual({
        a: 1,
        b: 2,
        c: 1,
      });
    });
    it('handles REMOVE_FROM_CART by returning a cart without the correct item', () => {
      expect(
        cart(
          { a: 1, b: 1, c: 1 },
          { type: 'REMOVE_FROM_CART', payload: { itemDescription: 'b' } },
        ),
      ).toEqual({
        a: 1,
        c: 1,
      });
    });
    it('handles CLEAR_CART by returning an empty cart', () => {
      expect(cart({ a: 1, b: 1 }, { type: 'CLEAR_CART' })).toEqual({});
    });
  });
});
