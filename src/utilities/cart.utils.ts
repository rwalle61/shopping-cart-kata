import { getItemVariantPrice } from '../data';
import { priceToString } from '.';

export const priceItem = (name, quantity): number => {
  return getItemVariantPrice(name) * quantity;
};

export const priceItems = (items): number =>
  Object.entries(items).reduce(
    (subtotal, [name, quantity]) => subtotal + priceItem(name, quantity),
    0,
  );

export const getItemVariantPriceString = (description: string): string =>
  priceToString(getItemVariantPrice(description));

export const getCartPrice = (items): string => priceToString(priceItems(items));
