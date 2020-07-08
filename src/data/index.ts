import productsJson from './product.json';

const getVariant = (variant): object => ({
  description: variant.description,
})

export const products = productsJson.map(product => ({
  title: product.title,
  brand: product.brand.name,
  variants: product.skus.map(getVariant),
}));

export default productsJson;
