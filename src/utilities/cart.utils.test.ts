import { priceItems, getCartPrice } from './cart.utils';

describe('Cart.utils', () => {
  describe('priceItems', () => {
    it('prices an empty cart at 0', () => {
      expect(priceItems({})).toEqual(0);
    });
    it('prices an item at 30', () => {
      expect(priceItems({ foo: 1 })).toEqual(30);
    });
  });
  describe('getCartPrice', () => {
    it('prices an empty cart at 0.00', () => {
      expect(getCartPrice({})).toEqual('0.00');
    });
  });
});
