import { AppProps } from 'next/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
