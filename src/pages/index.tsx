import { products } from '../data';

const Home = (): JSX.Element => (
  <div>
    <div>Products</div>
    <div>Cart</div>
    {products.map(({ title, brand }) => (
      <div key={title}>
        <div>{title}</div>
        <div>{brand}</div>
      </div>
    ))}
    <div>Total:</div>
    <div>£0.00</div>
  </div>
);

export default Home;
