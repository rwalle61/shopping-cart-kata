import BootstrapImage from 'react-bootstrap/Image';

const Image = ({ src }): JSX.Element => (
  <BootstrapImage src={src} fluid rounded />
);

export default Image;
