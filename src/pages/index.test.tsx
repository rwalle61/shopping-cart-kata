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

const artProduct = 'Jungle Art Print Unframed';
const artProductVariants = ['A4', 'A3', 'A2', 'A1', 'A0'];

const productWithoutVariants = 'Lemon Cube Chair Copper';

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
    it('renders the titles and brands of the (5) default products', () => {
      defaultProducts.forEach((product, i) => {
        const titleElement = screen.getByText(product);
        expect(titleElement).toBeInTheDocument();
        const brandElement = within(titleElement.parentElement).getByText(
          defaultBrands[i],
        );
        expect(brandElement).toBeInTheDocument();
      });
    });
    it('renders the variants of an art product', () => {
      const titleElement = screen.getByText(artProduct);
      expect(titleElement).toBeInTheDocument();
      artProductVariants.forEach((size) => {
        const sizeElement = within(titleElement.parentElement).getByText(size);
        expect(sizeElement).toBeInTheDocument();
      });
    });
    it('does not render variants of a product without variants', () => {
      const titleElement = screen.getByText(productWithoutVariants);
      expect(titleElement).toBeInTheDocument();

      artProductVariants.forEach((size) => {
        const sizeElement = within(titleElement.parentElement).queryByText(
          size,
        );
        expect(sizeElement).toBeNull();
      });
    });
  });
});
