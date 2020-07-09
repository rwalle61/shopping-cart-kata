import { addToCartPure, removeFromCartPure } from '.';

describe('utilities', () => {
  describe('addToCartPure', () => {
    it('adds a new item to the cart', () => {
      expect(addToCartPure({}, 'a')).toEqual({ a: 1 });
    });
    it('increments an existing item', () => {
      expect(addToCartPure({ a: 1 }, 'a')).toEqual({ a: 2 });
    });
    it('increments the correct existing item', () => {
      expect(
        addToCartPure(
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
  describe('removeFromCartPure', () => {
    it('removes nothing from an empty cart', () => {
      expect(removeFromCartPure({}, 'a')).toEqual({});
    });
    it('removes nothing when item is not in cart', () => {
      expect(removeFromCartPure({ a: 1 }, 'b')).toEqual({ a: 1 });
    });
    it('removes an item from the cart when there is only 1 of it in the cart', () => {
      expect(removeFromCartPure({ a: 1 }, 'a')).toEqual({});
    });
    it('removes the correct item from the cart when there is only 1 of it in the cart', () => {
      expect(removeFromCartPure({ a: 1, b: 1, c: 1 }, 'b')).toEqual({
        a: 1,
        c: 1,
      });
    });
    it('decrements the quantity of an item when there are multiples of it in the cart', () => {
      expect(removeFromCartPure({ a: 3 }, 'a')).toEqual({ a: 2 });
    });
  });
});
