import { products } from '../data';

const Product = ({ title, brand, variants }): JSX.Element => (
  <div>
    <div>{title}</div>
    <div>{brand}</div>
    <div>
      {variants.map((variant) => (
        <div key={variant.description}>{variant.description}</div>
      ))}
    </div>
  </div>
);

const Catalogue = (): JSX.Element => (
  <div>
    <div>Products</div>
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
