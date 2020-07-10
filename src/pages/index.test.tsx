import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import Home from '.';

const productTitle = 'Jungle Art Print Unframed';
const productVariant = `${productTitle} A4`;

const getCatalogueItem = (matcher): HTMLElement => {
  const catalogue = screen.getByText('Catalogue').parentElement;
  const catalogueItem = within(catalogue).getByText(matcher);
  return catalogueItem;
};

const openDropdown = async (matcher): Promise<HTMLElement> => {
  const productElement = screen.getByText(matcher).parentElement.parentElement;
  const addToCartDropdown = within(productElement).getByText('Add to Cart');
  userEvent.click(addToCartDropdown);
  const newProductElement = (await screen.findByText(matcher)).parentElement
    .parentElement;
  return newProductElement;
};

const openDropDownAndGetCatalogueItem = async (
  _productTitle,
  _productVariant,
): Promise<HTMLElement> => {
  await openDropdown(_productTitle);
  return getCatalogueItem(_productVariant);
};

const getCart = (): HTMLElement =>
  screen.getByText('Cart').parentElement.parentElement;

const getCartItem = (matcher): HTMLElement => {
  const cartItemTitle = within(getCart()).getByText(matcher);
  return cartItemTitle.parentElement.parentElement;
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
      expect(screen.getByText('Total: £0.00')).toBeInTheDocument();
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
        const title = within(catalogue).getByText(product);
        expect(title).toBeInTheDocument();
        const productElement = title.parentElement.parentElement;
        const brand = within(productElement).getByText(defaultBrands[i]);
        expect(brand).toBeInTheDocument();
        const img = within(productElement).getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src');
      });
    });
    it('renders dropdowns of product variants with descriptions and prices', async () => {
      const productWithMultipleVariants = 'Jungle Art Print Unframed';
      const productVariants = ['A4', 'A3', 'A2', 'A1', 'A0'].map(
        (size) => `${productWithMultipleVariants} ${size}`,
      );
      const productVariantPrices = [30, 40, 50, 60, 120].map(
        (price) => `£${price}.00`,
      );

      const productElement = screen.getByText(productWithMultipleVariants)
        .parentElement.parentElement;
      const addToCartDropdown = within(productElement).getByText('Add to Cart');
      userEvent.click(addToCartDropdown);

      const newProductElement = (
        await screen.findByText(productWithMultipleVariants)
      ).parentElement.parentElement;
      productVariants.forEach((variant, i) => {
        const variantDescription = within(newProductElement).getByText(variant);
        expect(variantDescription).toBeInTheDocument();
        const variantElement = variantDescription.parentElement;
        const variantPrice = within(variantElement).getByText(
          productVariantPrices[i],
        );
        expect(variantPrice).toBeInTheDocument();
      });
    });
  });
  describe('when user adds an item to the cart', () => {
    it('renders that item in the cart with details and buttons', async () => {
      const productBrand = 'Michael Belhadi';
      const productVariantPrice = '£30.00';
      const catalogueItem = await openDropDownAndGetCatalogueItem(
        productTitle,
        productVariant,
      );

      userEvent.click(catalogueItem);

      const cart = getCart();
      const cartItemTitle = within(cart).getByText(`1 ${productVariant}`);
      expect(cartItemTitle).toBeInTheDocument();

      const cartItem = cartItemTitle.parentElement.parentElement;
      expect(within(cartItem).getByText(productBrand)).toBeInTheDocument();
      expect(
        within(cartItem).getByText(productVariantPrice),
      ).toBeInTheDocument();
      const img = within(cartItem).getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src');

      const [button1, button2] = within(cartItem).getAllByRole('button');
      expect(button1).toHaveTextContent('-');
      expect(button2).toHaveTextContent('+');
    });
    it('renders multiples of that item in the cart', async () => {
      const catalogueItem = await openDropDownAndGetCatalogueItem(
        productTitle,
        productVariant,
      );

      userEvent.click(catalogueItem);
      userEvent.click(catalogueItem);

      const cart = getCart();
      expect(within(cart).getByText(`2 ${productVariant}`)).toBeInTheDocument();
    });
    it('updates the cart price', async () => {
      const catalogueItem = await openDropDownAndGetCatalogueItem(
        productTitle,
        productVariant,
      );

      userEvent.click(catalogueItem);

      expect(screen.getByText('Total: £30.00')).toBeInTheDocument();
    });
    it('renders a button to add more of an item to the cart', async () => {
      const catalogueItem = await openDropDownAndGetCatalogueItem(
        productTitle,
        productVariant,
      );
      userEvent.click(catalogueItem);

      const cartItem = getCartItem(`1 ${productVariant}`);
      const incrementButton = within(cartItem).getByText('+').closest('button');
      userEvent.click(incrementButton);

      const newCart = getCart();
      const newCartItemTitle = within(newCart).getByText(`2 ${productVariant}`);
      expect(newCartItemTitle).toBeInTheDocument();
      expect(screen.getByText('Total: £60.00')).toBeInTheDocument();
    });
  });
  describe('when user removes an item from the cart', () => {
    describe('when the cart contains just 1 of the item', () => {
      it('removes the item from the cart and updates the cart price', async () => {
        const catalogueItem = await openDropDownAndGetCatalogueItem(
          productTitle,
          productVariant,
        );
        userEvent.click(catalogueItem);

        const cartItem = getCartItem(`1 ${productVariant}`);
        const decrementButton = within(cartItem)
          .getByText('-')
          .closest('button');
        userEvent.click(decrementButton);

        const newCart = getCart();
        const newCartItemTitle = within(newCart).queryByText(
          new RegExp(productVariant),
        );
        expect(newCartItemTitle).toBeNull();
        expect(screen.getByText('Total: £0.00')).toBeInTheDocument();
      });
    });
    describe('when the cart contains multiples of the item', () => {
      it('keeps the item in the cart, updates the item quantity and cart price', async () => {
        const catalogueItem = await openDropDownAndGetCatalogueItem(
          productTitle,
          productVariant,
        );
        userEvent.click(catalogueItem);
        userEvent.click(catalogueItem);

        const cartItem = getCartItem(`2 ${productVariant}`);
        const decrementButton = within(cartItem)
          .getByText('-')
          .closest('button');
        userEvent.click(decrementButton);

        const newCart = getCart();
        const newCartItemTitle = within(newCart).getByText(
          `1 ${productVariant}`,
        );
        expect(newCartItemTitle).toBeInTheDocument();
        expect(screen.getByText('Total: £30.00')).toBeInTheDocument();
      });
    });
  });
  describe('when user empties the cart', () => {
    it('removes all items and resets the cart price to 0', async () => {
      const catalogueItem = await openDropDownAndGetCatalogueItem(
        productTitle,
        productVariant,
      );
      userEvent.click(catalogueItem);

      const cart = getCart();
      const emptyCartButton = within(cart).getByText('X').closest('button');
      userEvent.click(emptyCartButton);

      const newCart = getCart();
      const newCartItemTitle = within(newCart).queryByText(
        new RegExp(productVariant),
      );
      expect(newCartItemTitle).toBeNull();
      expect(screen.getByText('Total: £0.00')).toBeInTheDocument();
    });
  });
  describe('when an item runs out of stock', () => {
    const outOfStockTitle = 'Black Orchidee Art Print Unframed';
    const outOfStockVariant = `${outOfStockTitle} A4`;
    const lowStockTitle = 'Jungle Art Print Unframed';
    const lowStockVariant = `${lowStockTitle} A3`;
    const lowStockVariantStock = 4;
    it('disables an item\'s "Add to Cart" button if it is already out of stock', async () => {
      const catalogueItem = await openDropDownAndGetCatalogueItem(
        outOfStockTitle,
        new RegExp(outOfStockVariant),
      );

      expect(catalogueItem).toHaveTextContent(/\[OUT OF STOCK\]/);

      const cart = getCart();
      const cartItemTitle = within(cart).queryByText(
        new RegExp(outOfStockVariant),
      );
      expect(cartItemTitle).toBeNull();
    });
    it('disables an item\'s "Add to Cart" button when it runs out of stock', async () => {
      const catalogueItem = await openDropDownAndGetCatalogueItem(
        lowStockTitle,
        lowStockVariant,
      );

      for (let i = 0; i < lowStockVariantStock; i += 1) {
        userEvent.click(catalogueItem);
      }

      const newCatalogueItem = await openDropDownAndGetCatalogueItem(
        lowStockTitle,
        new RegExp(lowStockVariant),
      );
      expect(newCatalogueItem).toHaveTextContent(/\[OUT OF STOCK\]/);
    });
    it('disables an item\'s "Increment" button when it runs out of stock', async () => {
      const catalogueItem = await openDropDownAndGetCatalogueItem(
        lowStockTitle,
        lowStockVariant,
      );

      for (let i = 0; i < lowStockVariantStock; i += 1) {
        userEvent.click(catalogueItem);
      }

      const cartItem = getCartItem(new RegExp(lowStockVariant));
      const incrementButton = within(cartItem).getByText('+').closest('button');
      expect(incrementButton).toBeDisabled();
    });
    it("re-enables the item's Add buttons when it is back in stock", async () => {
      const catalogueItem = await openDropDownAndGetCatalogueItem(
        lowStockTitle,
        lowStockVariant,
      );
      for (let i = 0; i < lowStockVariantStock; i += 1) {
        userEvent.click(catalogueItem);
      }

      const cartItem = getCartItem(new RegExp(lowStockVariant));
      const decrementButton = within(cartItem).getByText('-').closest('button');
      userEvent.click(decrementButton);

      const newCatalogueItem = await openDropDownAndGetCatalogueItem(
        lowStockTitle,
        lowStockVariant,
      );
      expect(newCatalogueItem).not.toHaveTextContent(/\[OUT OF STOCK\]/);

      const newCartItem = getCartItem(new RegExp(lowStockVariant));
      const incrementButton = within(newCartItem)
        .getByText('+')
        .closest('button');
      expect(incrementButton).toBeEnabled();
    });
  });
});
