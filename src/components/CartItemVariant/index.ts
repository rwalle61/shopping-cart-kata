import { connect } from 'react-redux';
import { isVariantInStock } from '../../utilities/item.utils';
import { addToCart, removeFromCart } from '../../actions';
import CartItemVariant from './CartItemVariant';

const mapStateToProps = (state): object => ({
  isVariantInStock: (itemDescription): boolean =>
    isVariantInStock(itemDescription, state.cart),
});

const mapDispatchToProps = (dispatch): object => ({
  addToCart: (itemDescription): void => {
    dispatch(addToCart(itemDescription));
  },
  removeFromCart: (itemDescription): void => {
    dispatch(removeFromCart(itemDescription));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItemVariant);
