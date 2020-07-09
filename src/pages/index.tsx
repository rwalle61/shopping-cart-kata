import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { products, getBrand, isInStockGivenCart } from '../data';
import { addToCartPure, removeFromCartPure } from '../utilities';
import { getCartPrice } from '../utilities/cart.utils';

const Product = ({
  title,
  brand,
  variants,
  addToCart,
  isInStock,
}): JSX.Element => (
  <div>
    <b>{title}</b>
    <div>{brand}</div>
    <DropdownButton title='Add to Cart' size='sm'>
      {variants.map(({ description, price }) => (
        <Dropdown.Item
          key={description}
          onClick={(): void => addToCart(description)}
          disabled={!isInStock(description)}
        >
          <div>
            {`${isInStock(description) ? '' : '[OUT OF STOCK] '}${description}`}
          </div>
          <div>{price}</div>
        </Dropdown.Item>
      ))}
    </DropdownButton>
  </div>
);

const Catalogue = ({ addToCart, isInStock }): JSX.Element => (
  <div>
    <h2>Catalogue</h2>
    <ListGroup variant='flush'>
      {products.map(({ title, brand, variants }) => (
        <ListGroup.Item key={title}>
          <Product
            title={title}
            brand={brand}
            variants={variants}
            addToCart={addToCart}
            isInStock={isInStock}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

const ButtonDecrementItem = ({ removeFromCart }): JSX.Element => (
  <Button onClick={removeFromCart}>-</Button>
);

const ButtonIncrementItem = ({ addToCart, isInStock }): JSX.Element => (
  <Button onClick={addToCart} disabled={!isInStock}>
    +
  </Button>
);

const CartItem = ({
  description,
  quantity,
  addToCart,
  removeFromCart,
  isInStock,
}): JSX.Element => (
  <Row>
    <b>{`${quantity} ${description}`}</b>
    <div>{getBrand(description)}</div>
    <ButtonDecrementItem
      removeFromCart={(): void => removeFromCart(description)}
    />
    <ButtonIncrementItem
      addToCart={(): void => addToCart(description)}
      isInStock={isInStock(description)}
    />
  </Row>
);

const Cart = ({
  items,
  addToCart,
  removeFromCart,
  emptyCart,
  isInStock,
}): JSX.Element => (
  <div>
    <h2>Cart</h2>
    <Button onClick={emptyCart}>Empty Cart</Button>
    <ListGroup variant='flush'>
      {Object.entries(items).map(([description, quantity]) => (
        <ListGroup.Item key={description}>
          <CartItem
            description={description}
            quantity={quantity}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            isInStock={isInStock}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
    <div>
      {'Total: '}
      <b>{`£${getCartPrice(items)}`}</b>
    </div>
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
