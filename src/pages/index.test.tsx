import '@testing-library/jest-dom/extend-expect';
import { render, screen, within } from '@testing-library/react';
import Home from '.';

const defaultProducts = [
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

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />);
  });
  describe('when app starts', () => {
    it('renders the "Products" title', () => {
      expect(screen.getByText('Products')).toBeInTheDocument();
    });
    it('renders the "Cart" title', () => {
      expect(screen.getByText('Cart')).toBeInTheDocument();
    });
    it('renders the default basket price (£0.00)', () => {
      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('£0.00')).toBeInTheDocument();
    });
    it('renders the titles and brands of the (5) default products in the catalogue', () => {
      const catalogue = screen.getByText('Products').parentElement;
      defaultProducts.forEach((product, i) => {
        const titleElement = within(catalogue).getAllByText(product)[0];
        expect(titleElement).toBeInTheDocument();
        const brandElement = within(titleElement.parentElement).getByText(
          defaultBrands[i],
        );
        expect(brandElement).toBeInTheDocument();
      });
    });
    it('renders the descriptions of product variants', () => {
      const titleElement = screen.getByText(productWithMultipleVariants);
      expect(titleElement).toBeInTheDocument();
      productVariants.forEach((variant) => {
        const sizeElement = within(titleElement.parentElement).getByText(
          variant,
        );
        expect(sizeElement).toBeInTheDocument();
      });
    });
  });
});
