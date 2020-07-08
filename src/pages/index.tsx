import { productNames } from '../data';

const Home = (): JSX.Element => (
  <div>
    <div>Products</div>
    <div>Cart</div>
    {productNames.map((name) => (
      <div key={name}>{name}</div>
    ))}
    <div>Total:</div>
    <div>£0.00</div>
  </div>
);

export default Home;
