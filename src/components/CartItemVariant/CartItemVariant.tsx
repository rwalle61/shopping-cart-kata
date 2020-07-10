import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {
  getImageSrc,
  getItemBrand,
  priceItemVariant,
} from '../../utilities/item.utils';
import { priceToString } from '../../utilities/common.utils';
import Image from '../../elements/Image';

const DecrementButton = ({ removeFromCart }): JSX.Element => (
  <Button onClick={removeFromCart}>-</Button>
);

const IncrementButton = ({ addToCart, isVariantInStock }): JSX.Element => (
  <Button onClick={addToCart} disabled={!isVariantInStock}>
    +
  </Button>
);

const CartItemVariant = ({
  description,
  quantity,
  addToCart,
  removeFromCart,
  isVariantInStock,
}): JSX.Element => (
  <Row>
    <Col xs={3} sm={2} md={2}>
      <Image src={getImageSrc(description)} />
    </Col>
    <Col>
      <b>{`${quantity} ${description}`}</b>
      <div>{getItemBrand(description)}</div>
      <i>{priceToString(priceItemVariant(description, quantity))}</i>
    </Col>
    <ButtonGroup>
      <DecrementButton
        removeFromCart={(): void => removeFromCart(description)}
      />
      <IncrementButton
        addToCart={(): void => addToCart(description)}
        isVariantInStock={isVariantInStock(description)}
      />
    </ButtonGroup>
  </Row>
);

export default CartItemVariant;
