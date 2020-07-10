import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { products, getBrand, isInStockGivenCart, getImageSrc } from '../data';
import { addToCartPure, removeFromCartPure, priceToString } from '../utilities';
import { getCartPrice, getItemPriceString } from '../utilities/cart.utils';

const ProductImage = ({ src }): JSX.Element => (
  <Image src={src} fluid rounded />
);

const Product = ({
  title,
  brand,
  variants,
  addToCart,
  isInStock,
}): JSX.Element => (
  <Row>
    <Col xs={3} sm={2} md={2}>
      <ProductImage src={getImageSrc(title)} />
    </Col>
    <Col>
      <b>{title}</b>
      <div>{brand}</div>
    </Col>
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
          <div>{priceToString(price)}</div>
        </Dropdown.Item>
      ))}
    </DropdownButton>
  </Row>
);

const Catalogue = ({ addToCart, isInStock }): JSX.Element => (
  <div>
    <h1 className='text-center'>Catalogue</h1>
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
    <Col xs={3} sm={2} md={2}>
      <ProductImage src={getImageSrc(description)} />
    </Col>
    <Col>
      <b>{`${quantity} ${description}`}</b>
      <div>{getBrand(description)}</div>
      <i>{getItemPriceString(description)}</i>
    </Col>
    <ButtonGroup>
      <ButtonDecrementItem
        removeFromCart={(): void => removeFromCart(description)}
      />
      <ButtonIncrementItem
        addToCart={(): void => addToCart(description)}
        isInStock={isInStock(description)}
      />
    </ButtonGroup>
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
    <h1 className='text-center'>Cart</h1>
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

    <Row className='justify-content-center'>
      <b>{`Total: ${getCartPrice(items)}`}</b>
    </Row>
    <Row className='justify-content-center'>
      <Button variant='outline-danger' size='sm' onClick={emptyCart}>
        Clear Cart
      </Button>
    </Row>
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
