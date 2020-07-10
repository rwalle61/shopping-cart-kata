import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {
  items as catalogueItems,
  getBrand,
  isInStockGivenCart,
  getImageSrc,
} from '../data';
import { addToCartPure, removeFromCartPure, priceToString } from '../utilities';
import {
  getCartPrice,
  getItemVariantPriceString,
} from '../utilities/cart.utils';

const ItemImage = ({ src }): JSX.Element => <Image src={src} fluid rounded />;

const CatalogueItem = ({
  title,
  brand,
  variants,
  addToCart,
  isInStock,
}): JSX.Element => (
  <Row>
    <Col xs={3} sm={2} md={2}>
      <ItemImage src={getImageSrc(title)} />
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

const Catalogue = ({ items, addToCart, isInStock }): JSX.Element => (
  <div>
    <h1 className='text-center'>Catalogue</h1>
    <ListGroup variant='flush'>
      {items.map(({ title, brand, variants }) => (
        <ListGroup.Item key={title}>
          <CatalogueItem
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

const DecrementButton = ({ removeFromCart }): JSX.Element => (
  <Button onClick={removeFromCart}>-</Button>
);

const IncrementButton = ({ addToCart, isInStock }): JSX.Element => (
  <Button onClick={addToCart} disabled={!isInStock}>
    +
  </Button>
);

const CartItemVariant = ({
  description,
  quantity,
  addToCart,
  removeFromCart,
  isInStock,
}): JSX.Element => (
  <Row>
    <Col xs={3} sm={2} md={2}>
      <ItemImage src={getImageSrc(description)} />
    </Col>
    <Col>
      <b>{`${quantity} ${description}`}</b>
      <div>{getBrand(description)}</div>
      <i>{getItemVariantPriceString(description)}</i>
    </Col>
    <ButtonGroup>
      <DecrementButton
        removeFromCart={(): void => removeFromCart(description)}
      />
      <IncrementButton
        addToCart={(): void => addToCart(description)}
        isInStock={isInStock(description)}
      />
    </ButtonGroup>
  </Row>
);

const Cart = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  isInStock,
}): JSX.Element => (
  <div>
    <h1 className='text-center'>Cart</h1>
    <ListGroup variant='flush'>
      {Object.entries(cart).map(([description, quantity]) => (
        <ListGroup.Item key={description}>
          <CartItemVariant
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
      <b>{`Total: ${getCartPrice(cart)}`}</b>
    </Row>
    <Row className='justify-content-center'>
      <Button variant='outline-danger' size='sm' onClick={clearCart}>
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
  const clearCart = (): void => {
    setCart({});
  };
  const isInStock = (itemDescription): boolean =>
    isInStockGivenCart(itemDescription, cart);

  return (
    <div>
      <Catalogue
        items={catalogueItems}
        addToCart={addToThisCart}
        isInStock={isInStock}
      />
      <Cart
        cart={cart}
        addToCart={addToThisCart}
        removeFromCart={removeFromThisCart}
        clearCart={clearCart}
        isInStock={isInStock}
      />
    </div>
  );
};

export default Home;
