import React from 'react';
import { render as rtlRender, RenderResult } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/reducers';

const render = (
  ui,
  {
    initialState = {},
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {},
): RenderResult => {
  const Wrapper = ({ children }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
