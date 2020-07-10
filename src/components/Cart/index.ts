import { connect } from 'react-redux';
import { clearCart } from '../../actions';
import Cart from './Cart';

const mapStateToProps = (state): object => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch): object => ({
  clearCart: (): void => {
    dispatch(clearCart());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
