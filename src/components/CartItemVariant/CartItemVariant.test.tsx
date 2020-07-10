import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../../__test__/test-utils';
import CartItemVariant from './CartItemVariant';

const description = 'Jungle Art Print Unframed A4';

describe('CartItemVariant', () => {
  it('renders the variant description, quantity, price, Add button, Remove button, image', () => {
    render(
      <CartItemVariant
        description={description}
        quantity={2}
        addToCart={null}
        removeFromCart={null}
        isVariantInStock={(): boolean => true}
      />,
    );
    expect(screen.getByText(`2 ${description}`)).toBeInTheDocument();
    expect(screen.getByText('£60.00')).toBeInTheDocument();
    expect(screen.getByText('+').closest('button')).toBeInTheDocument();
    expect(screen.getByText('-').closest('button')).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
  });
});
