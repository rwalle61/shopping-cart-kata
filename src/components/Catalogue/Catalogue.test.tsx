import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../../__test__/test-utils';
import Catalogue from './Catalogue';

jest.mock('../../utilities/item.utils', () => ({
  getItems: (): [] => [],
}));

describe('Catalogue', () => {
  it('renders the title and no items when there are no items', () => {
    render(<Catalogue />);
    expect(screen.getByText('Catalogue')).toBeInTheDocument();
  });
});
