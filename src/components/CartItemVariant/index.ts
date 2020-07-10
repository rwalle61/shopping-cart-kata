import { connect } from 'react-redux';
import { isInStockGivenCart } from '../../data/index';
import { addToCart, removeFromCart } from '../../actions';
import CartItemVariant from './CartItemVariant';

const mapStateToProps = (state): object => ({
  isInStock: (itemDescription): boolean =>
    isInStockGivenCart(itemDescription, state.cart),
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
