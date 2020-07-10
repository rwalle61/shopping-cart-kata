import { getItemPrice } from '../data';
import { priceToString } from '.';

export const priceItem = (name, quantity): number => {
  return getItemPrice(name) * quantity;
};

export const priceItems = (items): number =>
  Object.entries(items).reduce(
    (subtotal, [name, quantity]) => subtotal + priceItem(name, quantity),
    0,
  );

export const getCartPrice = (items): string => priceToString(priceItems(items));
