import products from './product.json';

export const productNames = products.map(product => product.title);

export default products
