import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import Home from '.';

const productVariant = 'Jungle Art Print Unframed A4';

const getCatalogueItemButton = (matcher): HTMLElement => {
  const catalogue = screen.getByText('Catalogue').parentElement;
  const catalogueItem = within(catalogue).getByText(matcher).parentElement;
  return within(catalogueItem).getByRole('button');
};

const getCartItem = (matcher): HTMLElement => {
  const cart = screen.getByText('Cart').parentElement;
  const cartItemTitle = within(cart).getByText(matcher);
  return cartItemTitle.parentElement;
};

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
    it('renders the default products in the catalogue', () => {
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
      const productWithMultipleVariants = 'Jungle Art Print Unframed';
      const productVariants = ['A4', 'A3', 'A2', 'A1', 'A0'].map(
        (size) => `${productWithMultipleVariants} ${size}`,
      );
      const productVariantPrices = [30, 40, 50, 60, 120].map(
        (price) => `${price}`,
      );

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
    it('renders that item in the cart with details and buttons', () => {
      const productBrand = 'Michael Belhadi';
      const catalogueItemButton = getCatalogueItemButton(productVariant);

      userEvent.click(catalogueItemButton);

      const cart = screen.getByText('Cart').parentElement;
      const cartItemTitle = within(cart).getByText(`1 ${productVariant}`);
      expect(cartItemTitle).toBeInTheDocument();

      const cartItem = cartItemTitle.parentElement;
      expect(within(cartItem).getByText(productBrand)).toBeInTheDocument();

      const [button1, button2] = within(cartItem).getAllByRole('button');
      expect(button1).toHaveTextContent('-');
      expect(button2).toHaveTextContent('+');
    });
    it('renders multiples of that item in the cart', () => {
      const catalogueItemButton = getCatalogueItemButton(productVariant);

      userEvent.click(catalogueItemButton);
      userEvent.click(catalogueItemButton);

      const cart = screen.getByText('Cart').parentElement;
      expect(within(cart).getByText(`2 ${productVariant}`)).toBeInTheDocument();
    });
    it('updates the cart price', () => {
      const catalogueItemButton = getCatalogueItemButton(productVariant);

      userEvent.click(catalogueItemButton);

      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('£30.00')).toBeInTheDocument();
    });
    it('renders a button to add more of an item to the cart', () => {
      const catalogueItemButton = getCatalogueItemButton(productVariant);
      userEvent.click(catalogueItemButton);

      const cartItem = getCartItem(`1 ${productVariant}`);
      const incrementButton = within(cartItem).getByText('+').closest('button');
      userEvent.click(incrementButton);

      const newCart = screen.getByText('Cart').parentElement;
      const newCartItemTitle = within(newCart).getByText(`2 ${productVariant}`);
      expect(newCartItemTitle).toBeInTheDocument();
      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('£60.00')).toBeInTheDocument();
    });
  });
  describe('when user removes an item from the cart', () => {
    describe('when the cart contains just 1 of the item', () => {
      it('removes the item from the cart and updates the cart price', () => {
        const catalogueItemButton = getCatalogueItemButton(productVariant);
        userEvent.click(catalogueItemButton);

        const cartItem = getCartItem(`1 ${productVariant}`);
        const decrementButton = within(cartItem)
          .getByText('-')
          .closest('button');
        userEvent.click(decrementButton);

        const newCart = screen.getByText('Cart').parentElement;
        const newCartItemTitle = within(newCart).queryByText(
          new RegExp(productVariant),
        );
        expect(newCartItemTitle).toBeNull();
        expect(screen.getByText('Total:')).toBeInTheDocument();
        expect(screen.getByText('£0.00')).toBeInTheDocument();
      });
    });
    describe('when the cart contains multiples of the item', () => {
      it('keeps the item in the cart, updates the item quantity and cart price', () => {
        const catalogueItemButton = getCatalogueItemButton(productVariant);
        userEvent.click(catalogueItemButton);
        userEvent.click(catalogueItemButton);

        const cartItem = getCartItem(`2 ${productVariant}`);
        const decrementButton = within(cartItem)
          .getByText('-')
          .closest('button');
        userEvent.click(decrementButton);

        const newCart = screen.getByText('Cart').parentElement;
        const newCartItemTitle = within(newCart).getByText(
          `1 ${productVariant}`,
        );
        expect(newCartItemTitle).toBeInTheDocument();
        expect(screen.getByText('Total:')).toBeInTheDocument();
        expect(screen.getByText('£30.00')).toBeInTheDocument();
      });
    });
  });
  describe('when user empties the cart', () => {
    it('removes all items and resets the cart price to 0', () => {
      const catalogueItemButton = getCatalogueItemButton(productVariant);
      userEvent.click(catalogueItemButton);

      const cart = screen.getByText('Cart').parentElement;
      const emptyCartButton = within(cart)
        .getByText('Empty Cart')
        .closest('button');
      userEvent.click(emptyCartButton);

      const newCart = screen.getByText('Cart').parentElement;
      const newCartItemTitle = within(newCart).queryByText(
        new RegExp(productVariant),
      );
      expect(newCartItemTitle).toBeNull();
      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('£0.00')).toBeInTheDocument();
    });
  });
  describe('when an item runs out of stock', () => {
    const outOfStockVariant = 'Black Orchidee Art Print Unframed A4';
    const lowStockVariant = 'Jungle Art Print Unframed A3';
    const lowStockVariantStock = 4;
    it('disables an item\'s "Add to Cart" button if it is already out of stock', () => {
      const catalogue = screen.getByText('Catalogue').parentElement;
      const catalogueItem = within(catalogue).getByText(outOfStockVariant)
        .parentElement;
      const catalogueItemButton = within(catalogueItem).getByRole('button');

      expect(catalogueItemButton).toHaveTextContent('Out of Stock');
      expect(catalogueItemButton).toBeDisabled();
    });
    it('disables an item\'s "Add to Cart" button when it runs out of stock', () => {
      const catalogueItemButton = getCatalogueItemButton(lowStockVariant);

      for (let i = 0; i < lowStockVariantStock; i += 1) {
        userEvent.click(catalogueItemButton);
      }

      const newCatalogueItemButton = getCatalogueItemButton(lowStockVariant);
      expect(newCatalogueItemButton).toHaveTextContent('Out of Stock');
      expect(newCatalogueItemButton).toBeDisabled();
    });
    it('disables an item\'s "Increment" button when it runs out of stock', () => {
      const catalogueItemButton = getCatalogueItemButton(lowStockVariant);

      for (let i = 0; i < lowStockVariantStock; i += 1) {
        userEvent.click(catalogueItemButton);
      }

      const cartItem = getCartItem(new RegExp(lowStockVariant));
      const incrementButton = within(cartItem).getByText('+').closest('button');
      expect(incrementButton).toBeDisabled();
    });
    it("re-enables the item's Add buttons when it is back in stock", () => {
      const catalogueItemButton = getCatalogueItemButton(lowStockVariant);
      for (let i = 0; i < lowStockVariantStock; i += 1) {
        userEvent.click(catalogueItemButton);
      }

      const cartItem = getCartItem(new RegExp(lowStockVariant));
      const decrementButton = within(cartItem).getByText('-').closest('button');
      userEvent.click(decrementButton);

      const newCatalogueItemButton = getCatalogueItemButton(lowStockVariant);
      expect(newCatalogueItemButton).toHaveTextContent('Add to Cart');
      expect(newCatalogueItemButton).toBeEnabled();

      const newCartItem = getCartItem(new RegExp(lowStockVariant));
      const incrementButton = within(newCartItem)
        .getByText('+')
        .closest('button');
      expect(incrementButton).toBeEnabled();
    });
  });
});
