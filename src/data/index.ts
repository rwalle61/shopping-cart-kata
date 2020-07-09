import productsJson from './product.json';

export const products = productsJson.map((product) => ({
  title: product.title,
  brand: product.brand.name,
  variants: product.skus,
}));

export const findProduct = (description: string): any =>
  products.find((product) => description.includes(product.title));

const findItem = (description: string): any => {
  // eslint-disable-next-line no-restricted-syntax
  for (const product of products) {
    const item = product.variants.find(
      (variant) => variant.description === description,
    );
    if (item) {
      return item;
    }
  }
  return null;
};

export const getItemPrice = (description: string): number => {
  const item = findItem(description);
  return item.price;
};

export const getBrand = (description: string): string =>
  findProduct(description).brand;

export const isInStock = (description: string): boolean => {
  const item = findItem(description);
  return item.stock > 0;
};
