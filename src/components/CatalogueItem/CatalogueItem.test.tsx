import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../../__test__/test-utils';
import CatalogueItem from './CatalogueItem';

const title = 'Jungle Art Print Unframed';
const brand = 'Michael Belhadi';

describe('CatalogueItem', () => {
  it('renders the item title, brand, image when there are no variants', () => {
    render(
      <CatalogueItem
        title={title}
        brand={brand}
        variants={[]}
        addToCart={null}
        isVariantInStock={(): boolean => true}
      />,
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(brand)).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
  });
});
