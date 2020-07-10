import productsJson from './product.json';

export const items = productsJson.map((product) => ({
  title: product.title,
  brand: product.brand.name,
  variants: product.skus,
  image: product.image,
}));

export const findItem = (description: string): any =>
  items.find((product) => description.includes(product.title));

const findItemVariant = (description: string): any => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    const foundVariant = item.variants.find(
      (variant) => variant.description === description,
    );
    if (foundVariant) {
      return foundVariant;
    }
  }
  return null;
};

export const getItemVariantPrice = (description: string): number => {
  const variant = findItemVariant(description);
  return variant.price;
};

export const getBrand = (description: string): string =>
  findItem(description).brand;

const getQuantityInCart = (description: string, cart): number => {
  return cart[description] || 0;
};

export const isInStockGivenCart = (description: string, cart): boolean => {
  const quantityInCart = getQuantityInCart(description, cart);
  const variant = findItemVariant(description);
  return variant.stock > quantityInCart;
};

export const getImageSrc = (matcher: string): string => findItem(matcher).image;
