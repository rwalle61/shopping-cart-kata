import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = ({ Component, pageProps }: AppProps): any => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
);

export default MyApp;
