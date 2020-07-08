import { products } from '../data';

const Home = (): JSX.Element => (
  <div>
    <div>Products</div>
    <div>Cart</div>
    {products.map(({ title, brand }) => (
      <div key={title}>
        <div>{title}</div>
        <div>{brand}</div>
        {title !== 'Lemon Cube Chair Copper' && (
          <div>
            <div>A4</div>
            <div>A3</div>
            <div>A2</div>
            <div>A1</div>
            <div>A0</div>
          </div>
        )}
      </div>
    ))}
    <div>Total:</div>
    <div>£0.00</div>
  </div>
);

export default Home;
