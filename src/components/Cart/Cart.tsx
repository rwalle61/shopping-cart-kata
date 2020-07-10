import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getCartPrice } from '../../utilities/cart.utils';
import CartItemVariant from '../CartItemVariant';

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

export default Cart;
