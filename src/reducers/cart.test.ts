import cart, { addToCart, removeFromCart } from './cart';

describe('cart reducer', () => {
  describe('addToCart', () => {
    it('adds a new item to the cart', () => {
      expect(addToCart({}, 'a')).toEqual({ a: 1 });
    });
    it('increments an existing item', () => {
      expect(addToCart({ a: 1 }, 'a')).toEqual({ a: 2 });
    });
    it('increments the correct existing item', () => {
      expect(
        addToCart(
          {
            a: 1,
            b: 1,
            c: 1,
          },
          'b',
        ),
      ).toEqual({
        a: 1,
        b: 2,
        c: 1,
      });
    });
  });
  describe('removeFromCart', () => {
    it('removes nothing from an empty cart', () => {
      expect(removeFromCart({}, 'a')).toEqual({});
    });
    it('removes nothing when item is not in cart', () => {
      expect(removeFromCart({ a: 1 }, 'b')).toEqual({ a: 1 });
    });
    it('removes an item from the cart when there is only 1 of it in the cart', () => {
      expect(removeFromCart({ a: 1 }, 'a')).toEqual({});
    });
    it('removes the correct item from the cart when there is only 1 of it in the cart', () => {
      expect(removeFromCart({ a: 1, b: 1, c: 1 }, 'b')).toEqual({
        a: 1,
        c: 1,
      });
    });
    it('decrements the quantity of an item when there are multiples of it in the cart', () => {
      expect(removeFromCart({ a: 3 }, 'a')).toEqual({ a: 2 });
    });
  });
  describe('cart', () => {
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
});
