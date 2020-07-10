import { connect } from 'react-redux';
import { addToCart } from '../../actions';
import { isVariantInStock } from '../../utilities/item.utils';
import CatalogueItem from './CatalogueItem';

const mapStateToProps = (state): object => ({
  isVariantInStock: (itemDescription): boolean =>
    isVariantInStock(itemDescription, state.cart),
});

const mapDispatchToProps = (dispatch): object => ({
  addToCart: (itemdescription): void => {
    dispatch(addToCart(itemdescription));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueItem);
