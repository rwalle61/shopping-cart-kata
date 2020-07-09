import productsJson from './product.json';

const getVariant = ({ description, price }): any => ({ description, price });

export const products = productsJson.map((product) => ({
  title: product.title,
  brand: product.brand.name,
  variants: product.skus.map(getVariant),
}));

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
