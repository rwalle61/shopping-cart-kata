import {
  addToCart,
  removeFromCart,
  priceCart,
  getItemCartStates,
} from './cart.utils';

describe('cart.utils', () => {
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
  describe('priceCart', () => {
    it('prices an empty cart at £0.00', () => {
      expect(priceCart({})).toEqual('£0.00');
    });
  });
  describe('getItemCartStates', () => {
    it('returns []', () => {
      expect(getItemCartStates({})).toEqual([]);
    });
    it('returns an item cart states as an array', () => {
      expect(getItemCartStates({ a: 1 })).toEqual([
        { description: 'a', quantity: 1 },
      ]);
    });
  });
});
