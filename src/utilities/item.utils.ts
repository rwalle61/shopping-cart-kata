import productsJson from '../data/product.json';
import { Cart, ItemCartState } from './cart.utils';

interface ItemVariant {
  description: string;
  id: string;
  price: number;
  stock: number;
}

interface Item {
  title: string;
  brand: string;
  variants: ItemVariant[];
  image: string;
}

const ITEMS = productsJson.map(
  (product): Item => ({
    title: product.title,
    brand: product.brand.name,
    variants: product.skus,
    image: product.image,
  }),
);

export const getItems = (): Item[] => ITEMS;

export const findItem = (description: string): Item =>
  ITEMS.find((product) => description.includes(product.title));

const findItemVariant = (description: string): ItemVariant => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of ITEMS) {
    const foundVariant = item.variants.find(
      (variant) => variant.description === description,
    );
    if (foundVariant) {
      return foundVariant;
    }
  }
  return null;
};

export const getItemBrand = (description: string): string =>
  findItem(description).brand;

export const getImageSrc = (matcher: string): string => findItem(matcher).image;

const getItemVariantPrice = (description: string): number => {
  const variant = findItemVariant(description);
  return variant.price;
};

export const priceItemVariant = (
  description: string,
  quantity: number,
): number => {
  return getItemVariantPrice(description) * quantity;
};

export const priceItemVariants = (items: ItemCartState[]): number =>
  items.reduce(
    (subtotal, { description, quantity }) =>
      subtotal + priceItemVariant(description, quantity),
    0,
  );

const getQuantityInCart = (description: string, cart: Cart): number => {
  return cart[description] || 0;
};

export const isVariantInStock = (description: string, cart: Cart): boolean => {
  const quantityInCart = getQuantityInCart(description, cart);
  const variant = findItemVariant(description);
  if (!variant) {
    throw new Error(`Unknown item variant: ${description}`);
  }
  return variant.stock > quantityInCart;
};
