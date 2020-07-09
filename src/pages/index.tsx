import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { products, getBrand, isInStockGivenCart } from '../data';
import { addToCartPure, removeFromCartPure } from '../utilities';
import { getCartPrice } from '../utilities/cart.utils';

const ButtonOutOfStock = (): JSX.Element => (
  <Button disabled>Out of Stock</Button>
);

const ButtonAddToCart = ({ addToCart }): JSX.Element => (
  <Button onClick={addToCart}>Add to Cart</Button>
);

const Product = ({
  title,
  brand,
  variants,
  addToCart,
  isInStock,
}): JSX.Element => (
  <div>
    <div>{title}</div>
    <div>{brand}</div>
    <div>
      {variants.map(({ description, price }) => (
        <div key={description}>
          <div>{description}</div>
          <div>{price}</div>
          {isInStock(description) ? (
            <ButtonAddToCart addToCart={(): void => addToCart(description)} />
          ) : (
            <ButtonOutOfStock />
          )}
        </div>
      ))}
    </div>
  </div>
);

const Catalogue = ({ addToCart, isInStock }): JSX.Element => (
  <div>
    <div>Catalogue</div>
    {products.map(({ title, brand, variants }) => (
      <Product
        key={title}
        title={title}
        brand={brand}
        variants={variants}
        addToCart={addToCart}
        isInStock={isInStock}
      />
    ))}
  </div>
);

const CartItem = ({
  description,
  quantity,
  addToCart,
  removeFromCart,
  isInStock,
}): JSX.Element => (
  <div>
    <div>{`${quantity} ${description}`}</div>
    <div>{getBrand(description)}</div>
    <Button onClick={(): void => removeFromCart(description)}>-</Button>
    <Button
      onClick={(): void => addToCart(description)}
      disabled={!isInStock(description)}
    >
      +
    </Button>
  </div>
);

const Cart = ({
  items,
  addToCart,
  removeFromCart,
  emptyCart,
  isInStock,
}): JSX.Element => (
  <div>
    <div>Cart</div>
    <Button onClick={emptyCart}>Empty Cart</Button>
    <div>
      {Object.entries(items).map(([description, quantity]) => (
        <CartItem
          key={description}
          description={description}
          quantity={quantity}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          isInStock={isInStock}
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
  const emptyCart = (): void => {
    setCart({});
  };
  const isInStock = (itemDescription): boolean =>
    isInStockGivenCart(itemDescription, cart);

  return (
    <div>
      <Catalogue addToCart={addToThisCart} isInStock={isInStock} />
      <Cart
        items={cart}
        addToCart={addToThisCart}
        removeFromCart={removeFromThisCart}
        emptyCart={emptyCart}
        isInStock={isInStock}
      />
    </div>
  );
};

export default Home;
