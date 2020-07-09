import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
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
const productVariant = productVariants[0];
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
    it('renders the default cart price (£0.00)', () => {
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
    it('renders the product variants with descriptions, prices, and buttons to add them to cart', () => {
      const productTitle = screen.getByText(productWithMultipleVariants);
      expect(productTitle).toBeInTheDocument();
      productVariants.forEach((variant, i) => {
        const variantDescription = within(productTitle.parentElement).getByText(
          variant,
        );
        expect(variantDescription).toBeInTheDocument();
        const variantElement = variantDescription.parentElement;
        const variantPrice = within(variantElement).getByText(
          productVariantPrices[i],
        );
        expect(variantPrice).toBeInTheDocument();
        const button = within(variantElement).getByRole('button');
        expect(button).toHaveTextContent('Add to Cart');
      });
    });
  });
  describe('when user adds an item to the cart', () => {
    it('renders that item in the cart', () => {
      const catalogue = screen.getByText('Catalogue').parentElement;
      const catalogueItem = within(catalogue).getByText(productVariant)
        .parentElement;
      const catalogueItemButton = within(catalogueItem).getByRole('button');

      userEvent.click(catalogueItemButton);

      const cart = screen.getByText('Cart').parentElement;
      expect(within(cart).getByText(`1 ${productVariant}`)).toBeInTheDocument();
    });
    it('renders multiples of that item in the cart', () => {
      const catalogue = screen.getByText('Catalogue').parentElement;
      const catalogueItem = within(catalogue).getByText(productVariant)
        .parentElement;
      const catalogueItemButton = within(catalogueItem).getByRole('button');

      userEvent.click(catalogueItemButton);
      userEvent.click(catalogueItemButton);

      const cart = screen.getByText('Cart').parentElement;
      expect(within(cart).getByText(`2 ${productVariant}`)).toBeInTheDocument();
    });
    it('updates the cart price', () => {
      const catalogue = screen.getByText('Catalogue').parentElement;
      const catalogueItem = within(catalogue).getByText(productVariant)
        .parentElement;
      const catalogueItemButton = within(catalogueItem).getByRole('button');

      userEvent.click(catalogueItemButton);

      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('£30.00')).toBeInTheDocument();
    });
  });
});
