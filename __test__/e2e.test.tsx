import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from './test-utils';
import App from '../src/pages';

const itemTitle = 'Jungle Art Print Unframed';
const itemVariantDesc = `${itemTitle} A4`;

const getElementInCatalogue = (matcher): HTMLElement => {
  const catalogue = screen.getByText('Catalogue').parentElement;
  return within(catalogue).getByText(matcher);
};

const openItemDropdownInCatalogue = async (
  titleMatcher,
): Promise<HTMLElement> => {
  const item = screen.getByText(titleMatcher).parentElement.parentElement;
  const addToCartDropdown = within(item).getByText('Add to Cart');
  userEvent.click(addToCartDropdown);
  const newItem = (await screen.findByText(titleMatcher)).parentElement
    .parentElement;
  return newItem;
};

const getItemVariantInCatalogueDropdown = async (
  _itemTitle,
  _itemVariant,
): Promise<HTMLElement> => {
  await openItemDropdownInCatalogue(_itemTitle);
  return getElementInCatalogue(_itemVariant);
};

const getCart = (): HTMLElement => screen.getByText('Cart').parentElement;

const getCartItemVariant = (descriptionMatcher): HTMLElement => {
  const variantDescription = within(getCart()).getByText(descriptionMatcher);
  return variantDescription.parentElement.parentElement;
};

