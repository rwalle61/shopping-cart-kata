import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { priceToString } from '../../utilities';
import { getImageSrc } from '../../data';
import Image from '../../elements/Image';

const CatalogueItem = ({
  title,
  brand,
  variants,
  addToCart,
  isInStock,
}): JSX.Element => (
  <Row>
    <Col xs={3} sm={2} md={2}>
      <Image src={getImageSrc(title)} />
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

export default CatalogueItem;
