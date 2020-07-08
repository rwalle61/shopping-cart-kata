import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Home from '.';

describe('Home page', () => {
  it('renders products', () => {
    render(<Home />);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });
});
