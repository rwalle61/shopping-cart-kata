export const addToCartPure = (cart, itemDescription): object => {
  const existingQuantity = Object.keys(cart).includes(itemDescription)
    ? cart[itemDescription]
    : 0;
  const newCart = {
    ...cart,
    [itemDescription]: existingQuantity + 1,
  };
  return newCart;
};

export const removeFromCartPure = (cart, itemDescription): object => {
  if (!Object.keys(cart).includes(itemDescription)) {
    return cart;
  }
  const existingQuantity = cart[itemDescription];
  const newQuantity = existingQuantity - 1;
  const { [itemDescription]: item, ...rest } = cart; // eslint-disable-line @typescript-eslint/no-unused-vars
  const newCart =
    newQuantity > 0
      ? {
          ...cart,
          [itemDescription]: newQuantity,
        }
      : rest;
  return newCart;
};

export const priceToString = (price: number): string => `£${price.toFixed(2)}`;
