import { combineReducers } from 'redux';

import memosReducer from './memos-reducer';


export default combineReducers({
  memos: memosReducer
});
