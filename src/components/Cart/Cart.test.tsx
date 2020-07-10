import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../../__test__/test-utils';
import Cart from './Cart';

describe('Cart', () => {
  it('renders a title', () => {
    render(<Cart cart={{}} clearCart={null} />);
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });
  it('renders an item variant', () => {
    const itemVariantDescription = 'Jungle Art Print Unframed A4';
    render(<Cart cart={{ [itemVariantDescription]: 1 }} clearCart={null} />);
    expect(screen.getByText(`1 ${itemVariantDescription}`)).toBeInTheDocument();
  });
  it('renders the default cart price to 2DP', () => {
    render(<Cart cart={{}} clearCart={null} />);
    expect(screen.getByText('Total: £0.00')).toBeInTheDocument();
  });
});
