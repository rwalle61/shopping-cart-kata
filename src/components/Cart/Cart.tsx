import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getCartPrice } from '../../utilities/cart.utils';
import CartItemVariant from '../CartItemVariant';

const ClearCartButton = ({ clearCart }): JSX.Element => (
  <Button variant='outline-danger' size='sm' onClick={clearCart}>
    Clear Cart
  </Button>
);

const Cart = ({ cart, clearCart }): JSX.Element => (
  <div>
    <h1 className='text-center'>Cart</h1>
    <ListGroup variant='flush'>
      {Object.entries(cart).map(([description, quantity]) => (
        <ListGroup.Item key={description}>
          <CartItemVariant description={description} quantity={quantity} />
        </ListGroup.Item>
      ))}
    </ListGroup>
    <Row className='justify-content-center'>
      <b>{`Total: ${getCartPrice(cart)}`}</b>
    </Row>
    <Row className='justify-content-center'>
      <ClearCartButton clearCart={clearCart} />
    </Row>
  </div>
);

export default Cart;
