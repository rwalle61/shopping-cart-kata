import { useState } from 'react';
import { items, isInStockGivenCart } from '../data';
import { addToCartPure, removeFromCartPure } from '../utilities';
import Catalogue from '../components/Catalogue';
import Cart from '../components/Cart';

const Home = (): JSX.Element => {
  const [cart, setCart] = useState({});
  const addToThisCart = (itemVariant): void => {
    const newCart = addToCartPure(cart, itemVariant);
    setCart(newCart);
  };
  const removeFromThisCart = (itemVariant): void => {
    const newCart = removeFromCartPure(cart, itemVariant);
    setCart(newCart);
  };
  const clearCart = (): void => {
    setCart({});
  };
  const isInStock = (itemDescription): boolean =>
    isInStockGivenCart(itemDescription, cart);

  return (
    <div>
      <Catalogue
        items={items}
        addToCart={addToThisCart}
        isInStock={isInStock}
      />
      <Cart
        cart={cart}
        addToCart={addToThisCart}
        removeFromCart={removeFromThisCart}
        clearCart={clearCart}
        isInStock={isInStock}
      />
    </div>
  );
};

export default Home;
