import { priceItem, priceItems, getCartPrice } from './cart.utils';

describe('Cart.utils', () => {
  describe('priceItem', () => {
    it('prices an item correctly', () => {
      expect(priceItem('Jungle Art Print Unframed A4', 1)).toEqual(30);
    });
    it('prices a different item correctly', () => {
      expect(priceItem('Jungle Art Print Unframed A2', 1)).toEqual(50);
    });
  });
  describe('priceItems', () => {
    it('prices an empty cart at 0', () => {
      expect(priceItems({})).toEqual(0);
    });
    it('prices 1 item', () => {
      expect(priceItems({ 'Jungle Art Print Unframed A4': 1 })).toEqual(30);
    });
    it('prices multiple of the same item', () => {
      expect(
        priceItems({
          'Jungle Art Print Unframed A4': 3,
        }),
      ).toEqual(30 * 3);
    });
    it('prices multiple different items', () => {
      expect(
        priceItems({
          'Jungle Art Print Unframed A4': 1,
          'Jungle Art Print Unframed A2': 1,
        }),
      ).toEqual(30 + 50);
    });
  });
  describe('getCartPrice', () => {
    it('prices an empty cart at £0.00', () => {
      expect(getCartPrice({})).toEqual('£0.00');
    });
  });
});
