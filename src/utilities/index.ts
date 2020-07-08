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

export default addToCartPure;
