import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';

import routes from '../../client/routes';
import configureStore from '../../client/store/configure-store';


const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={createHistory()} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
