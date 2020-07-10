import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { getImageSrc, getBrand } from '../../data';
import { getItemVariantPriceString } from '../../utilities/cart.utils';
import Image from '../../elements/Image';

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
      <Image src={getImageSrc(description)} />
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

export default CartItemVariant;
