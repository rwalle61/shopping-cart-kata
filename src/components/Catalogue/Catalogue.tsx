import ListGroup from 'react-bootstrap/ListGroup';
import CatalogueItem from '../CatalogueItem';

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

export default Catalogue;
