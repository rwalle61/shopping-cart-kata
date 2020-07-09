import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { products } from '../data';
import { addToCartPure } from '../utilities';
import { getCartPrice } from '../utilities/cart.utils';

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

const CartItem = ({ description, quantity }): JSX.Element => (
  <div>
    <div>{`${quantity} ${description}`}</div>
    <Button onClick={(): void => null}>-</Button>
    <Button onClick={(): void => null}>+</Button>
  </div>
);

const Cart = ({ items }): JSX.Element => (
  <div>
    <div>Cart</div>
    <div>
      {Object.entries(items).map(([description, quantity]) => (
        <CartItem
          key={description}
          description={description}
          quantity={quantity}
        />
      ))}
    </div>
    <div>Total:</div>
    <div>{`£${getCartPrice(items)}`}</div>
  </div>
);

const Home = (): JSX.Element => {
  const [cart, setCart] = useState({});
  const addToThisCart = (item): void => {
    const newCart = addToCartPure(cart, item);
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
