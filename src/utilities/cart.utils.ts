const priceItem = ([name, quantity]) => {
  return 30;
};

export const priceItems = (items) =>
  Object.entries(items).reduce(
    (subtotal, item) => subtotal + priceItem(item),
    0,
  );

export const getCartPrice = (items) => priceItems(items).toFixed(2);
