import * as data from '.';

describe('data', () => {
  describe('findProduct', () => {
    it('returns the correct product', () => {
      const product = data.findProduct('Jungle Art Print Unframed A4');
      expect(product.title).toEqual('Jungle Art Print Unframed');
    });
  });
  describe('getBrand', () => {
    it('returns the correct brand', () => {
      expect(data.getBrand('Jungle Art Print Unframed A4')).toEqual(
        'Michael Belhadi',
      );
    });
  });
  describe('isInStockGivenCart', () => {
    const itemDescription = 'Jungle Art Print Unframed A3';
    const itemStock = 4;
    it('returns true when the item has remaining stock', () => {
      const cart = { [itemDescription]: itemStock - 1 };
      expect(data.isInStockGivenCart(itemDescription, cart)).toBe(true);
    });
    it('returns false when the item does not have remaining stock', () => {
      const cart = { [itemDescription]: itemStock };
      expect(data.isInStockGivenCart(itemDescription, cart)).toBe(false);
    });
    it('returns true when the item is not in the cart', () => {
      expect(data.isInStockGivenCart(itemDescription, {})).toBe(true);
    });
  });
  describe('products', () => {
    it('returns a summary of the default products', () => {
      expect(data.products).toMatchInlineSnapshot(`
        Array [
          Object {
            "brand": "Michael Belhadi",
            "image": "https://ik.imagekit.io/pimberly/5a8c13244d6da904d47144ba/93e15616/5d70e2f93d51575d590000b7.jpeg",
            "title": "Jungle Art Print Unframed",
            "variants": Array [
              Object {
                "description": "Jungle Art Print Unframed A4",
                "id": "2100011000413620178",
                "price": 30,
                "stock": 10,
              },
              Object {
                "description": "Jungle Art Print Unframed A3",
                "id": "2100021000413620178",
                "price": 40,
                "stock": 4,
              },
              Object {
                "description": "Jungle Art Print Unframed A2",
                "id": "2100031000413620178",
                "price": 50,
                "stock": 10,
              },
              Object {
                "description": "Jungle Art Print Unframed A1",
                "id": "2100041000413620178",
                "price": 60,
                "stock": 10,
              },
              Object {
                "description": "Jungle Art Print Unframed A0",
                "id": "2100051000413620178",
                "price": 120,
                "stock": 10,
              },
            ],
          },
          Object {
            "brand": "David Sparshott",
            "image": "https://ik.imagekit.io/pimberly/5a8c13244d6da904d47144ba/e01f72b5/5d4a85d754d1780084000030.jpeg",
            "title": "Unframed Col Du Glandon Art Print",
            "variants": Array [
              Object {
                "description": "Unframed Col Du Glandon Art Print - A4",
                "id": "2100011000410220177",
                "price": 60,
                "stock": 10,
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A3",
                "id": "2100021000410220177",
                "price": 80,
                "stock": 10,
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A2",
                "id": "2100031000410220177",
                "price": 100,
                "stock": 10,
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A1",
                "id": "2100041000410220177",
                "price": 150,
                "stock": 10,
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A0",
                "id": "2100051000410220177",
                "price": 200,
                "stock": 10,
              },
            ],
          },
          Object {
            "brand": "Michael Belhadi",
            "image": "https://ik.imagekit.io/pimberly/5a8c13244d6da904d47144ba/93e15616/5d70e2f93d51575d590000db.jpeg",
            "title": "Mexico Art Print Unframed",
            "variants": Array [
              Object {
                "description": "Mexico Art Print Unframed A4",
                "id": "2100011000414520178",
                "price": 30,
                "stock": 10,
              },
              Object {
                "description": "Mexico Art Print Unframed A3",
                "id": "2100021000414520178",
                "price": 40,
                "stock": 12,
              },
              Object {
                "description": "Mexico Art Print Unframed A2",
                "id": "2100031000414520178",
                "price": 50,
                "stock": 10,
              },
              Object {
                "description": "Mexico Art Print Unframed A1",
                "id": "2100041000414520178",
                "price": 60,
                "stock": 1,
              },
              Object {
                "description": "Mexico Art Print Unframed A0",
                "id": "2100051000414520178",
                "price": 120,
                "stock": 10,
              },
            ],
          },
          Object {
            "brand": "Boris Draschoff",
            "image": "https://ik.imagekit.io/pimberly/5a8c13244d6da904d47144ba/86b4edd1/5da74776f9b6b137860000c7.jpeg",
            "title": "Black Orchidee Art Print Unframed",
            "variants": Array [
              Object {
                "description": "Black Orchidee Art Print Unframed A4",
                "id": "2100011000410820183",
                "price": 30,
                "stock": 0,
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A3",
                "id": "2100021000410820183",
                "price": 40,
                "stock": 10,
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A2",
                "id": "2100031000410820183",
                "price": 50,
                "stock": 10,
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A1",
                "id": "2100041000410820183",
                "price": 60,
                "stock": 10,
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A0",
                "id": "2100051000410820183",
                "price": 120,
                "stock": 10,
              },
            ],
          },
          Object {
            "brand": "Sternzeit ",
            "image": "https://ik.imagekit.io/pimberly/5a8c13244d6da904d47144ba/616d37cf/5dde3085c70d3e2fa700005f.jpg",
            "title": "Lemon Cube Chair Copper",
            "variants": Array [
              Object {
                "description": "Lemon Cube Chair Copper",
                "id": "2100051000511120163",
                "price": 234.24,
                "stock": 4,
              },
            ],
          },
        ]
      `);
    });
  });
});
