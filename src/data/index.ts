import productsJson from './product.json';

export const products = productsJson.map(product => ({
  title: product.title,
  brand: product.brand.name,
}));

export default productsJson
