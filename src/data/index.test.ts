import * as data from '.';

describe('data', () => {
  describe('products', () => {
    it('returns a summary of the default products', () => {
      expect(data.products).toMatchInlineSnapshot(`
        Array [
          Object {
            "brand": "Michael Belhadi",
            "title": "Jungle Art Print Unframed",
            "variants": Array [
              Object {
                "description": "Jungle Art Print Unframed A4",
                "price": 30,
              },
              Object {
                "description": "Jungle Art Print Unframed A3",
                "price": 40,
              },
              Object {
                "description": "Jungle Art Print Unframed A2",
                "price": 50,
              },
              Object {
                "description": "Jungle Art Print Unframed A1",
                "price": 60,
              },
              Object {
                "description": "Jungle Art Print Unframed A0",
                "price": 120,
              },
            ],
          },
          Object {
            "brand": "David Sparshott",
            "title": "Unframed Col Du Glandon Art Print",
            "variants": Array [
              Object {
                "description": "Unframed Col Du Glandon Art Print - A4",
                "price": 60,
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A3",
                "price": 80,
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A2",
                "price": 100,
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A1",
                "price": 150,
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A0",
                "price": 200,
              },
            ],
          },
          Object {
            "brand": "Michael Belhadi",
            "title": "Mexico Art Print Unframed",
            "variants": Array [
              Object {
                "description": "Mexico Art Print Unframed A4",
                "price": 30,
              },
              Object {
                "description": "Mexico Art Print Unframed A3",
                "price": 40,
              },
              Object {
                "description": "Mexico Art Print Unframed A2",
                "price": 50,
              },
              Object {
                "description": "Mexico Art Print Unframed A1",
                "price": 60,
              },
              Object {
                "description": "Mexico Art Print Unframed A0",
                "price": 120,
              },
            ],
          },
          Object {
            "brand": "Boris Draschoff",
            "title": "Black Orchidee Art Print Unframed",
            "variants": Array [
              Object {
                "description": "Black Orchidee Art Print Unframed A4",
                "price": 30,
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A3",
                "price": 40,
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A2",
                "price": 50,
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A1",
                "price": 60,
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A0",
                "price": 120,
              },
            ],
          },
          Object {
            "brand": "Sternzeit ",
            "title": "Lemon Cube Chair Copper",
            "variants": Array [
              Object {
                "description": "Lemon Cube Chair Copper",
                "price": 234.24,
              },
            ],
          },
        ]
      `);
    });
  });
});
