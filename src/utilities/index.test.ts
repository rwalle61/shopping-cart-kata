import { addToCartPure } from '.';

describe('utilities', () => {
  describe('addToCartPure', () => {
    it('adds a new item to the cart', () => {
      expect(addToCartPure({}, 'foo')).toEqual({
        foo: 1,
      });
    });
    it('increments an existing item', () => {
      expect(
        addToCartPure(
          {
            foo: 1,
          },
          'foo',
        ),
      ).toEqual({
        foo: 2,
      });
    });
    it('increments the correct existing item', () => {
      expect(
        addToCartPure(
          {
            foo: 1,
            bar: 1,
            foobar: 1,
          },
          'bar',
        ),
      ).toEqual({
        foo: 1,
        bar: 2,
        foobar: 1,
      },);
    });
  });
});
