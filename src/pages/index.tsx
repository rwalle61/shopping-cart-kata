import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { products, getBrand } from '../data';
import { addToCartPure, removeFromCartPure } from '../utilities';
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

const CartItem = ({
  description,
  quantity,
  addToCart,
  removeFromCart,
}): JSX.Element => (
  <div>
    <div>{`${quantity} ${description}`}</div>
    <div>{getBrand(description)}</div>
    <Button onClick={(): void => removeFromCart(description)}>-</Button>
    <Button onClick={(): void => addToCart(description)}>+</Button>
  </div>
);

const Cart = ({ items, addToCart, removeFromCart }): JSX.Element => (
  <div>
    <div>Cart</div>
    <div>
      {Object.entries(items).map(([description, quantity]) => (
        <CartItem
          key={description}
          description={description}
          quantity={quantity}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
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
  const removeFromThisCart = (item): void => {
    const newCart = removeFromCartPure(cart, item);
    setCart(newCart);
  };

  return (
    <div>
      <Catalogue addToCart={addToThisCart} />
      <Cart
        items={cart}
        addToCart={addToThisCart}
        removeFromCart={removeFromThisCart}
      />
    </div>
  );
};

export default Home;
