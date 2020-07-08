import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { products } from '../data';

const Product = ({ title, brand, variants, addToCart }): JSX.Element => (
  <div>
    <div>{title}</div>
    <div>{brand}</div>
    <div>
      {variants.map(({ description, price }) => (
        <div key={description}>
          <div>{description}</div>
          <div>{price}</div>
          <Button onClick={(): void => addToCart(description)}>
            Add to Cart
          </Button>
        </div>
      ))}
    </div>
  </div>
);

const Catalogue = ({ addToCart }): JSX.Element => (
  <div>
    <div>Catalogue</div>
    {products.map(({ title, brand, variants }) => (
      <Product
        key={title}
        title={title}
        brand={brand}
        variants={variants}
        addToCart={addToCart}
      />
    ))}
  </div>
);

const Cart = ({ items }): JSX.Element => (
  <div>
    <div>Cart</div>
    <div>
      {Object.keys(items).map((description) => (
        <div key={description}>
          <div>{description}</div>
        </div>
      ))}
    </div>
    <div>Total:</div>
    <div>£0.00</div>
  </div>
);

const addToCart = (cart, item): object => {
  return {
    'Jungle Art Print Unframed A4': 1,
  };
};

const Home = (): JSX.Element => {
  const [cart, setCart] = useState({});
  const addToThisCart = (item): void => {
    const newCart = addToCart(cart, item);
    setCart(newCart);
  };

  return (
    <div>
      <Catalogue addToCart={addToThisCart} />
      <Cart items={cart} />
    </div>
  );
};

export default Home;
