import { createStore } from 'redux';

import combinedReducer from '../reducers/combined-reducer';


export default function configureStore(initialState) {
  return createStore(combinedReducer, initialState);
}
