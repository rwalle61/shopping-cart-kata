import '@testing-library/jest-dom/extend-expect';
import { render, screen, within } from '@testing-library/react';
import Home from '.';

const catalogueProducts = [
  'Jungle Art Print Unframed',
  'Unframed Col Du Glandon Art Print',
  'Mexico Art Print Unframed',
  'Black Orchidee Art Print Unframed',
  'Lemon Cube Chair Copper',
];

const defaultBrands = [
  'Michael Belhadi',
  'David Sparshott',
  'Michael Belhadi',
  'Boris Draschoff',
  'Sternzeit',
];

const productWithMultipleVariants = 'Jungle Art Print Unframed';
const productVariants = ['A4', 'A3', 'A2', 'A1', 'A0'].map(
  (size) => `${productWithMultipleVariants} ${size}`,
);
const productVariantPrices = [30, 40, 50, 60, 120].map((price) => `${price}`);

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />);
  });
  describe('when app starts', () => {
    it('renders the "Catalogue" title', () => {
      expect(screen.getByText('Catalogue')).toBeInTheDocument();
    });
    it('renders the "Cart" title', () => {
      expect(screen.getByText('Cart')).toBeInTheDocument();
    });
    it('renders the default basket price (£0.00)', () => {
      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('£0.00')).toBeInTheDocument();
    });
    it('renders the titles and brands of the (5) default products in the catalogue', () => {
      const catalogue = screen.getByText('Catalogue').parentElement;
      catalogueProducts.forEach((product, i) => {
        const productTitle = within(catalogue).getAllByText(product)[0];
        expect(productTitle).toBeInTheDocument();
        const brand = within(productTitle.parentElement).getByText(
          defaultBrands[i],
        );
        expect(brand).toBeInTheDocument();
      });
    });
    it('renders the descriptions and prices of product variants', () => {
      const productTitle = screen.getByText(productWithMultipleVariants);
      expect(productTitle).toBeInTheDocument();
      productVariants.forEach((variant, i) => {
        const variantDescription = within(productTitle.parentElement).getByText(
          variant,
        );
        expect(variantDescription).toBeInTheDocument();
        const variantPrice = within(productTitle.parentElement).getByText(
          productVariantPrices[i],
        );
        expect(variantPrice).toBeInTheDocument();
      });
    });
  });
});
