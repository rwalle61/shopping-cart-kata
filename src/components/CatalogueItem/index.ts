import { connect } from 'react-redux';
import { addToCart } from '../../actions';
import { isInStockGivenCart } from '../../data/index';
import CatalogueItem from './CatalogueItem';

const mapStateToProps = (state): object => ({
  isInStock: (itemDescription): boolean =>
    isInStockGivenCart(itemDescription, state.cart),
});

const mapDispatchToProps = (dispatch): object => ({
  addToCart: (itemdescription): void => {
    dispatch(addToCart(itemdescription));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueItem);