describe('e2e tests - as a user', () => {
  beforeEach(() => {
    render(<App />);
  });
  describe('when I load the home page', () => {
    test('I see the catalogue title', () => {
      expect(screen.getByText('Catalogue')).toBeInTheDocument();
    });
    test('I see the cart title', () => {
      expect(screen.getByText('Cart')).toBeInTheDocument();
    });
    test('I see the default cart price (£0.00)', () => {
      expect(screen.getByText('Total: £0.00')).toBeInTheDocument();
    });
    test('I see the default items', () => {
      const itemTitles = [
        'Jungle Art Print Unframed',
        'Unframed Col Du Glandon Art Print',
        'Mexico Art Print Unframed',
        'Black Orchidee Art Print Unframed',
        'Lemon Cube Chair Copper',
      ];
      const itemBrands = [
        'Michael Belhadi',
        'David Sparshott',
        'Michael Belhadi',
        'Boris Draschoff',
        'Sternzeit',
      ];
      const catalogue = screen.getByText('Catalogue').parentElement;

      itemTitles.forEach((titleString, i) => {
        const title = within(catalogue).getByText(titleString);
        expect(title).toBeInTheDocument();
        const item = title.parentElement.parentElement;
        const brand = within(item).getByText(itemBrands[i]);
        expect(brand).toBeInTheDocument();
        const img = within(item).getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src');
      });
    });
    test('I can click dropdowns to see item variants and their details', async () => {
      const variantDescriptions = ['A4', 'A3', 'A2', 'A1', 'A0'].map(
        (size) => `${itemTitle} ${size}`,
      );
      const variantPrices = [30, 40, 50, 60, 120].map(
        (price) => `£${price}.00`,
      );

      const item = screen.getByText(itemTitle).parentElement.parentElement;
      const addToCartDropdown = within(item).getByText('Add to Cart');
      userEvent.click(addToCartDropdown);

      const newItem = (await screen.findByText(itemTitle)).parentElement
        .parentElement;
      variantDescriptions.forEach((descriptionString, i) => {
        const description = within(newItem).getByText(descriptionString);
        expect(description).toBeInTheDocument();
        const variant = description.parentElement;
        const price = within(variant).getByText(variantPrices[i]);
        expect(price).toBeInTheDocument();
      });
    });
  });
  describe('when I add an item variant to the cart', () => {
    test('I see that item variant in the cart with details and Add/Remove buttons', async () => {
      const itemBrand = 'Michael Belhadi';
      const variantPrice = '£30.00';
      const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
        itemTitle,
        itemVariantDesc,
      );

      userEvent.click(catalogueItemVariant);

      const cart = getCart();
      const variantDescription = within(cart).getByText(`1 ${itemVariantDesc}`);
      expect(variantDescription).toBeInTheDocument();

      const cartItemVariant = variantDescription.parentElement.parentElement;
      expect(within(cartItemVariant).getByText(itemBrand)).toBeInTheDocument();
      expect(
        within(cartItemVariant).getByText(variantPrice),
      ).toBeInTheDocument();
      const img = within(cartItemVariant).getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src');

      const [button1, button2] = within(cartItemVariant).getAllByRole('button');
      expect(button1).toHaveTextContent('-');
      expect(button2).toHaveTextContent('+');
    });
    test('I see multiples of that item variant in the cart', async () => {
      const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
        itemTitle,
        itemVariantDesc,
      );

      userEvent.click(catalogueItemVariant);
      userEvent.click(catalogueItemVariant);

      const cart = getCart();
      expect(
        within(cart).getByText(`2 ${itemVariantDesc}`),
      ).toBeInTheDocument();
    });
    test('I see an updated cart price', async () => {
      const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
        itemTitle,
        itemVariantDesc,
      );

      userEvent.click(catalogueItemVariant);

      expect(screen.getByText('Total: £30.00')).toBeInTheDocument();
    });
    test('I can increase the quantity of an item in the cart', async () => {
      const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
        itemTitle,
        itemVariantDesc,
      );
      userEvent.click(catalogueItemVariant);

      const cartItemVariant = getCartItemVariant(`1 ${itemVariantDesc}`);
      const incrementButton = within(cartItemVariant)
        .getByText('+')
        .closest('button');
      userEvent.click(incrementButton);

      const newCart = getCart();
      const newVariantDescription = within(newCart).getByText(
        `2 ${itemVariantDesc}`,
      );
      expect(newVariantDescription).toBeInTheDocument();
      expect(screen.getByText('Total: £60.00')).toBeInTheDocument();
    });
  });
  describe('when I decrease the quantity of an item in the cart', () => {
    describe('when the cart contains just 1 of the item variant', () => {
      test('I see the cart does not contain the item variant, and that the cart price is updated', async () => {
        const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
          itemTitle,
          itemVariantDesc,
        );
        userEvent.click(catalogueItemVariant);

        const cartItemVariant = getCartItemVariant(`1 ${itemVariantDesc}`);
        const decrementButton = within(cartItemVariant)
          .getByText('-')
          .closest('button');
        userEvent.click(decrementButton);

        const newCart = getCart();
        const newVariantDescription = within(newCart).queryByText(
          new RegExp(itemVariantDesc),
        );
        expect(newVariantDescription).toBeNull();
        expect(screen.getByText('Total: £0.00')).toBeInTheDocument();
      });
    });
    describe('when the cart contains multiples of the item variant', () => {
      test('I see the cart contains the item variant with reduced quantity, and that the cart price is updated', async () => {
        const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
          itemTitle,
          itemVariantDesc,
        );
        userEvent.click(catalogueItemVariant);
        userEvent.click(catalogueItemVariant);

        const cartItemVariant = getCartItemVariant(`2 ${itemVariantDesc}`);
        const decrementButton = within(cartItemVariant)
          .getByText('-')
          .closest('button');
        userEvent.click(decrementButton);

        const newCart = getCart();
        const newVariantDescription = within(newCart).getByText(
          `1 ${itemVariantDesc}`,
        );
        expect(newVariantDescription).toBeInTheDocument();
        expect(screen.getByText('Total: £30.00')).toBeInTheDocument();
      });
    });
  });
  describe('when I remove all items from their cart with a single action', () => {
    test('I see the cart has no items and its price is 0', async () => {
      const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
        itemTitle,
        itemVariantDesc,
      );
      userEvent.click(catalogueItemVariant);

      const cart = getCart();
      const emptyCartButton = within(cart)
        .getByText('Clear Cart')
        .closest('button');
      userEvent.click(emptyCartButton);

      const newCart = getCart();
      const newVariantDescription = within(newCart).queryByText(
        new RegExp(itemVariantDesc),
      );
      expect(newVariantDescription).toBeNull();
      expect(screen.getByText('Total: £0.00')).toBeInTheDocument();
    });
  });
  describe('when an item variant runs out of stock', () => {
    const outOfStockTitle = 'Black Orchidee Art Print Unframed';
    const outOfStockVariantDescription = `${outOfStockTitle} A4`;
    const lowStockTitle = 'Jungle Art Print Unframed';
    const lowStockVariantDescription = `${lowStockTitle} A3`;
    const lowStockVariantStock = 4;
    test('I see the item variant\'s "Add to Cart" button disabled if it is already out of stock', async () => {
      const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
        outOfStockTitle,
        new RegExp(outOfStockVariantDescription),
      );

      expect(catalogueItemVariant).toHaveTextContent(/\[OUT OF STOCK\]/);

      const cart = getCart();
      const variantDescription = within(cart).queryByText(
        new RegExp(outOfStockVariantDescription),
      );
      expect(variantDescription).toBeNull();
    });
    test('I see the item variant\'s "Add to Cart" button disabled after adding all its stock to cart', async () => {
      const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
        lowStockTitle,
        lowStockVariantDescription,
      );

      for (let i = 0; i < lowStockVariantStock; i += 1) {
        userEvent.click(catalogueItemVariant);
      }

      const newCatalogueItem = await getItemVariantInCatalogueDropdown(
        lowStockTitle,
        new RegExp(lowStockVariantDescription),
      );
      expect(newCatalogueItem).toHaveTextContent(/\[OUT OF STOCK\]/);
    });
    test('I see the item variant\'s "Increment" button disabled after adding all its stock to cart', async () => {
      const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
        lowStockTitle,
        lowStockVariantDescription,
      );

      for (let i = 0; i < lowStockVariantStock; i += 1) {
        userEvent.click(catalogueItemVariant);
      }

      const cartItemVariant = getCartItemVariant(
        new RegExp(lowStockVariantDescription),
      );
      const incrementButton = within(cartItemVariant)
        .getByText('+')
        .closest('button');
      expect(incrementButton).toBeDisabled();
    });
    test("I see the item variant's buttons re-enabled after removing some of it from the cart", async () => {
      const catalogueItemVariant = await getItemVariantInCatalogueDropdown(
        lowStockTitle,
        lowStockVariantDescription,
      );
      for (let i = 0; i < lowStockVariantStock; i += 1) {
        userEvent.click(catalogueItemVariant);
      }

      const cartItemVariant = getCartItemVariant(
        new RegExp(lowStockVariantDescription),
      );
      const decrementButton = within(cartItemVariant)
        .getByText('-')
        .closest('button');
      userEvent.click(decrementButton);

      const newCatalogueItem = await getItemVariantInCatalogueDropdown(
        lowStockTitle,
        lowStockVariantDescription,
      );
      expect(newCatalogueItem).not.toHaveTextContent(/\[OUT OF STOCK\]/);

      const newCartItem = getCartItemVariant(
        new RegExp(lowStockVariantDescription),
      );
      const incrementButton = within(newCartItem)
        .getByText('+')
        .closest('button');
      expect(incrementButton).toBeEnabled();
    });
  });
});
