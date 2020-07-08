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
              },
              Object {
                "description": "Jungle Art Print Unframed A3",
              },
              Object {
                "description": "Jungle Art Print Unframed A2",
              },
              Object {
                "description": "Jungle Art Print Unframed A1",
              },
              Object {
                "description": "Jungle Art Print Unframed A0",
              },
            ],
          },
          Object {
            "brand": "David Sparshott",
            "title": "Unframed Col Du Glandon Art Print",
            "variants": Array [
              Object {
                "description": "Unframed Col Du Glandon Art Print - A4",
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A3",
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A2",
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A1",
              },
              Object {
                "description": "Unframed Col Du Glandon Art Print - A0",
              },
            ],
          },
          Object {
            "brand": "Michael Belhadi",
            "title": "Mexico Art Print Unframed",
            "variants": Array [
              Object {
                "description": "Mexico Art Print Unframed A4",
              },
              Object {
                "description": "Mexico Art Print Unframed A3",
              },
              Object {
                "description": "Mexico Art Print Unframed A2",
              },
              Object {
                "description": "Mexico Art Print Unframed A1",
              },
              Object {
                "description": "Mexico Art Print Unframed A0",
              },
            ],
          },
          Object {
            "brand": "Boris Draschoff",
            "title": "Black Orchidee Art Print Unframed",
            "variants": Array [
              Object {
                "description": "Black Orchidee Art Print Unframed A4",
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A3",
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A2",
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A1",
              },
              Object {
                "description": "Black Orchidee Art Print Unframed A0",
              },
            ],
          },
          Object {
            "brand": "Sternzeit ",
            "title": "Lemon Cube Chair Copper",
            "variants": Array [
              Object {
                "description": "Lemon Cube Chair Copper",
              },
            ],
          },
        ]
      `);
    });
  });
});
