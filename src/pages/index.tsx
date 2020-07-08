import { products } from '../data';

const Product = ({ title, brand, variants }): JSX.Element => (
  <div>
    <div>{title}</div>
    <div>{brand}</div>
    <div>
      {variants.map(({ description, price }) => (
        <div key={description}>
          <div>{description}</div>
          <div>{price}</div>
        </div>
      ))}
    </div>
  </div>
);

const Catalogue = (): JSX.Element => (
  <div>
    <div>Catalogue</div>
    {products.map(({ title, brand, variants }) => (
      <Product key={title} title={title} brand={brand} variants={variants} />
    ))}
  </div>
);

const Cart = (): JSX.Element => (
  <div>
    <div>Cart</div>
    <div>Total:</div>
    <div>£0.00</div>
  </div>
);

const Home = (): JSX.Element => (
  <div>
    <Catalogue />
    <Cart />
  </div>
);

export default Home;
